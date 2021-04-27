import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MyWorker, MyWorkerType } from 'src/app/shared/worker.model';
import { FormGroup } from '@angular/forms';
import emailMask from 'text-mask-addons/dist/emailMask';
@Component({
  selector: 'app-workerlist',
  templateUrl: './workerlist.component.html',
  styleUrls: ['./workerlist.component.css']
})
export class WorkerlistComponent implements OnInit {

  @Input() title: string;
  @Input() workers: MyWorker[] = [];
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  @Output() save = new EventEmitter<MyWorker>();

  myType = MyWorkerType;
  form: FormGroup;
  mask = ['8', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  birthmask = [/[1-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  emailMask = emailMask;
  constructor() { }

  ngOnInit() { }

  onDeleteWorker(id: number) {
    this.delete.emit(id);
    console.log(id);
  }

  onSaveWorker(worker: MyWorker) {
    if (worker.form.valid) {
      worker.name = worker.form.controls.name.value;
      worker.surname = worker.form.controls.surname.value;
      worker.middlename = worker.form.controls.middlename.value;
      worker.phone = worker.form.controls.phone.value.replace(/\D/g, '');
      worker.email = worker.form.controls.email.value;
      worker.birth = worker.form.controls.birth.value;
      // worker.age = worker.form.controls.age.value;
      worker.type = worker.form.controls.type.value;
      if (worker.phone.length == 11) {
        console.log(worker);
        this.save.emit(worker);
        worker.form.disable();

      } else
        alert('Please, provide all data!');
    } else
      alert('Please, provide all data!');
    setTimeout(this.Reload, 100);
  }

  Reload() {
    location.reload();
  }

  onRedactWorker(worker: MyWorker) {
    worker.form.enable();
    console.log(worker);
  }
}
