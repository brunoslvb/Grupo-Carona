import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaronaPageRoutingModule } from './carona-routing.module';

import { CaronaPage } from './carona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CaronaPageRoutingModule
  ],
  declarations: [CaronaPage]
})
export class CaronaPageModule {}
