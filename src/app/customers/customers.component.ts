import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { DialogAddCustomerComponent } from '../dialog-add-customer/dialog-add-customer.component';
import { Customer } from '../../models/customer.class';
import { NgFor } from '@angular/common';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-customers',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    NgFor,
    RouterModule
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit {
  customer = new Customer();
  private firestore = inject(Firestore);
  customers: any[] = [];

  constructor(public dialog: MatDialog) {}

  async ngOnInit() {
    const customersCollection = collection(this.firestore, 'customers');    
    try {
      const querySnapshot = await getDocs(customersCollection);
      this.customers = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });
      console.log('Customers loaded:', this.customers);
    } catch (error) {
      console.error('Error loading customers:', error);
    }
  }


  openDialog() {
    this.dialog.open(DialogAddCustomerComponent);
  }
}
