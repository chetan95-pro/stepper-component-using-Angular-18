import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-record-table',
  standalone: true,
  imports: [ CommonModule, MatTableModule, MatButtonModule ],  
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.css']
})
export class RecordTableComponent {
  @Input() records: any[] = [];  // Input to receive the records
  @Output() deleteRecord = new EventEmitter<any>();  // EventEmitter to notify deletion
  
  displayedColumns: string[] = ['name', 'address', 'city', 'dob', 'occupation', 'phoneNumber', 'action'];
  dataSource = new MatTableDataSource(this.records);

  // Method to emit a delete event
  delete(record: any) {
    this.deleteRecord.emit(record);  // Emit delete event to parent
  }
}
