import { FormGroup } from '@angular/forms';

export interface MyWorker {
  id?: number;
  name: string;
  surname: string;
  type: number;
  phone: string;
  workerForm?: FormGroup;
}

export enum MyWorkerType {
  programmer,
  designer,
  copywriter,
  manager,
}