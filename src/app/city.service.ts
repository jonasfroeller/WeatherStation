import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CityServiceSearchResultExtendedList, CityServiceDataResult} from "./types";
import {map, Observable, tap} from "rxjs";

// @ts-ignore
import {countryCodeEmoji} from "country-code-emoji";

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(private httpClient: HttpClient) {
  }

  private static readonly SEARCH_URL = (cityName: string, amountToShow: number = 5) => {
    return `https://geocoding-api.open-meteo.com/v1/search?language=en&format=json&name=${cityName}&count=${amountToShow}`;
  };

  private static readonly DATA_URL = (cityLongitude: number, cityLatitude: number, timeZone: string = "auto") => {
    return `https://api.open-meteo.com/v1/forecast?current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=${timeZone}&latitude=${cityLatitude}&longitude=${cityLongitude}`;
  };

  getCityIcons(country_code: string): string {
    return countryCodeEmoji(country_code);
  }

  getCitiesHavingName(cityName: string): Observable<CityServiceSearchResultExtendedList> {
    console.log("getCitiesHavingName()");

    // @ts-ignore
    return this.httpClient.get<{ results: CityServiceSearchResultExtendedList }>(CityService.SEARCH_URL(cityName))
      .pipe(tap(r => {
        console.log(r)
      }))
      .pipe((map(cities => {
          return cities.results.map(city => ({
            ...city,
            flagIcon: this.getCityIcons(city.country_code)
          }));
        }
      )) ?? []);
  }

  getDataOfCityByLatitudeAndLongitude(cityLongitude: number, cityLatitude: number): Observable<CityServiceDataResult> {
    console.log("getDataOfCityByLatitudeAndLongitude()");

    return this.httpClient.get<CityServiceDataResult>(CityService.DATA_URL(cityLongitude, cityLatitude))
      .pipe(tap(r => {
        console.log(r)
      }));
  }
}
