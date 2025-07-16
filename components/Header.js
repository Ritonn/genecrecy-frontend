import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import { login, logout } from '../reducers/user';
import styles from '../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faXmark, faEye } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'antd';
import Link from 'next/link';

function Header() {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const [date, setDate] = useState('2050-11-22T23:59:59');

    useEffect(() => {
        setDate(new Date());
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    };

    const handleClose = () => {
        console.log('Close Modal');
        setIsModalVisible(false);
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    let userSection;
    if (user.token) {
        userSection = (
            <div className={styles.logoutSection}>
                <p>Bienvenue {user.username} ! </p>
                <button onClick={() => handleLogout()}> Déconnexion </button>
            </div>
        );
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

            {/* {isModalVisible && 
                <Modal getContainer="#react-modals" className={styles.modal} visible={isModalVisible} closable={true} footer={null} onCancel={() => handleClose()}>
                    {modalContent}
                </Modal>} */}
        </header >
    );
}

export default Header;
