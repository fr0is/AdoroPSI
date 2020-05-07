import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HotelService } from '../hotel.service';
import { Quarto } from 'src/quarto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sticky-bar',
  templateUrl: './sticky-bar.component.html',
  styleUrls: ['./sticky-bar.component.css']
})

export class StickyBarComponent implements OnInit {

  @ViewChild('stickyMenu') menuElement: ElementRef;

  sticky: boolean = false;
  elementPosition: any;
  quartos: Quarto[] = [];
  totalQuartos = 0;
  precoMaisBaixo = 500;


  constructor(  private hotelService: HotelService ) { }

 
  ngOnInit(): void {
    this.showQuartos();
   }
 
   hotelId=this.hotelService.getHotelId();
 
   showQuartos() {
     this.hotelService.getHotelQuartos(this.hotelService.getHotelId()).subscribe(quartoList => {
       this.quartos = quartoList as Quarto[];
     });
   }

   countQuarto(item: Quarto){
    this.totalQuartos += item.nrQuartos;
    if(this.precoMaisBaixo > item.precoBaixa){
      this.precoMaisBaixo = item.precoBaixa;
    }
 }

}
