import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { Usuario } from "../models/usuario";
const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient,
    private router: Router) { }


    get token(): string {
      return localStorage.getItem('token') || '';
    }
  login( formData: any ): Promise<string> {
      return new Promise<string>((resolve) => {0
        this.http.post(`${base_url}/login`,formData).subscribe((data) => {
          const msg = data['msg']
          if(msg === 'Login realizado con exito'){
            localStorage.setItem('token', data['token'])
            localStorage.setItem('usuarioId', data['usuarioId'])
            localStorage.setItem('profesional', data['profesional'])
          }
          resolve(msg)
        })
      })
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('profesional');

    this.router.navigateByUrl('/login');
  }

  getUsuarioPorId(id:string):Promise<any>{
    return new Promise<any>(
      (resolve) => {
        this.http.get(`${base_url}/usuario/${id}`).subscribe((data) => {
          const usuario = data["usuario"];
          resolve(usuario);
        });
     })
 }

 getUsuario():Promise<Usuario>{
  return new Promise<Usuario>(
    (resolve) => {
      this.http.get(`${base_url}/usuario`,{
        headers: { 
          'x-token': this.token
        }
      }).subscribe((data) => {
        
        const usuario = data["usuario"];
        resolve(usuario);

      });
   })
}

  enlazarZoom():Promise<any>{
    return new Promise<any>(
      (resolve) => {
        this.http.get(`${base_url}/zoom/token`,{
          headers: { 
            'x-token': this.token
          }
        }).subscribe((res) =>{
          
          const data = res["data"];
          resolve(data);
  
        });
     })
  }


  almacenarUsuarioZoom( formData: any ): Promise<string> {
    return new Promise<string>((resolve) => {
      this.http.post(`${base_url}/zoom/token`,formData,{
        headers: { 
          'x-token': this.token
        }
      }).subscribe((res) => {
        const data = res["data"];
        Swal.fire('Guardado', 'Cuenta de Zoom vinculada correctamente', 'success');
        resolve(data);
        this.router.navigate(['/'])
      }, (err) => {
        console.log(err)
        Swal.fire('Algo salió mal', err.error.msg, 'error');
      });
    })
  }


  getUsuarioZoom( ): Promise<string> {
    return new Promise<any>(
      (resolve) => {
        this.http.get(`${base_url}/usuarioZoom`,{
          headers: { 
            'x-token': this.token
          }
        }).subscribe((data) => {
          
          const usuarioZoom = data["usuarioZoom"];
          resolve(usuarioZoom);

        });
     })
  }

  borrarUsuarioZoom(): Promise<string> {
    return new Promise<string>((resolve) => {
      this.http.delete(`${base_url}/zoom/token`,{
        headers: { 
          'x-token': this.token
        }
      }).subscribe((res) => {
        const data = res["data"];
        Swal.fire('Guardado', 'Cuenta de Zoom desvinculada correctamente', 'success');
        resolve(data);
        this.router.navigate(['/'])
      }, (err) => {
        console.log(err)
        Swal.fire('Algo salió mal', err.error.msg, 'error');
      });
    })
  }
  // renuevaToken(): Promise<any> {
  //   return new Promise<any>(resolve => {
  //     this.http.post(`${base_url}/zoom/token/refresh`,{},{
  //       headers: { 
  //         'x-token': this.token
  //       }
  //     }).subscribe(res=>{
  //       resolve(res);
  //       console.log(res);

  //     }, (err) => {
  //       console.log(err)
  //       Swal.fire('Algo salió mal', err.error.msg, 'error');
  //     });
  //   })
  // }
 
  editarPerfil( datos: any):Promise<Usuario>{

    return new Promise<Usuario> ((resolve) => {
      this.http.post(`${ base_url }/editar-perfil`,datos,{
        headers: { 
          
          'x-token': this.token
        }
      } )
      .subscribe((data) => {
        const msg= data["msg"];
        if ( msg == "El email ya está en uso"){
          Swal.fire('No es posible actualizar el perfil', msg, 'error');
        } else if(  msg == "Esta cuenta bancaria ya está en uso"){
          Swal.fire('No es posible actualizar el perfil', msg, 'error');
        } else {
          const usuario = data["usuarioActualizado"];
          const token = data["token"];
          localStorage.setItem('token', token);
          Swal.fire('Guardado', msg , 'success');
          resolve(usuario);
          this.router.navigate(['/'])
          

        }
        
      });
    } )
  }

  
  editarBanco( formData: any):Promise<Usuario>{


    return new Promise<Usuario> ((resolve) => {
      this.http.post(`${ base_url }/usuario/cambiar/banco`,formData,{
        headers: { 
          
          'x-token': this.token
        }
      } )
      .subscribe((data) => {

        const msg= data["msg"];
        if(msg=="Password incorrecta"){
        Swal.fire('Algo salió mal', msg, 'error');  
        }else if(msg=="Cuenta en uso"){
          Swal.fire('Algo salió mal', 'Cuenta bancaria en uso', 'error');  
        }else{

          const usuario= data["usuario"];
          const tokenActualizado = data["tokenActualizado"]
          localStorage.setItem("token", tokenActualizado);
          resolve(usuario);
          Swal.fire('Guardado', msg, 'success');
        }
        
      }, (err) => {
        Swal.fire('Algo salió mal', err.error.msg, 'error');
      });
    } )
  }
  actualizarContrasena( formData: any):Promise<Usuario>{



    return new Promise<Usuario> ((resolve) => {

      this.http.post(`${ base_url }/usuario/cambiar/pass`,formData,{
        headers: { 
          
          'x-token': this.token
        }
      } )
      .subscribe((data) => {

        const msg= data["msg"];
        if(msg=="Password incorrecta"){
        Swal.fire('Algo salió mal', msg, 'error');  
        }else{

          const usuario= data["usuario"];
          resolve(usuario);
          Swal.fire('Guardado', msg, 'success');
        }
        
      }, (err) => {
        console.log(err)
        Swal.fire('Algo salió mal', err.error.msg, 'error');
      });
    } )}

  registro( formData: any, imagen:string):Promise<String>{

    let datos = new FormData();
    datos.append("img", imagen)
    datos.append("nombre", formData.nombre )
    datos.append("email", formData.email )
    datos.append("password", formData.password )
    datos.append("fechaNacimiento", formData.fechaNacimiento )
    datos.append("profesional", formData.profesional )

    if(formData.profesional){
      datos.append("sector", formData.sector )
      datos.append("descripcion", formData.descripcion )
      datos.append("cuentaBancariaIBAN", formData.cuentaBancariaIBAN )
      datos.append("titularCuenta", formData.titularCuenta )
      datos.append("precioSuscripcion", formData.precioSuscripcion )
    }

    return new Promise<String> ((resolve) => {

      this.http.post(`${ base_url }/registro`, datos)
      .subscribe((data) => {
        const msg= data["msg"];
          resolve(msg);
      });
    } )
  }

  zoomEnlazado():Promise<boolean>{
    return new Promise<boolean>(
      (resolve) => {
        this.http.get(`${base_url}/zoom/usuario-enlazado`,{
          headers: { 
            'x-token': this.token
          }
        }).subscribe((data) => {
          
          const encontrado = data["encontrado"];
          resolve(encontrado);
  
        });
     })

  }

confirmarCuenta(urlConfirmacion:string):Promise<string>{
  return new Promise<string>((resolve) => {
    this.http.put(`${base_url}/confirmar/${urlConfirmacion}`, {}).subscribe((data) => {
      const msg = data["msg"];
      resolve(msg);
    })
  })
}

sumarBono(idReferido:string):Promise<string>{
  return new Promise<string>((resolve) => {
    this.http.put(`${base_url}/sumar-bono/${idReferido}`, {}).subscribe((data) => {
      const msg = data["msg"];
      resolve(msg);
    })
  })
}

recuperarPassword(email:string):Promise<string>{
  return new Promise<string>((resolve) => {
    this.http.put(`${base_url}/recuperar-password`, {email}).subscribe((data) => {
      const nuevaPassword = data["nuevaPassword"];
      resolve(nuevaPassword);
    })
  })
}

}




