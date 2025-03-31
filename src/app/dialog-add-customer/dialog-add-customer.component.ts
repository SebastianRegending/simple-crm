import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/input';
import { Customer } from '../../models/customer.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dialog-add-customer',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButton,
    MatInputModule,
    MatFormField,
    FormsModule,
    MatProgressBarModule,
    NgIf,
  ],
  templateUrl: './dialog-add-customer.component.html',
  styleUrl: './dialog-add-customer.component.scss',
})
export class DialogAddCustomerComponent {

  constructor(private dialogRef: MatDialogRef<DialogAddCustomerComponent>) {}
  loading = false;
  customer = new Customer();
  private firestore = inject(Firestore);

  saveCustomer() {
    this.loading = true;
    const customersRef = collection(this.firestore, 'customers');
    addDoc(customersRef, Object.assign({}, this.customer.toJSON()))
      .then((docRef) => {
        setTimeout(() => {
        this.loading = false;
        this.dialogRef.close();
        }, 1500);
      })
      .catch((error) => {
        console.error('Fehler beim Hinzufügen des Kunden:', error);
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
