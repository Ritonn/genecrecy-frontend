import styles from '../styles/Login.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { login } from '../reducers/user';

function Signup() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');

    // Fonction d'envoi des infos de création d'un nouveau compte à la BDD
    async function handleSignup() {
        const response = await fetch(`http://localhost:3000/users/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, email: email, password: password }),
        })
        const data = await response.json();
        if (data.result) {
        try {
            dispatch(login({ username: username, token: data.token }));
            setUsername('');
            setEmail('');
            setPassword(''); 
            changeVisibleModal();
        } catch(error) {
            setErrors(data.error);
        }
    }
    }

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerSection}>
                <h2 className = {styles.loginModalTitle}>Créez votre compte Famille</h2>
                <input className={styles.loginField} type="text" placeholder="Username" id="username" onChange={(e) => setUsername(e.target.value)} value={username} />
                <input className={styles.loginField} type="text" placeholder="Email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <input className={styles.loginField} type="password" placeholder="Password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} onKeyDown={(e)=>{if(e.key==="Enter"){handleSignup()}}} />
                <button className= {styles.modalSigninButton} id="register" onClick={() => handleSignup()}> Sign up </button>
                <p className={styles.errors}>{errors}</p>
            </div>
        </div>
    )
}

export default Signup;
