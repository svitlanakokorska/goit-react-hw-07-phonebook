import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { GrContactInfo } from 'react-icons/gr';
import { getError, getFilteredContacts, getIsLoading } from 'redux/selectors';
import { fetchContacts, deleteContact } from 'redux/operations';
import { Button, Item, List, Text } from './ContactList.styled'; 

export const ContactList = () => {
  const filteredContacts = useSelector(getFilteredContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
   const dispatch = useDispatch(); 

   useEffect(() => {
    dispatch(fetchContacts()); 
  }, [dispatch]);
  

  const onDeleteContact = id => {
    dispatch(deleteContact(id)); 
  };

  
  if (!filteredContacts?.length) {
    return <Text>No contacts found.</Text>;
  }

  return (
    <>
    {isLoading && <b>Loading tasks...</b>}

    {!filteredContacts?.length && !error && !isLoading && (
        <Text>No contacts found.</Text>
      )}
  {error && <Text>{error}</Text>}
    <List>
     
      {filteredContacts.map(({ id, name, number }) => (
        <Item key={id}>
            <GrContactInfo size={16} />
          <Text>
            {name}: {number}
          </Text>
          <Button type="button" onClick={() => onDeleteContact(id)}>
            Delete
          </Button>
        </Item>
      ))}
    </List>
    </>
  );
};