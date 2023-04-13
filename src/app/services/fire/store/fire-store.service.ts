import { Injectable } from '@angular/core';
import {Trip} from "../../../models/trip.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ItineraryItem} from "../../../models/itineraryItem.model";

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {
  constructor(private http: HttpClient) {}

  // CRUD
  mockTripApiUrl = '/assets/trips.json';
  mockItineraryItemApiUrl = '/assets/itineraryItems.json';

  // CREATE
  createTrip(trip: Trip) :  Observable<Trip> {
    return this.http
      .post<Trip>(this.mockTripApiUrl, trip)
  }
  createItineraryItem(itineraryItem: ItineraryItem) :  Observable<ItineraryItem> {
    return this.http
      .post<ItineraryItem>(this.mockItineraryItemApiUrl, itineraryItem)
  }
  // READ
  getTrips() :  Observable<Trip[]> {
    return this.http
      .get<Trip[]>('/assets/trips.json')
  }

  getAllItineraryItems() :  Observable<ItineraryItem[]> {
    console.log('itineraryItems')
    return this.http
      .get<ItineraryItem[]>('/assets/itineraryItems.json')
  }

  // UPSERT
  upsertTrip(trip: Trip) :  Observable<Trip> {
    return this.http
      .put<Trip>(this.mockTripApiUrl, trip)
  }
  upsertItineraryItem(itineraryItem: ItineraryItem) :  Observable<ItineraryItem> {
    return this.http
      .put<ItineraryItem>(this.mockItineraryItemApiUrl, itineraryItem)
  }

  // DELETE
  deleteTrip(tripId: string){
    return this.http.delete(`${this.mockTripApiUrl}/${tripId}`)
  }
  deleteItineraryItem(itineraryItemId: string) {
    return this.http.delete(`${this.mockItineraryItemApiUrl}/${itineraryItemId}`)
  }

}
