import { Component, OnInit } from '@angular/core';
import { MyWorker, MyWorkerType } from 'src/app/shared/worker.model';
import { BaseService } from 'src/app/shared/service/base.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {

  title = 'Employees Database';
  workers: MyWorker[];
  workerss = [];
  myType = MyWorkerType;
  isLoaded = false;
  filter = '';
  checkID = true;
  checkAge = true;

  constructor(private BaseService: BaseService) {
  }

  ngOnInit() {
    this.data().then(() => {
      this.isLoaded = true;
    });
  }

  sortID() {
    if (this.checkID) {
      this.workers = this.workers.sort((a, b) => a.id - b.id);
      this.checkID = false;
    } else {
      this.workers = this.workers.sort((a, b) => b.id - a.id);
      this.checkID = true;
    }
  }

  sortAge() {
    if (this.checkAge) {
      this.workers = this.workers.sort((a, b) => a.age - b.age);
      this.checkAge = false;
    } else {
      this.workers = this.workers.sort((a, b) => b.age - a.age);
      this.checkAge = true;
    }
  }

  onDeleteWorker(id: number) {
    try {
      this.BaseService.deleteWorker(id);
      console.log('delete successful!')
    } catch (err) {
      console.log('ERROR : ' + err);
    } finally {
      this.data();
    }
  }

  getByID() {
    return this.workers;
  }

  async onAddWorker(worker: MyWorker) {
    let id = this.workers.length > 0 ? this.workers[this.workers.length - 1].id + 1 : 0;
    worker.id = id;
    try {
      await this.BaseService.postWorker(worker);
    } catch (err) {
      console.log('ERROR : ' + err);
    } finally {
      this.data();
    }
  }

  async onSaveWorker(worker: MyWorker) {
    try {
      await this.BaseService.saveWorker(worker);
    } catch (err) {
      console.log('ERROR : ' + err);
    }
  }

  async data() {
    try {
      this.workers = await this.BaseService.getWorkers();
    } catch (err) {
      console.log('ERROR : ' + err);
    } finally {
      for (let worker of this.workers) {
        worker.form = new FormGroup({
          name: new FormControl({ value: worker.name, disabled: true }, [Validators.required, Validators.pattern('[а-яА-ЯёЁa-zA-Z]+')]),
          surname: new FormControl({ value: worker.surname, disabled: true }, [Validators.required, Validators.pattern('[а-яА-ЯёЁa-zA-Z]+')]),
          middlename: new FormControl({ value: worker.middlename, disabled: true }, [Validators.required, Validators.pattern('[а-яА-ЯёЁa-zA-Z]+')]),
          phone: new FormControl({ value: worker.phone, disabled: true }, [Validators.required,]),
          email: new FormControl({ value: worker.email, disabled: true }, [Validators.required,]),
          birth: new FormControl({ value: worker.birth, disabled: true }, [Validators.required,]),
          age: new FormControl({ value: worker.age, disabled: true }, [Validators.required,]),
          type: new FormControl({ value: worker.type, disabled: true }, [Validators.required,]),
        });
      }
    }
  }
}
