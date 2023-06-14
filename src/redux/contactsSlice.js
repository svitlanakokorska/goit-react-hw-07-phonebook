import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';
const initialState = {
  items: [],
    isLoading: false,
    error: null,
};
const pendingReducer = state => {
  return {
    ...state,
    isLoading: true,
  };
};

const rejectedReducer = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload,
  };
};

const fetchContactsFulfilledReducer = (state, action) => {
  return { ...state, isLoading: false, error: null, items: action.payload };
};

const addContactsFulfilledReducer = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    items: [action.payload, ...state.items],
  };
};

const deleteContactsFulfilledReducer = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    items: state.items.filter(task => task.id !== action.payload.id),
  };
};
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    [fetchContacts.pending]: pendingReducer,
    [addContact.pending]: pendingReducer,
    [deleteContact.pending]: pendingReducer,
    [fetchContacts.rejected]: rejectedReducer,
    [addContact.rejected]: rejectedReducer,
    [deleteContact.rejected]: rejectedReducer,
    [fetchContacts.fulfilled]: fetchContactsFulfilledReducer,
    [addContact.fulfilled]: addContactsFulfilledReducer,
    [deleteContact.fulfilled]: deleteContactsFulfilledReducer,
  },
});

export const contactsReducer = contactsSlice.reducer;