import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { defer, first, from, Observable } from 'rxjs';
import { User } from 'src/app/models';
import { SignInService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup
  isSuccessful = false
  isSignUpFailed = false
  errorMessage: string = ''

  constructor(private fb: FormBuilder, private signInSvc: SignInService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  createForm() {
    return this.fb.group({
      username: this.fb.control<string>('', [Validators.required, Validators.email]),
      password: this.fb.control<string>('', [Validators.required, Validators.minLength(3)])
    })
  }

  onSubmit() {
    const user: User = this.form.value as User
    // console.log(':::::User: ', user)

    // const subscription = defer(() => from(
    //   this.signInSvc.register(user)))

    // subscription.subscribe({

    //   next: data => {
    //     console.log(data)
    //     this.isSuccessful = true
    //     this.isSignUpFailed = false
    //     window.alert('You have registered successfully!')
    //     this.router.navigate(['/signin'])
    //   },
    //   error: err => {
    //     this.errorMessage = err.error.message
    //     this.isSignUpFailed = true
    //     window.alert('Registration failed!')
    //     this.form.reset()
    //   }
    // })

    this.signInSvc.register(user)
      .then(result => {
        this.isSuccessful = true
        this.isSignUpFailed = false
        // window.alert('You have registered successfully!')
        this.router.navigate([''])
      }).catch(error => {
        this.errorMessage = error.error.message
        this.isSignUpFailed = true
        // window.alert('Registration failed!')
        this.form.reset()
      })

  }

}
