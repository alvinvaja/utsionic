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
      jenis: 'CPU',
      harga: 5900000,
      stok: 25
    },
    {
      id: 2,
      foto: 'https://images-na.ssl-images-amazon.com/images/I/71EXOwFSf-L._AC_UL115_.jpg',
      model: 'Vengeance LPX 16GB',
      merek: 'Corsair',
      jenis: 'RAM',
      harga: 1250000,
      stok: 30
    },
    {
      id: 3,
      foto: 'https://images-na.ssl-images-amazon.com/images/I/514km%2BZccrL._AC_SL1000_.jpg',
      model: 'GEFORCE RTX 2020 TI Founders Edition',
      merek: 'NVIDIA',
      jenis: 'GPU',
      harga: 24000000,
      stok: 15
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
}
