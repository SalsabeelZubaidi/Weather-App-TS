"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  onCitySelect: (city: string) => void;
}

export default function SearchBar({ onCitySelect }: SearchBarProps) {
  const [query, setQuery] = useState<string>(""); //user input from search bar

  //Amman is diapleyed by default
//   useEffect(() => {
//     onCitySelect("Amman");
//   }, []);

  const handleSearch = (): void => {
    if (!query.trim()) return;
    onCitySelect(query.trim());
    setQuery("");
  };
  

  return (
    <div className="flex items-center bg-[#26303B] rounded-2xl h-[60px] sm:h-[72px] px-4 sm:px-8 w-full">
      <button className="cursor-pointer" onClick={handleSearch}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="mr-3 sm:mr-5 text-[#99ABBD] text-lg sm:text-xl"
        />
      </button>
      <input
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSearch()}
        className="text-[16px] sm:text-[19px] text-[#99ABBD] w-full p-3 rounded-2xl"
        placeholder="Search for a city"
      />
    </div>
  );
}
