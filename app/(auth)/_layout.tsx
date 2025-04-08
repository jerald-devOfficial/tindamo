import { Stack } from 'expo-router'
import { Image, View } from 'react-native'

export default function AuthLayout() {
  return (
    <View className='flex-1 bg-white pt-20'>
      <View className='items-center py-20'>
        <Image
          source={require('../../assets/logo.png')}
          style={{ width: 128, height: 128 }}
          resizeMode='contain'
        />
      </View>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' }
        }}
      >
        <Stack.Screen name='login' />
        <Stack.Screen name='register' />
      </Stack>
    </View>
  )
}
