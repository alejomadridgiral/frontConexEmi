import { HttpClient } from '@angular/common/http';
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
  private apiUrl = "http://localhost:8080/city";

  constructor(private http: HttpClient) { }


  // Método para crear: City
  createCity(city: City): Observable<City> {
    return this.http.post<City>(this.apiUrl, city)
  }

  // Método para obtener por id: City
  getCityById(idCity: number): Observable<City> {
    return this.http.get<City>(`${this.apiUrl}/${idCity}`);
  }

  // Método para obtener por name: City
  getCityByName(nameCity: string): Observable<City> {
    return this.http.get<City>(`${this.apiUrl}/${nameCity}`);
  }

  // Método para obtener todos: City
  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl)
  }

  
}
