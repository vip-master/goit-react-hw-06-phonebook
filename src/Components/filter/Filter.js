import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import {filter} from '../../redux/actions'

function Filter({filter, value=""}) {

	const onChange = (e) => filter(e.target.value.trim())

    return (

        <>
            <h4>Contacts filter</h4>
            <input value={value} name="filter" type="text" onChange={onChange} />
        </>
    )
}

Filter.propTypes = {
    filter:PropTypes.func.isRequired,
    value:PropTypes.string.isRequired
}

export default connect((state)=>({value: state.filter}),{ filter })(Filter)

