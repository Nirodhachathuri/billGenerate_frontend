import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Invoice } from '../../models/invoice.model';
import { InvoiceService } from '../../services/invoice.service';
import { Router } from '@angular/router';

interface InvoiceProduct {
  productId: number;
  name: string;
  pricePerItem: number;
  qty: number;
  discount?: number;
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  productsList: Product[] = [];
  products: InvoiceProduct[] = [];
  paidAmount: number = 0;
  balanceAmount: number = 0;
  selectedProductId!: number;
  qty: number = 1;
  discount: number = 0;
  customerName: string = '';

  constructor(private productService: ProductService, private invoiceService: InvoiceService,private router: Router) {}



  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => this.productsList = res);
  }

  addEmptyRow() {
  this.products.push({
    productId: null,
    name: '',
    pricePerItem: 0,
    qty: 1,
    discount: 0
  });
}


  onProductChange(row: any) {
  const selected = this.productsList.find(p => p.productId == row.productId);
  if (selected) {
    row.name = selected.name;
    row.pricePerItem = selected.pricePerItem;
    this.updateTotals();
  }
}

removeProduct(index: number) {
  this.products.splice(index, 1);
  this.updateTotals();
}

totalAmount: number = 0;
showInvoice: boolean = false;
savedInvoice: any; // will hold the invoice data returned from backend


updateTotals() {
  this.totalAmount = this.products.reduce((sum, p) => sum + (p.pricePerItem * p.qty - (p.discount || 0)), 0);
  this.balanceAmount = this.totalAmount;
}

 updateBalance() {
    this.balanceAmount = this.totalAmount - (this.paidAmount || 0);
  }

 generateInvoice() {
  const invoice: Invoice = {
    transactionDate: new Date(),
    totalAmount: this.totalAmount,
    paidAmount: this.paidAmount,       // <-- add this
    balanceAmount: this.balanceAmount,
    discount: 0,
    items: this.products.map(p => ({
      productId: p.productId,
      quantity: p.qty,
      totalPrice: p.pricePerItem * p.qty
    }))
  };

  this.invoiceService.createInvoice(invoice).subscribe(
    res => {
      console.log('Invoice created:', res);
      this.savedInvoice = invoice; // save invoice for display
      this.showInvoice = true;      // show the invoice

      // reset form if needed
      this.products = [];
      this.customerName = '';
      
      // Navigate to print page with new invoice ID
      this.router.navigate(['/invoice/print', res.invoiceId]);
    },
    err => {
      console.error(err);
      alert('Failed to generate invoice.');
    }
  );
}

}
