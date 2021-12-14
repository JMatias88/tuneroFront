import { Paciente } from "./Paciente";
import { Servicios } from "./Servicios";

export enum Estados {
  "PROGRAMADO" = "PROGRAMADO",
  "FINALIZADO" = "FINALIZADO",
  "REPROGRAMAR" = "REPROGRAMAR",
  "VINO" = "VINO"

}

export interface Turnos {
  id?: string,
  fecha: string,
  horaInicio: string,
  horaFin: string,
  paciente: Paciente,
  box: string,
  servicio: string,
  estado?:string
}