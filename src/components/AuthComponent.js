import styled from "styled-components";
import Field from "./Field";
import {useForm, set} from "react-cool-form";
import * as  yup from "yup";
//import { login, registration } from "../service/api";
import { loginAction, registrationAction } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import Error from "./Error";
import { errorSelector } from "../store/auth";


const AuthComponent = ()=>{
const dispatch = useDispatch()
const error= useSelector(errorSelector)

    const yupSchema= yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(6).required()
    })

    const validateWithYup = (schema) => async (values)=>{
        let errors ={};
        try{
            await schema.validate(values, {abortEarly: false})
        }
        catch(yupError){
            yupError.inner.forEach(({path, message})=>set(errors, path, message))
        }
        return errors
    }

    const {form, use} = useForm({
        defaultValues: {email:"", password:""},
        validate: validateWithYup(yupSchema),
        onSubmit:(values,event, e)=>{
            console.log(values);
            console.log(e.submitter.name);
            if(e.submitter.name === "reg"){
                dispatch(registrationAction(values));
                console.log(values)
                e.submitter.style.display = "none"
            }
            else if(
                e.submitter.name === "login"
            ){
                dispatch(loginAction(values))
                document.querySelector("#reg").style.display = "none"
            }
        }
    })

    const errors = use("errors", {errorWithTouched: true});

    return(
        <Wrapper>
            {error && <Error text={error}/>}
            <Form ref={form} noValidate>
                    <Field  name="email"
                            placeholder="type your email"
                            error = {errors.email}/>
                    <Field name="password"
                            placeholder="type your password"
                            error = {errors.password}/>
                    <Button name="reg"id="reg">registration</Button>
                    {error&& <Button name="reg">registration</Button>}
                    <Button name="login" >login</Button>
            </Form>
        </Wrapper>
    )
}

export default AuthComponent;

const Wrapper = styled.div`
    width: 70%;
    margin: 80px auto;
    text-align: right;
`

const Form = styled.form`
    width: 100%
`

const Button = styled.button`
    background-color: #1aa592;
    padding: 15px 25px;
    margin-left: 10px;
    margin-top:20px;
    color: white;
    border-radius: 6px;
    text-transform: uppercase;
    outline: none;
    border: none;
    &:hover{
        background-color: #127a6a;
    }
`
