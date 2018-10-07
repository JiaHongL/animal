import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuesRoutingModule } from './issues-routing.module';
import { IssuesComponent } from './issues/issues.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    IssuesRoutingModule,
    SharedModule
  ],
  declarations: [IssuesComponent]
})
export class IssuesModule { }
