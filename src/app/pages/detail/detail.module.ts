import { LoadingModule } from './../../feature/loading/loading.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DetailRoutingModule,
    LoadingModule,
    SharedModule
  ],
  declarations: [DetailComponent]
})
export class DetailModule { }
