import axios from "axios"
import IExpenseItem, { IExpenseCreateItem } from "../models/expense";

const getAllExpenseItems = async () => {
  const GET_EXPENSE_ITEMS_URL =
  'http://localhost:4000/expenses?_sort=id&_order=desc';
  const response = await axios.get<IExpenseItem[]>(GET_EXPENSE_ITEMS_URL);
  return response.data;
}
const postExpenseItem = async (newExpenseItem : IExpenseCreateItem) => {
  const POST_EXPENSE_ITEMS_URL = 'http://localhost:4000/expenses';
  const response = await axios.post<IExpenseItem[]>(
    POST_EXPENSE_ITEMS_URL, newExpenseItem, {
      headers : {
        'Content-Type' : 'application/json'
      }
    });
  return response.data;
}
const getAllPayeeNames = (expenseItems : IExpenseItem[]) : string[] => {
  const uniquePayeeNames : string[] = [];
  expenseItems.forEach( (expenseItem) => {
    let payeeName = expenseItem.payeeName;
    if (!uniquePayeeNames.includes(payeeName)){
      uniquePayeeNames.push(payeeName);
    }
  })
  return uniquePayeeNames;
}
export {getAllExpenseItems, getAllPayeeNames, postExpenseItem}