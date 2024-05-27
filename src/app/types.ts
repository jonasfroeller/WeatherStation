export interface CityServiceSearchResult {
  name: string;
  latitude: number;
  longitude: number;
  country_code: string;
  timezone: string;
  population: number;
  country: string;
}

export interface CityServiceSearchResultExtension extends CityServiceSearchResult {
  flagIcon: string;
}

export type CityServiceSearchResultExtendedList = CityServiceSearchResultExtension[];

export interface CityServiceDataResult {
  elevation: number;
  current_units: {
    time: string; // iso standard
    interval: string;
    temperature_2m: string;
  } | null,
  current: {
    time: string;
    temperature_2m: number;
  } | null,
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  } | null
}

export interface TotalCityInformation extends CityServiceSearchResultExtension, CityServiceDataResult {};
