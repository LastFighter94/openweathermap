export interface WeatherData {
  cod: number;
  name: string;
  sys: { country: string };
  coord: { lon: number; lat: number };
  main: { temp: number; pressure: number; humidity: number };
  weather: { main: string; description: string }[];
}

export type WeatherStore = Record<string, WeatherData | null>;

export type Coords = {
  lat: number;
  lon: number;
};
