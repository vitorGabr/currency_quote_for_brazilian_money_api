import { Component, OnInit } from '@angular/core';
import { AwesomeApiModelProvider } from '../../modules/shared/providers/awesomeApProvider.service';
import { AwesomeApiModel } from 'src/app/modules/shared/models/awesomeApiModel';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  url = 'https://economia.awesomeapi.com.br/all/'; // USD-BRL;

  moedas: AwesomeApiModel[] = [];
  displayedColumns = ['name', 'high'];

  constructor(public serice: AwesomeApiModelProvider) {
  }

  ngOnInit(): void{
    this.serice.getMoeda(this.url).then(
      (result) => {
        this.moedas = result.data;
        this.moedas.map((valor) => valor.high = (
          Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
          .format(Number(valor.high)))
        );
      }
    );
  }

}
