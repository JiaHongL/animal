import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoModalComponent } from './components/photo-modal/photo-modal.component';
import { AnimalPipe } from './pipes/animal.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [PhotoModalComponent, AnimalPipe],
  exports: [PhotoModalComponent, AnimalPipe],
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