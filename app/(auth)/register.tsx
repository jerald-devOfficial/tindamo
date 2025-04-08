import { Link } from 'expo-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, db } from '../../lib/firebase'

export default function RegisterScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      setError('')
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      // Create user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: userCredential.user.email,
        createdAt: new Date().toISOString()
      })
    } catch (err: any) {
      console.error('Registration Error:', err)
      if (err.code === 'auth/email-already-in-use') {
        setError('This email address is already registered.')
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.')
      } else {
        setError('Failed to create account. Please try again.')
      }
    }
  }

  return (
    <View className='justify-center items-center px-4 pb-4'>
      <Text className='text-3xl font-bold text-center mb-8'>
        Create Account
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

      <TextInput
        className='border border-gray-300 rounded-lg p-4 mb-4 w-full'
        placeholder='Confirm Password'
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className='bg-blue-500 p-4 rounded-lg mb-4 w-full'
        onPress={handleRegister}
      >
        <Text className='text-white text-center font-semibold'>Sign Up</Text>
      </TouchableOpacity>

      <View className='flex-row justify-center'>
        <Text className='text-gray-600'>Already have an account? </Text>
        <Link href='/login' className='text-blue-500'>
          Sign In
        </Link>
      </View>
    </View>
  )
}
