import { Injectable } from '@angular/core';
import { IUserAuth } from '../models/userAuth';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { map } from 'rxjs';
import { UserModel } from '../models/user';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import * as transactionActions from '../transaction/transaction.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth, 
    private fireStore: Firestore,
    private store: Store<AppState>
  ) {
  }

  initAuthListener(){
    authState(this.auth).subscribe(user => {
      if(user){
        this.store.dispatch(authActions.setUser({user: { uid: user.uid, email: user.email!, name: user.displayName! }}));
      }else{
        this.store.dispatch(authActions.unsetUser());
        this.store.dispatch(transactionActions.unsetItems());
        this.store.dispatch(transactionActions.unsetTransactionTotals());
      }
    });
  }

  loginUser(user: IUserAuth) {
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }

  createUser(user: IUserAuth) {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password)
    .then(userCredential => {
      const newUser = new UserModel(userCredential.user.uid, user.name, user.email || "");
      return updateProfile(userCredential.user, { displayName: user.name }).then(() => {  
        return setDoc(doc(this.fireStore, `users/${userCredential.user.uid}`), {...newUser}).then(() => {
          this.store.dispatch(authActions.setUser({user: { uid: userCredential.user.uid, email: user.email!, name: user.name! }}));
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
