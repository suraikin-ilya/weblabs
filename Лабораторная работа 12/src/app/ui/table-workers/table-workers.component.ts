import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MyWorker } from 'src/app/shared/worker.model';

@Component({
  selector: 'app-table-workers',
  templateUrl: './table-workers.component.html',
  styleUrls: ['./table-workers.component.css'],
})
export class TableWorkersComponent implements OnInit {

  @Input() title: string;
  @Input() workers: MyWorker[] = [];
  @Output() deleteWorker = new EventEmitter<number>();
  @Output() redactWorker = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteWorker(id: number) {
    this.deleteWorker.emit(id);
    console.log('deleted');
  }

  onRedactWorker(id: number) {
    this.redactWorker.emit(id);
    console.log(id);
  }
}