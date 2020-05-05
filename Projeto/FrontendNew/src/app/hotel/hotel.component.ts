import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel.service';
import { Hotel } from 'src/hotel';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

    hotel: Hotel = {
      _id: "",
      nome: "",
      descricao: [],
      local:  "",
      zona:  "",
      codigoPostal: "",
      pais: "",
      latitude: "",
      longitude: "",
      codigoRegiao: "",
      telefone: "",
      email: "",
      servicos: []
    };

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) { }

  ngOnInit(): void {
    this.getHotel();
  }

  getHotel() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.hotelService.getHotel(id).subscribe(results => {
        this.hotel = results;
      });
    }else{
      alert("Hotel não encontrado");
    }
  }

}
