import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'adopt', pathMatch: 'full'
  },
  {
    path: 'adopt',
    loadChildren: 'src/app/pages/adopt/adopt.module#AdoptModule',
    data: { title: '首頁' }
  },
  {
    path: 'favorite',
    loadChildren: 'src/app/pages/favorite/favorite.module#FavoriteModule',
    data: { title: '我的最愛 ' }
  },
  {
    path: 'detail',
    loadChildren: 'src/app/pages/detail/detail.module#DetailModule',
    data: { title: '詳細資訊 ' }
  },
  {
    path:'feedback',
    loadChildren: 'src/app/pages/feedback/feedback.module#FeedbackModule',
    data: { title: '建議與回饋' },
  },
  {
    path: 'login',
    loadChildren: 'src/app/pages/login/login.module#LoginModule',
    data: { title: '後台登入' }
  },
  {
    path:'issues',
    loadChildren: 'src/app/pages/issues/issues.module#IssuesModule',
    data: { title: '意見處理' },
    canActivate:[AuthGuardGuard]
  },
  {
    path: '**',
    redirectTo: 'adopt',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
