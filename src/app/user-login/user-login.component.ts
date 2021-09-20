import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  hide = true;
  @ViewChild('f') loginForm! : NgForm;
  user = {
    email: '',
    password: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.user.email = this.loginForm.value.email;
    this.user.password = this.loginForm.value.password;
    this.loginForm.resetForm();

    console.log(this.user);
  }
}
