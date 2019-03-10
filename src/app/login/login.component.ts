import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {AppService} from '../app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  credentials = {
    username: '',
    password: '',
  };
  constructor(private fb: FormBuilder,
              private appService: AppService,
              private router: Router ) { }

  ngOnInit() {
    this.loginform = this.fb.group({
      username: ['', Validators.required, Validators.minLength(3)],
      password: ['', Validators.required, Validators.minLength(3)]
    });
  }
  login() {
    console.log('login');
    this.appService.authenticate(this.credentials, () => {
     this.router.navigateByUrl('/produit');

    });
  }

}
