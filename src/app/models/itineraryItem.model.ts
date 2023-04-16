import { Timestamp } from 'firebase/firestore';

export interface ItineraryItem {
  _id: string | null;
  costEstimate: string | null;
  currency: string | null;
  description: string | null;
  endDateTimeISOString: Timestamp | null;
  itineraryId: string | null;
  notes: string | null;
  startDateTimeISOString: Timestamp | null;
  tag: string | null;
  title: string | null;
}
