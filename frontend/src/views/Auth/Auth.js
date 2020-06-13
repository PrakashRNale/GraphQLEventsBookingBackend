import React , {  useState , useContext } from 'react';
import AuthContext from '../../context/AuthContext';

import classes from './Auth.module.scss';
const Auth = props =>{
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [name , setName] = useState('');
    const [isLogin , setIsLogin] = useState(true);
    const authContext = useContext(AuthContext);

    let requestBody = {
        query : `
            mutation{
                createUser(userInput : {email : "${email}" , password : "${password}", name : "${name}"}){
                    name
                    email
                }
            }
        `
    }

    if(isLogin){
        requestBody = {
            query : `
                query{
                    login(email : "${email}" , password : "${password}"){
                        token
                        expirationTime
                        userId
                    }
                }
            `
        }
    }

    const submitHandler = event =>{
        event.preventDefault();
        
        if(email.trim('').length === 0 || password.trim('').length === 0){
            console.log('some value is wrong '+email + ' '+password);
            return;
        }
        console.log('corrent values '+email + ' '+password);
        fetch('http://localhost:3000/graphql',{
            method : "POST",
            body : JSON.stringify(requestBody),
            headers : {
                'Content-type' : 'application/json'
            }
        }).then(result =>{
            if(result.status != 200 && result.status != 201){
                throw new Error('Failed');
            }
            return result.json();
        }).then(res=>{
            debugger;
            let loginData = res.data.login;
            authContext.login(loginData.token , loginData.userId , loginData.expirationTime);
            console.log(res);
        }).catch(err => console.log(err))
    }

    return(
        <form className={classes.authForm} onSubmit={(event) =>submitHandler(event)}>
            <div className={classes.formControl}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={classes.formControl}>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            {!isLogin ? 
                <div className={classes.formControl}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} />
                </div>
            : null }
            <div className={classes.formAction}>
                <button type="submit">Submit</button>
                <button type="button" onClick={() =>{setIsLogin(!isLogin)}}>Switch to {isLogin ? 'SignUp' : 'Login'}</button>
            </div>
            
        </form>
    )
}

export default Auth;