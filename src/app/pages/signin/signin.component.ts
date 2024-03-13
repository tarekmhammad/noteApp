import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  apiError: string = '';
  isLoading: boolean = false;

  constructor(
    private _AuthService: AuthService,
    private _Router: Router
  ) { }

  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{3,12}$/)])
  });


  signIn(form: FormGroup) {
    console.log(form);
    this.isLoading = true;
    this._AuthService.signIn(form.value).subscribe({
      next: (res) => {
        if (res.msg === 'done') {
          localStorage.setItem('token', `3b8ny__${res.token}`);
          this._AuthService.setUserToken();
          this._Router.navigate(['notes']);
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

