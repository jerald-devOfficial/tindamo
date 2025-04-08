import { onAuthStateChanged, User } from 'firebase/auth'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { auth } from '../lib/firebase'

interface AuthContextProps {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true
})

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
