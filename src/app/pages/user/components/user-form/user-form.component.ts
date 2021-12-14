import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Roles } from '@core/enumerable/roles';
import { User } from '@core/interfaces/User';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';


export interface DialogData {
  createMode: boolean,
  userList: User[];
  user?:User
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  createMode: boolean;
  userList:User[] = []

  roles:string[]
  user:User
  userForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private userSrv:UserService
  )
  {
    this.userList = data.userList;
    this.createMode = data.createMode;
    this.userForm = this.formBuilder.group({
      id: new FormControl(null),
      username: new FormControl('',[Validators.required,Validators.minLength(4)]),
      password: new FormControl({value:'', disabled:!data.createMode},[Validators.required,Validators.minLength(8)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      nombre: new FormControl('',[Validators.required]),
      apellido: new FormControl('',[Validators.required]),
      role:new FormControl('',[Validators.required])
    })


    this.userForm.get('username').valueChanges.subscribe(
      (res: any) =>
      {
        if (this.find(res,'username')) {
          this.userForm.get('username').setErrors({repeat:true})
        }
      }
    )

    
    this.userForm.get('email').valueChanges.subscribe(
      (res: any) =>
      {
        if (this.find(res,'email')) {
          this.userForm.get('email').setErrors({repeat:true})
        }
      }
    )

    if (!data.createMode) {
      this.user = data.user;
      this.userForm.patchValue(this.user)
    }


   }

  ngOnInit(): void {
  }


  async submit() {
    console.log(this.userForm.value)
    try {
      if (this.createMode) { const response = await this.userSrv.create(this.userForm.value) }
      else { const response = await this.userSrv.update(this.user.id, this.userForm.value) }
      Swal.fire(
        `${this.createMode ? 'Creado' : 'Modificado'}`,
        `El Registro fue ${this.createMode ? 'creado' : 'modificado'} correctamente`,
        'success'
      )
      this.onClose(true);
    } catch (error) {
      console.log(error)
      Swal.fire(
        'Error',
        'Ha Ocurrido un error',
        'error'
      )
      this.onClose(false);
    }

    
  }

  find(data: string, key: string): boolean {
    if ( this.userList &&  this.userList.length > 0 ) {
      const r = this.userList.find( d => d[key] == data )
      return (r ? true: false)
    }
    return false;

  }

  onClose(state: boolean) {
    this.dialogRef.close(state)
  }

}
