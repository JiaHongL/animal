import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { AnimalService } from 'src/app/core/services/animal.service';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

import { ConditionModalComponent } from './components/condition-modal/condition-modal.component';
import { AreaModalComponent } from './components/area-modal/area-modal.component';
import { ShelterModalComponent } from './components/shelter-modal/shelter-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UtilService } from './services/util.service';
import { FirebaseService } from './services/firebase.service';
import { IdModalComponent } from './components/id-modal/id-modal.component';
import { GoTopComponent } from './components/go-top/go-top.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [HeaderComponent, FooterComponent, ConditionModalComponent, AreaModalComponent, ShelterModalComponent, IdModalComponent, GoTopComponent],
  exports: [HeaderComponent, FooterComponent,GoTopComponent],
  providers: [AnimalService, UtilService, FirebaseService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. it in the AppModule only');
    }
  }
}
