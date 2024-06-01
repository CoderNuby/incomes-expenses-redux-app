import { Injectable } from '@angular/core';
import { TransactionModel } from '../models/transaction';
import { Firestore, addDoc, collection, collectionData, collectionSnapshots, deleteDoc, orderBy, query, updateDoc } from '@angular/fire/firestore';
import { doc } from '@firebase/firestore';
import { UserModel } from '../models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TransactionService {

  user: UserModel | null = null;

  constructor(
    private fireStore: Firestore,
    private store: Store<AppState>
  )
  {
    this.store.select('auth').subscribe(state => {
      this.user = state.user;
    });
  }

  initTransactionItemsListeners(uid: string) {
    const transactionsCollection = collection(this.fireStore, `${uid}/transactions/items`);
    const orderedQuery = query(transactionsCollection, orderBy('createdDate', 'desc'));

    return collectionData(orderedQuery).pipe(
      map(items => {
        return items.map(data => ({
          ...data,
          createdDate: new Date(data['createdDate'])
        } as TransactionModel));
      })
    );
  }

  createTransaction(transaction: TransactionModel) {
    const userTransactionsRef = collection(doc(this.fireStore, `${this.user?.uid}/transactions`), 'items');
    transaction.createdDate = new Date().toJSON()
    return addDoc(userTransactionsRef, { ...transaction }).then((transactionCredential) => {
      const transactionDocRef = doc(this.fireStore, `${this.user?.uid}/transactions/items/${transactionCredential.id}`);
      return updateDoc(transactionDocRef, { uid: transactionCredential.id }).then(() => {
        return transactionCredential;
      });
    });
  }

  deleteTransaction(uid: string){
    return deleteDoc(doc(this.fireStore, `${this.user?.uid}/transactions/items/${uid}`));
  }
}
