import { createContext, useState, useCallback } from 'react'

export const ContactModalContext = createContext()

export function ContactModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <ContactModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ContactModalContext.Provider>
  )
}
