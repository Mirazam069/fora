import { createContext, useContext, useState } from "react";

const ContactModalContext = createContext();

export function ContactModalProvider({ children }) {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <ContactModalContext.Provider value={{ contactOpen, setContactOpen }}>
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  return useContext(ContactModalContext);
}
