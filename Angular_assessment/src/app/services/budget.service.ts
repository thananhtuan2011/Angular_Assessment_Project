import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor() { }

  getMonthsArray(startMonth: string, endMonth: string): string[] {
    const start = moment(startMonth);
    const end = moment(endMonth);
    const months: any[] = [];
    while (start.isBefore(end) || start.isSame(end)) {
      months.push(start.format('MMMM YYYY'));
      start.add(1, 'month');
    }
    return months;
  }
}
