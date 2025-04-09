import { useAuth } from '@/context/AuthContext'
import React from 'react'
import { Button, Text, View } from 'react-native'

export default function ProfileScreen() {
  const { signOut } = useAuth()

  return (
    <View className='flex-1 justify-center items-center bg-white'>
      <Text className='text-2xl font-bold'>Profile</Text>
      <Text className='text-lg'>User Information</Text>
      <Button title='Logout' onPress={signOut} />
      {/* Add more user details and settings here */}
    </View>
  )
}
