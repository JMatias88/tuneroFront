import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface ApplicationUser {
	accessToken: string;
	expiresIn: Date;
	username: string;
	role:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	private currentUserSubject: BehaviorSubject<ApplicationUser>;
	public currentUser: Observable<ApplicationUser>;

	constructor(private readonly http: HttpClient) {
		this.currentUserSubject = new BehaviorSubject<ApplicationUser>(
			JSON.parse(localStorage.getItem('currentUser'))
		);
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue(): ApplicationUser {
		return this.currentUserSubject.value;
	}

  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post<ApplicationUser>('api/auth/login', { username, password }).pipe(take(1))
        .subscribe(
          {             
            next: (response) => {
            localStorage.setItem('currentUser', JSON.stringify(response));
					  this.currentUserSubject.next(response);
              resolve(response)
            } ,
            error: (error) => reject(error)
          }
      )
      
    })
	}

	logout() {  
    localStorage.removeItem('currentUser');  
    this.currentUserSubject.next(null);
}
}
