import { createAction } from "@reduxjs/toolkit"

export const loadContacts=createAction("@/contact/load")
export const addContact=createAction("@/contact/add")
export const delContact=createAction("@/contact/del")
export const filter=createAction("@/filter")