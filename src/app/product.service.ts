import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Array<Product> = [
    {
      id: 1,
      foto: 'https://images-na.ssl-images-amazon.com/images/I/717j%2Bx%2BsAFL._AC_UL320_SR300,320_.jpg',
      model: 'i7 - 10700k',
      merek: 'Intel',
      jenis: 'cpu',
      harga: 5900000,
      stok: 25,
      baseclock: 3.80,
      boostclock: 5.10,
      core: 8,
      thread: 16,
      speed: 0,
      chipset: '',
      prosesor: ''
    },
    {
      id: 2,
      foto: 'https://images-na.ssl-images-amazon.com/images/I/71EXOwFSf-L._AC_UL115_.jpg',
      model: 'Vengeance LPX 16GB',
      merek: 'Corsair',
      jenis: 'ram',
      harga: 1250000,
      stok: 30,
      baseclock: 0,
      boostclock: 0,
      core: 0,
      thread: 0,
      speed: 2800,
      chipset: '',
      prosesor: ''
    },
    {
      id: 3,
      foto: 'https://images-na.ssl-images-amazon.com/images/I/514km%2BZccrL._AC_SL1000_.jpg',
      model: 'GEFORCE RTX 2020 TI Founders Edition',
      merek: 'NVIDIA',
      jenis: 'gpu',
      harga: 24000000,
      stok: 15,
      baseclock: 0,
      boostclock: 0,
      core: 0,
      thread: 0,
      speed: 0,
      chipset: '',
      prosesor: ''
    }
  ];
  constructor() { }

  getAllProducts() {
    return this.products;
  }

  getProduct(productId: number) {
    return {...this.products.find(product => {
      return product.id === productId;
    })};
  }

  getProductIndex(id: number) {
    let i = 0;
    for (i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        return i;
      }
    }
    return i;
  }

  addProduct(product: Product) {
    this.products.push(product);
  }

  deleteProduct(productDeleted: Product) {
    this.products = this.products.filter(product => {
      return product.id !== productDeleted.id;
    });
  }

  editProduct(product: Product) {
    const index = this.getProductIndex(product.id);
    this.products[index] = product;
  }
}
