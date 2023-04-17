import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItineraryItem } from '../../models/itineraryItem.model';

const DAY_MS = 60 * 60 * 24 * 1000;
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  @Input() itineraryItems: ItineraryItem[] | undefined;
  @Output() selected = new EventEmitter<ItineraryItem[]>();
  dates: Array<Date>;
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  date = new Date();
  constructor() {
    this.dates = this.getCalendarDays(this.date) ?? [];
  }
  getCalendarDays(date = new Date()) {
    const range = this.getCalendarStartDay(date);
    if (!range) return;
    const calendarStartTime =
      range.getTime() + 60 * 60 * 2 * 1000; /* add 2 hours for day light saving time adjustment */

    return this.range(0, 41).map((num) => new Date(calendarStartTime + DAY_MS * num));
  }
  setMonth(inc: number) {
    const [year, month] = [this.date.getFullYear(), this.date.getMonth()];
    this.date = new Date(year, month + inc, 1);
    this.dates = this.getCalendarDays(this.date) ?? [];
  }

  isSameMonth(date: Date) {
    return date.getMonth() === this.date.getMonth();
  }
  isDateMatched(date: Date) {
    return this.getItineraryItemsForDate(date).length > 0;
  }
  getItineraryItemsForDate(date: Date) {
    if (!this.itineraryItems) return [];
    return this.itineraryItems.filter((item) => {
      const start = item.startDateTimeISOString?.toDate();
      const end = item.endDateTimeISOString?.toDate();

      return start && end && date >= start && date <= end;
    });
  }
  isCalendarDayMatched(date: Date) {
    if (!this.itineraryItems) return false;

    return this.itineraryItems.some((item) => {
      const startDate = item.startDateTimeISOString?.toDate();
      const endDate = item.endDateTimeISOString?.toDate();

      // check if the date matches either the start or end date, ignoring the time portion
      if (
        startDate &&
        startDate.getFullYear() === date.getFullYear() &&
        startDate.getMonth() === date.getMonth() &&
        startDate.getDate() === date.getDate()
      ) {
        return true;
      }

      if (
        endDate &&
        endDate.getFullYear() === date.getFullYear() &&
        endDate.getMonth() === date.getMonth() &&
        endDate.getDate() === date.getDate()
      ) {
        return true;
      }

      // check if the date falls between the start and end date, ignoring the time portion
      const startDay = startDate && new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
      const endDay = endDate && new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
      return startDay && endDay && date >= startDay && date <= endDay;
    });
  }

  private getCalendarStartDay(date = new Date()) {
    const [year, month] = [date.getFullYear(), date.getMonth()];
    const firstDayOfMonth = new Date(year, month, 1).getTime();

    return this.range(1, 7)
      .map((num) => new Date(firstDayOfMonth - DAY_MS * num))
      .find((dt) => dt.getDay() === 0);
  }

  private range(start: number, end: number, length: number = end - start + 1) {
    return Array.from({ length }, (_, i) => start + i);
  }
}
