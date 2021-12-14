import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Boxes } from '@core/interfaces/Boxes';

import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoxesService {

  constructor(
    private http:HttpClient
  ) { }

  getAll():Promise<Boxes[]>
  {
    return new Promise((resolve, reject) => {
      this.http.get("api/boxes").pipe(first())
        .subscribe(
          {
            next: (res: any) => resolve(res),
            error: (err) => reject(err)
        }
      )
    })
  }

  create(box: Boxes):Promise<Boxes>
  {
    return new Promise((resolve, reject) => {
      this.http.post('api/boxes', box).pipe(first())
        .subscribe(
          {
            next: (res:any) => resolve(res),
            error: (err:any) => reject(err)
          }
      )
    })
  }

  update(id:string,box: Boxes):Promise<Boxes>
  {
    return new Promise((resolve, reject) => {
      this.http.put(`api/boxes/${id}`, box).pipe(first())
        .subscribe({
          next: (res: any) => resolve(res),
          error: (err:any) => reject(err) 
      })
    })
  }

  delete(id: string):Promise<boolean>
  {
    return new Promise((resolve, reject) => {
      this.http.delete(`api/boxes/${id}`).pipe(first())
        .subscribe({
          next: (res: any) => resolve(res),
          error: (err:any) => reject(err) 
      })
    })
  }



}
