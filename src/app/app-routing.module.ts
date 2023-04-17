import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { TripComponent } from './components/trip/trip.component';
import { TripCreateComponent } from './components/trip-create/trip-create.component';
import { TripUpsertComponent } from './components/trip-upsert/trip-upsert.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ItineraryItemUpsertComponent } from './components/itinerary-item-upsert/itinerary-item-upsert.component';
import { ItineraryItemCreateComponent } from './components/itinerary-item-create/itinerary-item-create.component';
import { ItineraryItemComponent } from './components/itinerary-item/itinerary-item.component';
import { TripListComponent } from './components/trip-list/trip-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  {
    path: 'login',
    title: 'Log In',
    component: AuthComponent,
  },
  {
    path: 'logout',
    title: 'Log Out',
    component: AuthComponent,
  },
  {
    path: 'users/:userId',
    component: NavBarComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: 'trips',
        title: 'All Your Trips',
        component: TripListComponent,
      },
      {
        path: 'trips/add',
        title: 'Add a Trip',
        component: TripCreateComponent,
      },
      {
        path: 'trips/:tripId',
        title: 'All Your Trips',
        component: TripComponent,
      },
      {
        path: 'trips/:tripId/edit',
        title: 'Edit a Trip',
        component: TripUpsertComponent,
      },
      {
        path: 'trips/:tripId/itinerary-items',
        title: 'All Your Itineraries',
        component: ItineraryItemComponent,
      },
      {
        path: 'trips/:tripId/itinerary-items/add',
        title: 'Add an Itinerary Item',
        component: ItineraryItemCreateComponent,
      },
      {
        path: 'trips/:tripId/itinerary-items/:itineraryItemId/edit',
        title: 'Edit an Itinerary Item',
        component: ItineraryItemUpsertComponent,
      },
    ],
  },

  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
