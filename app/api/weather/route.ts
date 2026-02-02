import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.WEATHER_API_KEY;

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const days = searchParams.get("days");

    if (!city) {
      return NextResponse.json({ error: "City is required" }, { status: 400 });
    }
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&days=${days}&q=${city}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch from WeatherAPI");
    }
    const data = await res.json();

    return NextResponse.json(data);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message}, { status: 500 });
  }
}
