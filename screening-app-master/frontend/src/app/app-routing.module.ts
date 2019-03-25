import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicComponent } from './public/public.component';
import { AboutComponent } from './public/about/about.component';
import { SigninComponent } from './public/signin/signin.component';

const APP_ROUTES: Routes = [
  {
    path: '', component: PublicComponent, children: [
      { path: 'about', component: AboutComponent },
      { path: 'signin', component: SigninComponent }
    ]
  },
  {
    path: 'staff',
    loadChildren: './protected/staff/staff.module#StaffModule'
  },
  {
    path: 'admin',
    loadChildren: './protected/admin/admin.module#AdminModule'
  },
  {
    path: 'student/:id',
    loadChildren: './protected/student/student.module#StudentModule'
  },
  { path: '**', redirectTo: 'about' }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
