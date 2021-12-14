import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObraSocial } from '@core/interfaces/ObraSocial';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObraSocialService {

  constructor(
    private http:HttpClient
  ) { }

  
  getAll():Promise<ObraSocial[]>
  {
    return new Promise((resolve, reject) => {
      this.http.get('/api/obra-social').pipe(first())
        .subscribe({
         next:   (res: any) => resolve(res),
         error:  (err:any) => reject(err) 
        }
      )
    })
  }


  create(obraSocial: ObraSocial):Promise<ObraSocial>
  {
    return new Promise((resolve, reject) => {
      this.http.post('api/obra-social', obraSocial).pipe(first())
        .subscribe({
          next: (res: any) => resolve(res),
          error: (err:any) => reject(err) 
      })
    })
  }

  update(id:string,obraSocial: ObraSocial):Promise<ObraSocial>
  {
    return new Promise((resolve, reject) => {
      this.http.put(`api/obra-social/${id}`, obraSocial).pipe(first())
        .subscribe({
          next: (res: any) => resolve(res),
          error: (err:any) => reject(err) 
      })
    })
  }

  delete(id: string):Promise<ObraSocial>
  {
    return new Promise((resolve, reject) => {
      this.http.delete(`api/obra-social/${id}`).pipe(first())
        .subscribe({
          next: (res: any) => resolve(res),
          error: (err:any) => reject(err) 
      })
    })
  }
}
