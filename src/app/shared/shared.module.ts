import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoModalComponent } from './components/photo-modal/photo-modal.component';
import { AnimalPipe } from './pipes/animal.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { IssuesPipe } from './pipes/issues.pipe';
import { RemarkModalComponent } from './components/remark-modal/remark-modal.component';
import { IssueTableComponent } from './components/issue-table/issue-table.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [PhotoModalComponent, AnimalPipe, PaginationComponent, IssuesPipe, RemarkModalComponent, IssueTableComponent],
  exports: [PhotoModalComponent, AnimalPipe, PaginationComponent, IssuesPipe, RemarkModalComponent, IssueTableComponent],
  providers: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}