import { MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { updateProfile } from 'firebase/auth'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth, db, uploadToFirebase } from '../../lib/firebase'

export default function ProfilePictureScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [error, setError] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const verifyPermissions = async () => {
    const { status: existingStatus } =
      await ImagePicker.getMediaLibraryPermissionsAsync()

    if (existingStatus === 'undetermined') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      return status === 'granted'
    }

    if (existingStatus === 'denied') {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant gallery permissions to upload a profile picture.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() }
        ]
      )
      return false
    }

    return true
  }

  const pickImage = async () => {
    try {
      const hasPermission = await verifyPermissions()
      if (!hasPermission) return

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ['images'],
        aspect: [1, 1],
        quality: 0.5
      })

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri)
        setError('')
      }
    } catch (err) {
      setError('Failed to pick image')
      console.error('Error picking image:', err)
    }
  }

  const handleComplete = async () => {
    if (!selectedImage) {
      setError('Please select an image first')
      return
    }

    try {
      setIsUploading(true)
      setError('')

      const userId = auth.currentUser?.uid
      if (!userId) {
        setError('User not found')
        return
      }

      // Create a unique filename
      const timestamp = new Date().getTime()
      const fileName = `avatar-${timestamp}.jpg`
      const path = `images/avatars/${userId}/${fileName}`

      // Upload with progress tracking
      const { downloadUrl } = await uploadToFirebase(
        selectedImage,
        path,
        (progress) => {
          console.log('Upload progress:', progress)
          setUploadProgress(progress)
        },
        {
          contentType: 'image/jpeg',
          customMetadata: {
            userId: userId,
            purpose: 'avatar'
          }
        }
      )

      // Update user profile
      await updateProfile(auth.currentUser!, {
        photoURL: downloadUrl
      })

      // Create a promise that resolves when the onboarding status is confirmed as complete
      const onboardingConfirmed = new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(
          doc(db, 'users', userId),
          (doc) => {
            if (doc.data()?.isOnboardingComplete === true) {
              unsubscribe()
              resolve(true)
            }
          },
          reject
        )

        // Update the document
        updateDoc(doc(db, 'users', userId), {
          isOnboardingComplete: true,
          photoURL: downloadUrl,
          updatedAt: new Date().toISOString()
        }).catch(reject)

        // Timeout after 5 seconds
        setTimeout(() => {
          unsubscribe()
          reject(new Error('Timeout waiting for onboarding status update'))
        }, 5000)
      })

      // Wait for the update to be confirmed
      await onboardingConfirmed

      // Navigate to home screen
      router.replace('/(tabs)/home' as any)
    } catch (error: any) {
      console.error('Error uploading image:', error)
      setError(error.message || 'Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='px-4 py-6'>
        <Text className='text-2xl font-bold text-center mb-8'>
          Add Profile Picture
        </Text>

        <TouchableOpacity onPress={pickImage} className='self-center mb-8'>
          <View className='w-40 h-40 rounded-full bg-gray-100 items-center justify-center overflow-hidden'>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                className='w-full h-full'
              />
            ) : (
              <MaterialIcons name='camera-alt' size={40} color='#9ca3af' />
            )}
          </View>
          <Text className='text-center mt-2 text-blue-500'>
            {selectedImage ? 'Change Picture' : 'Select Picture'}
          </Text>
        </TouchableOpacity>

        {error ? (
          <Text className='text-red-500 text-center mb-4'>{error}</Text>
        ) : null}

        {isUploading && (
          <Text className='text-blue-500 text-center mb-4'>
            Uploading... {uploadProgress.toFixed(0)}%
          </Text>
        )}

        <TouchableOpacity
          onPress={handleComplete}
          disabled={isUploading}
          className={`py-3 px-6 rounded-lg ${
            isUploading ? 'bg-gray-400' : 'bg-blue-500'
          }`}
        >
          {isUploading ? (
            <ActivityIndicator color='white' />
          ) : (
            <Text className='text-white text-center font-semibold text-lg'>
              Complete Setup
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
