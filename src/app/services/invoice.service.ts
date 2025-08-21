import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = `${environment.apiUrl}/invoice`;

  constructor(private http: HttpClient) {}

  createInvoice(invoice: Invoice): Observable<any> {
    return this.http.post(this.apiUrl, invoice, { headers: { 'Content-Type': 'application/json' } });
  }

  getInvoiceById(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/${id}`);
  }
}
