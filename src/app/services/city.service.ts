import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface City {
  idCity: number;
  nameCity: string
}


@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl =  "http://localhost:8080/city";
  
  constructor(private http: HttpClient) { }


  // Método para crear: City
  createCity(city: City): Observable<City> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<City>(this.apiUrl, city, { headers })
  }

  // Método para obtener por id: City
  getCityById(idCity: number): Observable<City> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<City>(`${this.apiUrl}/${idCity}`, { headers });
  }

  // Método para obtener por name: City
  getCityByName(nameCity: string): Observable<City> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<City>(`${this.apiUrl}/${nameCity}`, { headers });
  }

  // Método para obtener todos: City
  getAllCities(): Observable<City[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<City[]>(this.apiUrl, { headers })
  }

  
}
