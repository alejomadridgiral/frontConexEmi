import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Comments {
  idComment: number;
  commentDescription: string;
  idEntrepreneurship: number;
  idUser: number;
}


@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private apiUrl = "http://localhost:8080/comments";

  constructor(private http: HttpClient) { }

  // Método para crear: Comments
  createComments(comment: Comments): Observable<Comments> {
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

}
