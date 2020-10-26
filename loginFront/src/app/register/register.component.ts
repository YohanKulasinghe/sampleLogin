import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    username:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required),
    cpass:new FormControl(null,Validators.required)
  })
  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  moveToLogin(){
    this._router.navigate(['/login'])
  }

  register(){
    if(!this.registerForm.valid || this.registerForm.controls.password.value != this.registerForm.controls.cpass.value){
      console.log('Invalid Registration Form');
      return;
    }

    console.log.apply(JSON.stringify(this.registerForm.value));
  }

}
