import {Component, OnDestroy, OnInit} from '@angular/core';
import {CityService} from "../city.service";
import {CityServiceSearchResultExtendedList, TotalCityInformation} from "../types";

import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {FlagDisplayComponent} from "../flag-display/flag-display.component";

@Component({
  selector: 'app-city-search',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    FlagDisplayComponent
  ],
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.css'
})
export class CitySearchComponent implements OnInit, OnDestroy {
  cityName: string = "Linz";
  searchTriggered: boolean = false;
  searchHidden: boolean = false;
  citiesFound: CityServiceSearchResultExtendedList = [];

  selectedCities: Map<number, {
    visible: boolean,
    data: TotalCityInformation
  }> = new Map();
  protected readonly JSON = JSON;

  constructor(private cityService: CityService) {
  }

  onClear() {
    this.cityName = "";
    this.searchHidden = true;
    this.citiesFound = []
  }

  onSearch() {
    console.log("searching with keyword:", this.cityName);

    this.searchTriggered = true;
    this.searchHidden = false;
    this.cityService.getCitiesHavingName(this.cityName).subscribe(
      cities => {
        // const cities = "results" in result ? result.results: [];
        // this.citiesFound = Array.isArray(cities) && cities.length > 0 ? cities : [];
        this.citiesFound = cities;

        for (let i = 0; i < this.citiesFound.length; i++) {
          this.selectedCities.set(i, {
            visible: false,
            data: {
              ...this.citiesFound[i],
              elevation: -1,
              current_units: null,
              current: null,
              daily: null
            }
          });
        }

        console.log(this.citiesFound);
      }
    )
  }

  onUnselect(index: number) {
    console.log("unselecting city:", index);

    this.selectedCities.set(index, {
      visible: false,
      data: {
        elevation: -1,
        current_units: null,
        current: null,
        daily: null,
        ...this.citiesFound[index]
      }
    });
  }

  onSelect(index: number) {
    console.log("selected city:", index);

    this.searchTriggered = false;

    const selectedCity = this.selectedCities.get(index);
    if (selectedCity) {
      this.cityService.getDataOfCityByLatitudeAndLongitude(selectedCity.data.longitude, selectedCity.data.latitude).subscribe(
        city => {
          const mutatedCityTemperature = (city.daily?.time.map(
            (time: string, index: number) => ({
              time: time,
              temperature_2m_max: city.daily?.temperature_2m_max[index] ?? -1,
              temperature_2m_min: city.daily?.temperature_2m_min[index] ?? -1,
            })
          ) ?? [])

          this.selectedCities.set(index, {
            visible: true, data: {
              ...this.citiesFound[index],
              daily: mutatedCityTemperature,
              elevation: city.elevation,
              current_units: city.current_units,
              current: city.current
            }
          });
        }
      )
    }
  }

  ngOnDestroy(): void {
    console.log('CityService ngOnDestroy()');
  }

  ngOnInit(): void { // TODO: get data of city, that the user is located in
    console.log('CityService ngOnInit()');
  }
}
