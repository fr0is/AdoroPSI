import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from "@angular/forms";
import { Quarto } from 'src/quarto';
import { HotelService } from '../hotel.service';
import { User } from 'src/user';
import { UserService } from '../user.service';
import { Hotel } from 'src/hotel';
import { Morada } from 'src/morada';
import { CartaoMBService } from '../cartao-mb.service';
import { CartaoMB } from 'src/cartaoMB';
import { Reserva } from 'src/reserva';

@Component({
  selector: 'app-reserva-quarto',
  templateUrl: './reserva-quarto.component.html',
  styleUrls: ['./reserva-quarto.component.css','./paginaReserva.css','./paginaIdentificacao.css','./botaoReservar.css','./paginaDatas.css','./paginaMetodoPagamento.css'],
})
export class ReservaQuartoComponent implements OnInit {

  quartoFinal: Quarto;
  cartaoFinal: CartaoMB;
  moradaFinal: Morada;
  nomeFinal: String;
  emailFinal: String;
  indicativoFinal: String;
  telefoneFinal: String;
  nifFinal: String;
  quartos: Quarto[] = [];
  moradaId: any;
  cartoes = [];
  moradaIdFinal: any;
  mudaPagina = false;
  erroDatas = false;
  errorMessage;
  moradas = [];
  cliente: User;
  userAtual = "";
  updateForm: FormGroup;
  clienteUpdate: User = {
    _id: "",
    nome: "",
    email: "",
    password: "",
    indicativo: "",
    telefone: "",
    nif: "",
    morada: [],
    cartaoMB: [],
    reservas: []
  }
  morada: Morada ={
    _id: "",
    rua: "",
    codigoPostal: "",
    cidade: "",
    pais: "",
    userEmail: ""
  }
  cartaoMB: CartaoMB ={
    _id: "",
    numero: "",
    nome: "",
    prazoAno: 0,
    prazoMes: 0,
    cvv: "",  
    userEmail: "",
  }
  reserva: Reserva ={
    _id: "",
    userEmail: "",
    emailReserva: "",
    nomeReserva: "",
    indicativoReserva: "",
    telefoneReserva: "",
    nifReserva: "",
    quarto: null,
    metodoDePagamento: null,
    morada: null,
    checkIn: null,
    checkOut: null,
    preco: 600,
  }
  hotel: Hotel;
  /**** Booleans de cada pagina ****/
  datasQuarto = true;
  dadosCliente = false;
  pagamento = false;
  final = false;
  criarM = false;
  foto = "";
  criar = false;
  //Forms
  datasQuartoForm: FormGroup;
  createMorada: FormGroup;
  createCartao: FormGroup;
  //Dados Forms
  checkIn = localStorage.getItem('checkInR');
  checkOut = localStorage.getItem('checkOutR');
  quarto = localStorage.getItem('quartoR');
  selectedQuarto = localStorage.getItem('quartoR');
  cartaoId: any;
  cartaoIdFinal: string;
  constructor(
    private formBuilder: FormBuilder,
    private hotelService: HotelService,
    private userService: UserService,
    private cartaoMBService: CartaoMBService
  ) { 
    this.datasQuartoForm = this.formBuilder.group({
      checkInInicial: this.formBuilder.control(this.checkIn),
      checkOutInicial: this.formBuilder.control(this.checkOut),
      quartoInicial: this.formBuilder.control(this.quarto)
    });
    this.createMorada = this.formBuilder.group({
      rua: this.formBuilder.control(""),
      codigoPostal: this.formBuilder.control(""),
      cidade: this.formBuilder.control(""),
      pais: this.formBuilder.control(""),
    });
    this.createCartao = this.formBuilder.group({
      numeroCartao1: this.formBuilder.control(""),
      numeroCartao2: this.formBuilder.control(""),
      numeroCartao3: this.formBuilder.control(""),
      numeroCartao4: this.formBuilder.control(""),
      dataCartao: this.formBuilder.control(""),
      nomeCartao: this.formBuilder.control(""),
      cvvCartao: this.formBuilder.control(""),
      dataCartaoAno: this.formBuilder.control(""),
      dataCartaoMes: this.formBuilder.control("")
    });
  }


  ngOnInit(): void {
    this.showQuartos();
    this.getCliente();
    this.getHotel();
    this.userAtualCheck();
  }

  userAtualCheck(){
    this.userAtual = localStorage.getItem("userAtual");
  }

  showQuartos() {
    this.hotelService.getHotelQuartos(sessionStorage.getItem("hotelAtual")).subscribe(quartoList => {
      this.quartos = quartoList as Quarto[];
      for (let i = 0; i < this.quartos.length; i++) {
        if(this.quartos[i].tipo === this.selectedQuarto){
          this.foto = this.quartos[i].foto;
        }
      }
    });
  }

  
  getHotel() {
    this.hotelService.getHotel(sessionStorage.getItem("hotelAtual")).subscribe(results => {
      this.hotel = results;
    })
  }
  
  mudaQuarto(quarto){
    this.selectedQuarto = quarto;
    for (let i = 0; i < this.quartos.length; i++) {
      if(this.quartos[i].tipo === this.selectedQuarto){
        this.foto = this.quartos[i].foto;
      }
    }
  }

  updateDataQD(updateDataDQ){
    if(!this.compareTwoDates()){
      this.erroDatas = true;
    }else{
    this.checkIn = updateDataDQ.checkInInicial;
    this.checkOut = updateDataDQ.checkOutInicial;
    this.quarto = updateDataDQ.quartoInicial;
    this.datasQuarto = false;
    this.dadosCliente = true;
    this.erroDatas = false;
    this.mudaPagina = true;
    }
  }

  pagamentoN(){
    this.dadosCliente = false;
    this.pagamento = true;
    this.cartaoMBService.getCartaoEmail(this.cliente.email).subscribe(listCartao => {
      this.cartoes = listCartao as [];
    })
  }


  finalN(){
    this.cartaoIdFinal = this.cartaoId;
    sessionStorage.setItem('cartaoReserva',this.cartaoIdFinal);
    this.cartaoMBService.getCartao(sessionStorage.getItem('cartaoReserva')).subscribe(results =>{
        this.cartaoFinal = results;
    });  
    this.userService.getMorada(sessionStorage.getItem('moradaReserva')).subscribe(results =>{
      this.moradaFinal = results;
    });
    this.nomeFinal = sessionStorage.getItem('nomeReserva');
    this.emailFinal = sessionStorage.getItem('emailReserva')
    this.indicativoFinal = sessionStorage.getItem('indicativoReserva')
    this.telefoneFinal = sessionStorage.getItem('numeroReserva')
    this.nifFinal = sessionStorage.getItem('nifReserva')
    this.pagamento = false;
    this.final = true;
  }

  goBack(){
    if(this.datasQuarto){
      return;
    }
    if(this.dadosCliente){
      this.datasQuarto = true;
      this.dadosCliente = false;
    }else{
      if(this.pagamento){
        this.dadosCliente = true;
        this.pagamento = false;
      }else{
        this.pagamento = true;
        this.final = false;
      }
    }
  }

  createReserva(){
    this.reserva.metodoDePagamento = sessionStorage.getItem('cartaoReserva');
    this.reserva.morada = sessionStorage.getItem('moradaReserva');
    this.reserva.checkIn = new Date(this.checkIn);
    this.reserva.checkOut = new Date(this.checkOut);
    this.reserva.quarto = this.selectedQuarto;
    this.reserva.userEmail = this.cliente.email;
    this.reserva.emailReserva = sessionStorage.getItem('emailReserva');
    this.reserva.nomeReserva = sessionStorage.getItem('nomeReserva');
    this.reserva.indicativoReserva = sessionStorage.getItem('indicativoReserva');
    this.reserva.telefoneReserva = sessionStorage.getItem('numeroReserva');
    this.reserva.nifReserva =sessionStorage.getItem('nifReserva');
    console.log(this.reserva);
    this.userService.createReserva(this.reserva).subscribe(message => {
      alert(message);
    });
    /**** Apagar dados reserva *****/
    sessionStorage.removeItem('checkInR');
    sessionStorage.removeItem('checkOutR');
    sessionStorage.removeItem('quartoR');
    sessionStorage.removeItem('cartaoReserva');
    sessionStorage.removeItem('moradaReserva');
    sessionStorage.removeItem('emailReserva');
    sessionStorage.removeItem('nomeReserva');
    sessionStorage.removeItem('indicativoReserva');
    sessionStorage.removeItem('numeroReserva');
    sessionStorage.removeItem('nifReserva');
    this.datasQuartoForm.reset();
    this.createMorada.reset();
    this.createCartao.reset();
  }

  compareTwoDates(){
    if(new Date(this.datasQuartoForm.controls['checkOutInicial'].value)<new Date(this.datasQuartoForm.controls['checkInInicial'].value)){
       return false;
    }else{
      return true;
    }
  }

  changeStateDateErro(){
    this.erroDatas = !this.erroDatas;
  }

  onItemChange(valor){
    this.moradaId = valor;
  }

  onItemChangeCMB(valor){
    this.cartaoId = valor;
  }

  getCliente(){
    this.userService.getUser(localStorage.getItem('userAtual')).subscribe(user => {
      this.cliente = user[0];
      this.userService.getUserMoradas(this.cliente.email).subscribe(listMorada => {
        this.moradas = listMorada as [];
      })
      if(sessionStorage.getItem('indicativoReserva') === null){
        sessionStorage.setItem('indicativoReserva', '');
      }
      if(sessionStorage.getItem('numeroReserva') === null){
        sessionStorage.setItem('numeroReserva', '');
      }
      if(sessionStorage.getItem('nifReserva') === null){
        sessionStorage.setItem('nifReserva', '');
      }
      this.updateForm = this.formBuilder.group({
        nomeUpdate: this.formBuilder.control(sessionStorage.getItem('nomeReserva')),
        emailUpdate: this.formBuilder.control(sessionStorage.getItem('emailReserva')),
        indicativoUpdate: this.formBuilder.control(sessionStorage.getItem('indicativoReserva')),
        telefoneUpdate: this.formBuilder.control(sessionStorage.getItem('numeroReserva')),
        nifUpdate: this.formBuilder.control(sessionStorage.getItem('nifReserva')),
      })
      this.moradaId = sessionStorage.getItem('moradaReserva');
      this.moradaIdFinal = sessionStorage.getItem('moradaReserva');
      this.cartaoId = sessionStorage.getItem('cartaoReserva');
      this.cartaoIdFinal = sessionStorage.getItem('cartaoReserva');
    }); 
  }


  updateClienteReserva(updateData){
    //Update Form Data  
    sessionStorage.setItem('nomeReserva',updateData.nomeUpdate);
    sessionStorage.setItem('emailReserva',updateData.emailUpdate);
    sessionStorage.setItem('indicativoReserva',updateData.indicativoUpdate);
    sessionStorage.setItem('numeroReserva',updateData.telefoneUpdate);
    sessionStorage.setItem('nifReserva',updateData.nifUpdate);
    this.moradaIdFinal = this.moradaId;
    sessionStorage.setItem('moradaReserva',this.moradaIdFinal);
    this.pagamentoN();
  }

  criarMorada(){
    this.criarM = !this.criarM;
  }

  createM(moradaData){
    this.criarM = !this.criarM;
    this.morada.rua = moradaData.rua;
    this.morada.codigoPostal = moradaData.codigoPostal;
    this.morada.cidade = moradaData.cidade;
    this.morada.pais = moradaData.pais;
    this.morada.userEmail = localStorage.getItem('userAtual');
    this.createMorada.reset();

    console.log(this.morada);
  
    this.userService.createMorada(this.morada).subscribe(result => {
      if(result.message === "success"){
        window.location.href = 'hoteisPSI/' + sessionStorage.getItem('hotelNome')+'/reservar';
      }else{
        alert("Ocorreu um erro a criar a morada!");
      }
    });
  }

  criarCartao(){
    this.criar = !this.criar;
  }

  create(cartaoData){
    const nrCartao = cartaoData.numeroCartao1 + cartaoData.numeroCartao2 + cartaoData.numeroCartao3 + cartaoData.numeroCartao4;
    this.criar = !this.criar;
    this.cartaoMB.numero = nrCartao;
    this.cartaoMB.nome = cartaoData.nomeCartao;
    this.cartaoMB.prazoAno = cartaoData.dataCartaoAno;
    this.cartaoMB.prazoMes = cartaoData.dataCartaoMes;
    this.cartaoMB.cvv = cartaoData.cvvCartao;
    this.cartaoMB.userEmail = localStorage.getItem('userAtual');
    this.createCartao.reset();
  
    this.cartaoMBService.createCartao(this.cartaoMB).subscribe(result => {
      if(result.message === "success"){
        window.location.href = 'hoteisPSI/' + sessionStorage.getItem('hotelNome')+'/reservar';
      }else{
        alert("Ocorreu um erro a criar o cartao!");
      }
    });
  }
  
  format(s) {
    return s.toString().replace(/\d{4}(?=.)/g, '$& ');
  }

}