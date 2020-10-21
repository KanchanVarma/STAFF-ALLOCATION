import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSliderModule,
  MatSnackBarModule,MatFormFieldModule,MatPaginatorModule,MatSortModule,
  MatTooltipModule,MatDatepickerModule,MatNativeDateModule,MatTableModule,MatSelectModule,MatDividerModule
} from '@angular/material';
import {NgModule} from '@angular/core';


@NgModule({
  imports: [
    MatTableModule,MatPaginatorModule,MatSortModule,
    MatNativeDateModule,MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatSliderModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatInputModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatListModule,
    MatDialogModule,MatDividerModule
  ],
  exports: [
    MatTableModule,MatSelectModule,MatPaginatorModule,MatSortModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatSliderModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatInputModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatListModule,
    MatDialogModule,MatDividerModule
  ],
})

export class MaterialModule {
}