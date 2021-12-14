import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '@core/services/auth.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/shared/services/user.service';

const MENUITEMS = [
  { state: 'home', name: 'Inicio', type: 'link', icon: 'home' },
  { state: 'usuarios', type: 'link', name: 'Usuarios', icon: 'person' },
  { state: 'pacientes', type: 'link', name: 'Pacientes', icon: 'people' },
  { state: 'obra-social', type: 'link', name: 'Obra Social', icon: 'local_pharmacy' },
  { state: 'servicios', type: 'link', name: 'Servicios', icon: 'apps' },
  { state: 'boxes', type: 'link', name: 'Box', icon: 'widgets' },
  { state: 'turnos', type: 'link', name: 'Turnos', icon: 'track_changes' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  menuItems=MENUITEMS
  private _mobileQueryListener: () => void;

  username:string

  constructor(
    private userSrv:UserService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authSrv:AuthService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.username = this.userSrv.Username
    }


  async clickLogOut() {
    const swalResponse = await Swal.fire({
      title: "Confirmar",
      text: "¿Esta Seguro que desea salir?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: 'No',
      showConfirmButton: true,
      confirmButtonText: "Si",
    });
    console.log(swalResponse)
    if (swalResponse.isConfirmed) {
      this.authSrv.logout();
      location.reload()
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
