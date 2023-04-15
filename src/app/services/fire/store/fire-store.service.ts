import { inject, Injectable } from '@angular/core';
import { Trip } from '../../../models/trip.model';
import { EMPTY, from, Observable, throwError } from 'rxjs';
import { ItineraryItem } from '../../../models/itineraryItem.model';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, setDoc } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FireStoreService {
  private db: Firestore = inject(Firestore);
  constructor() {}

  // CRUD: https://softauthor.com/firebase-firestore-add-document-data-using-setdoc/

  // CREATE
  createTrip(trip: Trip): Observable<Trip> {
    const dbRef = collection(this.db, 'trips');
    addDoc(dbRef, trip)
      .then()
      .catch((error) => {
        throwError(() => {
          error.timestamp = Date.now();
          return error;
        });
      });
    return EMPTY;
  }
  createItineraryItem(itineraryItem: ItineraryItem): Observable<ItineraryItem> {
    const dbRef = collection(this.db, 'itineraryItems');
    addDoc(dbRef, itineraryItem)
      .then()
      .catch((error) => {
        throwError(() => {
          error.timestamp = Date.now();
          return error;
        });
      });
    return EMPTY;
  }

  // READ
  getTrips(): Observable<Trip[]> {
    return from(this.getTripsAsync()).pipe(map((trips) => trips));
  }

  async getTripsAsync() {
    const trips: Trip[] = [];
    const querySnapshot = await getDocs(collection(this.db, 'trips'));
    querySnapshot.forEach((doc) => {
      const tripFromDB = doc.data() as Trip;
      trips.push({ ...tripFromDB, _id: doc.id });
    });
    return trips;
  }

  getAllItineraryItems(): Observable<ItineraryItem[]> {
    return from(this.getAllItineraryItemsAsync()).pipe(map((itineraryItems) => itineraryItems));
  }
  async getAllItineraryItemsAsync() {
    const itineraryItems: ItineraryItem[] = [];
    const querySnapshot = await getDocs(collection(this.db, 'itineraryItems'));
    querySnapshot.forEach((doc) => {
      const itineraryItemFromDB = doc.data() as ItineraryItem;
      itineraryItems.push({ ...itineraryItemFromDB, _id: doc.id });
    });
    return itineraryItems;
  }

  // UPSERT
  upsertTrip(trip: Trip): Observable<Trip> {
    if (!trip._id) return EMPTY;
    const docRef = doc(this.db, 'trips', trip._id);

    setDoc(docRef, trip)
      .then()
      .catch((error) => {
        throwError(() => {
          error.timestamp = Date.now();
          return error;
        });
      });
    return EMPTY;
  }
  upsertItineraryItem(itineraryItem: ItineraryItem): Observable<ItineraryItem> {
    if (!itineraryItem._id) return EMPTY;
    const docRef = doc(this.db, 'itineraryItems', itineraryItem._id);

    setDoc(docRef, itineraryItem)
      .then()
      .catch((error) => {
        throwError(() => {
          error.timestamp = Date.now();
          return error;
        });
      });
    return EMPTY;
  }

  // DELETE
  deleteTrip(tripId: string) {
    const docRef = doc(this.db, 'trips', tripId);

    deleteDoc(docRef)
      .then(() => {
        console.log('Entire Document has been deleted successfully.');
      })
      .catch((error) => {
        throwError(() => {
          error.timestamp = Date.now();
          return error;
        });
      });
    return EMPTY;
  }
  deleteItineraryItem(itineraryItemId: string) {
    const docRef = doc(this.db, 'itineraryItems', itineraryItemId);

    deleteDoc(docRef)
      .then(() => {
        console.log('Entire Document has been deleted successfully.');
      })
      .catch((error) => {
        throwError(() => {
          error.timestamp = Date.now();
          return error;
        });
      });
    return EMPTY;
  }
}
