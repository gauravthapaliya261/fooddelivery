import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  altImage = '../../assets/images/no-image.jpg';
  menu = [];
  selectedMenu = [];
  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.menuService.getAll().subscribe((result) => {
      this.menu = result;
      this.selectedMenu = this.menu;
    });
  }

  selectMenu(dishType): void {
    if (dishType === 'all') {
      this.selectedMenu = this.menu;
    } else {
      this.selectedMenu = this.menu.filter(item => item.dishType === dishType);
    }
  }

  addToCart(item) {
    this.menuService.addToCart(item);
  }
}
