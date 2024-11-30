import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Entrepreneurship{
  idEntrepreneurship: number;
  entrepreneurshipName: string; 
  entrepreneurshipDescription: string;
  image: string;
  address: string;
  idCity: number;
  idUser: number;
  idCategories: number[]
}

@Injectable({
  providedIn: 'root'
})
export class EntrepreneurshipService {
  private apiUrl ="http://localhost:8080/entrepreneurship";

  constructor(private http: HttpClient) { }
  
    //metodos

    getEntrepreneurship():Observable<Entrepreneurship[]>{
      return this.http.get<Entrepreneurship[]>(this.apiUrl)
    }

     // Método para obtner un Entrepreneurship por id
     getIdEntrepreneurship(idEntrepreneurship: number): Observable<Entrepreneurship> {
      // Se hace una solicitud GET para obtener Entrepreneurship por su id
      return this.http.get<Entrepreneurship>(`${this.apiUrl}/${idEntrepreneurship}`);
    }
  
    createEntrepreneurship(entrepreneurship: Entrepreneurship):Observable<Entrepreneurship>{
      return this.http.post<Entrepreneurship>(this.apiUrl, entrepreneurship)
    }
    //modifcar  eliminar consulta x id
  
    // Método para actualizar un Entrepreneurship
    updateEntrepreneurship(entrepreneurship: Entrepreneurship): Observable<Entrepreneurship> {
      // Se hace una solicitud PUT para actualizar el dueño por su id
      return this.http.put<Entrepreneurship>(`${this.apiUrl}/${entrepreneurship.idEntrepreneurship}`, entrepreneurship);
    }
  
    // Eliminar Entrepreneurship
    deleteEntrepreneurship(idEntrepreneurship: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${idEntrepreneurship}`);
    }

}
