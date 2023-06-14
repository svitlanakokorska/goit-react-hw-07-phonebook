import { createSelector } from '@reduxjs/toolkit';

export const getContacts = state => state.contacts.items;

export const getIsLoading = state => state.contacts.isLoading;

export const getError = state => state.contacts.error;

export const getFilter = state => state.filter;

export const getFilteredContacts = createSelector(
    [getContacts, getFilter], 
    (contacts, filter) => {
       
      return contacts.filter(({ name }) =>
        name.toLowerCase().includes(filter.toLowerCase())
      );
    }
  );