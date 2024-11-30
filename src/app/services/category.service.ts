import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category{
  idCategory: number;
  nameCategory: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl ="http://localhost:8080/category";

  constructor(private http: HttpClient) { }

  getCategory():Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrl)
  }

  getIdCategory(idCategory: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${idCategory}`);
  }

  getCategoryByName(nameCategory: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${nameCategory}`);
  }


  
}
