import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MyWorker, MyWorkerType } from 'src/app/shared/worker.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  myWorkerType = MyWorkerType;
  workerForm: FormGroup;
  mask = ['8', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  constructor() { }

  ngOnInit() { }

  onDeleteWorker(id: number) {
    this.deleteWorker.emit(id);
    console.log('deleted');
  }

  onSaveWorker(worker: MyWorker) {
    if (worker.workerForm.valid) {
      worker.name = worker.workerForm.controls.name.value;
      worker.surname = worker.workerForm.controls.surname.value;
      worker.type = worker.workerForm.controls.type.value;
      worker.phone = worker.workerForm.controls.phone.value.replace(/\D/g, '');
      if (worker.phone.length == 11) {
        console.log(worker);
        worker.workerForm.disable();
      } else
        alert('Please, provide all data!');
    } else
      alert('Please, provide all data!');
  }

  onRedactWorker(worker: MyWorker) {
    worker.workerForm.enable();
    console.log(worker);
  }

}