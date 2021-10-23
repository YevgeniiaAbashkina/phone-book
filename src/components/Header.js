import {NavLink} from "react-router-dom";
import styled from "styled-components";
import { authSelector, logout } from "../store/app";
import {useSelector, useDispatch} from "react-redux"

const Header =()=>{

    const auth = useSelector(authSelector);
    const dispatch = useDispatch();

    return (
        <Wrapper>
            <Nav>{!auth && //false
                <HeaderLink style = {{marginLeft:"auto"}}>
                    <NavLink to="/login" >login/registration</NavLink>
                </HeaderLink>}

                {auth && //true
                <> 
                <HeaderLink >
                    <NavLink to="/contacts"exact>all contacts</NavLink>
                </HeaderLink>
                <HeaderLink>
                    <NavLink to="/contacts/add" >add contact</NavLink>
                </HeaderLink>
                <HeaderLink style = {{marginLeft:"auto"}}
                    onClick={()=>{
                        dispatch(logout())
                    }}>
                    <NavLink to="/">logout</NavLink>
                </HeaderLink>
                </>}
            </Nav>
        </Wrapper>
    )
}

export default Header;

const Wrapper = styled.div`
    padding: 10px 0;
    background-color: #1aa592;
    display: flex;
    margin-bottom: 10px;
`

const Nav = styled.ul`
    list-style: none;
    display: flex;
    width:100%;
    padding: 0 20px;
`

const HeaderLink = styled.li`
    & a{
        text-decoration:none;
        margin-right: 20px;
        color: white;
    }
    &:hover{
        cursor: pointer;
        text-decoration: underline;
        color: rgba(255, 255, 255, 0.7);
        
    }
`