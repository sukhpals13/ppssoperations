import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrdersToPickPage } from './orders-to-pick.page';
import { ComponentsModule } from '../../../components/components.module';
// import { GetDetailsService } from '../../../services/getDetails/get-details.service';

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
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  // providers: [
  //   GetDetailsService
  // ],
  declarations: [OrdersToPickPage]
})
export class OrdersToPickPageModule {}
