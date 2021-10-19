import HomeImg from "../images/contact_us.jpg";
import styled from "styled-components";

const HomeContainer = styled.div`
    background-image: url(${HomeImg});
    background-size: cover;
    width:100%;
    height: 85vh;
    background-repeat: none;
`

const Home = ()=>{
    return(
        <HomeContainer/>
    )
}

export default Home;