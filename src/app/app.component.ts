import { Component, OnInit } from '@angular/core';
import { UserState } from './store/reducers/user.reducer';
import { User } from './models/user.model';
import { Store } from '@ngrx/store';
import * as UserActions from './store/actions/user.actions';

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
