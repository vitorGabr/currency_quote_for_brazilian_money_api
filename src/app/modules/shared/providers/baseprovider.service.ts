import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {ResponseDefaultModel} from '../models/responseDefaultModel';

@Injectable({
  providedIn: 'root'
})

export abstract class BaseproviderService {

  constructor(public httpClient: HttpClient) { }

  getItem<T>(
    route: string, callback: ( responsebody: object) => T
  ): Promise<ResponseDefaultModel<T>>{
    const result = new ResponseDefaultModel<T>();
    result.isSuccess = false;
    return new Promise((resolve, reject) => {
      try {
        this.httpClient.get(
          route,
          { observe: 'response'}
        ).toPromise().then(
          async (response: HttpResponse<Response>) => {
            if (response.status === 200){
              result.isSuccess = true;
              result.data = callback(response.body);
              resolve(result);
            }else{
              result.isSuccess = false;
              result.error = response;
              result.errorMessage = response.status.toString() + '\n' + response.statusText;
              reject(result);
            }
          }
        );
      } catch (error) {
        result.isSuccess = false;
        result.error = error;
        result.errorMessage = error.toString();
        reject(result);
      }
    });

  }

}
