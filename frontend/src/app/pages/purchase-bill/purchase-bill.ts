import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { LocationService } from '../../core/services/location.service';
import { PurchaseBillItem } from '../../core/models/purchase-bill-item.model';
import { Location } from '../../core/models/location.model';

@Component({
  selector: 'app-purchase-bill',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './purchase-bill.html',
  styleUrls: ['./purchase-bill.css']
})
export class PurchaseBill implements OnInit {

  form!: FormGroup;

  purchaseItems: PurchaseBillItem[] = [];

  items = [
    'Mango',
    'Apple',
    'Banana',
    'Orange',
    'Grapes',
    'Kiwi',
    'Strawberry'
  ];

  locations: Location[] = [];

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      item: ['', Validators.required],
      batch: ['', Validators.required],
      standardCost: [0, Validators.required],
      standardPrice: [0, Validators.required],
      qty: [1, Validators.required],
      freeQty: [0],
      discount: [0]
    });

    this.locationService.getLocations().subscribe({
      next: (locations) => {
        this.locations = locations;
      },
      error: () => {
        this.locations = [];
      }
    });
  }

  get margin(): number {
    return (
      Number(this.form?.value.standardPrice || 0) -
      Number(this.form?.value.standardCost || 0)
    );
  }

  get totalCost(): number {

    const cost =
      this.form.value.standardCost *
      this.form.value.qty;

    return cost - (cost * this.form.value.discount / 100);
  }

  get totalSelling(): number {

    return (
      this.form.value.standardPrice *
      this.form.value.qty
    );
  }

  addItem(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.purchaseItems.push({
      item: this.form.value.item,
      batch: this.form.value.batch,

      standardCost: this.form.value.standardCost,
      standardPrice: this.form.value.standardPrice,

      margin: this.margin,

      qty: this.form.value.qty,
      freeQty: this.form.value.freeQty,

      discount: this.form.value.discount,

      totalCost: this.totalCost,
      totalSelling: this.totalSelling
    });

    this.form.reset({
      item: '',
      batch: '',
      standardCost: 0,
      standardPrice: 0,
      qty: 1,
      freeQty: 0,
      discount: 0
    });
  }

  get totalItems(): number {
    return this.purchaseItems.length;
  }

  get totalQty(): number {
    return this.purchaseItems.reduce(
      (sum, x) => sum + x.qty,
      0
    );
  }

  preventNegative(event: KeyboardEvent) {
  if (event.key === '-' || event.key === 'e' || event.key === 'E') {
    event.preventDefault();
  }
}
}