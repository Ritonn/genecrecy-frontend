import styles from '../styles/AddPersonForm.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { AutoComplete } from 'antd';

function AddPersonForm() {

    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [pere, setPere] = useState('');
    const [pereId, setPereId] = useState('');
    const [optionsPere, setOptionsPere] = useState([]);
    const [mere, setMere] = useState('');
    const [optionsMere, setOptionsMere] = useState([]);
    const [errors, setErrors] = useState('');

    // Fonction d'envoi d'une nouvelle personne en base
    const handleSubmit = async (prenom, nom, dateNaissance, pere, mere) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADRESS}/persons`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password }),
        });
        const data = await response.json();
        console.log('Résultat de la connexion => ', data.result);
        if (data.result) {
            try {
                dispatch(login({ username: username, token: data.token, roles: data.roles }));
                setPrenom('');
                setNom('');
                set
                changeVisibleModal();
            } catch (error) {
                setErrors(data.error);
            }
        }
    }

    // Fonction de recherche d'une ou plusieurs personnes en base
    const handleSearchPerson = async (nomComplet) => {

        try {

            if (!nomComplet || nomComplet.trim() === '') {
                setOptionsPere([]);
                return;
            }
            let prenomNom = nomComplet.split(" ");

            console.log('Nom Splitté => ', prenomNom)

            if (prenomNom.length >= 3) {
                prenomNom = [prenomNom[0], prenomNom.slice(1).join(" ")];
                console.log('Nom reconstruit => ', prenomNom)
            }

            if (prenomNom[1] !== '' && prenomNom.length === 2) {

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADRESS}/persons/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prenom: prenomNom[0], nom: prenomNom[1] }),
            });

            const data = await response.json();

            console.log('Résultats trouvés => ', data.data);

            // Formatage des données pour l'AutoComplete
            const formattedOptions = data.data.map(person => ({
                value: `${person.prenom} ${person.nom}`,
                label: `${person.prenom} ${person.nom} né(e) le ${person.dateNaissance.slice(8,10)}/${person.dateNaissance.slice(5,7)}/${person.dateNaissance.slice(0,4)}`,
                id: person.id
            }));

            setOptionsPere(formattedOptions)
        } else {
            setOptionsPere([]);
        }
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
            setOptionsPere([]);
        }

    }

    // Fonction appelée lors de la sélection d'une option
    const onSelectPere = (value, id) => {
        setPere(value);
        setPereId(id);
    }

    console.log('Résultats formattés => ', optionsPere);
    console.log('ID de la personne choisie => ', pereId)

    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <p className={styles.loginModalTitle}>Ajouter quelqu'un</p>
                <label> Prénom </label>
                <input className={styles.field} type="text" placeholder="Prénom" id="prenom" onChange={(e) => setPrenom(e.target.value)} value={prenom} />
                <label> Nom </label>
                <input className={styles.field} type="text" placeholder="Nom" id="nom" onChange={(e) => setNom(e.target.value)} value={nom} />
                <label> Date de naissance </label>
                <input className={styles.field} type="date" placeholder="Date de naissance" id="dateMariage" />
                <label>Père </label>
                <AutoComplete
                    options={optionsPere}
                    style={{ width: 200 }}
                    onSelect={(value, pere) => onSelectPere(value, pere.id)}
                    onSearch={handleSearchPerson}
                    placeholder="Tapez pour rechercher"
                    value={pere}
                    onChange={(value) => setPere(value)}
                />
                <input className={styles.field} type="search" placeholder="Tapez pour chercher" id="pere" onChange={(e) => setPere(e.target.value)} value={pere} />
                <label>Mère </label>
                <input className={styles.field} type="search" placeholder="Tapez pour chercher" id="mere" onChange={(e) => { setMere(e.target.value) }} value={mere} />
                <button className={styles.modalSigninButton} id="Ajouter" onClick={() => handleSubmit()}> Ajouter </button>
                <p className={styles.errors}>{errors}</p>
            </div>
        </div>
    )
}

export default AddPersonForm;
