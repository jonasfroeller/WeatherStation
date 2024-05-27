import {Component, OnDestroy, OnInit} from '@angular/core';
import {CityService} from "../city.service";
import {
  CityServiceSearchResultExtendedList,
  CityServiceSearchResultExtension,
  MinimalCityServiceDataResult
} from "../types";

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
  searchPushed: boolean = false;
  citiesFound: CityServiceSearchResultExtendedList = [];
  selectedCityIndex: number = 0;
  selectedCity: CityServiceSearchResultExtension | null = null;
  displayedCity: MinimalCityServiceDataResult | null = null;

  constructor(private cityService: CityService) {
  }

  onSearch() {
    console.log("searching with keyword:", this.cityName);

    this.searchPushed = true;
    this.cityService.getCitiesHavingName(this.cityName).subscribe(
      cities => {
        // const cities = "results" in result ? result.results: [];
        // this.citiesFound = Array.isArray(cities) && cities.length > 0 ? cities : [];
        this.citiesFound = cities;

        console.log(this.citiesFound);
      }
    )
  }

  onSelect(index: number) {
    console.log("selected city:", index);

    this.searchPushed = false;
    this.selectedCityIndex = index;
    this.selectedCity = this.citiesFound[Number(this.selectedCityIndex)];

    this.cityService.getDataOfCityByLatitudeAndLongitude(this.selectedCity?.longitude as number, this.selectedCity?.latitude as number).subscribe(
      city => {
        this.displayedCity = city;
        console.log("displayed city:", this.displayedCity);
      }
    )
  }

  ngOnDestroy(): void {
    console.log('CityService ngOnDestroy()');
  }

  ngOnInit(): void { // TODO: get data of city, that the user is located in
    console.log('CityService ngOnInit()');
  }
}
