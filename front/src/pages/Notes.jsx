import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Notes(){
    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const url = 'http://localhost:5000/api/notes'
    const headers = {Authorization: `Bearer ${token}`}

    const fetchNotes = async() =>{
        try{
            const response = await axios.get(url, {headers : headers})
            setNotes(response.data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        if(!token){
            navigate('/login')
        }else{
            fetchNotes()
        }
    },[])

    const handleLogout = ()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }

    const handleAdd = async(e) =>{
        e.preventDefault()
        try{
            await axios.post(url, {title, content}, {headers})
            setTitle(""), setContent("")
            fetchNotes()
        }catch(err){
            console.log(err)
        }
    }

    const handleDelete = async(id) =>{
        try{
            await axios.delete(`${url}/${id}`, {headers})
            fetchNotes()
        }catch(err){
            console.log(err)
        }
    }
    return(
        <div>
            <header className="topbar">
                <span className="brand">Notes</span>
                
                <button className="btn-ghost" onClick={handleLogout}>Log out</button>
            </header>

        <main className="content">
            <form className="composer" onSubmit={handleAdd}>
                <input 
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                 />
                 <textarea 
                 placeholder="Write something..."
                 value={content}
                 onChange={(e)=>setContent(e.target.value)}
                  />
                <div className="composer-actions">
                        <button className="btn" type="submit">Add note</button>
                </div>
            </form>
            {notes.length === 0 ? (
            <p className="empty">No notes yet. Write your first one above.</p>
            ) : (
            <div className="grid">
                {notes.map(n => (
                    <article className="note" key={n._id}>
                        <h3>{n.title}</h3>
                        <p>{n.content}</p>
                        <footer>
                        <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                        <button className="note-delete" onClick={()=>handleDelete(n._id)}>
                        Delete
                        </button>
                        </footer>
                    </article>
                ))}
                    </div>
                )}
        </main>
            
        </div>
    )
}
export default Notes