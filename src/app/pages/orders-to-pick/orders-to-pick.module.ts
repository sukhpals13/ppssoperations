import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { OrdersToPickPage } from './orders-to-pick.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersToPickPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrdersToPickPage]
})
export class OrdersToPickPageModule {}
