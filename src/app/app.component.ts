import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'shopping-experience';
  allProducts: Array<any> = [];
  public shoppingCartArray: Array<any> = [];
  loadingProducts: Boolean = true;


  constructor() { }

  ngOnInit(): void {
    this.loadAllProducts();
  }


  /**
   * Opens shopping and shows different container according to cart is empty or not.
   */
  openShoppingCart() {
    let shoppingCart = document.getElementById('shoppingCartContent');
    shoppingCart?.classList.remove('d-none');

    if (this.shoppingCartArray.length == 0) {
      this.shoppingCartIsEmpty();
    }

    if (this.shoppingCartArray.length > 0) {
      this.shoppingCartIsNotEmpty();
    }
  }


  /**
   * Executes, if length of shoppingCartArray[] = 0.
   */
  shoppingCartIsEmpty() {
    let emptyCart = document.getElementById('emptyCart');
    emptyCart?.classList.remove('d-none');
  }


  /**
   * Executes, if length of shoppingCartArray[] > 0.
   */
  shoppingCartIsNotEmpty() {
    let shoppingCartContentItems = document.getElementById('shoppingCartContentItems');
    shoppingCartContentItems?.classList.remove('d-none');
    this.hideEmptyCartContainer();
  }

  hideEmptyCartContainer() {
    let emptyCart = document.getElementById('emptyCart');
    emptyCart?.classList.add('d-none');
  }


  /**
   * Close shopping cart.
   */
  closeShoppingCart() {
    let shoppingCart = document.getElementById('shoppingCartContent');
    shoppingCart?.classList.add('d-none');
  }


  /**
    * Async Function for loading the products from fakestoreapi.com.
    */
  async loadAllProducts() {
    let url = 'https://fakestoreapi.com/products/';

    for (let i = 0; i < 9; i++) {
      const productUrl = url + (i + 1);
      let response = await fetch(productUrl);
      let responseAsJSON = await response.json();
      this.allProducts.push(responseAsJSON);
      this.loadingProducts = false;
      this.changeContainer();
    }
  }


  changeContainer(){
    if (!this.loadingProducts) {
      let productsOverview = document.getElementById('productsOverview');
      productsOverview?.classList.remove('d-none');
      let productsLoading = document.getElementById('productsLoading');
      productsLoading?.classList.add('d-none');
    }

  }


  /**
   * Add the required product to the cart.
   * @param i 
   */
  addToCart(i) {
    this.shoppingCartArray.push(this.allProducts[i]);
    this.hideEmptyCartContainer();
  }


  /**
   * Remove the required item from shopping cart.
   * @param i 
   */
  deleteItem(i) {
    this.shoppingCartArray.splice(i, 1);

    if (this.shoppingCartArray.length == 0) {
      this.shoppingCartIsEmpty();
    }
  }
}
