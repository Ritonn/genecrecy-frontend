import { useEffect, useState } from 'react';
import PersonNode from '../components/PersonNode';
import styles from '../styles/Home.module.css';

function Home() {
  const [peopleData, setPeopleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPeople = async () => {
    try {
      const response = await fetch(`http://localhost:3000/persons`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data || !data.family) {
        console.log('No people found');
        return [];
      }
      
      return data.family;
    } catch (err) {
      console.error('Error fetching people:', err);
      setError(err.message);
      return [];
    }
  };

  useEffect(() => {
    const loadPeople = async () => {
      setLoading(true);
      const data = await fetchPeople();
      setPeopleData(data);
      setLoading(false);
    };

    loadPeople();
  }, []);

  // Gérer les états de chargement et d'erreur
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;


  // On ajoute toutes les personnes de la base dans data1
  const data1 = peopleData;

  // On fait le tri des couples de data1 qu'on ajoute dans data2
  const data2 = data1.reduce((couples, person) => {
    if (person.conjoints?.length > 0) {
      const conjointId = person.conjoints[person.conjoints.length - 1];
      const conjoint = data1.find(el => el._id === conjointId);
      
      if (conjoint) {
        const coupleKey = [person._id, conjoint._id].sort().join('-');
        
        if (!couples.some(c => c.coupleId === coupleKey)) {
          couples.push({
            conjoint1: person,
            conjoint2: conjoint,
            coupleKey: coupleKey
          });
        }
      }
    }
    return couples;
  }, []);

  // Créer data3 : personnes célibataires sans enfants (pas dans data2)
  const peopleInCouples = new Set();
  data2.forEach(couple => {
    peopleInCouples.add(couple.conjoint1._id);
    peopleInCouples.add(couple.conjoint2._id);
  });

  const data3 = data1.filter(person => 
    !peopleInCouples.has(person._id) && 
    (!person.enfants || person.enfants.length === 0)
  );

  console.log('Le tableau DATA2 : ', ...data2);
  console.log('Le tableau DATA3 : ', ...data3);

  // Fonction récursive pour rendre un couple et ses descendants
  const renderCoupleAndDescendants = (couple, processedCouples = new Set()) => {
    // Éviter les boucles infinies
    if (processedCouples.has(couple.coupleKey)) {
      return null;
    }
    processedCouples.add(couple.coupleKey);

    // Rendre le couple (celui avec estNeFamille=true en premier)
    const firstConjoint = couple.conjoint1.estNeFamille ? couple.conjoint1 : couple.conjoint2;
    const secondConjoint = couple.conjoint1.estNeFamille ? couple.conjoint2 : couple.conjoint1;
    
    const coupleElement = (
      <div key={couple.coupleKey} className={styles.couple}>
        <PersonNode {...firstConjoint} />
        <PersonNode {...secondConjoint} />
      </div>
    );

    // Récupérer tous les enfants du couple
    const allChildren = [
      ...(couple.conjoint1.enfants || []),
      ...(couple.conjoint2.enfants || [])
    ];

    // Enlever les doublons d'enfants
    const uniqueChildren = [...new Set(allChildren)];

    // Traiter chaque enfant
    const childrenElements = uniqueChildren.map(childId => {
      const child = data1.find(person => person._id === childId);
      if (!child) return null;

      // Vérifier si l'enfant est dans un couple (data2)
      const childCouple = data2.find(couple => 
        couple.conjoint1._id === childId || couple.conjoint2._id === childId
      );

      if (childCouple) {
        // L'enfant est dans un couple, récursion
        return renderCoupleAndDescendants(childCouple, processedCouples);
      } else {
        // L'enfant est célibataire, rendre directement
        return <PersonNode key={childId} {...child} />;
      }
    }).filter(Boolean); // Enlever les null

    let color = "";
    let generation = couple.conjoint1.idGeneration;
    console.log(generation);

    if (generation === 1) {
      color = "#b9b8b8ff"
    }
    if (generation === 2) {
      color = "#96ee96ff"
    }
    if (generation === 3) {
      color = "#85c1fdff"
    }
    if (generation === 4) {
      color = "#ffc8c8ff"
    }
    if (generation === 5) {
      color = "#f8efbbff"
    }
    if (generation === 6) {
      color = "#a769e0ff"
    }
    if (generation === 7) {
      color = "#f096c3ff"
    }

    // Retourner le couple avec ses descendants
    return (
      <div key={couple.coupleKey} className={styles.family} style={{borderLeft: `2px solid ${color}`}}>
        {coupleElement}
        {childrenElements.length > 0 && (
          <div className={styles.children}>
            {childrenElements}
          </div>
        )}
      </div>
    );
  };

  // Trouver les couples "racines" (couples qui ne sont pas enfants d'autres couples)
  const rootCouples = data2.filter(couple => {
    const isChild1 = data2.some(otherCouple => 
      otherCouple.coupleKey !== couple.coupleKey && 
      (otherCouple.conjoint1.enfants?.includes(couple.conjoint1._id) || 
       otherCouple.conjoint2.enfants?.includes(couple.conjoint1._id))
    );
    
    const isChild2 = data2.some(otherCouple => 
      otherCouple.coupleKey !== couple.coupleKey && 
      (otherCouple.conjoint1.enfants?.includes(couple.conjoint2._id) || 
       otherCouple.conjoint2.enfants?.includes(couple.conjoint2._id))
    );
    
    return !isChild1 && !isChild2;
  });

  // Rendre l'arbre généalogique
  const familyTree = [
    // Couples racines et leurs descendants
    ...rootCouples.map(couple => renderCoupleAndDescendants(couple)),
    // Personnes célibataires sans enfants
    ...data3.map(person => <PersonNode key={person._id} {...person} />)
  ];

  return (
    <div className={styles.main}>
      {familyTree}
    </div>
  );
}

export default Home;