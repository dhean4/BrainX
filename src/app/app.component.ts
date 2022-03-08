import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

// TODO: Replace the following with your app's Firebase project configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnWaTuz05QvvfhovYZBsx5fCyndL0sfaY",
  authDomain: "brainx-796fe.firebaseapp.com",
  databaseURL: "https://brainx-796fe-default-rtdb.firebaseio.com",
  projectId: "brainx-796fe",
  storageBucket: "brainx-796fe.appspot.com",
  messagingSenderId: "721885485894",
  appId: "1:721885485894:web:9391f6985a1391fc7da347",
  measurementId: "G-87TRNZPQ8V"
};

// Initialize Firebase
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'crud-project';

  constructor( private api:ApiService){
    const app = initializeApp(firebaseConfig);

    const database = getDatabase(app);
  }
  ngOnInit():void{

  }

}

