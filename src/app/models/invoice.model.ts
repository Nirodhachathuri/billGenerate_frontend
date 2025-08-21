export interface InvoiceItem {
  productId: number;
  quantity: number;
  totalPrice: number;
  discount?: number; // optional, if you want to send it
}

export interface Invoice {
  transactionDate: string | Date;  // match C# DateTime
  totalAmount: number;
  balanceAmount: number;
  discount: number;
  paidAmount: number;
  items: InvoiceItem[];
}
