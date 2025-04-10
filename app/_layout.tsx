import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { AuthProvider, useAuth } from '../context/AuthContext'
import '../global.css' // Import global CSS for NativeWind
import { db } from '../lib/firebase'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)'
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  )
}

function RootLayoutNav() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const segments = useSegments()
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<
    boolean | null
  >(null)

  // Check onboarding status when user changes
  useEffect(() => {
    if (!user) return

    const checkOnboarding = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        const isComplete = userDoc.data()?.isOnboardingComplete ?? false
        console.log('Onboarding status:', isComplete) // Debug log
        setIsOnboardingComplete(isComplete)
      } catch (err) {
        console.error('Error checking onboarding status:', err)
        setIsOnboardingComplete(false)
      }
    }

    // Initial check
    checkOnboarding()

    // Set up real-time listener for onboarding status changes
    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
      const isComplete = doc.data()?.isOnboardingComplete ?? false
      console.log('Onboarding status updated:', isComplete) // Debug log
      setIsOnboardingComplete(isComplete)
    })

    return () => unsubscribe()
  }, [user])

  useEffect(() => {
    if (loading) return // Wait until loading is finished

    const inAuthGroup = segments[0] === '(auth)'
    const inOnboardingGroup = segments[0] === 'onboarding'

    if (!user && !inAuthGroup) {
      // Redirect to login if not authenticated
      router.replace('/(auth)/login')
    } else if (user && isOnboardingComplete !== null) {
      // Only handle navigation when we have a definitive onboarding status
      if (inAuthGroup) {
        // User is authenticated but in auth group
        if (!isOnboardingComplete) {
          router.replace('/onboarding/personal-info')
        } else {
          router.replace('/(tabs)/home')
        }
      } else if (!isOnboardingComplete && !inOnboardingGroup) {
        router.replace('/onboarding/personal-info')
      } else if (isOnboardingComplete && inOnboardingGroup) {
        router.replace('/(tabs)/home')
      }
    }
  }, [user, loading, segments, router, isOnboardingComplete])

  if (loading || (user && isOnboardingComplete === null)) {
    // Show loading state while checking auth and onboarding status
    return null // Or a loading spinner component
  }

  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='(auth)' options={{ headerShown: false }} />
      <Stack.Screen name='onboarding' options={{ headerShown: false }} />
      <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
    </Stack>
  )
}
