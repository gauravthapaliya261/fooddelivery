import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutItems = [];
  altImage = '../../assets/images/no-image.jpg';
  subTotal = 0;
  shippingCost = 0;
  grandTotal = 0;
  formBasic: FormGroup;

  constructor(
    private menuService: MenuService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.menuService.getCartItems.subscribe((data) => {
      this.checkoutItems = data;
      this.updateTotal();
      this.buildForm();
    });
  }

  buildForm() {
    this.formBasic = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cvc: ['', Validators.required],
      expiryDate: ['', Validators.required],
      subTotal: [this.subTotal],
      shippingCost: [this.shippingCost],
      grandTotal: [this.grandTotal]
    });
  }

  get firstName() {
    return this.formBasic.get('firstName');
  }

  get lastName() {
    return this.formBasic.get('lastName');
  }

  get cardNumber() {
    return this.formBasic.get('cardNumber');
  }

  get cvc() {
    return this.formBasic.get('cvc');
  }

  get expiryDate() {
    return this.formBasic.get('expiryDate');
  }

  increment(item) {
    this.checkoutItems.find((i => i.title === item.title ? i.quantity = i.quantity * 1 + 1 : null));
    console.log(this.checkoutItems);
    this.updateTotal();
  }

  decrement(item) {
    if (item.quantity > 1) {
      this.checkoutItems.find((i => i.title === item.title ? i.quantity = i.quantity * 1 - 1 : null));
      this.updateTotal();
    }
    console.log(this.checkoutItems);
  }

  removeItem(item) {
    Swal.fire({
      title: 'Warning !',
      text: 'Are you sure you want to remove ' + item.title + ' from the cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire('Deleted', item.title + ' removed from the cart.', 'success');
        const index = this.checkoutItems.findIndex(i => i.title === item.title);
        this.checkoutItems.splice(index, 1);
        this.updateTotal();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  }

  clearCart() {
    this.checkoutItems = [];
    this.updateTotal();
    this.menuService.clearCart();
    Swal.fire('Success !', 'Cart cleared succesfully !', 'success');
  }

  updateTotal() {
    this.subTotal = 0;
    this.checkoutItems.forEach(i => {
      this.subTotal += i.price * i.quantity;
    });
    this.shippingCost = this.subTotal * 0.10;
    this.grandTotal = this.subTotal + this.shippingCost;
    localStorage.removeItem('cartItems');
    localStorage.setItem('cartItems', JSON.stringify(this.checkoutItems));
  }

  callCh(item, event) {
    item.quantity = event.target.value as number;
    this.updateTotal();
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => { }, (reason) => { });
  }

  submitForm() {
    console.log(this.formBasic.value);
  }
}
