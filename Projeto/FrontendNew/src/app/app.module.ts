import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng5SliderModule } from 'ng5-slider';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AVerOMarComponent } from './aver-omar/aver-omar.component';
import { DouroVinhasComponent } from './douro-vinhas/douro-vinhas.component';
import { DvHomeComponent } from './dv-home/dv-home.component';
import { DVQuartosComponent } from './dvquartos/dvquartos.component';
import { DvquartosServicosComponent } from './dvquartos-servicos/dvquartos-servicos.component';
import { DvstandardComponent } from './dvstandard/dvstandard.component';
import { DvsuiteComponent } from './dvsuite/dvsuite.component';
import { DvsuiteDeluxeComponent } from './dvsuite-deluxe/dvsuite-deluxe.component';
import { DvsuiteDuplexComponent } from './dvsuite-duplex/dvsuite-duplex.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MarHomeComponent } from './mar-home/mar-home.component';
import { MediterraneoComponent } from './mediterraneo/mediterraneo.component';


@NgModule({
  declarations: [
    AppComponent,
    AVerOMarComponent,
    DouroVinhasComponent,
    DvHomeComponent,
    DVQuartosComponent,
    DvquartosServicosComponent,
    DvstandardComponent,
    DvsuiteComponent,
    DvsuiteDeluxeComponent,
    DvsuiteDuplexComponent,
    HomePageComponent,
    MarHomeComponent,
    MediterraneoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng5SliderModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }