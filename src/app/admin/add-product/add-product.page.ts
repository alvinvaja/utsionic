import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  form: FormGroup;
  jenis: string;
  product: Product;
  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.jenis = '';
    this.form = new FormGroup({
      foto: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      jenis: new FormControl(null, {
        updateOn: 'change',
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
        validators: [Validators.required, Validators.min(0)]
      }),
      stok: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(0)]
      }),
      baseclock: new FormControl(null, {
        updateOn: 'blur',
        validators: [(this.jenis === 'cpu') ? Validators.required : Validators.nullValidator, Validators.min(0)]
      }),
      boostclock: new FormControl(null, {
        updateOn: 'blur',
        validators: [(this.jenis === 'cpu') ? Validators.required : Validators.nullValidator, Validators.min(0)]
      }),
      core: new FormControl(null, {
        updateOn: 'blur',
        validators: [(this.jenis === 'cpu') ? Validators.required : Validators.nullValidator, Validators.min(0)]
      }),
      thread: new FormControl(null, {
        updateOn: 'blur',
        validators: [(this.jenis === 'cpu') ? Validators.required : Validators.nullValidator, Validators.min(0)]
      }),
      speed: new FormControl(null, {
        updateOn: 'blur',
        validators: [(this.jenis === 'ram') ? Validators.required : Validators.nullValidator, Validators.min(0)]
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

    this.product = this.getDummyProduct();

    const allProducts = this.productService.getAllProducts();
    const lastId = allProducts[allProducts.length - 1].id + 1;

    this.product.id = lastId;
    this.product.jenis = this.jenis;
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

    this.productService.addProduct(this.product);
    this.router.navigateByUrl('admin');
  }

  getDummyProduct() {
    return {
      id: 0, foto: '', jenis: '', merek: '', model: '', harga: 0, stok: 0,
      baseclock: 0, boostclock: 0, core: 0, thread: 0, speed: 0, chipset: '', prosesor: ''
    };
  }
}
