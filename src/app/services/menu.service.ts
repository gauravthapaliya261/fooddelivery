import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menu = [
    {
      title: 'Classic Omelet and Greens',
      description: 'Sneak some spinach into your morning meal for a boost of nutrients to start your day off right.',
      price: '8.99',
      dishType: 'break',
      image: '../../assets/images/classic-omelet-and-greens-1608662290.jpg'
    },
    {
      title: 'Pumpkin Chocolate Chip Bread',
      description: 'Make this over the weekend and wake up to a sweet, chocolatey treat every morning.',
      price: '8.99',
      dishType: 'meal',
      image: '../../assets/images/pumpkin-chocolate-chip-bread-1608663123.jpg'
    },
    {
      title: 'Cookie Cheesecake Bites',
      description: 'Everything is better in bite form, right? Especially these no-bake, make-ahead treats.',
      price: '8.60',
      dishType: 'dessert',
      image: '../../assets/images/cookie-cheesecake-bites-1620327440.jpg'
    },
    {
      title: 'Buttermilk Fried Chicken',
      description: 'Homemade crispy coated chicken is a real crowd pleaser and is best served with an easy barbecue side for the most delicious summer dinner.',
      price: '9.99',
      dishType: 'meal',
      image: '../../assets/images/family-dinner-ideas-buttermilk-fried-chicken-1586807337.jpg'
    },
    {
      title: 'Sheet Pan Sausage and Egg Bake',
      description: 'A hearty breakfast that easily feeds a family of four, all on one sheet pan? Yes, please.',
      price: '10.50',
      dishType: 'break',
      image: '../../assets/images/sheet-pan-sausage-and-egg-breakfast-bake-1608662384.jpg'
    },
    {
      title: 'Chicken Mole',
      description: 'Chicken mole features succulent, dark-meat chicken simmered in a rich, savory sauce of onions, tomatoes, chili powder and a touch of chocolate.',
      price: '16.00',
      dishType: 'meal',
      image: '../../assets/images/chicken-mole-1618003868.jpg'
    },
    {
      title: 'Vegetarian Lasagna',
      description: 'This rich layered pasta is perfect for a crowd. Make a big batch over the weekend and keep in your freezer for the night when prepping dinner is the last thing you want to do.',
      price: '8.99',
      dishType: 'meal',
      image: '../../assets/images/family-dinner-ideas-easy-vegetarian-lasagna-1577980403.jpg'
    },
    {
      title: 'Waffle Sammies',
      description: 'Best dessert in a pinch: Toast waffles, scoop on ice cream and roll it all in melted chocolate, coconut or nuts.',
      price: '15.60',
      dishType: 'drinks',
      image: '../../assets/images/waffle-sammies-1620665071.png'
    },
    {
      title: 'Ice Cream Float',
      description: 'This classic dessert is easy to make at home. To mix it up, experiment with different soda syrup and ice cream combos.',
      price: '6.99',
      dishType: 'dessert',
      image: '../../assets/images/ice-cream-float-1620664741.jpg'
    },
    {
      title: 'Very Berry Quinoa Muffins',
      description: 'Made with part almond flour, fresh raspberries and sweetened with honey, these are the delicious, healthy muffins your morning needs.',
      price: '12.45',
      dishType: 'break',
      image: '../../assets/images/very-berry-quinoa-muffins-1608662904.jpg'
    },
    {
      title: 'Green Beer',
      description: 'Hey, it wouldn\'t be St. Paddy\'s day without green beer. With just a drop or two of food dye, you can make easily make your own.',
      price: '5.15',
      dishType: 'drinks',
      image: '../../assets/images/green-beer-1577995714.jpg'
    },
    {
      title: 'Campfire Pops',
      description: 'Insert lollipop sticks into marshmallows; brush with melted dark chocolate and sprinkle with finely crushed graham crackers.',
      price: '8.55',
      dishType: 'dessert',
      image: '../../assets/images/campfire-pops-1620664885.jpg'
    },
    {
      title: 'Chili Dogs',
      description: 'A spoonful of spicy, meaty chili elevates an average hot dog to an epic dinner dish.',
      price: '8.99',
      dishType: 'meal',
      image: '../../assets/images/family-dinner-ideas-chili-dogs-ghk-1529344884.jpg'
    },
    {
      title: 'Mint Chocolate Chip Green',
      description: 'Start your St. Patrick\'s Day morning in a nutritious and delicious way while still being on-theme.',
      price: '8.99',
      dishType: 'drinks',
      image: '../../assets/images/st-patricks-day-drinks-mint-smoothie-1612365526.jpg'
    },
    {
      title: 'Golden Irish Mule Cocktail',
      description: 'Irish whiskey replaces vodka in this recipe, which also calls for festive edible glitter.',
      price: '8.55',
      dishType: 'drinks',
      image: '../../assets/images/st-patricks-day-drinks-irish-mule-1612366107.jpg'
    },
    {
      title: 'Clover Whiskey Sour',
      description: 'No pre-made mix required here, making sure this Irish-inspired cocktail is as fresh as can be.',
      price: '5.45',
      dishType: 'drinks',
      image: '../../assets/images/st-patricks-day-cocktails-whiskey-sour-1612366578.jpg'
    }
  ];

  obsMenu = of(this.menu);
  storedItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
  private cartItems = new BehaviorSubject<any>(this.storedItems ? this.storedItems : []);
  getCartItems = this.cartItems.asObservable();
  constructor() { }

  getAll() {
    return this.obsMenu;
  }

  getDetails(itemTitle) {
    const detail = this.menu.find(i => i.title === itemTitle);
    const result = of(detail);
    return result;
  }

  addToCart(item) {
    const index = this.storedItems.findIndex(i => i.title === item.title);
    if (index !== -1) {
      Swal.fire('Oops !', item.title + ' already in cart !', 'info');
      return;
    } else {
      this.storedItems.push(item);
      this.storedItems.forEach(i => i.quantity = 1);
      Swal.fire('Success !', item.title + ' added to cart !', 'success');
      localStorage.removeItem('cartItems');
      localStorage.setItem('cartItems', JSON.stringify(this.storedItems));
      this.cartItems.next(this.storedItems);
    }
  }

  clearCart() {
    this.storedItems = [];
    this.cartItems.next([]);
  }
}
