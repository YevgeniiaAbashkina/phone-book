import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { contactByIdSelector, deleteContactAction} from '../store/contacts'
import { useSelector, useDispatch } from 'react-redux'
import Address from './../images/buildings.png'
import Phone from './../images/technology.png'
import Email from './../images/multimedia.png'
import Loader from './Loader'


const ContactView = () => {
    const { id } = useParams();

    const history = useHistory();
    const dispatch = useDispatch()

    const contact = useSelector(state => contactByIdSelector(state, parseInt(id)))

    return (
        <>

        {contact ? 
        <Wrapper>
            <h3>{contact.firstName} {contact.lastName}</h3>
            <Row>
                <img src= {Email} alt ='email'/>
                <h4>{contact.email}</h4>
            </Row>
            <Row>
                <img src= {Phone} alt ='phone'/>
                <h4>{contact.phone}</h4>
            </Row>
            <Row>
                <img src= {Address} alt ='address'/>
                <h4>{contact.address}</h4>
            </Row>
            <p>{contact.description}</p>
            <ButtonRow>
            <Button onClick = {()=> {
                console.log("test edit")
                history.push(`/contacts/${contact.id}/edit`)
            }}>edit</Button>
                <RemoveButton onClick = {()=>{ 
                    dispatch(deleteContactAction(contact.id))
                    history.push(`/contacts`)
                    }}>remove</RemoveButton>
            </ButtonRow>
        </Wrapper> : <Loader />}
        </>
    )
}

export default ContactView

const Wrapper = styled.div`
    width: 48%;
    padding: 30px;
    border: 1px solid black;
    background-color: rgba(32,161,142,0.1);
    border-radius:5px;
    height: fit-content;
`

const Row = styled.div`
    display:flex;
    align-items: center;
    & img{
        width:20px;
        margin-right:15px;
        margin-top:-3px;
    }
`
export const ButtonRow = styled.div`
    display:flex;
    margin-top:40px;
    justify-content:end;
`

export const Button = styled.button`
    padding:10px 40px;
    margin-left:10px;
    background-color:rgb(32,161,142);
    color:white;
    border-radius:5px;
    outline:none;
    border:none;
    &:hover{
        background-color: #127a6a;
        cursor:pointer;
    }
`

const RemoveButton = styled(Button)`
    background-color: rgb(239,49,61);
    &:hover{
        background-color:rgb(201,36,44)
    }
`