import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import { ClienteSolicitudComponent } from '../cliente/cliente-solicitudes/cliente-solicitud.component';
import { SolicitudDetailComponent } from '../cliente/cliente-detail-solicitud/cliente-detail-solicitud.component';
import { ClienteAddSolicitudComponent } from '../cliente/cliente-add-solicitud/cliente-add-solicitud.component';
import { ServicioListComponent } from '../servicio/servicio-list/servicio-list.component';
import { ServicioDetailComponent } from '../servicio/servicio-detail/servicio-detail.component';
import { PrestadorListComponent } from '../prestador/prestador-list/prestador-list.component';
import { PrestadorDetailComponent } from '../prestador/prestador-detail/prestador-detail.component';
import { PrestadorCreateComponent } from '../prestador/prestador-create/prestador-create.component';
import { ClienteListComponent } from '../cliente/cliente-list/cliente-list.component';
import { ClienteDetailComponent } from '../cliente/cliente-detail/cliente-detail.component';
import { ClienteCreateComponent } from '../cliente/cliente-create/cliente-create.component';
import { AuthLoginComponent } from '../auth/auth-login/auth-login.component';
import { AuthSignUpComponent } from '../auth/auth-sign-up/auth-sign-up.component';

const routes: Routes = [

    {
        path: 'clientes',
        children: [
            {
                path: 'list',
                component: ClienteListComponent,
                canActivate: [NgxPermissionsGuard]
            },
            { path: 'list', redirectTo: 'id', pathMatch: 'full' },
            {
                path: 'add',
                component: ClienteCreateComponent,
                runGuardsAndResolvers: 'always'
            },
            {
                path: ':id/solicitudes',
                component: ClienteDetailComponent,
                runGuardsAndResolvers: 'always',
                children:[
                    {
                        path: 'list',
                        component: ClienteSolicitudComponent,
                        canActivate: [NgxPermissionsGuard]
                    },
                    {
                        path: 'add',
                        component: ClienteAddSolicitudComponent,
                        canActivate: [NgxPermissionsGuard]
                    },
                    {
                        path: ':id',
                        component: SolicitudDetailComponent,
                        runGuardsAndResolvers: 'always'
                    }
                ]
            },
            {
                path: ':id',
                component: ClienteDetailComponent,
                runGuardsAndResolvers: 'always',
            }
        ]
    },
    {
        path: 'servicios',
        children: [
            {
                path: 'list',
                component: ServicioListComponent
            },
            {
                path: 'add',
                component: ClienteCreateComponent,
                data: {
                    permissions: {
                        only: ['ADMIN','CLIENTE']
                    }
                }
            },
            {
                path: ':id',
                component: ServicioDetailComponent,
                runGuardsAndResolvers: 'always'
            }
        ]
    },
    {
        path: 'prestadores',
        children: [
            {
                path: 'list',
                component: PrestadorListComponent,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['ADMIN']
                    }
                }
            },
            {
                path: 'sign-up',
                component: PrestadorCreateComponent,
            },
            {
                path: 'add',
                component: PrestadorCreateComponent,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['ADMIN']
                    }
                }
            },
            {
                path: ':id',
                component: PrestadorDetailComponent,
                runGuardsAndResolvers: 'always'
            }
        ]
    },
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                component: AuthLoginComponent,
            },
            {
                path: ':sign-up',
                component: AuthSignUpComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule {

}
