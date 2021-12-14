import { ObraSocial } from "./ObraSocial";
import { Paciente } from "./Paciente";

export interface PacienteObraSocial {
  id?: string,
  socialNumber: string,
  obraSocial: ObraSocial,
  paciente?:Paciente
}