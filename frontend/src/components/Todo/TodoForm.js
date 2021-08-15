import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Field from './Field';
import { createTodo,updateTodo } from '../../actions/todo';
import { Flex,Box,Button } from '@chakra-ui/react';

const TodoForm =({currentId,setCurrentId}) => {


    const [todoData,setTodoData] = useState({text:''})
    const todo = useSelector((state)=>currentId ? state.todos.find((t)=>t.id === currentId) : null);
    
    const user = JSON.parse(localStorage.getItem("profile"))?.user

    const dispatch = useDispatch();

    useEffect(()=>{
        if(todo) setTodoData(todo);
    },[todo])

    const onChangeHandler = ({name,value})=>setTodoData({...todoData,text:value})

    const onFormSubmit = evt => {
        evt.preventDefault();
        if(currentId){
            dispatch(updateTodo(currentId,{...todoData,completed:false,user:user?.id}));
        }
        else{
            dispatch(createTodo({...todoData,completed:false,user:user?.id}));
        }
        clear();
    }

    const clear = () =>{
        setCurrentId(null);
        setTodoData({text:''});
    }

    
    return (
            <form onSubmit={onFormSubmit}>
                <Flex>
                    <Box w="80%">
                        <Field
                            name = 'todo'
                            type="text"
                            value={todoData.text} 
                            placeholder="Add todos here..." 
                            onChange={onChangeHandler}
                            
                        />
                    </Box>
                    
                    <Box p="2" w="20%">
                        <Button type="submit" colorScheme={currentId ? "blue":"teal"}>
                            {currentId ? "Save":"Add Todo"}
                        </Button>
                        <Button colorScheme="pink" onClick={clear} ml={2}>
                            clear
                        </Button>
                    </Box>
                    
                </Flex>
            </form>    
    ) 
    
}
export default TodoForm;
