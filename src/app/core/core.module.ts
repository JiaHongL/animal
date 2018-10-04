import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { AnimalService } from 'src/app/core/services/animal.service';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

import { ConditionModalComponent } from './components/condition-modal/condition-modal.component';
import { AreaModalComponent } from './components/area-modal/area-modal.component';
import { ShelterModalComponent } from './components/shelter-modal/shelter-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [HeaderComponent, FooterComponent, ConditionModalComponent, AreaModalComponent, ShelterModalComponent],
  exports: [HeaderComponent, FooterComponent, ConditionModalComponent],
  providers: [AnimalService,DatePipe]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. it in the AppModule only');
    }
  }
}
