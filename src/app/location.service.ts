import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, switchMap, tap, throwError} from "rxjs";
import {NameOfLocation} from "./types";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private httpClient: HttpClient) { }

  private static readonly GEO_URL = (longitude: number, latitude: number) => {
    return `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
  };

  getLocation(): Observable<NameOfLocation> {
    console.log("getting location");

    if (!navigator.geolocation) {
      console.log("No support for geolocation");
      return throwError(() => new Error("No support for geolocation"));
    }

    console.log("navigator is available");

    return new Observable<GeolocationPosition>(observer => {
      navigator.geolocation.getCurrentPosition(
        position => {
          observer.next(position);
          observer.complete();
        },
        error => {
          console.error("Error getting geolocation:", error);
          observer.error(error);
        }
      );
    }).pipe(
      switchMap(position => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        console.log(longitude, latitude);

        return this.httpClient.get<NameOfLocation>(LocationService.GEO_URL(longitude, latitude))
          .pipe(
            tap(r => console.log(r)),
            catchError(error => {
              console.error("Error fetching location data:", error);
              return throwError(() => error);
            })
          );
      }),
      catchError(error => {
        console.error("Error in getLocation:", error);
        return throwError(() => error);
      })
    );
  }
}
