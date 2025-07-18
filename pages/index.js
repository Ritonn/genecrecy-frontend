import Home from '../components/Home';
import Header from '../components/Header';
import Moderation from '../components/Moderation';
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Index() {

  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  const token = user.token;
  const [moderationComponent, setModerationComponent] = useState(false);

  const swapComponents = (
    moderationComponent ? <Moderation /> : <Home />
  )

  const showModerationComponent = () => {
    setModerationComponent(!moderationComponent);
  }

  useEffect(() => {
    !token && router.push('/login');
  }, [])

  return (
  <div>
    <Header moderation={showModerationComponent}/>
    {swapComponents}
  </div>
  )
}

export default Index;
