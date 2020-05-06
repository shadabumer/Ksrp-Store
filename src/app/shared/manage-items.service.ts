import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Item } from '../models/item.model';
import { Stock } from '../models/stock.model';
import { Feedback } from '../models/feedback.model';


@Injectable({
  providedIn: 'root'
})
export class ManageItemsService {

  constructor(private db: AngularFirestore) { }

  createItem(item: Item) {
    return this.db.collection('items').add({ ...item });

  }

  getItem(id: string) {
    return this.db.collection('items').doc(id).get();
  }

  getItems() {
    return this.db.collection('items').snapshotChanges()
      .pipe(map(document => {
        return document.map((changes: any) => {
          return {
            id: changes.payload.doc.id,
            ...changes.payload.doc.data(),
          }
        })
      }))
  }

  deleteItem(id: string) {
    this.db.collection('items').doc(id).delete();
  }

  updateItem(id: string, newItem: Item) {
    this.db.collection('items').doc(id).update(newItem);
  }

  getItemsByCategory(categoryId: string) {
    return this.db.collection('items', ref => ref.where('categoryId', '==', categoryId)).valueChanges({ idField: 'id' });
  }

  updateStock(id: string, stock: Stock) {
    this.db.collection('stock').doc(id).set(stock);
  }

  getStock(id: string) {
    return this.db.collection('stock').doc(id).valueChanges();
  }

  getAllStocks() {
    return this.db.collection('stock').valueChanges({idField: 'stockId'});
  }

  createFeedback(itemId: string, userId: string, feedback: Feedback) {
    return this.db.collection('feedbacks').doc(itemId).collection('users').doc(userId).set(feedback);
  }

  filterItemsByPrice(price: string) {
    return price === 'priceHigh' 
      ? this.db.collection('items', ref => ref.orderBy('price', 'desc')).valueChanges()
      : this.db.collection('items', ref => ref.orderBy('price', 'asc')).valueChanges();
  }
}
