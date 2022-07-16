import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http: HttpClient) { }

  //connect frontend to backend

  apiurl = 'http://localhost:3000/user'

  //get all data

  getALLDATA(): Observable<any> {
    return this._http.get(`${this.apiurl}`);
  }

  //create data

  createDATA(data: any): Observable<any> {
    console.log(data, 'createapi=>');

    return this._http.post(`${this.apiurl}`, data);
  }

  //delete data

  deleteDATA(id: any): Observable<any>
    {
      let ids = id;
      return this._http.delete(`${this.apiurl}/${ids}`);
    }

    // update data 

    updateDATA(data:any,id:any): Observable<any>
    {
       let ids = id;
       return this._http.put(`${this.apiurl}/${ids}`,data);

    }


    //getsingledata
     getSingleData(id:any): Observable<any>
     {
      let ids = id;
      return this._http.get(`${this.apiurl}/${ids}`)
     }

  }
