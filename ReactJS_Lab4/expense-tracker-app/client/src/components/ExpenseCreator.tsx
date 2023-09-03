import { FormEvent, useRef, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap"

import {getAllPayeeNames, postExpenseItem} from "../services/expense";
import IExpenseItem, { IExpenseCreateItem } from "../models/expense";

type ExpenseCreatorModel = {
  expenseItems : IExpenseItem[];
}

const ExpenseCreator = ({expenseItems} : ExpenseCreatorModel) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const expenseDescriptionRef = useRef<HTMLInputElement>(null);
  const payeeNameRef = useRef<HTMLSelectElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const expenseDateRef = useRef<HTMLInputElement>(null);
  const createForm = () => {
    const handleNewExpense = async (event : FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const expenseDescription 
        = (expenseDescriptionRef?.current?.value as string) 
      const payeeName 
        = (payeeNameRef?.current?.value as string) 
      const price = parseFloat((priceRef?.current?.value as string)) 
      const expenseDate = 
        new Date((expenseDateRef?.current?.value as string)) 
      console.log(`Expense Description ${expenseDescription}`);
      console.log(`Payee name ${payeeName}`);
      console.log(`Price ${price}`);
      console.log(`Expense Date ${expenseDate}`);
      const newExpenseItem : IExpenseCreateItem = {
        expenseDescription : expenseDescription,
        payeeName : payeeName,
        price : price,
        date : expenseDate
      }
      const respone = await postExpenseItem(newExpenseItem);
      console.log('Response is ' + JSON.stringify(respone));
      handleClose();
    }
    return (
    <Form onSubmit={handleNewExpense}>
      <Form.Group className="mb-3" controlId="expenseDescription">
        <Form.Label>Expense Description</Form.Label>
        <Form.Control type="text" placeholder="Enter expense description" ref={expenseDescriptionRef} />    
      </Form.Group>
      <Form.Group className="mb-3" controlId="payeeName">
        <Form.Label>Payee Name</Form.Label>
        <Form.Select aria-label="Default select example" ref={payeeNameRef}>
          <option>SELECT A PAYEE FROM THIS LIST</option>
          {
            getAllPayeeNames(expenseItems).map( (payeeName) => {
              return (
                <option value={payeeName}>{payeeName}</option>
              )
            })
          }
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" placeholder="Enter expense price" ref={priceRef}/>    
      </Form.Group>
      <Form.Group className="mb-3" controlId="expenseDate">
        <Form.Label>Expense Date</Form.Label>
        <Form.Control type="date" ref={expenseDateRef}/>    
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Expense
      </Button>
      <Button variant="secondary" onClick={handleClose}>
            Close
      </Button>
    </Form>    
    )
  }
  return (
    <div>
      <hr/>
      <Button className="float-end" onClick={handleShow}>New Expense Item</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {createForm()}          
        </Modal.Body>		
      </Modal>      
    </div>
  )
}

export {ExpenseCreator}