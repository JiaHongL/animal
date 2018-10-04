import { AdoptComponent } from './adopt/adopt.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: '/adopt/search?animal_area_pkid=2', pathMatch: 'full'
  },
  { path: 'search', component: AdoptComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdoptRoutingModule { }
