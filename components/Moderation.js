import Home from '../components/Home';
import Header from '../components/Header';
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Moderation() {

  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  const token = user.token;

  return (
  <div>
    <Header />
    <Home />;
  </div>
  )
}

export default Moderation;