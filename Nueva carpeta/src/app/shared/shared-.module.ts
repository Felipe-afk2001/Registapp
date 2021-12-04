import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { LogoComponent } from '../components/logo/logo.component';

@NgModule({
  declarations: [HeaderComponent, LogoComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, LogoComponent],
})
export class SharedModule {}
