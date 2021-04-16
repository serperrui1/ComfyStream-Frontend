import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { EventoComponent } from './evento/evento.component';
import { MisEventosComponent } from './mis-eventos/mis-eventos.component';
import { LandingComponent } from './landing/landing.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { MisAsistenciasComponent } from './mis-asistencias/mis-asistencias.component';
import { CrearEventoComponent } from './crear-evento/crear-evento.component';
import { ChatComponent } from './chat/chat.component';
import { MisChatsComponent } from './mis-chats/mis-chats.component';
import { AsistirComponent } from './asistir/asistir.component';
import { PoliticaPrivacidadComponent } from './politica-privacidad/politica-privacidad.component';
import { TerminosUsoComponent } from './terminos-uso/terminos-uso.component';
import { SoporteComponent } from './soporte/soporte.component';



const routes: Routes = [
    { 
        path: '', 
        component: PagesComponent,
        children: [
            { path: '', component: HomeComponent},
            { path: 'evento/:id', component: EventoComponent},
            { path: 'mis-chats', component: MisChatsComponent},
            { path: 'chat/:id', component: ChatComponent},
            { path: 'mis-eventos', component: MisEventosComponent},
            { path: 'mis-asistencias', component: MisAsistenciasComponent},
            { path: 'home', component: HomeComponent},
            { path: 'landing', component: LandingComponent},
            { path: 'mi-cuenta', component: CuentaComponent},
            { path: 'crear-evento', component: CrearEventoComponent},
            { path: 'asistir/:id', component: AsistirComponent},
            { path: 'policy', component: PoliticaPrivacidadComponent},
            { path: 'ToS', component: TerminosUsoComponent},
            { path: 'support', component: SoporteComponent},
            { path: 'policy', component: PoliticaPrivacidadComponent},
            { path: '**', pathMatch: 'full', redirectTo: ''},
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}