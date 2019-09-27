import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { NgMathPipesModule } from 'angular-pipes';
import { FloorPipe } from 'angular-pipes';

import { TimeDifferencePipe } from './time-difference.pipe';
import { TimeAgoPipe } from './time-ago.pipe';
import { SearchClientPipe } from './search-client.pipe';

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    NgMathPipesModule
  ],
  declarations: [
    TimeDifferencePipe,
    TimeAgoPipe,
    SearchClientPipe
  ],
  exports: [
    FloorPipe,
    TimeDifferencePipe,
    TimeAgoPipe,
    SearchClientPipe
  ],
  entryComponents: [],
})
export class PipesModule {}
