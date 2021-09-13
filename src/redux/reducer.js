import {  createReducer } from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid'
import {
	loadContacts,
	addContact,
	delContact,
	filter
} from "./actions"

export const reducer=createReducer({contacts:[], filter:""},{
	[loadContacts]: ({filter, contacts: prevContacts},{payload})=>({filter, contacts: [...prevContacts, ...payload]}),
	[addContact]: ({filter, contacts: prevContacts},{payload})=>{
		const contacts = [...prevContacts]
		contacts.push({id:uuidv4(), name:payload.name, number:payload.number, hidden:false})
		return ({filter, contacts});
	},
	[delContact]: ({filter, contacts: prevContacts},{payload})=>({filter, contacts: prevContacts.filter(i=>i.id!==payload)}),
	[filter]: ({contacts: prevContacts},{payload})=>{
		const filtered=prevContacts.map(i=>{
				const hidden = !i.name.toLowerCase().startsWith(payload.split(" ").join("").toLowerCase())
				return {...i, hidden}
			})
		return ({filter: payload, contacts:filtered})
	}
})