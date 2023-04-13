import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CorrelatedData} from "../../models/correlatedData.model";

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItineraryComponent {
  @Input() correlatedTrips: CorrelatedData[] = [];
}
