import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/PersonNode.module.css';

function PersonNode(props) {

  let generation = props.idGeneration;
  const nomComplet = props.prenom + " " + props.nom;
  const width = nomComplet.length * 11;

  return (
    <div className={`${styles.person} gen${generation}`} style={{
      width: width
      }}>
      <p>{nomComplet}</p>
    </div>
  );
}

export default PersonNode;
