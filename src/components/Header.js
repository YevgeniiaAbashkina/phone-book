import {NavLink} from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    padding: 10px;
    background-color: #ccc;
    display: flex;
    margin-bottom: 10px;
`

const Nav = styled.ul`
    list-style: none;
    display: flex;
    margin-left: auto;

`

const HeaderLink = styled.li`
    & a{
        text-decoration:none;
        margin-left: 25px;
        color: black;
    }
    &:hover{
        cursor: pointer;
        text-decoration: underline;
        color: #777;
        font-weight: bold;
    }
`

const Header =()=>{
    return (
        <Wrapper>
            <Nav>
                <HeaderLink>
                    <NavLink to="/login">login/registration</NavLink>
                </HeaderLink>
                <HeaderLink>
                    <NavLink to="/contacts">all contacts</NavLink>
                </HeaderLink>
                <HeaderLink>
                    <NavLink to="/contact/add">add contact</NavLink>
                </HeaderLink>
                <HeaderLink>
                    <NavLink to="/">logout</NavLink>
                </HeaderLink>
            </Nav>
        </Wrapper>
    )
}

export default Header;