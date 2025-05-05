import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {  // ✅ Тут создаём UserProvider
  const [profkom_user, setProfkom_user] = useState({
    profkom_username: "",
    profkom_id: 1000,
    profkom_group_id: 1000,
    profkom_email: "a@gmial.com",
    profkom_group_name: "unknown",  // Исправил "unkonow" → "unknown"
    profkom_is_superuser: false
  });

  return (
    <UserContext.Provider value={{ profkom_user, setProfkom_user }}>
      {children}
    </UserContext.Provider>
  );
};