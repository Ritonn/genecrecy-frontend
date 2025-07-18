import styles from '../styles/AddPersonForm.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { AutoComplete } from 'antd';

function AddPersonForm() {

    const dispatch = useDispatch();
    const [date, setDate] = useState(null);
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [pere, setPere] = useState('');
    const [pereId, setPereId] = useState('');
    const [optionsPere, setOptionsPere] = useState([]);
    const [mere, setMere] = useState('');
    const [mereId, setMereId] = useState('');
    const [optionsMere, setOptionsMere] = useState([]);
    const [errors, setErrors] = useState('');
    const [isNotFamille, setIsNotFamille] = useState(false);
    const [isDead, setIsDead] = useState(false);
    const [optionsConjoint, setOptionsConjoint] = useState([]);

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
                setDate(null);
                setPere('');
                setMere('');
                changeVisibleModal();
            } catch (error) {
                setErrors(data.error);
            }
        }
    }

    // Fonction de recherche d'une ou plusieurs personnes en base
    const handleDadSearch = async (nomComplet) => {

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
                    label: `${person.prenom} ${person.nom} né(e) le ${person.dateNaissance.slice(8, 10)}/${person.dateNaissance.slice(5, 7)}/${person.dateNaissance.slice(0, 4)}`,
                    id: person.id
                }));

                setOptionsPere(formattedOptions);
            } else {
                setOptionsPere([]);
            }
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
            setOptionsPere([]);
        }

    }

    // Fonction de recherche d'une ou plusieurs personnes en base
    const handleMomSearch = async (nomComplet) => {

        try {

            if (!nomComplet || nomComplet.trim() === '') {
                setOptionsMere([]);
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
                    label: `${person.prenom} ${person.nom} né(e) le ${person.dateNaissance.slice(8, 10)}/${person.dateNaissance.slice(5, 7)}/${person.dateNaissance.slice(0, 4)}`,
                    id: person.id
                }));

                setOptionsMere(formattedOptions);
            } else {
                setOptionsMere([]);
            }
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
            setOptionsMere([]);
        }

    }

        // Fonction de recherche d'une ou plusieurs personnes en base
    const handleConjointSearch = async (nomComplet) => {

        try {

            if (!nomComplet || nomComplet.trim() === '') {
                setOptionsConjoint([]);
                return;
            }
            let prenomNom = nomComplet.split(" ");

            console.log('Nom Splitté => ', prenomNom)

            if (prenomNom.length >= 3) {
                prenomNom = [prenomNom[0], prenomNom.slice(1).join(" ")];
                console.log('Nom reconstruit => ', prenomNom)
            }

            if (prenomNom[1] !== '' && prenomNom.length === 2) {

                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADRESS}/persons/search/conjoint`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prenom: prenomNom[0], nom: prenomNom[1] }),
                });

                const data = await response.json();

                console.log('Résultats trouvés => ', data.data);

                // Formatage des données pour l'AutoComplete
                const formattedOptions = data.data.map(person => ({
                    value: `${person.prenom} ${person.nom}`,
                    label: `${person.prenom} ${person.nom} né(e) le ${person.dateNaissance.slice(8, 10)}/${person.dateNaissance.slice(5, 7)}/${person.dateNaissance.slice(0, 4)}`,
                    id: person.id
                }));

                setOptionsConjoint(formattedOptions);
            } else {
                setOptionsConjoint([]);
            }
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
            setOptionsConjoint([]);
        }

    }

    // Fonction appelée lors de la sélection d'une option pour le père
    const onSelectPere = (value, id) => {
        setPere(value);
        setPereId(id);
    }

    // Fonction appelée lors de la sélection d'une option
    const onSelectMere = (value, id) => {
        setMere(value);
        setMereId(id);
    }

    const conjointField = (
        <div>
            <span className={styles.parentLabel}>Conjoint Famille</span>
            <label style={{ marginLeft: 5, color: "white" }}>(écrire prénom + nom pour voir apparaître les résultats)</label>
            <AutoComplete
                options={optionsConjoint}
                style={{ width: 200, marginBottom: 15 }}
                onSelect={(value, pere) => onSelectPere(value, pere.id)}
                onSearch={handleDadSearch}
                placeholder="Tapez pour rechercher"
                value={pere}
                onChange={(value) => setPere(value)}
            />            
        </div>
    )

    const parentsFields = (
        <div className={styles.section}>
            <div className={styles.horizontalContainer}>
                <span className={styles.parentLabel}>Père</span>
                <label style={{ marginLeft: 5, color: "white" }}>(écrire prénom + nom pour voir apparaître les résultats)</label>
            </div>
            <AutoComplete
                options={optionsPere}
                style={{ width: 200, marginBottom: 15 }}
                onSelect={(value, pere) => onSelectPere(value, pere.id)}
                onSearch={handleDadSearch}
                placeholder="Tapez pour rechercher"
                value={pere}
                onChange={(value) => setPere(value)}
            />
            <div className={styles.horizontalContainer}>
                <span className={styles.parentLabel}>Mère </span>
                <label style={{ marginLeft: 5, color: "white" }}>(avec son nom de jeune fille)</label>
            </div>
            <AutoComplete
                options={optionsMere}
                style={{ width: 200, marginBottom: 15 }}
                onSelect={(value, mere) => onSelectMere(value, mere.id)}
                onSearch={handleMomSearch}
                placeholder="Tapez pour rechercher"
                value={mere}
                onChange={(value) => setMere(value)}
            />
        </div>
    )

    const deathDate = (
    <div className={styles.section}>
        <label className={styles.label}> Date de décès </label>
        <input className={styles.field} type="date" placeholder="Date de décès" id="deathDate" onChange={(e) => setDate(e.target.value)} />
    </div>
    )

    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <p className={styles.loginModalTitle}>Ajouter un membre de ma famille</p>
                <label className={styles.label}> Prénom </label>
                <input className={styles.field} type="text" placeholder="Prénom" id="prenom" onChange={(e) => setPrenom(e.target.value)} value={prenom} />
                <label className={styles.label}> Nom </label>
                <input className={styles.field} type="text" placeholder="Nom" id="nom" onChange={(e) => setNom(e.target.value)} value={nom} />
                <label className={styles.label}> Date de naissance </label>
                <input className={styles.field} type="date" placeholder="Date de naissance" id="dateMariage" onChange={(e) => setDate(e.target.value)} />
                <div className={styles.horizontalContainer}>
                    <span style={{color: "white"}}> Cette personne est une pièce rapportée </span>
                    <input className={styles.checkbox} type="checkbox" id="estNeFamille" onChange={(e) => setIsNotFamille(!isNotFamille)} />
                </div>
                {isNotFamille && parentsFields}
                <div className={styles.horizontalContainer}>
                    <span style={{color: "white"}}> Cette personne est décédée </span>
                    <input className={styles.checkbox} type="checkbox" id="estDecede" onChange={(e) => setIsDead(!isDead)} />
                </div>
                {isDead && deathDate}
                <button className={styles.modalSigninButton} id="Ajouter" onClick={() => handleSubmit()}> Ajouter </button>
                <p className={styles.errors}>{errors}</p>
            </div>
        </div>
    )
}

export default AddPersonForm;
