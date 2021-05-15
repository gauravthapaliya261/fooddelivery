import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {

  altImage = '../../assets/images/no-image.jpg';
  selectedItem: any;
  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getDetails(params.title);
    });
  }

  getDetails(title) {
    this.menuService.getDetails(title).subscribe((result) => {
      this.selectedItem = result;
    });
  }

  addToCart() {
    this.menuService.addToCart(this.selectedItem);
  }

}
