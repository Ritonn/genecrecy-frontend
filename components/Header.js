import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/user'
import styles from '../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faXmark, faEye } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'antd';
import Link from 'next/link';

function Header() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const [date, setDate] = useState('2050-11-22T23:59:59');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpErrors, setSignUpErrors] = useState('');
    const [signInUsername, setSignInUsername] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const [signInErrors, setSignInErrors] = useState('');

    useEffect(() => {
        setDate(new Date());
    }, []);

    const handleRegister = () => {
        console.log('bouton de signup détecté');
        fetch(`http://localhost:3000/users/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: signUpUsername, email: signUpEmail, password: signUpPassword }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(login({ username: signUpUsername, token: data.token }));
                    setSignUpUsername('');
                    setSignUpEmail('');
                    setSignUpPassword('');
                    setIsModalVisible(false)
                } else {
                    setSignUpErrors(data.error)
                }
            });
    };

    const handleConnection = () => {

        fetch(`http://localhost:3000/users/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: signInUsername, password: signInPassword }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(login({ username: signInUsername, token: data.token }));
                    setSignInUsername('');
                    setSignInPassword('');
                    setIsModalVisible(false)
                }
            });
    };

    const handleLogout = () => {
        dispatch(logout());
        dispatch(removeAllBookmark());
    };

    const handleClose = () => {
        console.log('Close Modal');
        setIsModalVisible(false);
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    let modalContent;
    if (!user.isConnected) {
        modalContent = (
            <div className={styles.registerContainer}>
                <div className={styles.registerSection}>
                    <p>Sign-up</p>
                    <input type="text" placeholder="Username" id="signUpUsername" onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} />
                    <input type="text" placeholder="Email" id="signUpEmail" onChange={(e) => setSignUpEmail(e.target.value)} value={signUpEmail} />
                    <input type="password" placeholder="Password" id="signUpPassword" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} />
                    <button id="register" onClick={() => handleRegister()}>Register</button>
                    <p className={styles.errors}>{signUpErrors}</p>
                </div>
                <div className={styles.registerSection}>
                    <p>Sign-in</p>
                    <input type="text" placeholder="Username" id="signInUsername" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} />
                    <input type="password" placeholder="Password" id="signInPassword" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
                    <button id="connection" onClick={() => handleConnection()}>Connect</button>
                </div>
            </div>
        );
    }

    let userSection;
    if (user.token) {
        userSection = (
            <div className={styles.logoutSection}>
                <p>Bienvenue {user.username} ! </p>
                <button onClick={() => handleLogout()}> Déconnexion </button>
            </div>
        );
    } else {
        if (isModalVisible) {
            userSection =
                <div className={styles.headerIcons}>
                    <FontAwesomeIcon onClick={showModal} className={styles.userSection} icon={faXmark} />
                </div>
        } else {
            userSection =
                <div className={styles.headerIcons}>
                    <FontAwesomeIcon onClick={showModal} className={styles.userSection} icon={faUser} />
                </div>
        }
    }

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <h1 className={styles.title}>Genecrecy</h1>
                {userSection}
            </div>

            <div className={styles.linkContainer}>
                {/* <Link href="/"><span className={styles.link}>Articles</span></Link>
                <Link href="/bookmarks"><span className={styles.link}>Bookmarks</span></Link> */}
            </div>

            {isModalVisible && 
                <Modal getContainer="#react-modals" className={styles.modal} visible={isModalVisible} closable={true} footer={null} onCancel={() => handleClose()}>
                    {modalContent}
                </Modal>}
        </header >
    );
}

export default Header;
