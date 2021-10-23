import styled, {keyframes} from "styled-components";

const LoaderContainer = styled.div`
    display: flex;
    position: fixed;
    background-color: rgba(255,255,255,0.7);
    justify-content:center;
    align-items:center;
    left:0;
    right:0;
    bottom:0;
    top:0;
`

const rotate = keyframes`
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg)
    }
`

const Ring = styled.div`
    display:inline-block;
    width:80px;
    height: 80px;
    &: before{
        content: ' ';
        display:block;
        width:64px;
        height:64px;
        margin:8px;
        border-radius:50%;
        border: 6px solid #000;
        border-color:#000 transparent #000 transparent;
        animation: ${rotate} 1.2s linear infinite;
    }
`
const Loader = ()=>{
    return <LoaderContainer><Ring/></LoaderContainer>
}

export default Loader;