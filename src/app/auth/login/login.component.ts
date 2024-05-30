import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IUserAuth } from '../../models/userAuth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginGroup!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loginGroup = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  signIn(){
    if(this.loginGroup.invalid) return;

    Swal.fire({
      title: "Wait...",
      willOpen: ()=> {
        Swal.showLoading(null)
      },
      showConfirmButton: false
    });

    const { email, password } = this.loginGroup.value;

    let user: IUserAuth = { name: "", email, password }

    this.authService.loginUser(user).then((credentials) => {
      Swal.close();
      this.router.navigateByUrl("/");
    }).catch(err => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Incorrect Credentials",
        showConfirmButton: false,
        timer: 1500
      });
    });
  }
}
