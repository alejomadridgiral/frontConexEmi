import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';


export interface Category {
  idCategory: number;
  nameCategory: string
}


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl =  "http://localhost:8080/category";
  
  constructor(private http: HttpClient) { }


  // Método para obtener por id: Category
  getCategoryById(idCategory: number): Observable<Category> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Category>(`${this.apiUrl}/${idCategory}`, { headers });
  }

  // Método para obtener por name: Category
  getCategoryByName(nameCategory: string): Observable<Category> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Category>(`${this.apiUrl}/${nameCategory}`, { headers });
  }

  // Método para obtener todos: Category
  getAllCategories(): Observable<Category[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Category[]>(this.apiUrl, { headers });
  }


}
