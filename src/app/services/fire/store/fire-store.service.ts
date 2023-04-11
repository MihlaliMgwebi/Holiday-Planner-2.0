import { Injectable } from '@angular/core';
import {Trip} from "../../../models/trip.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {
  // MOCK. TODO: Convert mock to real deal in separate branch
  constructor(private http: HttpClient) {}

  // CRUD
  mockTripApiUrl = '/assets/trips.json';
  mockItineraryItemApiUrl = '/assets/itineraryItems.json';

  // CREATE
  createTrip(trip: Trip) :  Observable<Trip> {
    return this.http
      .post<Trip>(this.mockTripApiUrl, trip)
  }

  // READ
  getTrips() :  Observable<Trip[]> {
    return this.http
      .get<Trip[]>('/assets/trips.json')
  }


  // UPSERT
  upsertTrip(trip: Trip) :  Observable<Trip> {
    return this.http
      .put<Trip>(this.mockTripApiUrl, trip)
  }

  // DELETE
  deleteTrip(tripId: string){
    return this.http.delete(`${this.mockTripApiUrl}/${tripId}`)
  }
  deleteItineraryItem(itineraryItemId: string) {
    return this.http.delete(`${this.mockItineraryItemApiUrl}/${itineraryItemId}`)
  }

}
