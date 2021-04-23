import { Component, DebugElement, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario} from 'src/app/models/usuario';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css'],
  providers: [DatePipe]
})
export class MiPerfilComponent implements OnInit {
  public usuario: Usuario;
  public perfilProfesionalForm: FormGroup;
  public perfilForm: FormGroup;
  constructor(private usuarioService : UsuarioService,private datePipe: DatePipe,
    private fb:FormBuilder) { }

  async ngOnInit(){
    if(localStorage.getItem("token")){
      this.usuario = await (this.usuarioService.getUsuarioPorId(localStorage.getItem("usuarioId")));
    

     if(this.usuario.profesional){
     this.perfilProfesionalForm = this.fb.group({
      nombre: [ this.usuario.nombre , Validators.required ],
      email: [ this.usuario.email, [ Validators.required,Validators.email ] ],
      fechaNacimiento: [ this.datePipe.transform(this.usuario.fechaNacimiento,'yyyy-MM-dd'), [Validators.required,this.fechaPosteriorAHoy]],
      profesional: [ this.usuario.profesional , Validators.required ],
      sector: [ this.usuario.sector , Validators.required ],
      descripcion: [ this.usuario.descripcion , Validators.required ],
      img: [ this.usuario.img , Validators.required ],
    });
  }
  if(!this.usuario.profesional){
    this.perfilForm = this.fb.group({
     nombre: [ this.usuario.nombre , Validators.required ],
     email: [ this.usuario.email, [ Validators.required, Validators.email ] ],
     fechaNacimiento: [ this.datePipe.transform(this.usuario.fechaNacimiento,'yyyy-MM-dd'), [Validators.required,this.fechaPosteriorAHoy]],
     profesional: [ this.usuario.profesional , Validators.required ],
     img: [ this.usuario.img , Validators.required ],   
   });
  
   
 }

    }
  }
  async editarPerfilProfesional(){
    if(this.perfilProfesionalForm.invalid){
      this.perfilProfesionalForm.markAllAsTouched()
      return;
    }
    
    const datos = this.perfilProfesionalForm.value;
    console.log(datos);
    this.usuario = await this.usuarioService.editarPerfil(datos);
    
    
  }
  async editarPerfil(){
    if(this.perfilForm.invalid){
      this.perfilForm.markAllAsTouched()
      return;
    }
    
    const datos = this.perfilForm.value;
    console.log(datos);
    const usuario = await this.usuarioService.editarPerfil(datos);
    
  }
// Validaciones profesional

get nombreNoValido(){
  return this.nombreCampoRequerido
}
get nombreCampoRequerido(){
  return this.perfilProfesionalForm.get('nombre').errors ? this.perfilProfesionalForm.get('nombre').errors.required && this.perfilProfesionalForm.get('nombre').touched : null
}

get emailNoValido(){
  return this.emailCampoRequerido || this.vvalidarEmail
}
get emailCampoRequerido(){
  return this.perfilProfesionalForm.get('email').errors ? this.perfilProfesionalForm.get('email').errors.required && this.perfilProfesionalForm.get('email').touched : null
}
get vvalidarEmail(){
  return this.perfilProfesionalForm.get('email').errors ? this.perfilProfesionalForm.get('email').errors.email && this.perfilProfesionalForm.get('email').touched : null
}

get fechaNoValido(){
  return this.fechaCampoRequerido || this.fechaFechaPosteriorAHoy
}
get fechaCampoRequerido(){
  return this.perfilProfesionalForm.get('fechaNacimiento').errors ? this.perfilProfesionalForm.get('fechaNacimiento').errors.required && this.perfilProfesionalForm.get('fechaNacimiento').touched : null
}
get fechaFechaPosteriorAHoy(){
  return this.perfilProfesionalForm.get('fechaNacimiento').errors ? this.perfilProfesionalForm.get('fechaNacimiento').errors.fechaPosteriorAHoy && this.perfilProfesionalForm.get('fechaNacimiento').touched : null
}

get profesionalNoValido(){
  return this.profesionalCampoRequerido
}
get profesionalCampoRequerido(){
  return this.perfilProfesionalForm.get('profesional').errors ? this.perfilProfesionalForm.get('profesional').errors.required && this.perfilProfesionalForm.get('profesional').touched : null
}
get sectorNoValido(){
  return this.sectorCampoRequerido
}
get sectorCampoRequerido(){
  return this.perfilProfesionalForm.get('sector').errors ? this.perfilProfesionalForm.get('sector').errors.required && this.perfilProfesionalForm.get('sector').touched : null
}

get descripcionNoValido(){
  return this.descripcionCampoRequerido
}
get descripcionCampoRequerido(){
  return this.perfilProfesionalForm.get('descripcion').errors ? this.perfilProfesionalForm.get('descripcion').errors.required && this.perfilProfesionalForm.get('descripcion').touched : null
}
get imgNoValido(){
  return this.imgCampoRequerido
}
get imgCampoRequerido(){
  return this.perfilProfesionalForm.get('img').errors ? this.perfilProfesionalForm.get('img').errors.required && this.perfilProfesionalForm.get('img').touched : null
}



// Validaciones perfil

get nombreNoProfNoValido(){
  return this.nombreNoProfCampoRequerido
}
get nombreNoProfCampoRequerido(){
  return this.perfilForm.get('nombre').errors ? this.perfilForm.get('nombre').errors.required && this.perfilForm.get('nombre').touched : null
}

get emailNoProfNoValido(){
  return this.emailNoProfCampoRequerido || this.vvalidarNoProfEmail
}
get emailNoProfCampoRequerido(){
  return this.perfilForm.get('email').errors ? this.perfilForm.get('email').errors.required && this.perfilForm.get('email').touched : null
}
get vvalidarNoProfEmail(){
  return this.perfilForm.get('email').errors ? this.perfilForm.get('email').errors.email && this.perfilForm.get('email').touched : null
}

get fechaNoProfNoValido(){
  return this.fechaNoProfCampoRequerido || this.fechaFechaNoProfPosteriorAHoy
}
get fechaNoProfCampoRequerido(){
  return this.perfilForm.get('fechaNacimiento').errors ? this.perfilForm.get('fechaNacimiento').errors.required && this.perfilForm.get('fechaNacimiento').touched : null
}

get fechaFechaNoProfPosteriorAHoy(){
  return this.perfilForm.get('fechaNacimiento').errors ? this.perfilForm.get('fechaNacimiento').errors.fechaPosteriorAHoy && this.perfilForm.get('fechaNacimiento').touched : null
}

get profesionalNoProfNoValido(){
  return this.profesionalNoProfCampoRequerido
}
get profesionalNoProfCampoRequerido(){
  return this.perfilForm.get('profesional').errors ? this.perfilForm.get('profesional').errors.required && this.perfilForm.get('profesional').touched : null
}
get sectorNoProfNoValido(){
  return this.sectorNoProfCampoRequerido
}
get sectorNoProfCampoRequerido(){
  return this.perfilForm.get('sector').errors ? this.perfilForm.get('sector').errors.required && this.perfilForm.get('sector').touched : null
}

get descripcionNoProfNoValido(){
  return this.descripcionNoProfCampoRequerido
}
get descripcionNoProfCampoRequerido(){
  return this.perfilForm.get('descripcion').errors ? this.perfilForm.get('descripcion').errors.required && this.perfilForm.get('descripcion').touched : null
}
get imgNoProfNoValido(){
  return this.imgNoProfCampoRequerido
}
get imgNoProfCampoRequerido(){
  return this.perfilForm.get('img').errors ? this.perfilForm.get('img').errors.required && this.perfilForm.get('img').touched : null
}
  private fechaPosteriorAHoy(control:FormControl):{[s:string]:boolean}{
    let f = Date.parse(control.value)
    let hoy = new Date().getTime()
    console.log("llega aqui "+f+" swsdsd"+hoy)
    if(f > hoy){
      return {
        fechaPosteriorAHoy:true
        
        
      }
    }
    
    return null
  }
 


}
