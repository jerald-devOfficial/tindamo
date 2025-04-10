import { useRouter } from 'expo-router'
import { doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { auth, db } from '../../lib/firebase'

export default function PersonalInfoScreen() {
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [location, setLocation] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleNext = async () => {
    if (!fullName || !phoneNumber || !location) {
      setError('Please fill in all fields')
      return
    }

    try {
      const userId = auth.currentUser?.uid
      if (!userId) {
        setError('User not found')
        return
      }

      await updateDoc(doc(db, 'users', userId), {
        fullName,
        phoneNumber,
        location,
        updatedAt: new Date().toISOString()
      })

      // Navigate to next onboarding step (profile picture)
      router.push('/onboarding/profile-picture')
    } catch (err) {
      console.error('Error updating user info:', err)
      setError('Failed to save information. Please try again.')
    }
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-row items-center justify-between p-4 border-b border-gray-200'>
        <View className='flex-row items-center gap-x-4'>
          <Image
            source={require('../../assets/images/logo/logo-small.png')}
            className='w-10 h-10'
            resizeMode='contain'
          />
          <Text className='text-xl font-bold'>Complete Your Profile</Text>
        </View>
      </View>

      <View className='flex-1 px-4 py-6'>
        <Text className='text-2xl font-bold mb-6'>Personal Information</Text>

        {error ? <Text className='text-red-500 mb-4'>{error}</Text> : null}

        <View className='space-y-4'>
          <View>
            <Text className='text-gray-600 mb-2'>Full Name</Text>
            <TextInput
              className='border border-gray-300 rounded-lg p-4'
              placeholder='Enter your full name'
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View>
            <Text className='text-gray-600 mb-2'>Phone Number</Text>
            <TextInput
              className='border border-gray-300 rounded-lg p-4'
              placeholder='+63 XXX XXX XXXX'
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType='phone-pad'
            />
          </View>

          <View>
            <Text className='text-gray-600 mb-2'>Location</Text>
            <TextInput
              className='border border-gray-300 rounded-lg p-4'
              placeholder='City, Province'
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>
      </View>

      <View className='p-4 border-t border-gray-200'>
        <TouchableOpacity
          className='bg-blue-500 p-4 rounded-lg'
          onPress={handleNext}
        >
          <Text className='text-white text-center font-semibold'>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
