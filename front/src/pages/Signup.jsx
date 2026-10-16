import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Signup(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const url = 'http://localhost:5000/api/auth/signup'

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            await axios.post(url, {name, email, password})
            navigate('/login')
        }catch(err){
            console.log(err)
        }
    }
    
    return(
        <div className="auth-page">
        <form className="auth-card" onSubmit={handleSubmit} >
        <h1>Create account</h1>
        <p className="sub">Start keeping your notes in one place.</p>
            <input 
            type="text"
            placeholder="enter your name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
             />
            <input 
            type="text"
            placeholder="enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
             />
            <input 
            type="password"
            placeholder="enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
             />
             <button className="btn">Sign up</button>
             <p className="switch">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
        </form>
        </div>
    )
}
export default Signup