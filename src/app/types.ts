export interface CityServiceSearchResult {
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  country_code: string;
  timezone: string;
  population: number;
  country: string;
}

export interface CityServiceSearchResultExtension extends CityServiceSearchResult {
  flagIcon: string;
}

export type CityServiceSearchResultExtendedList = CityServiceSearchResultExtension[];

interface CityServiceDataResult {
  latitude: number;
  longitude: number;
  timezone: string;
  elevation: number;
  current_units: {
    time: string; // iso standard
    interval: string;
    temperature_2m: string;
  },
  current: {
    time: string;
    temperature_2m: number;
  },
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  }
}

type IgnoredCityServiceDataResult = "latitude" | "longitude" | "timezone" | "elevation";
export type MinimalCityServiceDataResult = Omit<CityServiceDataResult, IgnoredCityServiceDataResult>
