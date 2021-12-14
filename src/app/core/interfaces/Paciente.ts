
import { ObraSocial } from "./ObraSocial";
import { PacienteObraSocial } from "./PacienteObraSocial";

export interface Paciente {
  id?: string,
  dni: number,
  nombre: string,
  apellido: string,
  direccion: string,
  telefono: string,
  created_at?: Date,
  updated_at?: Date,
  deletedAt?: Date
  obraSocial: ObraSocial,
  fechaNacimiento:string
}