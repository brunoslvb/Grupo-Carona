import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  forgotForm: FormGroup;

  constructor(
    private builder: FormBuilder
  ) { }

  ngOnInit() {
    this.forgotForm = this.builder.group({
      email: ['', Validators.required]
    });
  }

  forgotPassword(){

    let domain = (<HTMLInputElement>document.getElementById('domain')).value;

    this.forgotForm.value.email += domain;

    console.log(this.forgotForm.value);
  }

}
