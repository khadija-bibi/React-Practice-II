
import { useEffect, useState } from 'react';
import './App.css'
import{FaPlus, FaPencilAlt} from 'react-icons/fa';
import{db} from './firebase';
import { collection, onSnapshot, addDoc,updateDoc,doc,deleteDoc } from 'firebase/firestore';
import TodoList from './components/TodoList';

function App() {
  
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
 
  useEffect(()=> {
    const unsubscribe = onSnapshot(collection(db, 'todos'),(snapshot)=>{
      setTodos(snapshot.docs.map((doc) => ({id: doc.id, todo: doc.data().todo})))
    });
    return() => unsubscribe();
  },[])
  const addTodo = async () =>{
    try {
      if(input.trim() != ''){
        // setTodos([...todos, {id: new Date(), todo: input}]);
        await addDoc(collection(db, 'todos'), {todo: input});
        setInput('')
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  const setEdit = (index)=>{
    setInput(todos[index].todo);
    setEditIndex(index);
  }

  const updateTodo = async () => {
    try {
      if (input.trim() !== '') {
        const todoDocRef = doc(db, 'todos', todos[editIndex].id);
        await updateDoc(todoDocRef, { todo: input });

        setEditIndex(-1);
        setInput('');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const removeTodo = async (id) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className='min-h-screen flex flex-col gap-4 items-center justify-center p-4 bg-gradient-to-r from-blue-200 to-blue-300'>
      <div className='bg-grey-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4 bg-white' >
        <h1 className='text-3xl font-bold text-center'>TodoApp</h1>
        <div className='flex'>
          <input type="text"
          placeholder='Add a todo'
          value={input}
          onChange={(e)=> setInput(e.target.value)}
          className='py-2 px-4 border rounded w-full focus:outline-none mr-2' />
          <button onClick={editIndex === -1 ? addTodo : updateTodo} className='bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4'>
            {editIndex ===-1 ? <FaPlus/> : <FaPencilAlt/>}
          </button>
        </div>
      </div>
      {
        todos.length > 0 && (
        <TodoList todos={todos} setEdit={setEdit} removeTodo={removeTodo}/>
        )
      }
    </div>
  )
}

export default App
