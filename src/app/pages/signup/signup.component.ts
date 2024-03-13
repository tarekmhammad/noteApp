import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  apiError: string = '';
  isLoading: boolean = false;

  constructor(
    private _AuthService: AuthService,
    private _Router: Router
  ) { }

  signUpForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{3,12}$/)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    age: new FormControl('', [Validators.required])
  });


  signUp(form: FormGroup) {
    console.log(form);
    this.isLoading = true;
    this._AuthService.signUp(form.value).subscribe({
      next: (res) => {
        if (res.msg === 'done') {
          this._Router.navigate(['signin']);
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.apiError = err.error.msg;
        this.isLoading = false;
      }
    });

  }
}
