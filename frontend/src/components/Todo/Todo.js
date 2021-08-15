import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import {Text,Tr,Td,IconButton,Checkbox} from '@chakra-ui/react';
import { FaTrash,FaEdit } from 'react-icons/fa';
import { updateTodo,deleteTodo } from '../../actions/todo';
import moment from 'moment';


export default function Todo(props) {
    
    const dispatch = useDispatch();
    

    const { setCurrentId,todo } = props;
    const {id,text,createdAt,updatedAt,completed,user} = todo;

    const [checked,setChecked] = useState(completed);

    const handleChecked = () =>{
        setChecked(prevChecked =>!prevChecked);
        dispatch(updateTodo(id,{text,completed:!checked,user}));
    }
    


    return (
        <Tr>
            <Td>
                <Text as={checked ? "s" : ""}>
                    { text }
                </Text>
            </Td>
            <Td>
                <Checkbox defaultIsChecked={checked} colorScheme="green" onChange={handleChecked}></Checkbox>
            </Td>
            <Td>{ moment(createdAt).format('MMM Do YYYY hh:mm:ss a')}</Td>
            <Td>{ moment(updatedAt).fromNow() }</Td>
            <Td><IconButton icon={<FaEdit />} colorScheme="teal" onClick={()=>setCurrentId(id)} /></Td>
            <Td><IconButton icon={<FaTrash/>} colorScheme="red" onClick={()=>(dispatch(deleteTodo(id)))}/></Td>
            
        </Tr>
    )
}
