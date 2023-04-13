import {Component, OnInit} from '@angular/core';
import {SignInUser, SignInUserWithGoogle, SignOutUser, SignUpUser} from "../../store/actions/user.actions";
import {select, Store} from "@ngrx/store";
import {UserState} from "../../store/reducers/user.reducer";
import {Observable, of} from "rxjs";
import {selectIsLoggedIn} from "../../store/selectors/user.selectors";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  isLoggedIn$: Observable<boolean> = of(false)
  constructor(
    private userStore: Store<UserState>,
    private route: ActivatedRoute,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.isLoggedIn$ = this.userStore.pipe(select(selectIsLoggedIn))
  }

  signUpNewUser(email: string, password: string){
    this.userStore.dispatch(SignUpUser({email, password}))
  }

  signInExistingUser(email: string, password: string){
    this.userStore.dispatch(SignInUser({email, password}))
    this.goToTrips()
  }

  signInExistingUserWithGoogle(){
    this.userStore.dispatch(SignInUserWithGoogle())
    this.goToTrips()
  }

  signOut(){
    this.userStore.dispatch(SignOutUser())
    if (!localStorage.getItem('user')) this.goToLogin()
  }

  goToTrips() { //TODO: What if on login fails, maybe add in effects?
    this.router.navigate(['../user/trips'], { relativeTo: this.route });
  }

  goToLogin() { //TODO: What if on any page?
    this.router.navigate(['../login'], { relativeTo: this.route });
  }
}
