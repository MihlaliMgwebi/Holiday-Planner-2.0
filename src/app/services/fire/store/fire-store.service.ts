import { inject, Injectable } from "@angular/core";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	Firestore,
	getDoc,
	getDocs,
	setDoc,
} from "@angular/fire/firestore";
import { EMPTY, from, Observable, of, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { ItineraryItem } from "../../../models/itineraryItem.model";
import { Trip } from "../../../models/trip.model";

@Injectable({
  providedIn: 'root',
})
export class FireStoreService {
	private db: Firestore = inject(Firestore);
	constructor() {}

	// CRUD: https://softauthor.com/firebase-firestore-add-document-data-using-setdoc/

	// CREATE
	createTrip(trip: Trip): Observable<Trip> {
		const dbRef = collection(this.db, "trips");
		const { _id, ...tripWthoutId } = trip;
		addDoc(dbRef, tripWthoutId)
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
		const dbRef = collection(this.db, "itineraryItems");
		const { _id, ...itemWithoutId } = itineraryItem;
		addDoc(dbRef, itemWithoutId)
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
		const querySnapshot = await getDocs(collection(this.db, "trips"));
		querySnapshot.forEach((doc) => {
			const tripFromDB = doc.data() as Trip;
			trips.push({ ...tripFromDB, _id: doc.id });
		});
		return trips;
	}

	getAllItineraryItems(): Observable<ItineraryItem[]> {
		return from(this.getAllItineraryItemsAsync()).pipe(
			map((itineraryItems) => itineraryItems),
		);
	}
	async getAllItineraryItemsAsync() {
		const itineraryItems: ItineraryItem[] = [];
		const querySnapshot = await getDocs(collection(this.db, "itineraryItems"));
		querySnapshot.forEach((doc) => {
			const itineraryItemFromDB = doc.data() as ItineraryItem;
			itineraryItems.push({ ...itineraryItemFromDB, _id: doc.id });
		});
		return itineraryItems;
	}

	getItineraryItemById(itineraryItemId: string): Observable<ItineraryItem> {
		return from(this.getItineraryItemAsync(itineraryItemId));
	}

	async getItineraryItemAsync(itineraryItemId: string) {
		const docRef = doc(this.db, "itineraryItems", itineraryItemId);
		try {
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const itineraryItemFromDB = docSnap.data() as ItineraryItem;
				return { ...itineraryItemFromDB, _id: docRef.id } as ItineraryItem;
			} else {
				throwError(() => {
					return new Error("Itinerary Item does not exist");
				});
				return {} as ItineraryItem;
			}
		} catch (error) {
			throwError(() => {
				return error;
			});
			return {} as ItineraryItem;
		}
	}

	// UPSERT
	upsertTrip(trip: Trip): Observable<Trip> {
		if (!trip._id) return EMPTY;
		const docRef = doc(this.db, "trips", trip._id);

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
		const docRef = doc(this.db, "itineraryItems", itineraryItem._id);
		const { _id, ...itineraryItemWithoutId } = itineraryItem;
		setDoc(docRef, itineraryItemWithoutId).catch((error) => {
			throwError(() => {
				error.timestamp = Date.now();
				return error;
			});
		});
		return of(itineraryItem);
	}

	// DELETE
	deleteTrip(tripId: string) {
		const docRef = doc(this.db, "trips", tripId);

		deleteDoc(docRef)
			.then(() => {})
			.catch((error) => {
				throwError(() => {
					error.timestamp = Date.now();
					return error;
				});
			});
		return EMPTY;
	}
	deleteItineraryItem(itineraryItemId: string) {
		const docRef = doc(this.db, "itineraryItems", itineraryItemId);

		deleteDoc(docRef)
			.then(() => {})
			.catch((error) => {
				throwError(() => {
					error.timestamp = Date.now();
					return error;
				});
			});
		return EMPTY;
	}
}
