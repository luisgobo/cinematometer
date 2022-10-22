import React from "react";
import { useFierbase } from "../../context/use-firebase";
import ProtectedPage from "../layouts/ProtectedPage";

export const Home= () => {

  const { appUser } = useFierbase(); 
  
  return (
    <ProtectedPage>
      <h1>Home Page</h1>
      <p>hola {appUser?.name}</p>

    </ProtectedPage>
  );
}