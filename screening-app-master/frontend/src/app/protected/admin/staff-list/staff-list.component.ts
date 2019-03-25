import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StaffService } from 'src/app/services/staff.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit, OnDestroy {

  staffForm: FormGroup;
  staffList: any[];
  isLoaded = false;
  control: any;
  staffSubscrption: Subscription;

  constructor(private formBuilder: FormBuilder, private staffService: StaffService) {
    this.staffForm = formBuilder.group({
      'name': ['', Validators.required],
      'username': ['', Validators.required],
    });
    this.control = this.staffForm.controls;
  }

  ngOnInit() {
    this.getRecentStaffData();
  }

  ngOnDestroy() {
    if (this.staffSubscrption) {
      this.staffSubscrption.unsubscribe();
    }
  }

  onSubmit() {
    const staff = {
      name: this.control.name.value,
      username: this.control.username.value,
      password: '',
      active: true,
      is_admin: false
    };
    this.staffForm.reset();
    this.staffService.addStaff(JSON.stringify(staff)).subscribe((response: any) => {
      this.getRecentStaffData();
    });
  }

  setActive(staff, status) {
    // console.log(status);
    this.staffService.updateStaff({staff: staff, status: status}).subscribe(data => {
      console.log(data);
      this.getRecentStaffData();
    });
  }

  getRecentStaffData() {
    this.staffSubscrption = this.staffService.getStaff().subscribe((users: any[]) => {
        this.isLoaded = true;
        this.staffList = users;
    });
  }
}
