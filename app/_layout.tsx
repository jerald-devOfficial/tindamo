import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'
import { AuthProvider, useAuth } from '../context/AuthContext'
import '../global.css' // Import global CSS for NativeWind

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

  console.log(
    'Auth Loading:',
    loading,
    'User:',
    user ? user.uid : null,
    'Segments:',
    segments
  )

  useEffect(() => {
    if (loading) return // Wait until loading is finished

    const inAuthGroup = segments[0] === '(auth)'

    if (!user && !inAuthGroup) {
      // Redirect to the login page if the user is not authenticated
      // and not already in the auth group.
      router.replace('/(auth)/login')
    } else if (user && inAuthGroup) {
      // Redirect to the main app (tabs) if the user is authenticated
      // and currently in the auth group.
      router.replace('/(tabs)/home')
    }
  }, [user, loading, segments, router])

  if (loading) {
    // You can render a loading indicator here while checking auth status
    return null // Or a custom loading component
  }

  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='(auth)' options={{ headerShown: false }} />
      <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
    </Stack>
  )
}
