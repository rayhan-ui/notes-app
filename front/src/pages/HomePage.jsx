import { Link } from "react-router-dom"

function HomePage(){
    return(
        <div className="home">
            <header className="home-nav">
                <span className="brand">Notes</span>
                <Link to="/login" className="btn-ghost">Log in</Link>
            </header>

            <main className="home-hero">
                <p className="home-tag">Free to use</p>
                <h1>Welcome to <span>Note application</span></h1>
                <p className="home-lead">
                    Write down your thoughts, keep them in one place, and open them
                    from anywhere. Your notes stay private to your account.
                </p>
                <div className="home-actions">
                    <Link to="/signup" className="btn">Sign up for free</Link>
                    <Link to="/login" className="btn-ghost">I already have an account</Link>
                </div>
            </main>

            <section className="home-features">
                <div className="home-feature">
                    <span>01</span>
                    <h3>Private by default</h3>
                    <p>Every note belongs to your account. Nobody else can see it.</p>
                </div>
                <div className="home-feature">
                    <span>02</span>
                    <h3>Quick to use</h3>
                    <p>Add a note or delete one in a single click, no clutter.</p>
                </div>
                <div className="home-feature">
                    <span>03</span>
                    <h3>Secure login</h3>
                    <p>Passwords are hashed, and every request is checked with a token.</p>
                </div>
            </section>
        </div>
    )
}

export default HomePage