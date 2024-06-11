import { Component } from '@angular/core';
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent {
  startMonth!: string;
  endMonth!: string;
  months: string[] = [];
  totals!: number;
  totals_expenses!: number;
  budgetItems: any[] = [{ category: '', values: {} }];
  budgetItems_expenses: any[] = [{ category: '', values: {} }];
  contextMenuVisible: boolean = false;
  contextMenuVisible_Delete: boolean = false;
  contextMenuVisible_Delete_Expenses: boolean = false;
  contextMenuPosition = { x: '0px', y: '0px' };
  contextMenuPosition_Delete = { x: '0px', y: '0px' };
  contextMenuPosition_Delete_Expenese = { x: '0px', y: '0px' };
  openingBalances: { [key: string]: number } = {};
  openingBalances_Expenses: { [key: string]: number } = {};
  contextMenuItem: any;
  index_delete!: number;
  index_delete_expenses!: number;
  contextMenuMonth!: string;

  constructor(private budgetService: BudgetService) { }

  updateMonths() {
    this.months = this.budgetService.getMonthsArray(this.startMonth, this.endMonth);
    this.budgetItems.forEach(item => {
      this.months.forEach(month => {
        if (!item.values[month]) {
          item.values[month] = 0;
        }
      });
    });
    this.calculateOpeningBalances();
  }
  updateMonths_expenses() {
    this.months = this.budgetService.getMonthsArray(this.startMonth, this.endMonth);
    this.budgetItems_expenses.forEach(item => {
      this.months.forEach(month => {
        if (!item.values[month]) {
          item.values[month] = 0;
        }
      });
    });
    this.calculateOpeningBalances_Expenses();
  }

  updateTotals_expenses() {
    this.calculateOpeningBalances_Expenses();
    this.budgetItems_expenses = [...this.budgetItems_expenses];
  }
  updateCategory(event: any, item: any) {

    item.category = event.target.textContent;
  }
  updateCategory_express(event: any, item: any) {
    item.category = event.target.textContent;
  }
  updateTotals() {
    this.calculateOpeningBalances();
    this.budgetItems = [...this.budgetItems];
  }

  getSubtotal(item: any): number {
    return this.months.reduce((acc, month) => acc + (item.values[month] || 0), 0);
  }

  getTotal(month: string): number {

    return this.budgetItems.reduce((acc, item) => acc + (item.values[month] || 0), 0);
  }
  getTotal_expenses(month: string): number {
    return this.budgetItems_expenses.reduce((acc, item) => acc + (item.values[month] || 0), 0);
  }

  getProfitLoss(month: string): number {
    return this.budgetItems.reduce((acc, item) => acc + (item.values[month] || 0), 0) - this.budgetItems_expenses.reduce((acc, item) => acc + (item.values[month] || 0), 0);


  }


  getOverallTotal(): number {
    return this.months.reduce((acc, month) => acc + this.getTotal(month), 0);
  }
  openContextDelete(event: MouseEvent, index: any, month: string) {
    event.preventDefault();
    this.contextMenuVisible_Delete = true;
    this.contextMenuPosition_Delete = { x: `${event.clientX}px`, y: `${event.clientY}px` };
    this.index_delete = index;
  }
  openContextDelete_Expenses(event: MouseEvent, index: any, month: string) {
    event.preventDefault();
    this.contextMenuVisible_Delete_Expenses = true;
    this.contextMenuPosition_Delete_Expenese = { x: `${event.clientX}px`, y: `${event.clientY}px` };
    this.index_delete_expenses = index;
  }

  openContextMenu(event: MouseEvent, item: any, month: string) {
    event.preventDefault();
    this.contextMenuVisible = true;
    this.contextMenuPosition = { x: `${event.clientX}px`, y: `${event.clientY}px` };
    this.contextMenuItem = item;
    this.contextMenuMonth = month;
  }



  applyToAll(item: any, month: string) {
    const value = item.values[month];
    this.budgetItems.forEach(budgetItem => {
      budgetItem.values[month] = value;
    });
    this.contextMenuVisible = false;
  }

  Delete_Expenses() {
    if (this.budgetItems_expenses.length > 1) {

      this.budgetItems_expenses.splice(this.index_delete_expenses, 1)

      this.contextMenuVisible_Delete_Expenses = false;
    }

    else {
      this.contextMenuVisible_Delete_Expenses = false;
      alert("Cannot delete all elements")

    }
  }
  Delete() {
    if (this.budgetItems.length > 1) {

      this.budgetItems.splice(this.index_delete, 1)

      this.contextMenuVisible_Delete = false;
    }

    else {
      this.contextMenuVisible_Delete = false;
      alert("Cannot delete all elements")

    }
  }

  deleteCategory(index: number) {
    this.budgetItems.splice(index, 1);
  }

  checkAddNewLine(rowIndex: number, colIndex: number, event: any) {
    if (event.key === 'Tab') {
      const lastRow = rowIndex === this.budgetItems.length - 1;
      const lastCol = colIndex === this.months.length - 1;
      if (lastRow && lastCol) {
        event.preventDefault();  // Prevent default tabbing behavior
        this.addNewLine();
      }
    }
  }
  calculateOpeningBalances() {
    this.openingBalances[this.months[0]] = 0; // Initial opening balance is 0
    for (let i = 1; i < this.months.length; i++) {
      const previousMonth = this.months[i - 1];
      const currentMonth = this.months[i];
      const previousMonthTotal = this.getTotal(previousMonth);
      const currentMonthTotal = this.getTotal(currentMonth);
      this.openingBalances[currentMonth] = this.openingBalances[previousMonth] + currentMonthTotal - previousMonthTotal
    }
  }



  getOpeningBalance(month: string): number {
    return this.openingBalances[month] || 0;
  }

  calculateOpeningBalances_Expenses() {
    this.openingBalances_Expenses[this.months[0]] = 0; // Initial opening balance is 0
    for (let i = 1; i < this.months.length; i++) {
      const previousMonth = this.months[i - 1];
      const currentMonth = this.months[i];
      const previousMonthTotal = this.getTotal_expenses(previousMonth);
      const currentMonthTotal = this.getTotal_expenses(currentMonth);
      this.openingBalances_Expenses[currentMonth] = this.openingBalances_Expenses[previousMonth] + currentMonthTotal - previousMonthTotal
    }
  }



  getOpeningBalance_Expenses(month: string): number {
    return this.openingBalances_Expenses[month] || 0;
  }
  addNewLine() {
    const newItem = { category: '', values: {} };
    this.months.forEach(month => {
      newItem.values[month] = 0;
    });
    this.budgetItems.push(newItem);
  }

  checkAddNewLine_expenses(rowIndex: number, colIndex: number, event: any) {
    if (event.key === 'Tab') {
      const lastRow = rowIndex === this.budgetItems_expenses.length - 1;
      const lastCol = colIndex === this.months.length - 1;
      if (lastRow && lastCol) {
        event.preventDefault();  // Prevent default tabbing behavior
        this.addNewLine_expenses();
      }
    }
  }

  addNewLine_expenses() {
    const newItem = { category: '', values: {} };
    this.months.forEach(month => {
      newItem.values[month] = 0;
    });
    this.budgetItems_expenses.push(newItem);
  }

}
