import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UploadProfilePicService {

  constructor(
    private db: AngularFirestore,
  ) { }

  addImageUrlToDb(id: string, imageUrl: string) {
    this.db.collection('users').doc(id).update({
      imageUrl
    })
    .then(response => {
      console.log('imageurl updated:', response);
    })
    .catch(error => {
      console.log('imageurl updation failed', error);
    });
  }

}
