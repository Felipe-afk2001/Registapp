import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BienvePage } from './bienve.page';

const routes: Routes = [
  {
    path: '',
    component: BienvePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BienvePageRoutingModule {}
