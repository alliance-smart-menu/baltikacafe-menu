import { Component, OnInit } from '@angular/core';

import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  version: string = "1.00"

  constructor (private menuService: MenuService) {}

  ngOnInit(): void {
    this.checkVersion();
    this.FindSavedSettings();
    this.menuService.setCost();
    this.getMenu();
  }

  checkVersion() {
    let current_version = localStorage.getItem("version");
    if (!current_version || current_version !== this.version) {
      localStorage.removeItem('language');
      localStorage.removeItem('category');
      localStorage.setItem("version", this.version);
    }
  }


  FindSavedSettings() {

    const token = localStorage.getItem("token");
    if (token) {
      this.menuService.token = token
    }

    const language = localStorage.getItem('language');
    if (language) {
      this.menuService.language = language
    }

    const category = localStorage.getItem('category');
    if (category) {
      this.menuService.category = category
    }

  }

  getMenu() {

    this.menuService.get().subscribe(
      (data) => {
        this.menuService.main_categories = data.categories
        this.menuService.mapCategories();
        this.menuService.main_positions = data.positions
        this.menuService.setPositions();
        if (data.token) {
          localStorage.setItem("token", data.token);
          this.menuService.token = data.token
        }
      },
      error => {
        console.log(error)
      }
    )

  }

}
