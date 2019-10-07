import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ShellModule } from '../shell/shell.module';

import { CheckboxWrapperComponent } from './checkbox-wrapper/checkbox-wrapper.component';
import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { CounterInputComponent } from './counter-input/counter-input.component';
import { RatingInputComponent } from './rating-input/rating-input.component';

// angular materials
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule,MatInputModule,MatButtonModule,MatNativeDateModule} from '@angular/material';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {OrderFilterComponent} from './order-filter/order-filter.component';
import {ClientBillingDetailsComponent} from './client-billing-details/client-billing-details.component';
import {ClientCustomizationsComponent} from './client-customizations/client-customizations.component';
import {ParentClientIdSearchComponent} from './parent-client-id-search/parent-client-id-search.component';
import {ClientContactDetailsComponent} from './client-contact-details/client-contact-details.component';
// import {EditSubStatusComponent} from './edit-sub-status/edit-sub-status.component'

var commonMods = [
  MatExpansionModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatButtonToggleModule,
  MatGridListModule,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
    ShellModule,
    IonicModule.forRoot(),
    // ParentClientIdSearchComponent,
    // ClientBillingDetailsComponent,
    ...commonMods,
  ],
  declarations: [
    CheckboxWrapperComponent,
    ShowHidePasswordComponent,
    CountdownTimerComponent,
    CounterInputComponent,
    RatingInputComponent,
    OrderFilterComponent,
    ClientBillingDetailsComponent,
    ClientCustomizationsComponent,
    ParentClientIdSearchComponent,
    ClientContactDetailsComponent
    // EditSubStatusComponent
  ],
  exports: [
    ShellModule,
    CheckboxWrapperComponent,
    ShowHidePasswordComponent,
    CountdownTimerComponent,
    CounterInputComponent,
    RatingInputComponent,
    ClientBillingDetailsComponent,
    ClientCustomizationsComponent,
    ClientContactDetailsComponent,
    ...commonMods
  ],
  entryComponents: [
    OrderFilterComponent,
    ParentClientIdSearchComponent,
    // ClientBillingDetailsComponent,
    // EditSubStatusComponent
  ],
  providers: [
    MatDatepickerModule,
  ]
})
export class ComponentsModule {}
