import Home from '../components/Home';
import AddRequest from '../components/AddRequest';
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Moderation() {

  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  const token = user.token;

  return (
  <div>
    <h1>Bienvenue sur la tableau de bord de modération !</h1>
    <AddRequest />
    <AddRequest />
    <AddRequest />
  </div>
  )
}

export default Moderation;