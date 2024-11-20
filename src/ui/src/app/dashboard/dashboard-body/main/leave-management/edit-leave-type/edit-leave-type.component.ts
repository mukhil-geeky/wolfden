import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { LeaveManagementService } from '../../../../../service/leave-management.service';
import { IGetLeaveTypeIdAndname } from '../../../../../interface/get-leave-type-interface';
import { IEditLeaveType } from '../../../../../interface/edit-leave-type';

@Component({
  selector: 'app-edit-leave-type',
  standalone: true,
  imports: [ReactiveFormsModule, NgSelectComponent],
  templateUrl: './edit-leave-type.component.html',
  styleUrl: './edit-leave-type.component.scss'
})
export class EditLeaveTypeComponent implements OnInit{
  fb = inject(FormBuilder);
  leaveManagement = inject(LeaveManagementService);
  editLeaveType: FormGroup<IEditLeaveType>;
  leaveType: Array<IGetLeaveTypeIdAndname> = [];

  constructor() {

    this.editLeaveType = this.fb.group<IEditLeaveType>({
      id: new FormControl(null, Validators.required),
      maxDays: new FormControl(null),
      isHalfDayAllowed: new FormControl(null),
      incrementCount: new FormControl(null),
      incrementGapId: new FormControl(null),
      carryForward: new FormControl(null),
      carryForwardLimit: new FormControl(null),
      daysCheck: new FormControl(null),
      daysCheckMore: new FormControl(null),
      daysCheckEqualOrLess: new FormControl(null),
      dutyDaysRequired: new FormControl(null),
      sandwich: new FormControl(null)
    });
  }

  selectedType: number | null = null
  increments = [
    { type: 1, viewValue: 'Monthly Increment' },
    { type: 2, viewValue: 'Quarterly Increment' },
    { type: 3, viewValue: 'Half-Yearly Increment' },
  ];

  ngOnInit(): void {
    this.leaveManagement.getLeaveTypeIdAndName().subscribe({
      next: (response: Array<IGetLeaveTypeIdAndname>) => {
        this.leaveType = response;
      },
      error: (error) => {
        alert(error);
      }
    })
  }

  onSubmit() {
    if (this.editLeaveType.valid) {
      this.leaveManagement.editLeaveType(this.editLeaveType).subscribe({
        next: (response) => {
          if (response) {
            alert("Leave Type Updated");
            this.editLeaveType.reset();
          }
        },
        error: (error) => {
         alert(error);
        }
      });
    }
  }
}
