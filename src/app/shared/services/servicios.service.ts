import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servicios } from '@core/interfaces/Servicios';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(
    private http:HttpClient
  ) { }

  getAll():Promise<Servicios[]>
  {
    return new Promise((resolve, reject) => {
      this.http.get('/api/servicios').pipe(first())
        .subscribe({
         next:   (res: any) => resolve(res),
         error:  (err:any) => reject(err) 
        }
      )
    })
  }

  create(servicio: Servicios):Promise<Servicios>
  {
    return new Promise((resolve, reject) => {
      this.http.post('api/servicios', servicio).pipe(first())
        .subscribe({
          next: (res: any) => resolve(res),
          error: (err:any) => reject(err) 
      })
    })
  }

  update(id:string,servicio: Servicios):Promise<Servicios>
  {
    return new Promise((resolve, reject) => {
      this.http.put(`api/servicios/${id}`, servicio).pipe(first())
        .subscribe({
          next: (res: any) => resolve(res),
          error: (err:any) => reject(err) 
      })
    })
  }

  delete(id: string):Promise<boolean>
  {
    return new Promise((resolve, reject) => {
      this.http.delete(`api/servicios/${id}`).pipe(first())
        .subscribe({
          next: (res: any) => resolve(res),
          error: (err:any) => reject(err) 
      })
    })
  }
}
