import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordPageRoutingModule } from './reset-password-routing.module';

import { ResetPasswordPage } from './reset-password.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { CustomInputComponent } from 'src/app/components/custom-input/custom-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPasswordPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ResetPasswordPage,
    HeaderComponent,
    LogoComponent,
    CustomInputComponent,
  ],
})
export class ResetPasswordPageModule {}
