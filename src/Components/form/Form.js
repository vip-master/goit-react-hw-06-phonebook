import React, { useState } from 'react'
import PropTypes from 'prop-types'
import InputMask from 'react-input-mask';
import { connect } from "react-redux";
import {addContact} from '../../redux/actions'

const _INITIAL_STATE_={
    name:"",
    number: "",
}

const Form=({contacts,addContact})=>{   
    
    const [state,setState]=useState(_INITIAL_STATE_)

    const handleChange=({target:{name,value}})=>{
        setState(state=>({...state,[name]: value.trim()}))
    }

    const handleSubmit=(e)=>{
        e.preventDefault()  

        const {name,number}=state

        if(contacts.some(i=>{
            return i.number===number || i.name.toLowerCase()===name.toLowerCase()
        })){
            alert(`This ${name} is already exist.`)

            return
        }     

        addContact({name,number})
            
        setState({..._INITIAL_STATE_})
    }

        return(
            <form>
                <label>
                    <h3>Name</h3>
                    <input value={state.name} type="text" name="name" onChange={handleChange}/>
                </label>
                <label>
                    <h3>Number</h3>
                    <InputMask mask="+99(999)-99-99" value={state.number} type="tel" name="number" onChange={handleChange}/>
                </label>
                <button type="submit" onClick={handleSubmit}>Add contact</button>
            </form>
        ) 
}

Form.propTypes={
    addContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    })).isRequired,
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
  };
};

export default connect(mapStateToProps, { addContact })(Form);