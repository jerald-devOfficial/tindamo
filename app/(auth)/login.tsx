import { Link } from 'expo-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../../lib/firebase'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    try {
      setError('')
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.')
    }
  }

  return (
    <View className='justify-center items-center px-4 pb-4'>
      <Text className='text-3xl font-bold text-center mb-8'>
        Welcome to TindaMo
      </Text>

      {error ? (
        <Text className='text-red-500 text-center mb-4'>{error}</Text>
      ) : null}

      <TextInput
        className='border border-gray-300 rounded-lg p-4 mb-4 w-full'
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'
        keyboardType='email-address'
      />

      <TextInput
        className='border border-gray-300 rounded-lg p-4 mb-4 w-full'
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className='bg-blue-500 p-4 rounded-lg mb-4 w-full'
        onPress={handleLogin}
      >
        <Text className='text-white text-center font-semibold'>Sign In</Text>
      </TouchableOpacity>

      <View className='flex-row justify-center'>
        <Text className='text-gray-600'>Don't have an account? </Text>
        <Link href='/register' className='text-blue-500'>
          Sign Up
        </Link>
      </View>
    </View>
  )
}
