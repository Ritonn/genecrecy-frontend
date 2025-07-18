import styles from '../styles/Moderation.module.css'
import Home from '../components/Home';
import AddRequest from '../components/AddRequest';
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Moderation() {

  const [pendingPeopleData, setPendingPeopleData] = useState([])
  const user = useSelector((state) => state.user.value);
  const token = user.token;

      const fetchPendingPeople = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADRESS}/persons/pending`);
      const data = await response.json();
      console.log('data récupérée => ', data.data)
      setPendingPeopleData(data.data)
    }

  useEffect(() => {

    fetchPendingPeople();
  }, [])

  const pendingPeople = pendingPeopleData.map((data) => {
    return (
      <AddRequest key={data._id} {...data} />
    );
  })

  console.log('Les personnes à valider => ', pendingPeopleData)

  return (
    <div className={styles.container}>
      <h1>Bienvenue sur la tableau de bord de modération !</h1>
      {pendingPeople}
    </div>
  )
}

export default Moderation;