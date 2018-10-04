import { LoadingService } from './loading.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingDirective } from './loading.directive';
import { Loading01Component } from './loading01/loading01.component';
import { Loading02Component } from './loading02/loading02.component';
import { Loading03Component } from './loading03/loading03.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoadingDirective,Loading01Component, Loading02Component, Loading03Component],
  exports: [LoadingDirective],
  entryComponents: [Loading01Component, Loading02Component,Loading03Component],
  providers:[LoadingService]
})
export class LoadingModule { }
