import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@core/interfaces/User';
import { AuthService } from '@core/services/auth.service';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authSrv:AuthService
  ) { }


  getAll(): Promise<User[]>{
    return new Promise((resolve, reject) => {
      this.http.get(`/api/user`).pipe(first())
        .subscribe(
          {
            next: (response: any) => resolve(response),
            error: (error) => reject(error)
          }
        )
    })
  }

  getById(id:string):Promise<User>
  {
    return new Promise((resolve, reject) => {
      this.http.get(`/api/user/${id}`).pipe(first())
        .subscribe(
          {
            next: (response: any) => { resolve(response) },
            error: (error:any) => reject(error)
          }
        )
    })
  }


  create(user: User) {
    return new Promise((resolve, reject) => {
      this.http.post('api/user', user).pipe(first())
        .subscribe(
          ({
            next: (response: any) => resolve(response),
            error: (error) => reject(error)
        })
      )
    })
  }

  update(id: string, user: User) {
    return new Promise((resolve, reject) => {
      this.http.put(`api/user/${id}`, user).pipe(first())
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
      this.http.delete(`api/user/${id}`).pipe(first())
        .subscribe(
          ({
            next: (response: any) => resolve(response),
            error: (error) => reject(error)
        })
      )
    })
  }

  public get Role() {
    return this.authSrv.currentUserValue.role
  }

  public get Username():string {
    return this.authSrv.currentUserValue.username
  }
}
