import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import { HttpClientModule, HttpResponse } from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AbpModule } from '@abp/abp.module';

import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';

import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
import { UsersComponent } from '@app/users/users.component';
import { CreateUserComponent } from '@app/users/create-user/create-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleComponent } from '@app/roles/create-role/create-role.component';
import { EditRoleComponent } from './roles/edit-role/edit-role.component';
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantComponent } from './tenants/create-tenant/create-tenant.component';
import { EditTenantComponent } from './tenants/edit-tenant/edit-tenant.component';
import { TopBarComponent } from '@app/layout/topbar.component';
import { TopBarLanguageSwitchComponent } from '@app/layout/topbar-languageswitch.component';
import { SideBarUserAreaComponent } from '@app/layout/sidebar-user-area.component';
import { SideBarNavComponent } from '@app/layout/sidebar-nav.component';
import { SideBarFooterComponent } from '@app/layout/sidebar-footer.component';
import { RightSideBarComponent } from '@app/layout/right-sidebar.component';
import { MaterialInput } from '@shared/directives/material-input.directive';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { CreateDepartamentoComponent } from './departamentos/create-departamento/create-departamento.component';
import { EditDepartamentoComponent } from './departamentos/edit-departamento/edit-departamento.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { CreateFuncionarioComponent } from './funcionarios/create-funcionario/create-funcionario.component';
import { EditFuncionarioComponent } from './funcionarios/edit-funcionario/edit-funcionario.component';
import { MovimentacoesComponent } from './movimentacoes/movimentacoes.component';
import { CreateMovimentacaoComponent } from './movimentacoes/create-movimentacao/create-movimentacao.component';
import { EditMovimentacaoComponent } from './movimentacoes/edit-movimentacao/edit-movimentacao.component';
import { ViewFuncionariosComponent } from './departamentos/view-funcionarios/view-funcionarios.component';
import { ViewDepartamentosComponent } from './funcionarios/view-departamentos/view-departamentos.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatAutocompleteModule } from '@angular/material';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        TenantsComponent,
        CreateTenantComponent,
        EditTenantComponent,
        UsersComponent,
        CreateUserComponent,
        EditUserComponent,
        RolesComponent,
        CreateRoleComponent,
        EditRoleComponent,
        TopBarComponent,
        TopBarLanguageSwitchComponent,
        SideBarUserAreaComponent,
        SideBarNavComponent,
        SideBarFooterComponent,
        RightSideBarComponent,
        DepartamentosComponent,
        CreateDepartamentoComponent,
        EditDepartamentoComponent,
        FuncionariosComponent,
        CreateFuncionarioComponent,
        EditFuncionarioComponent,
        MovimentacoesComponent,
        CreateMovimentacaoComponent,
        EditMovimentacaoComponent,
        ViewFuncionariosComponent,
        ViewDepartamentosComponent

    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        JsonpModule,
        ModalModule.forRoot(),
        AbpModule,
        AppRoutingModule,
        ServiceProxyModule,
        SharedModule,
        NgxPaginationModule,
        CurrencyMaskModule,
        MatAutocompleteModule
    ],
    providers: [

    ]
})
export class AppModule { }
