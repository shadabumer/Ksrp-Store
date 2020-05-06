import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'auth-token';
 
@Injectable({
  providedIn: 'root'
})

export class UsersService {

  authenticationState = new BehaviorSubject(false);

  constructor(public afAuth: AngularFireAuth,
    public router: Router,
    public db: AngularFirestore,
    public storage: Storage,
    public plt: Platform) {
      
     }

  // Sign up with email/password
    async createAccount(email, password) {
      const newUser = this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      return newUser;
    }


  registerUser(user: User) {
    return this.db.collection('users').doc(user.id).set({...user});
  }

  getUser(id: string) {
    return this.db.collection('users').doc(id).valueChanges();
  }
  
  // Sign in with email/password
  async login(email, password) {
    const user = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    
    const userToken = user.user.refreshToken;
    console.log('userToken:', userToken);
    this.storage.set(TOKEN_KEY, userToken).then(() => {
      this.authenticationState.next(true);
    });
    return user;
  }  

  logout() {
    this.afAuth.auth.signOut;
    console.log('logout user details:', this.userDetails().uid);
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
  
  userDetails(){
    return this.afAuth.auth.currentUser;
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        console.log('check token res:', res);
        console.log('users id:',this.afAuth.auth.currentUser.uid);
        this.authenticationState.next(true);
      }
    })
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  updateUser(user: User) {
    return this.db.collection('users').doc(user.id).update({...user});
  }

  // Forgot password functions
  async forgotPassword(email: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(email);
  }

  async confirmPasswordReset(code: string, password: string) {
    return await this.afAuth.auth.confirmPasswordReset(code, password);
  }

  // Reset password functions
  async reauthenticateUser(email: string, password: string) {
    let credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this.afAuth.auth.currentUser.reauthenticateWithCredential(credential);
  }

  async resetPassword(newPassword: string) {
    return await this.afAuth.auth.currentUser.updatePassword(newPassword);
  }

}
