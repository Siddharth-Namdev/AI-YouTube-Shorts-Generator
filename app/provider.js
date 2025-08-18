"use client";
// when refresh the page this provider will call all time
import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./_context/AuthContext";
import { auth } from "@/configs/firebaseConfig";
import { ConvexProvider, ConvexReactClient, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export const Provider = ({ children }) => {
  const [user, setUser] = useState(null);

  const createUser = useMutation(api.users.createNewUser);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      // it check when you refresh , you login or not
      console.log(user);

      const result = await createUser({
        name:user?.displayName,
        email:user?.email,
        pictureURL:user?.photoURL
      })

      console.log(result);


    });
    return () => unSubscribe();
  }, []);

  return (
    <div>
      
      <AuthContext.Provider value={{ user }}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSyste
          disableTransitionOnChange
        >
          {children}
        </NextThemesProvider>
      </AuthContext.Provider>
    </div>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
