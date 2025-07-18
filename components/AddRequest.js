import styles from '../styles/AddRequest.module.css';

function AddRequest(props) {

  return (
  <div className={styles.container}>
    <h3>{props.prenom} {props.nom}, {props.conjoints.length > 0 && <span> marié(e) à {props.conjoints.at(-1).prenom} {props.conjoints.at(-1).nom} </span> }</h3>
    
    <p>Ceci est une demande d'ajout d'un membre</p>
  </div>
  )
}

export default AddRequest;