import { Component, inject, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditCustomerComponent } from '../dialog-edit-customer/dialog-edit-customer.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { Customer } from '../../models/customer.class';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [MatCard, MatIcon, MatMenuModule],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss',
})
export class CustomerDetailComponent implements OnInit {
  private firestore = inject(Firestore);
  customerId: any = '';
  customer: any = {};

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.customerId = paramMap.get('id');
      this.getCustomer();
    });
  }

  async getCustomer(): Promise<void> {
    if (!this.customerId) {
      console.error('No customer ID provided');
      return;
    }

    try {
      const customerDocRef = doc(this.firestore, 'customers', this.customerId);
      const docSnap = await getDoc(customerDocRef);

      if (docSnap.exists()) {
        this.customer = { id: docSnap.id, ...docSnap.data() };
        console.log('Customer data:', this.customer);
      } else {
        console.log('No such document!');
        this.customer = {};
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }
  }

  editCustomer() {
    const dialog = this.dialog.open(DialogEditCustomerComponent);
    dialog.componentInstance.customer = new Customer(
      JSON.parse(JSON.stringify(this.customer))
    );
    dialog.componentInstance.customerId = this.customerId;
    dialog.afterClosed().subscribe(() => {
      this.getCustomer();
    });
  }

  editAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.customer = new Customer(
      JSON.parse(JSON.stringify(this.customer))
    );
    dialog.componentInstance.customerId = this.customerId;
    dialog.afterClosed().subscribe(() => {
      this.getCustomer();
    });
  }
}
