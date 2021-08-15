import React,{useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Heading,Spinner } from '@chakra-ui/react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { getTodos } from '../../actions/todo';

export default function TodoContainer() {

    const [currentId,setCurrentId] = useState(null);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem("profile"))?.user??null;

    useEffect(()=>{
        setLoading(true);

        dispatch(getTodos());

        setLoading(false);
    },[currentId,dispatch]);

    if(loading){
        return <Spinner thickness="4px" speed="0.85s" emptyColor="gray.200" color="blue.500" size="xl"/>
    }

    return (
        <>
            {user ? (
                <div>
                    <Heading as="h4" size="md" mt="2" mb="2">
                        welcome { user?.username  }
                    </Heading>
                    < TodoForm currentId={currentId} setCurrentId={setCurrentId} />
                    <Heading as="h4" size="md" mt="2" mb="2">
                        Todos List
                    </Heading>
                    < TodoList setCurrentId={setCurrentId} />
                </div>
            ):
            <h3>Please login to view the content</h3>
            }   
        </>
    )
}







