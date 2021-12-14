import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

   loadingSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
   loadingTextSubject:BehaviorSubject<string> = new BehaviorSubject<string>("Cargando");

  public loading:Observable<boolean> = this.loadingSubject.asObservable();
  public loadingTextObservable:Observable<string> = this.loadingTextSubject.asObservable();

  constructor(
    
  ) { 
  }

  public get currentLoadingValue(): boolean {
    return this.loadingSubject.value;
  }

  public get currentLoadingText(): string {
    return this.loadingTextSubject.value;
  }

  getState(){
    return this.loadingSubject.getValue()
  }

  getText(){
    return this.loadingTextSubject.getValue();
  }

  changeState(state:boolean){
    this.loadingSubject.next(state);
  }
  changeLoadingText(newmsg:string){
    this.loadingTextSubject.next(newmsg);
  }
}
