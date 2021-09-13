import {  createReducer } from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid'
import {
	loadContacts,
	addContact,
	delContact,
	filter
} from "./actions"

const f=(state)=>({filter: state.filter ? state.filter : ""})


export const reducer=createReducer({contacts:[], filter:""},{
	[loadContacts]: (state,{payload})=>({...f(state), contacts: state.contacts ? [...state.contacts, ...payload] : [...payload]}),
	[addContact]: (state,{payload})=>{
		const contacts = state.contacts ? [...state.contacts] : []
		contacts.push({id:uuidv4(), name:payload.name, number:payload.number, hidden:false})
		return ({...f(state), contacts});
	},
	[delContact]: (state,{payload})=>({...f(state), contacts: state.contacts ? state.contacts.filter(i=>i.id!==payload):[]}),
	[filter]: (state,{payload})=>{
		const filtered=state.contacts.map(i=>{
				const hidden = !i.name.toLowerCase().startsWith(payload.split(" ").join("").toLowerCase())
				return {...i, hidden}
			})
		return ({filter: payload, contacts:filtered})
	}
})