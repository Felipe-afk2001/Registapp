import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BienvePageRoutingModule } from './bienve-routing.module';

import { BienvePage } from './bienve.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BienvePageRoutingModule
  ],
  declarations: [BienvePage]
})
export class BienvePageModule {}
