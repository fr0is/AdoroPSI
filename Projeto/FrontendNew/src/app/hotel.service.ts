import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hotel } from 'src/hotel';
import { Quarto } from 'src/quarto';

@Injectable({
  providedIn: 'root'
})

export class HotelService {

  baseUrl = 'http://localhost:3000/catalog/';
  hoteisUrl = this.baseUrl + 'hoteis/';
  hotelUrl = this.baseUrl + 'hoteis/';
  quartosUrl = this.baseUrl + 'hoteis/' + this.getHotelId() + '/quartos/';
  

  constructor(private http: HttpClient) { }
  HotelId="";

  setHotelId(id){
    this.HotelId = id;
  }

  getHotelId(){
    return this.HotelId;
  }

  getHoteis() {
    return this.http.get(this.hoteisUrl);
  }

  getHotel(id: string) {
    const url = this.hotelUrl + id;
    return this.http.get<Hotel>(url);
  }

  getHotelQuartos(id: string) {
    const url = this.hotelUrl + id +"/quartos";
    return this.http.get(url);
  }

  getHotelQuarto(id: string) {
    const url = this.quartosUrl + id;
    return this.http.get<Quarto>(url);
  }
}