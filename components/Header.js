import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import { login, logout } from '../reducers/user';
import styles from '../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faXmark, faEye } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'antd';
import AddPersonForm from './AddPersonForm';
import Link from 'next/link';

function Header(props) {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const [visibleModal, setVisibleModal] = useState(false);
    const [date, setDate] = useState('2050-11-22T23:59:59');

    console.log('Données utilisateur', user)

    useEffect(() => {
        setDate(new Date());
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    };

    const handleClose = () => {
        console.log('Close Modal');
        setVisibleModal(false);
    }

    const changeModalState = () => {
        setVisibleModal(!visibleModal);
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
                <Modal
                getContainer="#react-modals"
                className={styles.modal}
                open={visibleModal}
                closable={true}
                footer={null}
                onCancel={() => setVisibleModal(null)}
                >
                <AddPersonForm changeVisibleModal={changeModalState}/>
                </Modal>
                <h1 className={styles.title}>Genecrecy</h1>
                <div className={styles.rightContainer}>
                <div className={styles.buttonsContainer}> 
                {user.roles?.includes("moderator")  || user.roles?.includes("admin") && <button className={styles.moderationButton} onClick={() => props.moderation()}> MODÉRATION </button>}
                <button className={styles.addButton} onClick={() => changeModalState()}> AJOUTER  </button>
                </div>
                {userSection}
                </div>
            </div>
            {/* {isModalVisible && 
                <Modal getContainer="#react-modals" className={styles.modal} visible={isModalVisible} closable={true} footer={null} onCancel={() => handleClose()}>
                    {modalContent}
                </Modal>} */}
        </header >
    );
}

export default Header;
