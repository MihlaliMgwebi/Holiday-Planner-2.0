import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { SignInUser, SignInUserWithGoogle, SignUpUser } from '../../stores/user/user.actions';
import { UserState } from '../../stores/user/user.reducer';
import { selectIsLoggedIn } from '../../stores/user/user.selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoggedIn$: Observable<boolean> = of(false);
  authForm: FormGroup = new FormGroup({});

  constructor(private userStore: Store<UserState>, private fb: UntypedFormBuilder) { }
  ngOnInit(): void {
    this.isLoggedIn$ = this.userStore.pipe(select(selectIsLoggedIn));
    this.authForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  signUpNewUser() {
    if (this.authForm.valid) {
      const email = this.authForm.value.email;
      const password = this.authForm.value.password;
      this.userStore.dispatch(SignUpUser({ email, password }));
    } else {
      Object.values(this.authForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  signInExistingUser() {
    if (this.authForm.valid) {
      const email = this.authForm.value.email;
      const password = this.authForm.value.password;
      this.userStore.dispatch(SignInUser({ email, password }));
    } else {
      Object.values(this.authForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  signInExistingUserWithGoogle() {
    this.userStore.dispatch(SignInUserWithGoogle());
  }
}
