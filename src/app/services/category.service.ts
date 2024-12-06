import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseurl } from '../../config/baseurl';


export interface Category {
  idCategory: number;
  nameCategory: string
}


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${baseurl}/category`;

  constructor(private http: HttpClient) { }


  // Método para obtener por id: Category
  getCategoryById(idCategory: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${idCategory}`);
  }

  // Método para obtener por name: Category
  getCategoryByName(nameCategory: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${nameCategory}`);
  }

  // Método para obtener todos: Category
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl)
  }


}
