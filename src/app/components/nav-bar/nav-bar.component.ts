import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.model';
import { SignOutUser } from '../../stores/user/user.actions';
import { UserState } from '../../stores/user/user.reducer';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  constructor(private route: ActivatedRoute, private router: Router, private userStore: Store<UserState>) {}

  back(): void {
    const loggedInUser: User = JSON.parse(localStorage.getItem('user') || '{}');
    this.router.navigate([`/users/${loggedInUser.uid}/trips`], { relativeTo: this.route });
  }

  signOut() {
    this.userStore.dispatch(SignOutUser());
  }
}
