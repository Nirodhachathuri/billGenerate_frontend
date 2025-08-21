import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { InvoicePrintComponent } from './pages/invoice-print/invoice-print.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'invoice/print/:id', component: InvoicePrintComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
