import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comments } from './comments.service';

export interface Entrepreneurship {
  idEntrepreneurship: number;
  entrepreneurshipName: string;
  entrepreneurshipDescription: string;
  image: string;
  address: string;
  idCity: number;
  nameCity: string;
  idUser: number;
  user: string;
  idCategories: number[]
  nameCategories: string[];
  comments: Comments[];
  likes: number;
}


export interface CreateEntrepreneurshipRequest {
  entrepreneurshipName: string;
  entrepreneurshipDescription: string;
  image: string;
  address: string;
  idCity: number;
  idUser: number;
  idCategories: number[];
}


@Injectable({
  providedIn: 'root'
})
export class EntrepreneurshipService {
  private apiUrl = "http://localhost:8080/entrepreneurship";

  private entrepreneurshipsSubject = new BehaviorSubject<Entrepreneurship[]>([]);
  entrepreneurships$ = this.entrepreneurshipsSubject.asObservable();

  constructor(private http: HttpClient) { }


  // Método para crear: Entrepreneurship
  createEntrepreneurship(entrepreneurship: CreateEntrepreneurshipRequest): Observable<Entrepreneurship> {
    return this.http.post<Entrepreneurship>(this.apiUrl, entrepreneurship)
  }

  // Método para obtener por id: Entrepreneurship
  getEntrepreneurshipById(idEntrepreneurship: number): Observable<Entrepreneurship> {
    return this.http.get<Entrepreneurship>(`${this.apiUrl}/${idEntrepreneurship}`);
  }

  // Método para obtener todos: Entrepreneurship
  getAllEntrepreneurships(): Observable<Entrepreneurship[]> {
    return this.http.get<Entrepreneurship[]>(this.apiUrl)
  }

  // Método para actualizar por id: Entrepreneurship
  updateEntrepreneurship(entrepreneurship: Entrepreneurship): Observable<Entrepreneurship> {
    return this.http.put<Entrepreneurship>(`${this.apiUrl}/${entrepreneurship.idEntrepreneurship}`, entrepreneurship);
  }

  // Método para eliminar por id: Entrepreneurship
  deleteEntrepreneurshipById(idEntrepreneurship: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idEntrepreneurship}`);
  }

  // Método para obtener por categoria: Entrepreneurship
  getEntrepreneurshipsByCategory(nameCategory: string): Observable<Entrepreneurship[]> {
    return this.http.get<Entrepreneurship[]>(`${this.apiUrl}/category/${nameCategory}`);
  }

  addComment(id: number, comment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/comments`, comment);
  }


  updateEntrepreneurships(data: Entrepreneurship[]): void {
    this.entrepreneurshipsSubject.next(data);
  }

}
