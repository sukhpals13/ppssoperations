import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BarCodeScannerPage } from './bar-code-scanner.page';

const routes: Routes = [
  {
    path: '',
    component: BarCodeScannerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BarCodeScannerPage]
})
export class BarCodeScannerPageModule {}
