import { Component } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  loginModel = {
    email: '',
    password: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) { }

  onSubmit() {
    this.userService.loginUser(this.loginModel.email, this.loginModel.password)
      .subscribe(token => {
        // Save the token (you might want to use a more secure storage mechanism)
        localStorage.setItem('authToken', token);
        this.successMessage = 'User logged in successfully!';
        this.errorMessage = '';
      }, error => {
        this.errorMessage = 'Error logging in: ' + error.message;
        this.successMessage = '';
      });
  }
}
