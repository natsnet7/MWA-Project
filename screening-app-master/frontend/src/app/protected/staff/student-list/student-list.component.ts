import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnDestroy {
  invitedStudents: any[];
  uninvitedStudents: any[];
  isLoaded = false;
  studentSubscrption: Subscription;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.updateStudentData();
  }
  sendInvitation(id) {
    const student = this.uninvitedStudents.filter(stu => stu._id === id);
    this.studentService.sendInvitation(student[0]).subscribe(data => {
      this.updateStudentData();
    });
  }

  ngOnDestroy() {
    if (this.studentSubscrption) {
      this.studentSubscrption.unsubscribe();
    }
  }

  updateStudentData() {
    this.studentSubscrption = this.studentService.getStudents().subscribe((data: any[]) => {
      this.invitedStudents = data.filter(s => s.invitation != null);
      this.uninvitedStudents = data.filter(s => s.invitation == null);
    });
  }
}

