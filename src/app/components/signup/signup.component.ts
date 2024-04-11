import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import ValidateForm from '../../helpers/validateForm';
import { ValidatingService } from '../../services/validating.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, ReactiveFormsModule, CommonModule,HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
signUpForm: FormGroup;
constructor(private route: ActivatedRoute, private _validatingService: ValidatingService, private router: Router,private fb: FormBuilder) {
  this.signUpForm = this.fb.group({
    firstname: ['',Validators.required ],
    lastname :['',Validators.required ],
    email: ['',Validators.required],
    username: ['',Validators.required ],
    password: ['',Validators.required]
  })
}
  ngOnInit(): void {
  }
  
  hideShowPass(){
    if(!this.isText){
      this.isText=true;
      this.type="text";
      this.eyeIcon = "fa-eye";
    }
    else{
      this.isText=false;
      this.type="password";
      this.eyeIcon = "fa-eye-slash";
    }
  }

  onSubmit(){
    debugger
    if(this.signUpForm.valid){
      console.log("Signup Successful");
      this.SignUp(this.signUpForm.value.firstname,this.signUpForm.value.lastname,this.signUpForm.value.email,this.signUpForm.value.username,this.signUpForm.value.password);
    }else{
      ValidateForm.validateAllFormField(this.signUpForm);
      alert("Please fill out all fields")
    }
  }
  SignUp(firstname: string, lastname: string, email: string, username: string, password: string) {
    this._validatingService.SignUp(firstname,lastname,email,username,password).subscribe(
      value => {
          alert("Successfully Registered! Please Login to Continue!");
          this.signUpForm.reset();
          this.router.navigate(['/login']);
      },
      error =>{
        alert("unsuccessfull");
      }
    )
  }
}

