import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const url = `${import.meta.env.VITE_API_URL}/api/auth/login`
    const navigate = useNavigate()

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            const response = await axios.post(url,{email, password})
            localStorage.setItem('token', response.data.token)
            navigate('/notes')
        }catch(err){
            setError(err.response.data.message)
        }
    }
    return(
        <div className="auth-page">
            <form className="auth-card" onSubmit={handleSubmit}>
            <h1>Welcome back</h1>
                <p className="sub">Log in to see your notes</p>
                <input 
                type="email"
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
                 <button className="btn" type="submit">Log in</button>
                 {error && <p className="error">{error}</p>}
                 <p className="switch">
                    New here? <Link to="/signup">Create an account</Link>
                </p>
            </form>
        </div>
    )
}
export default Login