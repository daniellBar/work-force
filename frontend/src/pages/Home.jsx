import React from 'react'
import { Login } from '../comps/Login.jsx'

export function Home() {
    return (
        <section className="home main-container">
            <div className="log-container">
                <Login />
            </div>
        </section>
    )
}
