import { LoadingModule } from './../../feature/loading/loading.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { IssuesDetailRoutingModule } from './issue-detail-routing.module';
import { AddHistoryModalComponent } from './issue-detail/add-history-modal/add-history-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IssuesDetailRoutingModule,
    SharedModule,
    LoadingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [IssueDetailComponent, AddHistoryModalComponent]
})
export class IssueDetailModule { }
