import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/shared/users.service';
import { User } from 'src/app/models/user.model';
import { ManageItemsService } from 'src/app/shared/manage-items.service';
import { ToastController } from '@ionic/angular';
import { Feedback } from 'src/app/models/feedback.model';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {

  currentItem: any;
  feedback: string = "";
  currentUser: User;

  constructor(public route: ActivatedRoute, 
    private cartService: CartService,
    private user: UsersService,
    private itemService: ManageItemsService,
    public toastController: ToastController) { 
      const userId = this.user.userDetails().uid;
      this.user.getUser(userId).subscribe((userData: User) => {
        console.log('user data:', userData);
        this.currentUser = userData;
      });
    }

  ngOnInit() {
    this.currentItem = this.route.snapshot.queryParams;
    console.log('current Item:', this.currentItem);
  }

  addToCart(e) {
    e.stopPropagation();
    this.cartService.addProduct(this.currentItem);
  }

  onSubmit() {
    const newFeedback: Feedback = {
      name: this.currentUser.firstName + ' ' + this.currentUser.lastName,
      feedback: this.feedback
    }
    this.itemService.createFeedback(this.currentItem.id, this.currentUser.id, newFeedback)
    .then(async data => { 
      console.log('feedback sent', data);
      const toast = await this.toastController.create({
        message: 'Feedback sent successfully.',
        duration: 3000
      });
      toast.present();

      this.feedback = "";
    })
    .catch(async error => { 
      console.log('feedback failed:', error);
      const toast = await this.toastController.create({
        message: 'Feedback sending failed!',
        duration: 3000
      });
      toast.present();
    });
  }

}
