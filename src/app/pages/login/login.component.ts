import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    PrimaryButtonComponent,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loading = signal<boolean>(false);
  userNameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  handleSubmit = async () => {
    if (this.userNameFormControl.errors && this.passwordFormControl.errors) {
      return;
    }
    this.loading.set(true);
    try {
      let myHeaders = new Headers();
      myHeaders.set('Content-Type', 'application/json');
      const loginRes = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          username: this.userNameFormControl.value,
          password: this.passwordFormControl.value,
        }),
      });
      const loginData = await loginRes.json();
      console.log(loginData);
      this.openSnackBar('Welcome Back!!', '');
    } catch (error) {
      this.openSnackBar('Error Occurs', '');
    } finally {
      this.loading.set(false);
    }
  };
}
