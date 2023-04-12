import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  public token: string | undefined

  public category_loading: boolean = false
  public positions_loading: boolean = false


  public language: string = "ru"
  public cost: string = "Лей"

  main_categories: any[] | undefined
  main_positions: any[] | undefined

  public categories: any[] | undefined
  public category: string | undefined

  public positions: any


  setCost() {
    if (this.language == 'ru') {
      this.cost = "Лей"
    } else if (this.language == "en") {
      this.cost = "MDL"
    } else {
      this.cost = "Lei"
    }
  }

  mapCategories() {

    this.category_loading = true

    this.categories = this.main_categories!.map((item) => {

      let category: any = {
        _id: item._id,
        name: item.name
      }

      return category
    })

    if (!this.category) {
      this.category = this.categories[0]._id
    } else {
      const candidate = this.categories.find((category) => category._id === this.category)
      if (!candidate) {
        this.category = this.categories[0]._id
      }
    }

    setTimeout(() => {
      this.category_loading = false
    }, 1400);

  }

  setPositions() {
    this.positions_loading = true

    this.positions = this.main_positions!.filter(item => item.category === this.category);

    setTimeout(() => {
      this.positions_loading = false
    }, 1000);

  }

  // API запросы
  get(): Observable<any> {

    let queryParams = new HttpParams();

    if (this.token) {
      queryParams = queryParams.append("token", this.token);
    }

    return this.http.get<any>(`${environment.apiURL}/api/0101/menu`, { params: queryParams })
  }


}
