import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFirestore) { }

  createCategory(category: Category) {
    return this.db.collection('categories').add({...category});
  }

  getCategory(id: string) {
    return this.db.collection('categories').doc(id).get();
  }

  getCategories() {
    return this.db.collection('categories').snapshotChanges()
    .pipe(map((document) => {
      return document.map( (changes: any) => {
        return {
          id: changes.payload.doc.id,
          ...changes.payload.doc.data(),
          // imageUrl: changes.payload.doc.data().imageUrl,
        }
      })
    }))
  }

  deleteCategory(id: string) {
    this.db.collection('categories').doc(id).delete();
  }

  updateCategory(id: string, newCategory: Category) {
    this.db.collection('categories').doc(id).update(newCategory);
  }
}
