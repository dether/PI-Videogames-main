import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import s from "./Loading.module.css"

export default function Loading() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        // Simulating loading data
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <div>
            {isLoading ? (
                <div className={s.loadingOverlay}>
                    <div className={s.loadingContent}>
                        <img
                            className={s.loadingIcon}
                            src="https://i.pinimg.com/originals/db/f2/55/dbf255f9f7ba73f466e9129fc698d779.gif"
                            alt="Loading..."
                        />
                        <h1 className={s.title}>Loading...</h1>
                    </div>
                </div>
            ) : null}
        </div>
    )
}