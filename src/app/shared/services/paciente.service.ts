import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paciente } from '@core/interfaces/Paciente';
import { RequestPaginate } from '@core/interfaces/RequestPaginate';
import { ResponsePaginate } from '@core/interfaces/ResponsePaginate';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(
    private http:HttpClient
  ) { }



  paginate(data:RequestPaginate):Promise<ResponsePaginate>
  {
    return new Promise((resolve, reject) => {
      this.http.post('/api/pacientes/paginate',data).pipe(first())
      .subscribe({
        next: (res: any) => resolve(res) ,
       error:  (err:any) => reject(err) 
      }
    )
    })
  }

  getAll():Promise<Paciente[]>
  {
    return new Promise((resolve, reject) => {
      this.http.get('/api/pacientes').pipe(first())
        .subscribe({
         next:   (res: any) => resolve(res),
         error:  (err:any) => reject(err) 
        }
      )
    })
  }

  create(paciente: Paciente) {
    return new Promise((resolve, reject) => {
      this.http.post('api/pacientes', paciente).pipe(first())
        .subscribe(
          ({
            next: (response: any) => resolve(response),
            error: (error) => reject(error)
        })
      )
    })
  }

  update(id: string, paciente: Paciente) {
    console.log(paciente)
    return new Promise((resolve, reject) => {
      this.http.put(`api/pacientes/${id}`, paciente).pipe(first())
        .subscribe(
          ({
            next: (response: any) => resolve(response),
            error: (error) => reject(error)
        })
      )
    })
  }



  delete(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(`api/pacientes/${id}`).pipe(first())
        .subscribe(
          ({
            next: (response: any) => resolve(response),
            error: (error) => reject(error)
        })
      )
    })
  }
}
