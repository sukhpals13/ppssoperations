import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ShellModule } from '../../../shell/shell.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { ComponentsModule } from '../../../components/components.module';
// import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

import { IonicModule } from '@ionic/angular';

import { UserDetailsPage } from './user-details.page';

// phone number masking
import { TextMaskModule } from 'angular2-text-mask';

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
    TextMaskModule,
    ShellModule,
    MatExpansionModule,
    ComponentsModule,
    // BreakpointObserver,
    

    RouterModule.forChild(routes)
  ],
  declarations: [UserDetailsPage]
})
export class UserDetailsPageModule {}
