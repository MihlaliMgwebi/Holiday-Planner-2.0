import {Itinerary} from "./itinerary.model";

export interface Trip {
  _id: string | null,
  description: string | null,
  itinerary: Itinerary | null
  title: string | null,
  userId: string | null;
}
