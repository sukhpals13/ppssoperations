import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TestCloudinaryPage } from './test-cloudinary.page';

import {FileUploadModule} from 'ng2-file-upload';

const routes: Routes = [
  {
    path: '',
    component: TestCloudinaryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FileUploadModule
  ],
  declarations: [TestCloudinaryPage]
})
export class TestCloudinaryPageModule {}
