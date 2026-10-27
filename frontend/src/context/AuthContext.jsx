import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("shnoor_user");

      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error loading user:", error);
      localStorage.removeItem("shnoor_user");
      return null;
    }
  });
  const loading = false;

  const register = (userData) => {
    const newUser = {
      id: `USR-${Date.now()}`,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email.toLowerCase().trim(),
      phone: userData.phone,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "shnoor_user",
      JSON.stringify(newUser)
    );

    setUser(newUser);

    return newUser;
  };

  const login = (email, password) => {
    const savedAccount = JSON.parse(
      localStorage.getItem("shnoor_account")
    );

    if (!savedAccount) {
      throw new Error(
        "No account found. Please create an account first."
      );
    }

    if (
      savedAccount.email !== email.toLowerCase().trim() ||
      savedAccount.password !== password
    ) {
      throw new Error("Invalid email or password.");
    }

    const loggedInUser = {
      id: savedAccount.id,
      firstName: savedAccount.firstName,
      lastName: savedAccount.lastName,
      email: savedAccount.email,
      phone: savedAccount.phone,
      createdAt: savedAccount.createdAt,
    };

    localStorage.setItem(
      "shnoor_user",
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);

    return loggedInUser;
  };

  const logout = () => {
    localStorage.removeItem("shnoor_user");
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// This hook must remain in this context file, so exclude it from the
// component-only Fast Refresh rule.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}