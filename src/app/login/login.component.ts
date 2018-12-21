import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import {LocalStorageService} from '../localStorageService';
import { Subject } from 'rxjs';
export interface IUser {
  id?: number;
  username: string;
  password: string;
 }
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: IUser = {username: '', password: ''};
  localStorageService: LocalStorageService<IUser>;
 currentUser: IUser = null;
 

  constructor(private router: Router, private toastService: ToastService) {
  }

  ngOnInit() {
   if (this.currentUser != null ) {
     this.router.navigate(['contacts']);
  }
  }
  login(user: IUser) {

    console.log('from login: ', user);
    const defaultUser: IUser = {username: "franklin", password: "franklin123"};
    if (user.username !== '' && user.password !== '') {
      if(user.username === defaultUser.username && user.password === defaultUser.password){
        // this.localStorageService.saveItemsToLocalStorage(user);
        this.router.navigate(['cart', user]);
      } else{
              this.toastService.showToast('warning',2000, 'Login failed. Invalid Credentials!');
 
      }
    } else {
      this.toastService.showToast('warning',2000, 'Login failed. Enter username and password');
 
    }
  }
 
 }
 

