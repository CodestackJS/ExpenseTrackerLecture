import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm } from "react-hook-form";
import { z } from "zod";
import categories from "../categories";

const schema = z.object({
 description: z.string().min(1, {message: "Description Required"}),
 amount: z.number({invalid_type_error: "Amount required"}).min(1, {message: "Amount can't be $0"}),
 category: z.enum(categories, {errorMap: () => ({message: "Select a category"})})

});

type FormData = z.infer<typeof schema>;

interface expenseProp {
  onHelpSubmit: (submitInfo:FormData) => void;
}


const ExpenseForm = ({onHelpSubmit}:expenseProp) => {
    
  const {register,handleSubmit, formState: { errors }} = useForm<FormData>({ resolver: zodResolver(schema) });


  return (
    <>
      <form onSubmit={handleSubmit(onHelpSubmit)}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input {...register("description")} id="description" type="text" className="form-control" />
          {errors.description && <p className="text-danger">{errors.description.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input {...register("amount", {valueAsNumber:true})} id="amount" type="number" className="form-control" />
          {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select {...register("category")} id="category" className="form-control">   
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
