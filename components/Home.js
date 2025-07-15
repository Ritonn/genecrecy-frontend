import { useEffect, useState } from 'react';
import PersonNode from '../components/PersonNode';

function Home() {

  const [peopleData, setPeopleData] = useState([]); // État pour stocker les données
  const [loading, setLoading] = useState(true); // État pour le chargement
  const [error, setError] = useState(null); // État pour les erreurs

  const fetchPeople = async () => {
      try {
        const response = await fetch(`http://localhost:3000/persons`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json(); // Convertir la réponse en JSON
        
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

  // Mapper les données une fois qu'elles sont chargées
  const persons = peopleData.map((data, i) => {
    return <PersonNode key={i} {...data} />;
  });
 
  return (
    <div>
      {persons}
    </div>
  );
}

export default Home;
