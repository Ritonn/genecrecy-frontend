import styles from '../styles/Login.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';

function Signin() {

    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');

    // Fonction de connexion au site
    async function handleSignin() {
        const response = await fetch(`http://localhost:3000/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password }),
    });
        const data = await response.json();
        console.log('Résultat de la connexion => ', data.result);
        if (data.result) {
            try {
                dispatch(login({ username: username, token: data.token, roles: data.roles }));
                setUsername('');
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
                <p className = {styles.loginModalTitle}>Sign-in</p>
                <input className = {styles.loginField} type="text" placeholder="Username" id="username" onChange={(e) => setUsername(e.target.value)} value={username} />
                <input className = {styles.loginField} type="password" placeholder="Password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} onKeyDown={(e)=>{if(e.key==="Enter"){handleSignin()}}} />
                <button className= {styles.modalSigninButton} id="connection" onClick={() => handleSignin()} > Connexion </button>
                <p className={styles.errors}>{errors}</p>
            </div>
        </div>
    )
}
    
export default Signin;
    