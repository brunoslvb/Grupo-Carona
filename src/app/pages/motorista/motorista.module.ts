import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MotoristaPageRoutingModule } from './motorista-routing.module';
import { MotoristaPage } from './motorista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MotoristaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MotoristaPage]
})
export class MotoristaPageModule {}
