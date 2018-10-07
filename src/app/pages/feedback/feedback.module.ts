import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback/feedback.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoadingModule } from '../../feature/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    LoadingModule
  ],
  declarations: [FeedbackComponent]
})
export class FeedbackModule { }
