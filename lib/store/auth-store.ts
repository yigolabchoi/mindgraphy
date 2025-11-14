import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, AuthState } from '@/lib/types/auth'

interface AuthStore extends AuthState {
  login: (user: User) => void
  logout: () => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: (user) => {
        set({ user, isAuthenticated: true })
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      setUser: (user) => {
        set({ user })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

