import ContactList from "./ContactList";
import { Route, Switch } from "react-router-dom";
import ContactView from "./ContactView";
import styled from "styled-components";
import ContactForm from "./ContactForm";

const ContactMain=()=>{
    return(
        <Wrapper>
            <ContactList/>
            <Switch>
                <Route path="/contacts/:id/edit" component={ContactForm}/>
                <Route path="/contacts/add"  component = {ContactForm}/>
                <Route path="/contacts/:id" component={ContactView}/> 
            </Switch>
        </Wrapper>
    )
}

export default ContactMain;

const Wrapper = styled.div`
    display: flex;
    margin-top: 30px;
    justify-content: space-between;
`