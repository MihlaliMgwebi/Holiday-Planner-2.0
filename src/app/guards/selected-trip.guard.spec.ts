import { TestBed } from '@angular/core/testing';

import { SelectedTripGuard } from './selected-trip.guard';

describe('SelectedTripGuard', () => {
  let guard: SelectedTripGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SelectedTripGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
