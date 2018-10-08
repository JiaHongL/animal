import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoModalComponent } from './components/photo-modal/photo-modal.component';
import { AnimalPipe } from './pipes/animal.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { IssuesPipe } from './pipes/issues.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [PhotoModalComponent, AnimalPipe, PaginationComponent, IssuesPipe],
  exports: [PhotoModalComponent, AnimalPipe, PaginationComponent,IssuesPipe],
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