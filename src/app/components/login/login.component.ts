import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import ValidateForm from '../../helpers/validateForm';
import { ValidatingService } from '../../services/validating.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  /**
   *
   */
  loginForm: FormGroup;
  constructor(private route: ActivatedRoute, private _validatingService: ValidatingService, private router: Router,private fb: FormBuilder) {
    this.loginForm = this.fb.group({
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
    if(this.loginForm.valid){
      console.log("Login Successful");
      this.loginUser(this.loginForm.value.username,this.loginForm.value.password);
      //send the obj to DB
    }else{
      ValidateForm.validateAllFormField(this.loginForm);
      alert("Please fill out all fields")
    }
  }

  loginUser(username: string, password:string):void{
    this._validatingService.login(username,password).subscribe(
      value => {
        alert("Successfull");
        this.loginForm.reset();
        this.router.navigate(['']);
    },
    error =>{
      alert("unsuccessfull");
    }
    )
  }
}
