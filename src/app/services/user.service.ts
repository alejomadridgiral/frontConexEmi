import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseurl } from '../../config/baseurl';


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
  private apiUrl = `${baseurl}/users`;

  constructor(private http: HttpClient) { }


  // Método para crear: User
  createUser(user: CreateUser): Observable<CreateUser> {
    return this.http.post<CreateUser>(this.apiUrl, user)
  }

  // Método para obtener por id: User
  getUserById(idUser: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${idUser}`);
  }

  // Método para obtener todos: User
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
  }

  // Método para actualizar por id: User
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.idUser}`, user);
  }

  // Método para eliminar por id: User
  deleteUserById(idUser: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idUser}`);
  }

}
