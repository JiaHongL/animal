import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuesRoutingModule } from './issues-routing.module';
import { IssuesComponent } from './issues/issues.component';

@NgModule({
  imports: [
    CommonModule,
    IssuesRoutingModule
  ],
  declarations: [IssuesComponent]
})
export class IssuesModule { }
