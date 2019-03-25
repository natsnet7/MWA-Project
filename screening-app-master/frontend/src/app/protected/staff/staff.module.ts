import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, Routes, RouterModule} from '@angular/router';


import {StaffComponent} from './staff.component';
import {StudentListComponent} from './student-list/student-list.component';

const STAFF_ROUTES: Routes = [
  {
    path: '',
    component: StaffComponent,
    children: [
      {
        path: 'students',
         component: StudentListComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(STAFF_ROUTES)
  ],
  declarations: [StaffComponent, StudentListComponent],
  providers: []
})
export class StaffModule {}
