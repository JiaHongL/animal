import { LoadingModule } from './../../feature/loading/loading.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdoptRoutingModule } from './adopt-routing.module';
import { AdoptComponent } from './adopt/adopt.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CardListModule } from 'src/app/feature/card-list/card-list.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AdoptRoutingModule,
    InfiniteScrollModule,
    CardListModule,
    LoadingModule,
    SharedModule
  ],
  declarations: [AdoptComponent]
})
export class AdoptModule { }
