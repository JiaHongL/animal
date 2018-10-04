import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteRoutingModule } from './favorite-routing.module';
import { FavoriteComponent } from './favorite/favorite.component';
import { CardListModule } from '../../feature/card-list/card-list.module';

@NgModule({
  imports: [
    CommonModule,
    FavoriteRoutingModule,
    CardListModule,
    SharedModule
  ],
  declarations: [FavoriteComponent]
})
export class FavoriteModule { }
