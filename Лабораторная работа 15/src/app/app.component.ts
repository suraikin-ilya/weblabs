import { Component, OnInit } from '@angular/core';
import { MyWorker, MyWorkerType } from './shared/worker.model';
import { BaseService } from './shared/service/base.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'List of Employees';
  workers: MyWorker[];
  myWorkerType = MyWorkerType;
  isLoaded = false;
  filter = '';

  constructor(private BaseService: BaseService) {
  }

  ngOnInit() {
    this.getData().then(() => {
      this.isLoaded = true;
    });
  }

  getByType(type: number) {
    return this.workers.filter(worker => worker.type === type);
  }

  onDeleteWorker(id: number) {
    try {
      this.BaseService.deleteWorker(id);
    } catch (err) {
      console.log('ERROR : ' + err);
    } finally {
      this.getData();
    }
  }

  async getData() {
    try {
      this.workers = await this.BaseService.getWorkers();
    } catch (err) {
      console.log('ERROR : ' + err);
    } finally {
      for (let worker of this.workers) {
        worker.workerForm = new FormGroup({
          name: new FormControl({ value: worker.name, disabled: true }, [Validators.required,]),
          surname: new FormControl({ value: worker.surname, disabled: true }, [Validators.required,]),
          type: new FormControl({ value: worker.type, disabled: true }, [Validators.required,]),
          phone: new FormControl({ value: worker.phone, disabled: true }, [Validators.required,]),
        });
      }
    }
  }

  async onSaveWorker(worker: MyWorker) {
    try {
      await this.BaseService.saveWorker(worker);
    } catch (err) {
      console.log('ERROR : ' + err);
    }
  }

  async onAddWorker(worker: MyWorker) {
    let id = this.workers.length > 0 ? this.workers[this.workers.length - 1].id + 1 : 0;
    worker.id = id;
    try {
      await this.BaseService.postWorker(worker);
    } catch (err) {
      console.log('ERROR : ' + err);
    } finally {
      this.getData();
    }
  }

}