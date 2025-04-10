import { useAuth } from '@/context/AuthContext'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

export default function ProfileScreen() {
  const { user, signOut } = useAuth()
  const navigation = useNavigation()

  const personalInfo = {
    name: 'John Doe',
    email: user?.email || 'No email',
    phone: '+63 912 345 6789',
    location: 'Manila, Philippines'
  }

  const menuItems: {
    icon: React.ComponentProps<typeof FontAwesome>['name']
    title: string
    onPress: () => void
  }[] = [
    { icon: 'user', title: 'Edit Profile', onPress: () => {} },
    { icon: 'bell', title: 'Notifications', onPress: () => {} },
    { icon: 'shield', title: 'Privacy', onPress: () => {} },
    { icon: 'gear', title: 'Settings', onPress: () => {} },
    { icon: 'question-circle', title: 'Help Center', onPress: () => {} },
    { icon: 'sign-out', title: 'Logout', onPress: signOut }
  ]

  return (
    <SafeAreaView className='flex-1 bg-white'>
      {/* Header */}
      <View className='flex-row items-center justify-between mb-4 border-b border-gray-200 p-4'>
        <View className='flex-row items-center gap-x-4'>
          <Pressable onPress={() => navigation.goBack()}>
            <FontAwesome name='arrow-left' size={24} color='black' />
          </Pressable>
          <Image
            source={require('../../assets/logo.png')}
            className='w-10 h-10 mr-2'
            resizeMode='contain'
          />
        </View>
        <View className='flex-row items-center gap-x-4'>
          <Pressable onPress={() => {}}>
            <FontAwesome name='bell' size={24} color='black' />
          </Pressable>
          <Pressable onPress={() => {}}>
            <FontAwesome name='bars' size={24} color='black' />
          </Pressable>
        </View>
      </View>

      <ScrollView>
        {/* Profile Header */}
        <View className='items-center py-6 bg-gray-50'>
          <View className='relative'>
            <Image
              source={require('../../assets/images/avatars/avatar-male.jpg')}
              className='w-24 h-24 rounded-full'
            />
            <TouchableOpacity
              className='absolute bottom-0 right-0 bg-gray-100 p-2 rounded-full border border-gray-300'
              onPress={() => {
                /* Handle image upload */
              }}
            >
              <FontAwesome name='camera' size={16} color='#666' />
            </TouchableOpacity>
          </View>
          <Text className='text-xl font-bold mt-4'>{personalInfo.name}</Text>
          <Text className='text-gray-500'>{personalInfo.email}</Text>
        </View>

        {/* Personal Information */}
        <View className='p-4'>
          <Text className='text-lg font-bold mb-4'>Personal Information</Text>
          <View className='space-y-4'>
            <View className='flex-row items-center'>
              <FontAwesome name='phone' size={20} color='#666' />
              <Text className='ml-4'>{personalInfo.phone}</Text>
            </View>
            <View className='flex-row items-center'>
              <FontAwesome name='map-marker' size={20} color='#666' />
              <Text className='ml-4'>{personalInfo.location}</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className='p-4'>
          <Text className='text-lg font-bold mb-4'>Settings</Text>
          <View className='space-y-2'>
            {menuItems.map((item, index) => (
              <Pressable
                key={index}
                className='flex-row items-center p-4 bg-gray-50 rounded-lg'
                onPress={item.onPress}
              >
                <FontAwesome name={item.icon} size={20} color='#666' />
                <Text className='ml-4 flex-1'>{item.title}</Text>
                <FontAwesome name='chevron-right' size={16} color='#666' />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
