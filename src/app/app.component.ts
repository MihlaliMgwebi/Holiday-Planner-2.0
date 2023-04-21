import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from './models/user.model';
import * as UserActions from './stores/user/user.actions';
import { UserState } from './stores/user/user.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private userStore: Store<UserState>) {}

  ngOnInit() {
    const loggedInUser: User = JSON.parse(localStorage.getItem('user') || '{}');

    if (loggedInUser) {
      this.userStore.dispatch(UserActions.setLoggedInUserOnBrowserReload({ loggedInUser }));
    }
  }
}
