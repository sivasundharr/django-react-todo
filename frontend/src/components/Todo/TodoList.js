import React from 'react'
import Todo from './Todo';
import { useSelector } from 'react-redux';
import { Table,Thead,Tbody,Tr,Th } from '@chakra-ui/react';

export default function TodoList({ setCurrentId }) {
    const todos = useSelector((state)=>state.todos);

    return (
        <div>
            {
            !todos.length ? 
                
                <h3>Oops!,you don't have any todos</h3>
            :(
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Todo</Th>
                        <Th>Completed</Th>
                        <Th>CreatedAt</Th>
                        <Th>UpdatedAt</Th>
                        <Th>Update</Th>
                        <Th>Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {todos.map((todo,idx)=><Todo 
                        key={idx} 
                        todo={todo}
                        setCurrentId = {setCurrentId}
                    />)
                    }
                </Tbody>
            </Table>
            
            )
            
            }
        </div>
        
    )
}
