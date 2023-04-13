import {ItineraryItem} from "./itineraryItem.model";
import {Trip} from "./trip.model";
export interface CorrelatedData {
  trip: Trip,
  itineraryItems: ItineraryItem[]
}
