import { getAllContactsAction, contactsSelector, deleteContactAction } from "../store/contacts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";
import Delete from "../images/trash.png";
import { Button } from "./ContactView";

const ContactList = ()=>{

    const contacts = useSelector(contactsSelector);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        dispatch(getAllContactsAction())
    },[dispatch])

    return(
        <Wrapper>
        {contacts.length === 0 ? <h3>The contacts-list is empty</h3> :
        <>
        <Ul>
            {contacts.map(contact => 
            <NavLink key= {contact.id} to={`/contacts/${contact.id}`} activeClassName="contactActive">
                <Li >
                    {contact.firstName} {contact.lastName}
                    <Image src={Delete}
                            onClick={(e)=>{
                            e.preventDefault()
                            dispatch(deleteContactAction(contact.id))
                            history.push('/contacts')}
                    }/>
                </Li>
            </NavLink> )}           
        </Ul>
        <RemoveButton>Remove all contacts</RemoveButton>
        </>
        }
        </Wrapper>
    )
}

export default ContactList;

export const Wrapper = styled.div`
    width: 46%;
    
`

const Ul=styled.ul`
    list-stile: none;
    padding-left: 0px;
    & a{
        text-decoration: none;
        color: black;
    }
`

const Li = styled.li`
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    margin-bottom: 10px;
    border-bottom: 1px solid black;
    
    &:hover{
        background-color: rgba(32, 161, 142, 0.2);
    }
    
`

const Image = styled.img`
    width: 25px;
`

const RemoveButton = styled(Button)`
    width: 100%;
    margin-left:0px;
    background-color: rgb(239,49,61);
    &:hover{
        background-color:rgb(201,36,44)
    }
`