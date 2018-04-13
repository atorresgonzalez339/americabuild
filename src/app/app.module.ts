import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme/theme.component';
import { LayoutModule } from './theme/layouts/layout.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScriptLoaderService } from "./_services/script-loader.service";
import { ThemeRoutingModule } from "./theme/theme-routing.module";
import { AuthModule } from "./auth/auth.module";

import { UserService } from "./auth/_services";
import { RolesService } from "./theme/pages/default/roles/_services";
import {CompanyService} from "./theme/pages/default/company/_services";
import {FormsModule} from "@angular/forms";
import { PermitService, PermitImprovementTypesService,PermitTypeService } from "./theme/pages/default/permit/_services";


@NgModule({
  declarations: [
    ThemeComponent,
    AppComponent
  ],
  imports: [
    LayoutModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ThemeRoutingModule,
    AuthModule
  ],
  providers: [ScriptLoaderService, CompanyService, RolesService, UserService, PermitService, PermitImprovementTypesService,PermitTypeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
