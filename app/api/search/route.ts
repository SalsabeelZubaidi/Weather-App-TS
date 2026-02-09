import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.GEOAPIFY_API_KEY;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url); //parse the URL and extract query parameters.
    const query = searchParams.get("q");

    if (!query || query.trim().length < 2) { //if the query is empty or less than 2 return empty suggestions
      return NextResponse.json({ suggestions: [] });
    }

    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent( ////It converts input string into a format that is safe to use inside a URL.
        query
      )}&limit=20&lang=en&apiKey=${API_KEY}`
    );

    if (!res.ok) {
      throw new Error("Geoapify request failed");
    }

    const data = await res.json();

    const suggestions = data.features
      .filter((f: any) =>
        [
          "city",
          "capital",
          "municipality",
          "locality",
          "administrative",
          "county",
        ].includes(f.properties.result_type)
      )
      .map((f: any) => ({
        id: f.properties.place_id,
        name: f.properties.city || f.properties.name,
        region: f.properties.state || "",
        country: f.properties.country,
        importance: f.properties.rank?.importance ?? 0,
      }))
      //Remove duplicates
      .filter(
        (city: any, index: number, self: any[]) =>
          index ===
          self.findIndex(
            (c) =>
              c.name === city.name &&
              c.country === city.country
          )
      )
      .sort((a: any, b: any) => b.importance - a.importance) //Sort by importance based on Geoapify score// 0 by default
      .slice(0, 6); //only return top 6 suggestions

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Geoapify search error:", error);
    return NextResponse.json({ suggestions: [] }, { status: 500 });
  }
}
