import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Reaction {
  idReaction: number;
  hasReacted: boolean;
  idEntrepreneurship: number;
  idUser: number;
}


@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  private apiUrl = "http://localhost:8080/reaction";

  constructor(private http: HttpClient) { }


  // Método para crear: Reaction
  createReaction(reaction: Reaction): Observable<Reaction> {
    return this.http.post<Reaction>(this.apiUrl, reaction)
  }

  // Método para obtener por id: Reaction
  getReactionById(idReaction: number): Observable<Reaction> {
    return this.http.get<Reaction>(`${this.apiUrl}/${idReaction}`);
  }

  // Método para obtener todos: Reaction
  getAllReactions(): Observable<Reaction[]> {
    return this.http.get<Reaction[]>(this.apiUrl)
  }

  // Método para eliminar por id: Reaction
  deleteReactionById(idReaction: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idReaction}`);
  }

}
