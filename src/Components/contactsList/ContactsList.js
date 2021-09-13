import React from 'react'
import PropTypes from 'prop-types'
import ContactItem from './contactItem/ContactItem';
import { connect } from "react-redux";
import { delContact } from '../../redux/actions'

function Contacts({contacts, delContact}) {

    const onDelete = (e)=>delContact(e.target.id)

    return (
        <ul>
            {contacts.map(contact=> !contact.hidden && (
                <ContactItem key={contact.id} contact={contact} onDelete={onDelete} />
            ))}
        </ul>
    )
}

Contacts.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.string.isRequired,
        name:PropTypes.string.isRequired,
        number:PropTypes.string.isRequired,
    })).isRequired,
    delContact: PropTypes.func.isRequired
}

export default connect(({contacts})=>({contacts}),{ delContact })(Contacts)

