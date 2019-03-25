import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AceEditorModule } from 'ng2-ace-editor';

import { StudentComponent } from './student.component';
import { ExamInfoComponent } from './exam-info/exam-info.component';
import { ExamComponent } from './exam/exam.component';

const STUDENT_ROUTES: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      {
        path: 'info',
         component: ExamInfoComponent
      },
      {
        path: 'exam',
         component: ExamComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AceEditorModule,
    RouterModule.forChild(STUDENT_ROUTES)
  ],
  declarations: [StudentComponent, ExamComponent, ExamInfoComponent],
  providers: []
})
export class StudentModule {}
