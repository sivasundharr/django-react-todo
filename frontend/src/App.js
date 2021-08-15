import React from 'react';
import { BrowserRouter,Route,Switch,Redirect } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import Signup from './components/User/Signup';
import TodoContainer from './components/Todo/TodoContainer';
import Navbar from './components/Navbar/Navbar';
import ErrorPage  from './ErrorPage';

const  APP =()=> {
    const user = JSON.parse(localStorage.getItem("profile"))?.user ?? null;

    return (
            <BrowserRouter>
                <div>
                    <Navbar  />
                    <Container maxW="container.xl" p="3">
                        <Switch>
                            <Route exact path="/" 
                                render={()=>(
                                    user ? (
                                        <TodoContainer/>
                                    ):(
                                        <Redirect to="/login" />
                                
                                    )
                                )}
                            />
                            <Route path="/login" render={()=>(
                                user ? (
                                    <Redirect to="/" />
                                ):(
                                    <Signup />
                                )
                            )} />
                            <Route component={ErrorPage} />
                        </Switch>
                    </Container>
                    
                </div>
            </BrowserRouter>
            
    );

}
 
export default APP;
