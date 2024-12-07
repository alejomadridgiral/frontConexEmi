import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface User {
  idUser: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  userPassword: string;
  idCity: number;
  nameCity: string;
  idRoles: number[];
}

export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  userPassword: string;
  idCity: number;
  idRoles: number[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl =  "http://localhost:8080/users";

  constructor(private http: HttpClient) { }


  // Método para crear: User
  createUser(user: CreateUser): Observable<CreateUser> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<CreateUser>(this.apiUrl, user, { headers })
  }

  // Método para obtener por id: User
  getUserById(idUser: number): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<User>(`${this.apiUrl}/${idUser}`, { headers });
  }

  // Método para obtener todos: User
  getAllUsers(): Observable<User[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<User[]>(this.apiUrl, { headers })
  }

  // Método para actualizar por id: User
  updateUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<User>(`${this.apiUrl}/${user.idUser}`, user, { headers });
  }

  // Método para eliminar por id: User
  deleteUserById(idUser: number): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<void>(`${this.apiUrl}/${idUser}`, { headers });
  }

}
