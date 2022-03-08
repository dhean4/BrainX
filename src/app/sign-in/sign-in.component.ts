import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInUser! :FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private formBuilder: FormBuilder, private router: Router) {
   }

  ngOnInit(): void {
    this.signInUser=this.formBuilder.group({
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

  Login(data:any) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
  .then((userCredential:any) => {
    // Signed in
    console.log(userCredential); 
    const user = userCredential.user;
    console.log(user);
    // console.log(user.accessToken)
    localStorage.setItem('token', user.accessToken);
    this.router.navigate(['/Table']);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });

   }

}
