import React,{useState} from 'react';
import { Stack,Button,HStack,Box } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import Field from '../Todo/Field';
import {signin,signup} from '../../actions/auth';


const initialState = {
    username:'',
    email:'',
    password:'',
    password2:''
}

const Signup =()=>{

    const [formData,setFormData] = useState(initialState);
    const [isSignUp,setIsSignUp] = useState(false);
    const [fieldErrors,setFieldErrors] = useState({});
    const [saveStatus,setSaveStatus] = useState("READY");
    const dispatch = useDispatch();
    const history = useHistory();
    

    const onChangeHandler = ({name,value,error})=>{
        setFormData({...formData,[name]:value});
        setFieldErrors({...fieldErrors,[name]:error})
    }

    const switchMode = () => setIsSignUp((prevIsSignUp)=>!prevIsSignUp);

    const clearFields = () =>{
        setFormData(initialState)
    }

    const validate = ()=>{
        const errorMessages = Object.keys(fieldErrors).filter((k)=>fieldErrors[k]);

        if(!formData.username) return true;
        if(!formData.email) return true;
        if(!formData.password) return true;
        if(isSignUp && (formData.password !== formData.password2)) return true;

        if(errorMessages.length) return true;

        return false;
    }

    const onFormSubmit = evt =>{
        const fieldErrors = validate(formData);
        setFieldErrors(fieldErrors);

        evt.preventDefault();

        if(validate()) return;

        setSaveStatus("SAVING");

        if(isSignUp){
            const newData = {}
            delete Object.assign(newData,formData,{"password1":formData["password"]})["password"]
            dispatch(signup(newData,history));
        }
        else{
            dispatch(signin(formData,history));
        }
        setSaveStatus('SUCCESS');
    }

     
    return (
            
                <form onSubmit={onFormSubmit}>
                    <Stack spacing={4}>
                <Field
                    name = 'username'
                    type="text"
                    label = "Enter your Username"
                    value={formData.username} 
                    placeholder="Username" 
                    onChange={onChangeHandler}
                    validate = {(val)=>(val ? false : 'Name is Required')} 
                />
                
               
                <Field 
                    name = 'email'
                    type = "email"
                    label = "Enter your Email"
                    value = {formData.email} 
                    placeholder="Email" 
                    onChange={onChangeHandler}
                    validate = {(val)=>(isEmail(val) ? false : 'Invalid Email')}
                />
                <Field
                    name ='password'
                    type="password"
                    label = "Enter your Password"
                    value={formData.password} 
                    placeholder="Password" 
                    onChange={onChangeHandler}
                    validate = {(val)=>(val ? false : 'Password is Required')}
                />
                {isSignUp && 
                    <Field
                    name="password2"
                    type="password"
                    label = "Confirm Password"
                    value={formData.password2} 
                    placeholder="Confirm Password" 
                    onChange={onChangeHandler}
                    validate = {(val)=>(val === formData.password ? false : 'password does not match')} 
                />
                }
                <HStack>
                    <Box flex="1">
                        {{
                            SAVING : <Button colorScheme="teal" width="100%"  disabled>Saving...</Button>,
                            SUCCESS : <Button colorScheme="green" width="100%"  disabled>Saved!</Button>,
                            READY : <Button type="submit" colorScheme="teal" width="100%" variant = "outline" disabled={validate()}>
                                    {isSignUp ? "SignUp" : "LogIn"}
                                    </Button>
                        }[saveStatus]}
                        
                    </Box>
                    <Box flex="1">
                        <Button onClick={clearFields}   colorScheme="red" width="100%" variant = "outline" disabled={saveStatus === 'SAVING'}>
                            Cancel
                        </Button>
                    </Box>
                </HStack>
                
                <Button onClick={switchMode} colorScheme="teal" variant="outline" disabled={saveStatus === 'SAVING'}>
                    { isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </Button>

                </Stack>
                
            </form>
            
            
            
        );
    
}
 
export default Signup;