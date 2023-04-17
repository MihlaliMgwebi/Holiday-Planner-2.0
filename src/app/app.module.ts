import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import * as fromUser from './store/reducers/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user.effects';
import { AuthComponent } from './components/auth/auth.component';
import * as fromTrip from './store/reducers/trip.reducer';
import { TripEffects } from './store/effects/trip.effects';
import * as fromItineraryItem from './store/reducers/itinerary-item.reducer';
import { ItineraryItemEffects } from './store/effects/itinerary-item.effects';
import * as fromCurrency from './store/reducers/currency.reducer';
import { CurrencyEffects } from './store/effects/currency.effects';
import { HttpClientModule } from '@angular/common/http';
import { TripComponent } from './components/trip/trip.component';
import { TripCreateComponent } from './components/trip-create/trip-create.component';
import { TripUpsertComponent } from './components/trip-upsert/trip-upsert.component';
import { ItineraryComponent } from './components/itinerary/itinerary.component';
import { ItineraryItemComponent } from './components/itinerary-item/itinerary-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItineraryItemCreateComponent } from './components/itinerary-item-create/itinerary-item-create.component';
import { ItineraryItemUpsertComponent } from './components/itinerary-item-upsert/itinerary-item-upsert.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { AppRoutingModule } from './app-routing.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { uk_UA, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import en from '@angular/common/locales/en';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { ItineraryItemListComponent } from './components/itinerary-item-list/itinerary-item-list.component';

registerLocaleData(en);

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log(action.type, action);
    console.log('current state', state);
    console.log('future value of state', reducer(state, action));

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = !environment.production ? [debug] : [];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TripComponent,
    TripCreateComponent,
    TripUpsertComponent,
    ItineraryComponent,
    ItineraryItemComponent,
    ItineraryItemCreateComponent,
    ItineraryItemUpsertComponent,
    CurrencyComponent,
    NavBarComponent,
    PageNotFoundComponent,
    CalendarComponent,
    TripComponent,
    TripListComponent,
    ItineraryItemListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Firestore
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    // NgRx
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),

    StoreModule.forFeature(fromCurrency.currencyFeatureKey, fromCurrency.reducer),
    StoreModule.forFeature(fromItineraryItem.itineraryItemFeatureKey, fromItineraryItem.reducer),
    StoreModule.forFeature(fromTrip.tripFeatureKey, fromTrip.reducer),
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    StoreModule.forRoot({}, { metaReducers }),

    EffectsModule.forFeature([UserEffects, TripEffects, ItineraryItemEffects, CurrencyEffects]),
    EffectsModule.forRoot(),

    // NgZorro and Forms
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    HttpClientModule,
    NzInputNumberModule,
    NzSpaceModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
