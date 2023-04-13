import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from "./components/auth/auth.component";
import {TripComponent} from "./components/trip/trip.component";
import {ItineraryComponent} from "./components/itinerary/itinerary.component";
import {TripCreateComponent} from "./components/trip-create/trip-create.component";
import {TripUpsertComponent} from "./components/trip-upsert/trip-upsert.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {NavBarComponent} from "./components/nav-bar/nav-bar.component"; // CLI imports router

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'login' },

  { path: 'login', component: AuthComponent },
  { path: 'logout', component: AuthComponent },

  {
    path: 'user',
    component: NavBarComponent, // this is the component with the <router-outlet> in the template
    children: [
      { path: 'trips', component: TripComponent },
      { path: 'trip/create', component: TripCreateComponent},
      { path: 'trip/edit', component: TripUpsertComponent},

      { path: 'itineraries', component: ItineraryComponent},
      { path: 'itinerary/create', component: TripCreateComponent},
      { path: 'itinerary/edit', component: TripUpsertComponent},
    ],
  },

  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
