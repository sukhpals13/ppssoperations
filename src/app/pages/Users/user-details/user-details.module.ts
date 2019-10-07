import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserDetailsPage } from './user-details.page';

const routes: Routes = [
  {
    path: '',
    component: UserDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserDetailsPage]
})
export class UserDetailsPageModule {}
