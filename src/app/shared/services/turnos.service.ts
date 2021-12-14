import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Turnos } from '@core/interfaces/Turnos';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(
    private http:HttpClient
  ) { }


  getAll(): Promise<Turnos[]> {
    return new Promise((resolve, reject) => {
      this.http.get('api/turnos').pipe(first())
        .subscribe(
          {
            next: (res: any) => resolve(res),
            error: (err: any) => reject(err)
          }
        )
    })
  }

  getByPaciente(dni: number):Promise<Turnos[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`api/turnos/bypaciente/${dni}`).pipe(first())
        .subscribe(
          {
            next: (res: any) => resolve(res),
            error: (err: any) => reject(err)
          }
        )
    })
  }


  getByDate(date:string):Promise<Turnos[]>
  {
    return new Promise((resolve, reject) => {
      this.http.post(`api/turnos/date`, { date: date }).pipe(first())
        .subscribe(
          {
            next: (res:any) => resolve(res),
           error: (err:any) => reject(err)  
        }
      )
    })
  }
  

  update(id:string,turno:Turnos) {
    return new Promise((resolve, reject) => {
      this.http.put(`api/turnos/${id}`, turno).pipe(first())
        .subscribe({
          next: (res: any) => resolve(res),
          error: (err:any) => reject(err)
      })
    })
  }

  delete(id: string):Promise<boolean>
  {
    return new Promise((resolve, reject) => {
      this.http.delete(`api/turnos/${id}`).pipe(first())
        .subscribe({
          next: (res: any) => resolve(res),
          error: (err:any) => reject(err) 
      })
    })
  }

  putArray(turnos: Turnos[]): Promise<Turnos[]>{
    return new Promise((resolve, reject) => {
      this.http.post('api/turnos/PutArray', turnos).pipe(first())
        .subscribe(
          {
            next: (res: any) => resolve(res),
            error: (err:any) => reject(err)
        }
      )
    } )
  }
}
