import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound ({ msg = "Ups no hay juegos!"}) {
    const navigate = useNavigate();
    return (
        <div className="container">
            <h1>{msg}</h1>
            {msg !== "Ups no hay juegos!" && (
                <div>
                    <button onClick={() => navigate("/home")}>Go Home</button>
                </div>
            )}
        </div>
    )
}