import { Injectable } from '@angular/core';
import { ResponseDefaultModel } from '../models/responseDefaultModel';
import { HttpClient} from '@angular/common/http';
import { BaseproviderService } from './baseprovider.service';
import { AwesomeApiModel } from '../models/awesomeApiModel';

@Injectable({
  providedIn: 'root'
})
export class AwesomeApiModelProvider{

  constructor(private baseProvider: BaseproviderService){
  }

  async getMoeda(url: string): Promise<ResponseDefaultModel<AwesomeApiModel[]>>{

    const result = new ResponseDefaultModel<AwesomeApiModel[]>();

    return this.baseProvider.getItem(
      url,
      (responseBody) => {
        const awesomeApiModel: AwesomeApiModel[] = new Array<AwesomeApiModel>();
        Object.values(responseBody).map((value) => {
          awesomeApiModel.push(value as AwesomeApiModel);
        });
        return result.data = awesomeApiModel;
      }
    );
  }

}
