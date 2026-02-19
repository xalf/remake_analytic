"use client";

import { User } from "@/domain/user";
import React, { ReactNode, useContext } from "react";

const UserContext = React.createContext<User | null>(null);
export const useUser = () => useContext(UserContext);

export function UserProvider(props: {
  children: ReactNode;
  initialUser: User;
}) {
  return (
    <UserContext.Provider value={props.initialUser}>
      {props.children}
    </UserContext.Provider>
  );
}
