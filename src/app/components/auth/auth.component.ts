import {Component, OnInit} from '@angular/core';
import {SignInUser, SignInUserWithGoogle, SignOutUser, SignUpUser} from "../../store/actions/user.actions";
import {select, Store} from "@ngrx/store";
import {UserState} from "../../store/reducers/user.reducer";
import {Observable, of} from "rxjs";
import {selectIsLoggedIn} from "../../store/selectors/user.selectors";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  isLoggedIn$: Observable<boolean> = of(false)
  constructor(private userStore: Store<UserState>) {
  }
  ngOnInit(): void {
    this.isLoggedIn$ = this.userStore.pipe(select(selectIsLoggedIn))
  }

  signUpNewUser(email: string, password: string){
    this.userStore.dispatch(SignUpUser({email, password}))
  }

  signInExistingUser(email: string, password: string){
    this.userStore.dispatch(SignInUser({email, password}))
  }

  signInExistingUserWithGoogle(){
    this.userStore.dispatch(SignInUserWithGoogle())
  }

  signOut(){
    this.userStore.dispatch(SignOutUser())
  }
}
