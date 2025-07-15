import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/PersonNode.module.css'

function PersonNode(props) {

  let generation = props.idGeneration;
  let color = "";
  let spacing = "";

  if (generation === 1) {
    color = '#7f7f7f';
  } else if (generation === 2) {
    color = '#006400';
    spacing = '100px';
  } else if (generation === 3) {
    color = '#1e90ff';
    spacing = '200px';
  } else if (generation === 4) {
    color = '#ff0000';
    spacing = '300px';
  } else if (generation === 5) {
    color = '#ffd700';
    spacing = '400px';
  } else if (generation === 6) {
    color = '#8a2be2';
    spacing = '500px';
  } else if (generation === 7) {
    color = '#ff69b4';
    spacing = '600px';
  } else {
    color = '#ccc'; // gris si inconnu
  }

  return (
    <div className={styles.person} style={{backgroundColor: color, marginLeft: spacing}}>
    </div>
  );
}

export default PersonNode;
