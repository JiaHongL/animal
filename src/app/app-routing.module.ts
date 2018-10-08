import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';
import { AutoLoginGuard } from './auto-login.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'adopt', pathMatch: 'full'
  },
  {
    path: 'adopt',
    loadChildren: 'src/app/pages/adopt/adopt.module#AdoptModule',
    data: { title: '首頁' },
    canActivate:[AutoLoginGuard]
  },
  {
    path: 'favorite',
    loadChildren: 'src/app/pages/favorite/favorite.module#FavoriteModule',
    data: { title: '我的最愛 ' },
    canActivate:[AutoLoginGuard]
  },
  {
    path: 'detail',
    loadChildren: 'src/app/pages/detail/detail.module#DetailModule',
    data: { title: '詳細資訊 ' },
    canActivate:[AutoLoginGuard]
  },
  {
    path:'feedback',
    loadChildren: 'src/app/pages/feedback/feedback.module#FeedbackModule',
    data: { title: '建議與回饋' },
    canActivate:[AutoLoginGuard]
  },
  {
    path: 'backend/login',
    loadChildren: 'src/app/pages/login/login.module#LoginModule',
    data: { title: '後台登入' }
  },
  {
    path:'backend/issues',
    loadChildren: 'src/app/pages/issues/issues.module#IssuesModule',
    data: { title: '意見處理' },
    canActivate:[AuthGuardGuard]
  },
  {
    path:'backend/issue',
    loadChildren: 'src/app/pages/issue-detail/issue-detail.module#IssueDetailModule',
    data: { title: '意見詳情' },
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
