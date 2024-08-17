import { number } from "zod";
import { Expense } from "../../App";
import { useState } from "react";
import categories from "../categories";
import axios from "axios";
import { BASE_URL } from "../../constant";



interface ExpenseProps{
    expenses: Expense [];
    onDelete: (id:number) => void
    fetchData: () => void;
}
// onclick of the edit button input field pops out
// enter changes to input field to make updates
// need the category dropdown
// save updates
// cancel edits button


const ExpenseList = ({expenses, onDelete, fetchData}:ExpenseProps) => {

    const [editId, setEditId] = useState<number | null>(null);
    const [editInput, setEditInput] = useState<Expense>({
      id: 0,
      description: "",
      amount: 0,
      category: "",
    })  


    const startEdit = (id: number) => {
      setEditId(id);
    };

    const handleSave = () => {
      axios
      .put(BASE_URL + "Expense/" + editId, editInput)
      .then(fetchData)
      .catch((error) => 
        {
          console.log(error);
        })
      .finally(() => 
        {
          setEditInput({
            ...editInput,
            id: 0,
            description: "",
            amount: 0,
            category: "",
          });
          setEditId(null);
        });
    }


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
        <td>
          {
            editId == expense.id ?
            <input type="text" value={editInput.description} onChange={(e) => setEditInput({
              ...editInput, description: e.target.value
            })}
            /> :expense.description
          }
        </td>
        <td>{
            editId == expense.id ?
            <input type="text" value={editInput.amount} onChange={(e) => setEditInput({
              ...editInput, amount: Number(e.target.value),
            })}
            /> :expense.amount
          }</td>
        <td>
        {editId == expense.id ? (
                <>
                  <select
                    id="category"
                    className="form-select"
                    onChange={(e) =>
                      setEditInput({ ...expense, category: e.target.value })
                    }
                  >
                    <option value="">Select a Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                expense.category
              )}
        </td>
        <td>
            <button className="btn btn-outline-danger m-2" onClick={()=> onDelete(expense.id)}>Delete</button>
            <button className="btn btn-outline-warning m-2" onClick={()=> startEdit(expense.id)}>Update</button>
          
          {editId == expense.id ?  ( <>
          
          <button className="btn btn-outline-success m-2" onClick={handleSave}>Save</button>

           <button className="btn btn-outline-primary m-2" onClick={()=> setEditId(null)}>Cancel</button>
           </>
        ) : null}
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