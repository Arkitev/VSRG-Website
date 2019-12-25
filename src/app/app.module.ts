import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { LoginModalComponent } from './authorization/login-modal/login-modal.component';
import { RegistrationModalComponent } from './authorization/registration-modal/registration-modal.component';
import { AuthorizationGuard } from './authorization/authorization-guard';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    LoginModalComponent,
    RegistrationModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthorizationGuard],
  bootstrap: [AppComponent],
  entryComponents: [LoginModalComponent, RegistrationModalComponent]
})
export class AppModule { }
