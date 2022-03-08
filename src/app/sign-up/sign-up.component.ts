import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder,} from '@angular/forms';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  LoginUser!: FormGroup;
  emailSuccess!: false;
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private formBuilder: FormBuilder) {
    const auth = getAuth();
   }

  ngOnInit(): void {
    this.LoginUser=this.formBuilder.group({
      "email": ['', Validators.required],
      "password": ['', Validators.required],
    })
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  submit(data:any) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);

        // ...
        sendEmailVerification(user).then(() => {
          console.log(user);
          alert('Email Sent');
        })
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    
  }

}

