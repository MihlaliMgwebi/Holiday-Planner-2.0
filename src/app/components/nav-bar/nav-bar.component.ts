import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignOutUser } from '../../store/actions/user.actions';
import { Store } from '@ngrx/store';
import { UserState } from '../../store/reducers/user.reducer';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  constructor(private route: ActivatedRoute, private router: Router, private userStore: Store<UserState>) {}

  back(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  signOut() {
    this.userStore.dispatch(SignOutUser());
  }
}
