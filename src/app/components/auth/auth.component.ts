import { Component, OnInit } from '@angular/core';
import { SignInUser, SignInUserWithGoogle, SignOutUser, SignUpUser } from '../../stores/user/user.actions';
import { select, Store } from '@ngrx/store';
import { UserState } from '../../stores/user/user.reducer';
import { Observable, of } from 'rxjs';
import { selectIsLoggedIn } from '../../stores/user/user.selectors';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoggedIn$: Observable<boolean> = of(false);
  authForm: FormGroup = new FormGroup({});

  constructor(private userStore: Store<UserState>, private fb: UntypedFormBuilder) {}
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
