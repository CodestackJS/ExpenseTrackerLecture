import { Expense } from "../../App";



interface ExpenseProps{
    expenses: Expense [];
    onDelete: (id:number) => void
}
// onclick input field pops out
// enter changes to input field to make updates
// need the category dropdown
// save updates
// cancel edits button


const ExpenseList = ({expenses, onDelete}:ExpenseProps) => {

    if(expenses.length === 0)
        return null;


  return (
    <>
    
    <table className="table table-dark table-bordered">
  <thead>
    <tr>
      <th scope="col">Description</th>
      <th scope="col">Amount</th>
      <th scope="col">Category</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {expenses.map(expense => <tr key={expense.id}>
        <td>{expense.description}</td>
        <td>{expense.amount}</td>
        <td>{expense.category}</td>
        <td>
            <button className="btn btn-outline-danger m-2" onClick={()=> onDelete(expense.id)}>Delete</button>
            <button className="btn btn-outline-warning" onClick={()=> onDelete(expense.id)}>Update</button>
        </td>

        

    </tr>)}
  </tbody>
  <tfoot>
    <tr>
        <td>Total</td>
        <td>{expenses.reduce((acc,expense) => expense.amount + acc,0).toFixed(2)}</td>
        <td></td>
        <td></td>
    </tr>
  </tfoot>
</table>
    
    
    
    
    
    </>
  )
}

export default ExpenseList