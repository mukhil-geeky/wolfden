import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { WolfDenService } from '../../service/wolf-den.service';
import { ICheckForm } from './iCheckForm';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-check-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './check-user.component.html',
  styleUrl: './check-user.component.scss'
})
export class CheckUserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router, 
              private userService: WolfDenService,
              private toastr : ToastrService
            ) {
    this.userForm = this.fb.group<ICheckForm>({
      rfId: new FormControl('', [Validators.required, ]),
      employeeCode: new FormControl('', Validators.required)
    });
  }

  isSubmitted: boolean = false;

  onSubmit() {
    this.isSubmitted = true;
    ;
    if(this.userForm.valid){
     
      this.userService.getEmployeeSignUp(this.userForm.value.employeeCode,this.userForm.value.rfId).subscribe({
        next: (response) => {
          if(response.status){
            this.userService.userId=response.id;
            this.toastr.success('Sucess')
            this.router.navigate(['/user/sign-in'])
        
          }
          else if(response.id!=0){
            this.toastr.error('user already exist')
            this.router.navigate(['/user/login'])
          }
          else{
            this.toastr.error('Invalid');
          }
        
      },
      error: (error: any) => {
        this.toastr.error('Invalid Credentials')


    }
  });
  }else{
    this.toastr.error('Unsuccessful')
  }
}
hasDisplayableError(controlName: string ):Boolean {
  const control = this.userForm.get(controlName);
  return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
}

}
