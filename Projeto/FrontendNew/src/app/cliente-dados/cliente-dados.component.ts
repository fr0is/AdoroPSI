import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/user';
import { FormGroup, FormControl, FormArray, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-dados',
  templateUrl: './cliente-dados.component.html',
  styleUrls: ['./cliente-dados.component.css']
})
export class ClienteDadosComponent implements OnInit {

  cliente: User;
  updateForm: FormGroup;
  clienteUpdate: User = {
    _id: "",
    nome: "",
    email: "",
    password: "",
    indicativo: "",
    telefone: "",
    morada: [],
    cartaoMB: [],
    reservas: []
  }
  errorMessage = "";

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public router: Router
  ) { 
  }

  ngOnInit(): void {
    this.getCliente();
  }


    getCliente(){
      this.userService.getUser(localStorage.getItem('userAtual')).subscribe(user => {
        this.cliente = user[0];
        this.updateForm = this.formBuilder.group({
          nomeUpdate: this.formBuilder.control(this.cliente.nome),
          emailUpdate: this.formBuilder.control(this.cliente.email),
          indicativoUpdate: this.formBuilder.control(this.cliente.indicativo),
          telefoneUpdate: this.formBuilder.control(this.cliente.telefone),
        })
      }); 
    }


  updateCliente(updateData){
    console.log("iniciou update")
    //Update Form Data  
    this.clienteUpdate.nome = updateData.nomeUpdate;
    this.clienteUpdate.email = updateData.emailUpdate;
    this.clienteUpdate.telefone = updateData.telefoneUpdate;
    this.clienteUpdate.indicativo = updateData.indicativoUpdate;
    //Data que nao muda
    this.clienteUpdate.password = this.cliente.password;
    this.clienteUpdate._id = this.cliente._id;
    console.log(this.clienteUpdate);
    this.updateForm.reset();

    this.userService.updateUser(this.clienteUpdate).subscribe(result => {
      this.errorMessage = result.message;
      alert(result.message);
      window.location.href = 'hoteisPSI/' + sessionStorage.getItem('hotelNome')+'/cliente';
    });
  }
  
  logout(){
    localStorage.removeItem('userAtual');
    localStorage.removeItem('cliente');
    window.location.href = 'hoteisPSI/' + sessionStorage.getItem('hotelNome');
  }

}
