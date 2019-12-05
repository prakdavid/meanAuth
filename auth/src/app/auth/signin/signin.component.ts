import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  public error: string;


  constructor(
    private fb: FormBuilder,
    private router: Router, 
    private authService: AuthService) { }

  ngOnInit() {
    this.form = this.fb.group(
      {
        email: ['', Validators.email],
        password: ['', Validators.minLength(5)]
      }
    );
  }

  signin(): void {
    this.authService.signin(this.form.value).subscribe( () => {
      this.router.navigate(['/']);
    }, err => {
      this.error = err;
    })
  }
}
