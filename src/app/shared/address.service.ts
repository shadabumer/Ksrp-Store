import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsersService } from './users.service';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  userId: string = "";
  constructor(private db: AngularFirestore,
    private user: UsersService) {
      this.userId = this.user.userDetails().uid;
     }

    createAddress(address: Address) {
      this.db.collection('address').doc(this.userId).set(address);
    }

    getAddress() {
      return this.db.collection('address').doc(this.userId).valueChanges();
    }

    updateAddress(address: Address) {
      this.db.collection('address').doc(this.userId).update(address);
    }
}
