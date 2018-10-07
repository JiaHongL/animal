import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoModalComponent } from './components/photo-modal/photo-modal.component';
import { AnimalPipe } from './pipes/animal.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [PhotoModalComponent, AnimalPipe, PaginationComponent],
  exports: [PhotoModalComponent, AnimalPipe,PaginationComponent],
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