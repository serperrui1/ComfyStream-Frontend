import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Evento } from '../models/evento';
import { Asistencia } from '../models/asistencia';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class AsistenciaService {
  

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get usuario(): string {
    return localStorage.getItem('usuario');
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
        'usuario': this.usuario
      }
    }
  }

 getMisAsistencias(): Promise<Evento[]>{
  const headers = new HttpHeaders({
    'x-token': localStorage.getItem('token')
  });
  return new Promise<Evento[]>(
    resolve=> {
      this.http.get(`${base_url}/mis-asistencias`,{
        headers
      }).subscribe(data=>{
        const eventos = data["eventos"];
        resolve(eventos);
      });
   })
 }

 crearAsistencia(eventoId:string): Promise<Asistencia>{
  return new Promise<Asistencia> (resolve=> {
    this.http.post(`${ base_url }/asistencia/nueva`, eventoId, this.headers )
    .subscribe(data =>{
      const asistencia: Asistencia = data["asistencia"]["_id"];
      resolve(asistencia);
    });
  } )
 }

/* crearAsistencia(eventoId:string) {
    this.http.post(`${ base_url }/asistencia/nueva`,eventoId,this.headers );
  } */







}
