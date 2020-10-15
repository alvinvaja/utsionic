import { Component, ErrorHandler, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  form: FormGroup;
  jenis: string;
  product: Product;
  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('productId')) { return; }
      const productId = Number(paramMap.get('productId'));
      this.product = this.productService.getProduct(productId);
    });

    this.jenis = this.product.jenis;

    this.form = new FormGroup({
      foto: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      merek: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      model: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      harga: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      stok: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      baseclock: new FormControl(null, {
        updateOn: 'blur',
        validators: [(this.jenis === 'cpu') ? Validators.required : Validators.nullValidator]
      }),
      boostclock: new FormControl(null, {
        updateOn: 'blur',
        validators: [(this.jenis === 'cpu') ? Validators.required : Validators.nullValidator]
      }),
      core: new FormControl(null, {
        updateOn: 'blur',
        validators: [(this.jenis === 'cpu') ? Validators.required : Validators.nullValidator]
      }),
      thread: new FormControl(null, {
        updateOn: 'blur',
        validators: [(this.jenis === 'cpu') ? Validators.required : Validators.nullValidator]
      }),
      speed: new FormControl(null, {
        updateOn: 'blur',
        validators: [(this.jenis === 'ram') ? Validators.required : Validators.nullValidator]
      }),
      chipset: new FormControl(null, {
        updateOn: 'blur',
        validators: [(this.jenis === 'motherboard') ? Validators.required : Validators.nullValidator]
      }),
      prosesor: new FormControl(null, {
        updateOn: 'blur',
        validators: [(this.jenis === 'motherboard') ? Validators.required : Validators.nullValidator]
      })
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.presentAlert();
  }

  editProduct() {
    this.product = this.getDummyProduct();

    this.product.foto = this.form.value.foto;
    this.product.merek = this.form.value.merek;
    this.product.model = this.form.value.model;
    this.product.harga = this.form.value.harga;
    this.product.stok = this.form.value.stok;
    if (this.jenis === 'cpu') {
      this.product.baseclock = this.form.value.baseclock;
      this.product.boostclock = this.form.value.boostclock;
      this.product.core = this.form.value.core;
      this.product.thread = this.form.value.thread;
    } else if (this.jenis === 'ram') {
      this.product.speed = this.form.value.speed;
    } else if (this.jenis === 'motherboard') {
      this.product.chipset = this.form.value.chipset;
      this.product.prosesor = this.form.value.prosesor;
    }

    this.productService.editProduct(this.product);
    this.router.navigateByUrl('admin');
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Edit Product',
      message: 'Are you sure you want to edit this product?',
      buttons: [
        {
          text: 'Yes',
          handler: () => this.editProduct()
        },
        {
          text: 'No',
          handler: () => { this.router.navigateByUrl('admin'); }
        }
      ]
    });
    await alert.present();
  }

  getDummyProduct() {
    return {
      id: this.product.id, foto: '', jenis: '', merek: '', model: '', harga: 0, stok: 0,
      baseclock: 0, boostclock: 0, core: 0, thread: 0, speed: 0, chipset: '', prosesor: ''
    };
  }
}
