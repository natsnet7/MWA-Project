import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, Routes, RouterModule} from '@angular/router';
import { AdminComponent } from './admin.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { ReactiveFormsModule } from '@angular/forms';

const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: 'staffs', component: StaffListComponent},
      {path: 'questions', component: QuestionListComponent}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ADMIN_ROUTES)
  ],
  declarations: [AdminComponent, StaffListComponent, QuestionListComponent],
  providers: []
})
export class AdminModule {}
