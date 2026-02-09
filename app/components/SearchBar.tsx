"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { getUserLocation, formatCoordinates } from "../services/locationService";

interface SearchBarProps {
  onCitySelect: (locationQuery: string) => void;
}

interface CitySuggestion {
  id: number;
  name: string;
  region: string;
  country: string;
}

export default function SearchBar({ onCitySelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (query.trim().length < 2) { //if the user input is too short clear suggestions and hides the dropdown
      setSuggestions([]);
      setShowSuggestions(false);
      setActiveIndex(-1);
      return;
    }

    const timeout = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
        const data = await res.json();
        setSuggestions(data.suggestions);
        setShowSuggestions(true); //show dropdown
      } catch (err) {
        console.error("Autocomplete error:", err);
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setIsSearching(false);
      }
    }, 300); //debounce // wait 300ms before making the fetch

    return () => clearTimeout(timeout);
  }, [query]); //runs every time the query is changed


  const handleSearch = () => {
    if (!query.trim()) return;
    setShowSuggestions(false);
    onCitySelect(query.trim());
    setQuery(""); 
  };

  const handleSuggestionSelect = (suggestion: CitySuggestion) => {
    const locationQuery = `${suggestion.name}, ${suggestion.region}, ${suggestion.country}`; //format suggestion
    setShowSuggestions(false);
    setSuggestions([]);
    setActiveIndex(-1); //tracks which suggestion is highlighted //-1 means nothing is highlighted
    setQuery(""); 
    onCitySelect(locationQuery);
  };

  ///locate user locataion //Geolocation
  const handleLocationSearch = async () => {
    setIsLocating(true);
    try {
      const coords = await getUserLocation();
      const formatted = formatCoordinates(coords.latitude, coords.longitude);
      setShowSuggestions(false);
      setQuery("");
      onCitySelect(formatted);
    } catch (err) {
      console.error("Location error:", err);
    } finally {
      setIsLocating(false);
    }
  };

  ///handle key arrows movement
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === "Enter") handleSearch();
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
        break;

      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0) {
          handleSuggestionSelect(suggestions[activeIndex]);
        } else {
          handleSearch();
        }
        break;

      case "Escape":
        setShowSuggestions(false);
        setActiveIndex(-1);
        break;
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center bg-[#26303B] rounded-2xl h-12 sm:h-14 lg:h-[60px] px-3 sm:px-4 lg:px-6 w-full">
        <button onClick={handleSearch} disabled={isLocating} className="mr-2 sm:mr-3 lg:mr-4 text-[#99ABBD]">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm sm:text-base lg:text-lg" />
        </button>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setShowSuggestions(true)}
          disabled={isLocating}
          placeholder="Search for a city"
          className="w-full bg-transparent outline-none text-[#99ABBD] text-sm sm:text-base lg:text-[16px] placeholder:text-sm sm:placeholder:text-base lg:placeholder:text-[16px]"
        />

        <button
          onClick={handleLocationSearch}
          disabled={isLocating}
          className="ml-2 sm:ml-3 lg:ml-4 text-[#99ABBD] hover:text-white"
        >
          <FontAwesomeIcon
            icon={faLocationCrosshairs}
            className={`text-sm sm:text-base lg:text-lg ${isLocating ? "animate-pulse text-blue-400" : "cursor-pointer"}`}
          />
        </button>
      </div>

      {showSuggestions && (
        <div className="absolute top-14 sm:top-[70px] left-0 right-0 bg-[#26303B] rounded-2xl shadow-lg z-50 max-h-[250px] sm:max-h-[300px] overflow-y-auto">
          {isSearching && <div className="px-3 sm:px-4 py-2 sm:py-3 text-[#99ABBD] text-sm sm:text-base">Searching...</div>}
          {!isSearching && suggestions.length === 0 && (
            <div className="px-3 sm:px-4 py-2 sm:py-3 text-[#99ABBD] text-sm sm:text-base">No cities found</div>
          )}

          {!isSearching &&
            suggestions.map((suggestion, index) => (
              <div
                key={suggestion.id}
                onClick={() => handleSuggestionSelect(suggestion)}
                className={`px-3 sm:px-4 py-2 sm:py-3 cursor-pointer transition-colors ${
                  index === activeIndex
                    ? "bg-[#1C2129] text-white"
                    : "hover:bg-[#1C2129] text-[#99ABBD]"
                }`}
              >
                <div className="font-medium text-sm sm:text-base">{suggestion.name}</div>
                <div className="text-xs sm:text-sm text-[#6B7A8F]">
                  {suggestion.region}, {suggestion.country}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
