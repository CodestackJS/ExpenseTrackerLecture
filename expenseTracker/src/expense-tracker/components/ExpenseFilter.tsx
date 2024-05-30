import categories from "../categories";



interface FilterProps {
    onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({onSelectCategory}:FilterProps) => {
  return (
    <>

      <h1 className="text-center">Filter</h1>
      <select className="form-select" onChange={(e) => onSelectCategory(e.target.value)}>
       
        <option value="">All categories</option>
        {/* <option value="Groceries">Groceries</option>
        <option value="Utilities">Utilities</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Food">Food</option>
        <option value="Shopping">Shopping</option> */}
    {categories.map(category => <option key={category} value={category}>{category}</option>)}

      </select>
    </>
  );
};

export default ExpenseFilter;
