import React from 'react';
import { Input,Button,FormControl,FormLabel,InputRightElement,InputGroup,FormErrorMessage } from '@chakra-ui/react';


class Field extends React.Component{
    state = {
        value:this.props.value,
        error:false,
        show:false
    }


    componentWillReceiveProps(update){
        this.setState({ value:update.value })
    }

    onChangeHandler = evt =>{
        const name = this.props.name;
        const value = evt.target.value;
        const error = this.props.validate ? this.props.validate(value):false;
        this.setState({value,error});
        this.props.onChange({name,value,error})
    }

    handleClick = () =>this.setState(prevState=>({
            show:!prevState.show
        })
    )
    

    render(){
        const { placeholder,label,type,name } = this.props;

        if(type === "password"){
            return(
                <FormControl id={name}  isRequired={label ? true : false}>
                <FormLabel>{label}</FormLabel>
                <InputGroup size="md">
                    <Input
                        type={this.state.show ? "text" : type }
                        name = {name}
                        variant = "outline"
                        value={this.state.value}
                        placeholder={placeholder}
                        onChange = {this.onChangeHandler}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={this.handleClick}>
                            {this.state.show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <span style={{color:'red'}}>
                    {this.state.error}
                </span>
                
            </FormControl>
            )
        }
        else{
        return(
            <FormControl id={name}  isRequired={label ? true : false}>
                <FormLabel>{label}</FormLabel>
                <Input
                    type={type }
                    name = {name}
                    variant = "outline"
                    value={this.state.value}
                    placeholder={placeholder}
                    onChange = {this.onChangeHandler}
                />
                <span style={{color:'red'}}>
                    {this.state.error}
                </span>
            </FormControl>
            
        )
        }
    }
}

export default Field;