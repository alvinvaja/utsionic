import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  products: Array<Product>;
  checkBox: Array<boolean> = [];
  isMultiDelete: boolean;
  constructor(
    private productService: ProductService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.products = this.productService.getAllProducts();
    this.products.forEach(() => {
      this.checkBox.push(false);
    });
  }

  IonViewWillEnter() {
    this.isMultiDelete = false;
  }

  goToAdd() {
    this.router.navigateByUrl('admin/add');
  }

  editProduct(product: Product) {
    if (this.isMultiDelete) {
      return;
    }

    this.router.navigateByUrl('admin/' + product.id);
  }

  async presentAlert(product: Product) {
    if (this.isMultiDelete) {
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Delete Product',
      message: 'Are you sure you want to delete ' + product.merek + ' ' + product.model + '?',
      buttons: [
        {
          text: 'Yes',
          handler: () => this.deleteProduct(product)
        },
        {
          text: 'No'
        }
      ]
    });
    await alert.present();
  }

  async presentMultipleDeleteAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Delete Multiple Products',
      message: 'Are you sure you want to delete selected products?',
      buttons: [
        {
          text: 'Yes',
          handler: () => this.deleteMultipleProduct()
        },
        {
          text: 'No',
          handler: () => {
            this.checkBox.fill(false);
            this.isMultiDelete = false;
          }
        }
      ]
    });
    await alert.present();
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product);
    this.products = this.productService.getAllProducts();
  }

  deleteMultipleProduct() {
    const deletedProducts = [];

    for (let i = 0; i < this.checkBox.length; i++) {
      if (this.checkBox[i]) {
        deletedProducts.push(this.products[i]);
      }
    }

    deletedProducts.forEach(product => {
      this.productService.deleteProduct(product);
    });

    this.products = this.productService.getAllProducts();
    this.checkBox.fill(false);
    this.isMultiDelete = !this.isMultiDelete;
  }

  toggleMultiDelete() {
    if (this.isMultiDelete) {
      this.presentMultipleDeleteAlert();
    } else {
      this.isMultiDelete = !this.isMultiDelete;
    }
  }
}
