import { inject, Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { combineLatestWith, Observable } from 'rxjs';
import { TripState } from '../stores/trip/trip.reducer';
import { select, Store } from '@ngrx/store';
import { selectCorrelatedTrips } from '../stores/trip/trip.selectors';
import { map } from 'rxjs/operators';
import { UserState } from '../stores/user/user.reducer';
import { selectLoggedInUser } from '../stores/user/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class SelectedTripGuard implements CanActivate {
  tripStore = inject(Store<TripState>);
  userStore = inject(Store<UserState>);
  router = inject(Router);
  route = inject(ActivatedRoute);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const loggedInUser = this.userStore.pipe(select(selectLoggedInUser));
    const correlatedTrips = this.tripStore.pipe(select(selectCorrelatedTrips));

    return loggedInUser.pipe(
      combineLatestWith(correlatedTrips),
      map(([user, correlatedData]) =>
        !!correlatedData.find((correlatedData) => !!correlatedData?.trip?._id)
          ? true
          : this.router.createUrlTree(['/users/OPUZG9snX0TVHMeyqCOA2UtedSx1/trips'])
      )
    );
  }
}
