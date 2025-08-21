import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/auth.service';
import { RouterModule } from "@angular/router";
import { AppRoutingModule, routes } from './app-routing.module';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { InvoicePrintComponent } from './pages/invoice-print/invoice-print.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, InvoiceComponent, InvoicePrintComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(routes),AppRoutingModule ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
