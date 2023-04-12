import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent {

  constructor(
    public menuService: MenuService
  ) { }

  changeCategory() {
    localStorage.setItem('category', this.menuService.category!);

    this.menuService.setPositions();
  }

}
