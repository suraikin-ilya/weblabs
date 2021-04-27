import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { MyWorkerType, MyWorker } from 'src/app/shared/worker.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import emailMask from 'text-mask-addons/dist/emailMask';
@Component({
  selector: 'app-workeradd',
  templateUrl: './workeradd.component.html',
  styleUrls: ['./workeradd.component.css']
})
export class WorkeraddComponent implements OnInit {
  emailMask = emailMask;
  myType = MyWorkerType;
  mask = ['8', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  birthmask = [/[1-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  form: FormGroup;
  @Input() age: number;
  @Output() addWorker = new EventEmitter<MyWorker>();
  constructor() { }
  ngOnInit() { this.form = this.getFormGroup(null, null, null, null, null, null, null, null); }

  onAddWorker() {
    let worker: MyWorker = {
      name: this.form.value.name,
      surname: this.form.value.surname,
      middlename: this.form.value.middlename,
      email: this.form.value.email,
      birth: this.form.value.birth,
      // age: this.form.value.age,
      type: this.form.value.type,
      phone: this.form.value.phone
    };


    let date: Date = new Date();
    this.age = (date.getFullYear() - (Number(worker.birth.substring(6))));



    worker.phone = worker.phone.replace(/\D/g, '');
    if (worker.name.length > 0 && worker.surname.length > 0 && worker.middlename.length > 0
      && worker.email.length > 0 && worker.phone.length == 11) {
      try {
        this.addWorker.emit(worker);
      } catch (err) {
        console.log('ERROR : ' + err);
      } finally {
        this.form.reset();
      }
    } else alert('Please provide all data!');
  }

  getFormGroup(name: string, surname: string, middlename: string, phone: string, email: string, birth: string, age: string, type: MyWorkerType) {
    return new FormGroup({
      name: new FormControl(name, [Validators.required, Validators.pattern('[а-яА-ЯёЁa-zA-Z]+')]),
      surname: new FormControl(surname, [Validators.required, Validators.pattern('[а-яА-ЯёЁa-zA-Z]+')]),
      middlename: new FormControl(middlename, [Validators.required, Validators.pattern('[а-яА-ЯёЁa-zA-Z]+')]),
      phone: new FormControl(phone, [Validators.required,]),
      email: new FormControl(email, [Validators.required,]),
      birth: new FormControl(birth, [Validators.required,]),
      age: new FormControl({ age, disabled: true }, [Validators.required,]),
      type: new FormControl(type, [Validators.required,]),
    });
  }
}
