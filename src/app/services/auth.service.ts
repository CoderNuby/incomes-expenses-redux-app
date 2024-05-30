import { Injectable } from '@angular/core';
import { IUserAuth } from '../models/userAuth';
import { Auth, User, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { map } from 'rxjs';
import { UserModel } from '../models/user';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private fireStore: Firestore) {
  }

  initAuthListener(){
    authState(this.auth).subscribe(user => {
      let userData: User = user!;
    });
  }

  loginUser(user: IUserAuth) {
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }

  createUser(user: IUserAuth) {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password)
    .then(userCredential => {
      const newUser = new UserModel(userCredential.user.uid, user.name, user.email || "");
      return setDoc(doc(this.fireStore, `users/${userCredential.user.uid}`), {...newUser}).then(() => {
        return updateProfile(userCredential.user, { displayName: user.name }).then(() => {
          return userCredential;
        });
      });
    });
  }

  signOut() {
    return signOut(this.auth);
  }

  isAuth(){
    return authState(this.auth).pipe(map((user) => {
      return user != null
    }));
  }
}
