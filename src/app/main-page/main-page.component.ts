import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent  {

  options: AnimationOptions = {
    path: '/assets/animation/Baltika_Logo.json',
  };

  constructor (public menuService: MenuService) {}

  setLanguage(lang: string) {
    this.menuService.language = lang
    localStorage.setItem('language', lang);

    this.menuService.setCost();
  }

  languageColor(lang: string) {
    return this.menuService.language === lang ? 'selected' : ''
  }

}
