"use client";  
// when refresh the page this provider will call all time
import React, { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { onAuthStateChanged } from "firebase/auth";
export const Provider = ({ children }) => {

  useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth,(user)=>{  // it check when you refresh , you login or not
      console.log(user);
    })
    return ()=> unSubscribe()
  },[])

  return (
    <div>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </div>
  );
};
