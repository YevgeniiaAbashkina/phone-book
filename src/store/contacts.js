import { createSlice } from '@reduxjs/toolkit';
import { startLoading, stopLoading } from './app';
import { addNewContact, deleteMyContact, getAllContacts, updateMyContact,deleteMyAllContacts } from '../service/api';
import {createSelector} from 'reselect'

const initialState = {
    contacts:[]
}

const contactsReducer = createSlice({
    name:'contacts',
    initialState,
    reducers:{
        setContacts: (state, {payload}) =>{
            state.contacts = payload.contacts
        },
        addContact: (state, {payload})=>{
            state.contacts.push(payload.contact)
        },
        updateContact: (state, {payload})=>{
            const index = state.contacts.findIndex(contact => contact.id === payload.contact.id)
            state.contacts[index] = payload.contact
        },
        deleteContact: (state, {payload}) =>{
            console.log(payload.id)
            state.contacts = state.contacts.filter(contact => contact.id !== payload.id)
        },
        deleteAllContacts: (state, {payload}) =>{
            state.contacts = payload.contacts
        }
    }
})

export default contactsReducer.reducer;

export const {setContacts, addContact, updateContact, deleteContact, deleteAllContacts} = contactsReducer.actions;

export const contactsSelector = state => state.contacts.contacts

export const getAllContactsAction=()=>{
    return async dispatch =>{
        dispatch(startLoading())
        try{
            //const response = await getAllContacts()
            dispatch(setContacts({contacts: await getAllContacts()}))
        }catch(error){
            console.log(error)
        }finally{
            dispatch(stopLoading())
        }
    }
}

export const addContactAction = (contact)=>{
    return async dispatch =>{
        dispatch(startLoading())
        try{
            const response = await addNewContact(contact);
            dispatch(addContact({contact:response}))
        }catch(error){
            console.log(error)
        }
        finally{
            dispatch(stopLoading())
        }
    }
}

export const updateContactAction = (contact)=>{
    return async dispatch =>{
        dispatch(startLoading())
        try{
            const response = await updateMyContact(contact);
            dispatch(updateContact({contact:response}))
        }catch(error){
            console.log(error)
        }
        finally{
            dispatch(stopLoading())
        }
    }
}

export const deleteContactAction = (id)=>{
    return async dispatch =>{
        dispatch(startLoading())
        try{
            await deleteMyContact(id)
            dispatch(deleteContact({id}))
        }catch(error){
            console.log(error)
        }finally{
            dispatch(stopLoading())
        }
    }
}

export const deleteAllContactsAction = (contacts)=>{
    return async dispatch =>{
        dispatch(startLoading())
        try{
            await deleteMyAllContacts()
            dispatch(deleteAllContacts({contacts}))
            
        }catch(error){
            console.log(error)
        }finally{
            dispatch(stopLoading())
        }
    }
}

export const contactByIdSelector = createSelector(
    state => state.contacts.contacts,
    (_, id)=> id,
    (array, id) => array.find(contact => contact.id === id)
)