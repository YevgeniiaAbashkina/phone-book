import axios from "axios";

const client =axios.create({
    baseURL:"http://dev.phonebook-1.telran-edu.de/"
})

client.interceptors.response.use(
    response=>{
        console.log(response)

        if (response.config.url.startsWith("/api/user/login")){
            localStorage.setItem("TOKEN", response.headers['access-token'])
        }
        return response
    },
    function(error){
        console.log("from api")
        if(error.response.status === 401){
            localStorage.removeItem("TOKEN")
        }
        return Promise.reject(error)
    }
)

client.interceptors.request.use(
    config=>{
        if(
            !config.url.startsWith("/api/user")
        ){
            config.headers ={
                "Access-Token": localStorage.getItem("TOKEN") || ""
            }
        }
        return config
    },
    function(error){
        return Promise.reject(error)
    }
)

export const registration = async ({email, password})=>{
    console.log(email, password)
    try{
        const response = await client.post("/api/user",{email, password});
        console.log(response);
        await client.get(`/api/user/activation/${response.data}`);
        console.log("response.data",response.data)
    }catch(error){
        throw new Error(error.message)
    }
}


export const login = async ({email,password})=>{
    console.log(email,password)
    try{
        await client.post(`/api/user/login`, {email, password});
        console.log("login success")
    }catch(error){
        throw new Error(error.message)
    }
}