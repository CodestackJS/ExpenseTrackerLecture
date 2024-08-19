import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm } from "react-hook-form";
import { z } from "zod";
import categories from "../categories";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constant";

const schema = z.object({
 description: z.string().min(1, {message: "Description Required"}),
 amount: z.number({invalid_type_error: "Amount required"}).min(1, {message: "Amount can't be $0"}),
 category: z.enum(categories, {errorMap: () => ({message: "Select a category"})})

});

type FormData = z.infer<typeof schema>;

interface expenseProp {
  fetchData: () => void;
}


const ExpenseForm = ({fetchData}:expenseProp) => {
    
  const {register,handleSubmit, formState: { errors }} = useForm<FormData>({ resolver: zodResolver(schema) });

  const [expense, setExpense] = useState({
    id: 0,
    description: "",
    amount: 0,
    category: "",
  });

  const handleAdd = () => {
    if (expense.description === "" || expense.amount === 0 || expense.category === "") {return} else{
      axios
      .post(BASE_URL + "Expense/", expense)
      .then((response) => {
        fetchData();
        console.log(response)
      }) 
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleAdd)}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input {...register("description")} id="description" type="text" className="form-control" onChange={(e) => setExpense({...expense, description: e.target.value})} />
          {errors.description && <p className="text-danger">{errors.description.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input {...register("amount", {valueAsNumber:true})} id="amount" type="number" className="form-control" onChange={(e) => setExpense({...expense, amount: Number(e.target.value)})} />
          {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select {...register("category")} id="category" className="form-control" onChange={(e)=> setExpense({...expense, category: e.target.value})}>   
          <option value="">select category</option>
          {categories.map(category => <option key={category} value={category}>{category}</option>)}
          </select>
          {errors.category && <p className="text-danger">{errors.category.message}</p>}
        </div>

        <button className="btn btn-outline-primary">Submit</button>



      </form>
    </>
  );
};

export default ExpenseForm;
