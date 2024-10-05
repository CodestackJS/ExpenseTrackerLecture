import { useEffect, useState } from "react";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import axios from "axios";
import { BASE_URL } from "./constant";
import Navbar from "./expense-tracker/components/Navbar";
import NavBar from "./expense-tracker/components/Navbar";

// import { categories } from "../../App";
 export interface Expense{
  id: number;
  userId: number;
  description: string;
  amount: number;
  category: string;
}

export interface User {
  id: number;
  username : string;
  password : string;
}




//comments
const App = () => {

  //create a useState to help us handle our selectedCategories
const [selectedCategory, setSelectedCategory] = useState('');


  // const [dummyExpensesArray, setDummyExpensesArray] = useState([
  //   { id: 1, description: "aaa", amount: 10, category: "Utilities" },
  //   { id: 2, description: "bbb", amount: 15, category: "Entertainment" },
  //   { id: 3, description: "ccc", amount: 20, category: "Food" },
  //   { id: 4, description: "ddd", amount: 25, category: "Shopping" },
  //   { id: 5, description: "eee", amount: 16, category: "Groceries" },
  // ]);

    

    const [data, setData] = useState<Expense[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [tempId, setTempId] = useState(0);


    const fetchData = (userId: number) => 
    {
      setTempId(userId);
      axios.get(BASE_URL + "Expense/GetItemsByUserId/" + userId)
      .then((res) => 
    {
      setData(res.data);
    })
    .catch((error) => 
      {
        console.log(error);
      });
    };

    // useEffect(() => {
    //   fetchData();
    // }, []);



  const handleDelete = (id: number) => {
    // setDummyExpensesArray(dummyExpensesArray.filter((expense) => expense.id !== id));
      axios.delete(BASE_URL + 'Expense/' + id)
      .then(() => fetchData(tempId))
      .catch(error => {
        console.log(error);
      })
  }

  const handleLogout = () => {
    localStorage.clear();
  
  }
  const handleLogin = (userData:{publisherName: string}) => {
    
    setIsLoggedIn(true);
    console.log(userData);
  }



  //create a variable with a ternary operator we are going to use our selectedCategory as a boolean filter through our dummyExpensesArray
  const visibleExpense = selectedCategory ? data.filter(e => e.category === selectedCategory) : data;

  return (
    <>
          <NavBar handleLogout={handleLogout} isLoggedIn={isLoggedIn}/>

      <h1 className="text center"> Expense Tracker </h1>

      <div className="m-5">
        <ExpenseForm fetchData = {() => fetchData}/>
      </div>

      <div className="m-5">
        {/* <ExpenseList expenses={dummyExpensesArray} onDelete={(id) => console.log('Delete', id)}/> */}
        {/* <ExpenseList expenses={dummyExpensesArray} onDelete={(id) => setDummyExpensesArray()}/> */}
        <ExpenseFilter onSelectCategory={category => setSelectedCategory(category)}/>

        <div className="m-5">
          {/* <ExpenseFilter onSelectCategory={(category) => console.log(category)}/> */}
          {/* <ExpenseList expenses={visibleExpense} onDelete={handleDelete}/> */}

        </div>
      </div>

      {/* <ExpenseList expenses={dummyExpensesArray} onDelete={handleDelete} /> */}
      <ExpenseList expenses={visibleExpense} onDelete={handleDelete} fetchData={fetchData} onLogin={handleLogin}/>
    </>
  );
};

export default App;
