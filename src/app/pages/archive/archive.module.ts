import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchiveRoutingModule } from './archive-routing.module';
import { ArchiveComponent } from './archive/archive.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ArchiveRoutingModule,
    SharedModule
  ],
  declarations: [ArchiveComponent]
})
export class ArchiveModule { }
