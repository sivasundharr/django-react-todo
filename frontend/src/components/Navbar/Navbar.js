import React,{useState,useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { Link,useHistory,useLocation } from 'react-router-dom';
import { Button,Avatar,Flex,Spacer,Link as ReactLink, Box,Text,Center } from '@chakra-ui/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react"


export default function Navbar() {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch()

    const [user,setUser] = useState(JSON.parse(localStorage.getItem("profile"))?.user)

    const logout = () =>{
        dispatch({type:'LOGOUT'})
        history.push('/');
        setUser(null);
    };

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem("profile"))?.user);
    },[location])

    

    return (
        <Flex bg="teal" p={2}>
            <Box p="2" color="white">
                <Link as={ReactLink} to="/" color="white">DailyTodo</Link>
            </Box>
            
            <Spacer/>
            {user ?(
                <Box p="2">
                <Popover>
                    <PopoverTrigger>
                        <Avatar name={user?.username} size="sm" src="#" mr="6" />
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader fontWeight="semibold">Profile</PopoverHeader>
                        <PopoverBody>
                            <Center>
                                <Avatar name={user?.username} size="md" src="#" />
                            </Center>
                            <Center>
                                <Text>{user?.username}</Text>
                            </Center>
                            <Center>
                                <Text>{user?.email}</Text>
                            </Center>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>    
                
                <Button onClick={logout} colorScheme="red" size="sm">Logout</Button>
                    
                </Box>
            ):(
            <Box p="2" color="white">
                <Link to="/login" as={ReactLink}>LogIn</Link>
            </Box>      
            )
               
            }
            
        </Flex>
    )
}
