import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@core/interfaces/User';
import { lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { UserFormComponent } from './components/user-form/user-form.component';
import Swal from 'sweetalert2'
import { Confirmable } from '@core/decorators/confirmable.decorator';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = [ 'usuario', 'nomyape' , 'email', 'role', 'actions'];
  users:User[]
  dataSource = new MatTableDataSource<User>()

  constructor
    (
    private userSrv: UserService,
      private dialog:MatDialog
    ) { }

  ngOnInit(): void {
    this.getAll()
  }


  async getAll() {
    try {
      const response = await this.userSrv.getAll();
      this.users = response;
      this.dataSource = new MatTableDataSource<User>(response)
      console.log(response)
    } catch (error) {
      console.error(error)
    }

  }


  role() {
    return this.userSrv.Role
  }

  async clickAdd() {
    let data = { createMode: true, userList: this.users };
    this.openDialog(data)
  }

  clickEdit(user:User) {
    let data = { createMode: false, userList: this.users, user };
    this.openDialog(data)
  }

  @Confirmable()
  async clickDelete(user:User) {
    try {
      if (this.users.length == 1) {
        return
      }  
        const response = await this.userSrv.delete(user.id);
        const swal = await Swal.fire(
          'Eliminado',
          'Registro eliminado correctamente',
          'success'
        )
      
      this.getAll();
    } catch (error) {
      
    }
  }

 async openDialog(data) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width:'250px',
      disableClose: true,
      backdropClass: 'backdrop-class',
      panelClass: 'panel-class',
      data
    })
   const response = await lastValueFrom(dialogRef.afterClosed())
   console.log(response)
   if (response) {
     this.getAll()
   }
  }

}
