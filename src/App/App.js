import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { loadContacts } from '../redux/actions'
import Section from '../Components/section/Section';
import Form from '../Components/form/Form';
import ContactsList from '../Components/contactsList/ContactsList';
import Filter from '../Components/filter/Filter';

let isMount = false

const App=({contacts=[], loadContacts})=>{
    
    if(!isMount && localStorage.getItem("contacts")){
        isMount = true
        loadContacts(JSON.parse(localStorage.getItem("contacts")))
    }  
    else{
        localStorage.setItem("contacts",JSON.stringify(contacts))
    }
    
    return (
            <>
                <h1>Phonebook</h1>
                <Section title="">
                    <Form />
                </Section>
                <Section title="Contacts">
                    <Filter />
                    <ContactsList />
                </Section>
            </>
    )
}

App.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.string.isRequired,
        name:PropTypes.string.isRequired,
        number:PropTypes.string.isRequired,
    })).isRequired,
    loadContacts: PropTypes.func.isRequired
}

export default connect(({contacts})=>({contacts}), {loadContacts})(App)
