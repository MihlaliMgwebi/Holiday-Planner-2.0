import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { ItineraryItemCreateComponent } from './components/itinerary-item-create/itinerary-item-create.component';
import { ItineraryItemListComponent } from './components/itinerary-item-list/itinerary-item-list.component';
import { ItineraryItemUpsertComponent } from './components/itinerary-item-upsert/itinerary-item-upsert.component';
import { ItineraryItemComponent } from './components/itinerary-item/itinerary-item.component';
import { ItineraryComponent } from './components/itinerary/itinerary.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TripCreateComponent } from './components/trip-create/trip-create.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { TripUpsertComponent } from './components/trip-upsert/trip-upsert.component';
import { TripComponent } from './components/trip/trip.component';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { CurrencyEffects } from './stores/currency/currency.effects';
import * as fromCurrency from './stores/currency/currency.reducer';
import { ItineraryItemEffects } from './stores/itinerary-item/itinerary-item.effects';
import * as fromItineraryItem from './stores/itinerary-item/itinerary-item.reducer';
import { TripEffects } from './stores/trip/trip.effects';
import * as fromTrip from './stores/trip/trip.reducer';
import { UserEffects } from './stores/user/user.effects';
import * as fromUser from './stores/user/user.reducer';
registerLocaleData(en);

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

    StoreModule.forFeature(fromCurrency.currencyFeatureKey, fromCurrency.reducer),
    StoreModule.forFeature(fromItineraryItem.itineraryItemFeatureKey, fromItineraryItem.reducer),
    StoreModule.forFeature(fromTrip.tripFeatureKey, fromTrip.reducer),
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    StoreModule.forRoot({}),

    EffectsModule.forFeature([UserEffects, TripEffects, ItineraryItemEffects, CurrencyEffects]),
    EffectsModule.forRoot(),

    StoreDevtoolsModule.instrument({
      maxAge: 40, // Retains last 25 states
      logOnly: !environment.production, // Restrict extension to log-only mode
    }),
    // NgZorro and Forms
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    HttpClientModule,
    NzInputNumberModule,
    NzSpaceModule,
    NzIconModule,
    NzSpinModule,
    NzNotificationModule,
    NzPopconfirmModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
