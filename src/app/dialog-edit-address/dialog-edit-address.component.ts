import { Component, OnInit, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/input';
import { Customer } from '../../models/customer.class';
import { FormsModule } from '@angular/forms';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatButton,
    MatInputModule,
    MatFormField,
    FormsModule,
    MatProgressBarModule,
    NgIf,
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss',
})
export class DialogEditAddressComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<DialogEditAddressComponent>) {}
  customer!: Customer;
  loading = false;
  customerId: string = '';
  private firestore = inject(Firestore);

  saveCustomer() {
    this.loading = true;

    if (!this.customerId) {
      console.error('No customer ID provided');
      this.loading = false;
      return;
    }

    const customerDocRef = doc(this.firestore, 'customers', this.customerId);

    const customerData = this.customer.toJSON();

    updateDoc(customerDocRef, customerData)
      .then(() => {
        console.log('Customer address successfully updated!');
        setTimeout(() => {
          this.loading = false;
          this.dialogRef.close();
        }, 1000);
      })
      .catch((error) => {
        console.error('Error updating customer address:', error);
        this.loading = false;
        this.dialogRef.close();
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
