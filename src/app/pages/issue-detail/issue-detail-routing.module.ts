
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/issues', pathMatch: 'full'
  },
  { path: ':id', component: IssueDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuesDetailRoutingModule { }
