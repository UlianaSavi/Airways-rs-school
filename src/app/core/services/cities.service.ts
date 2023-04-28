import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from 'src/app/search/models/cities.model';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  constructor(private http: HttpClient) {}

  getCities = () => {
    const url = '/cities';
    return this.http.get<City[]>(url);
  };
}
