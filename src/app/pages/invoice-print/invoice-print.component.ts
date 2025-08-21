import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-invoice-print',
  templateUrl: './invoice-print.component.html',
  styleUrls: ['./invoice-print.component.css']
})
export class InvoicePrintComponent implements OnInit {
  invoice!: Invoice;
  productsList: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getProducts().subscribe(p => this.productsList = p);

    if (id) {
      this.invoiceService.getInvoiceById(+id).subscribe(res => {
        this.invoice = res;
      });
    }
  }

  getProductName(id: number): string {
    return this.productsList.find(p => p.productId === id)?.name || '';
  }

  printPage() {
    window.print();
  }
}
