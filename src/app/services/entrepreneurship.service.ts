import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  totalComments: number;
  totalReactions: number;
}


export interface CreateEntrepreneurship {
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

  private apiUrl =  "http://localhost:8080/entrepreneurship";

  private entrepreneurshipsSubject = new BehaviorSubject<Entrepreneurship[]>([]); // Subject para almacenar y gestionar la lista de emprendimientos
  entrepreneurships$ = this.entrepreneurshipsSubject.asObservable(); // Observable que expone la lista de emprendimientos para que otros componentes puedan suscribirse a ella

  constructor(private http: HttpClient) { }


  // Método para crear: Entrepreneurship
  createEntrepreneurship(entrepreneurship: CreateEntrepreneurship): Observable<Entrepreneurship> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Entrepreneurship>(this.apiUrl, entrepreneurship, { headers })
  }

  // Método para obtener por id: Entrepreneurship
  getEntrepreneurshipById(idEntrepreneurship: number): Observable<Entrepreneurship> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Entrepreneurship>(`${this.apiUrl}/${idEntrepreneurship}`, { headers });
  }

  // Método para obtener todos: Entrepreneurship
  getAllEntrepreneurships(): Observable<Entrepreneurship[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Entrepreneurship[]>(this.apiUrl, { headers })
  }

  // Método para actualizar por id: Entrepreneurship
  updateEntrepreneurship(entrepreneurship: Entrepreneurship): Observable<Entrepreneurship> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Entrepreneurship>(`${this.apiUrl}/${entrepreneurship.idEntrepreneurship}`, entrepreneurship, { headers });
  }

  // Método para eliminar por id: Entrepreneurship
  deleteEntrepreneurshipById(idEntrepreneurship: number): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<void>(`${this.apiUrl}/${idEntrepreneurship}`, { headers });
  }

  // Método para obtener por categoria: Entrepreneurship
  getEntrepreneurshipsByCategory(nameCategory: string): Observable<Entrepreneurship[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Entrepreneurship[]>(`${this.apiUrl}/category/${nameCategory}`, { headers });
  }

  // Método para actualizar la lista de emprendimientos localmente en el servicio.
  updateEntrepreneurships(data: Entrepreneurship[]): void {
    this.entrepreneurshipsSubject.next(data); // Actualiza la lista de emprendimientos usando el BehaviorSubject
  }
  

}
