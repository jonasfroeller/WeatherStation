import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CitySearchComponent} from "./city-search/city-search.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CitySearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WeatherStation';
}
