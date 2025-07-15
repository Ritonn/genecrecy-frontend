import React from 'react';
import styles from "../styles/Couple.module.css";
import Perso from "./Person"

function Couple() {

    const getPersonInfos = async () => {
        const response = await fetch(`${process.env.LOCAL_BACKEND_URI}/api/arbre/681e6c6a7c81c7ebb080b91e`);
        const data = response.json()
    }

    

    return (
        <div>
            {}
        </div>
    );
};

export default Couple;