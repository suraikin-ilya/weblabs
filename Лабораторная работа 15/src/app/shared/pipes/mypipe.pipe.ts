import { Pipe, PipeTransform } from '@angular/core';
import { MyWorker } from '../worker.model';

@Pipe({
  name: 'mypipe'
})
export class MypipePipe implements PipeTransform {

  transform(workers: any[], filter: string): any[] {
    if (filter === '') {
      return workers;
    } else {
      return workers.filter((worker) => {
        return worker.name.toLowerCase().includes(filter.toLowerCase()) || worker.surname.toLowerCase().includes(filter.toLowerCase())
          || worker.phone.includes(filter);
      });
    }
  }

}
