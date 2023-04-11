import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CorrelatedData} from "../../models/correlatedData.model";

@Component({
  selector: 'app-itinerary-item',
  templateUrl: './itinerary-item.component.html',
  styleUrls: ['./itinerary-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItineraryItemComponent {
  @Input() selectedCorrelatedTrip: CorrelatedData | undefined;
}
