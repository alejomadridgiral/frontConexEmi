import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { baseurl } from '../../config/baseurl';


export interface Comments {
  idComment: number;
  commentDescription: string;
  commentDate: string;
  idEntrepreneurship: number;
  entrepreneurshipName: string;
  idUser: number;
  user: string;
  totalComments: number;
}


export interface CreateComments {
  commentDescription: string;
  idEntrepreneurship: number;
  idUser: number;
}


@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private apiUrl = `${baseurl}/comments`;

  private commentAddedSource = new Subject<void>(); // Subject que se utiliza para notificar cuando se agrega un nuevo comentario
  commentAdded$ = this.commentAddedSource.asObservable();  // Observable que expone el evento de notificación de nuevo comentario

  constructor(private http: HttpClient) { }


  // Método para crear: Comments
  createComments(comment: CreateComments): Observable<Comments> {
    return this.http.post<Comments>(this.apiUrl, comment)
  }

  // Método para obtener por id: Comments
  getCommentById(idComment: number): Observable<Comments> {
    return this.http.get<Comments>(`${this.apiUrl}/${idComment}`);
  }

  // Método para obtener todos: Comments
  getAllComments(): Observable<Comments[]> {
    return this.http.get<Comments[]>(this.apiUrl)
  }

  // Método para eliminar por id: Comments
  deleteCommentById(idComment: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idComment}`);
  }

  // Método para obtener por entrepreneurship: Comments
  getCommentsByEntrepreneurship(idEntrepreneurship: number): Observable<Comments[]> {
    return this.http.get<Comments[]>(`${this.apiUrl}/${idEntrepreneurship}`);
  }

  // Método para notificar que un nuevo comentario ha sido agregado.
  notifyCommentAdded() { 
    this.commentAddedSource.next(); // Emite un evento indicando que un comentario ha sido agregado
  }


}
