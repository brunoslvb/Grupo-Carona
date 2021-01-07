import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private nav: NavController
  ) { }

  ngOnInit() {
    this.registerForm = this.builder.group({
      prontuario: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      birthday: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  createUser(){

    let domain = (<HTMLInputElement>document.getElementById('domain')).value;

    this.registerForm.value.email += domain;

    console.log(this.registerForm.value);
    
  }



}
