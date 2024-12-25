import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';
import { ErrorStateMatcher } from '@angular/material/core';
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
  selector: 'app-register',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    PrimaryButtonComponent,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  loading = signal<boolean>(false);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  userNameFormControl = new FormControl('', [Validators.required]);
  firstNameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('', [Validators.required]);
  phoneFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  handleSubmit = async () => {
    this.loading.set(true);
    try {
      const registerRes = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        body: JSON.stringify({
          email: this.emailFormControl.value,
          username: this.userNameFormControl.value,
          password: this.passwordFormControl.value,
          name: {
            firstname: this.firstNameFormControl.value,
            lastname: this.lastNameFormControl.value,
          },
          address: {
            city: 'cairo',
            street: '7f el-fardoos',
            number: 3,
            zipcode: '0000-0000',
            geolocation: {
              lat: '-37.3159',
              long: '81.1496',
            },
          },
          phone: this.phoneFormControl.value,
        }),
      });
      const registerData = await registerRes.json();
      console.log(registerData);
      this.openSnackBar('Account is Created!!', '');
    } catch (error) {
      console.log('Login Error :', error);
    } finally {
      this.loading.set(false);
    }
  };
}
