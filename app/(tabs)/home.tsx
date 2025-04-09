import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  Switch,
  Text,
  TextInput,
  View
} from 'react-native'
const items = [
  {
    id: '1',
    name: 'iPhone 13 Pro',
    price: '₱45,000',
    location: 'Manila',
    image: require('../../assets/images/listings/iphone-13-pro.jpg')
  },
  {
    id: '2',
    name: 'Wooden Dining Table',
    price: '₱12,000',
    location: 'Quezon City',
    image: require('../../assets/images/listings/wooden-dining-table.jpg')
  },
  {
    id: '3',
    name: 'Running Shoes',
    price: '₱3,500',
    location: 'Cebu',
    image: require('../../assets/images/listings/running-shoes.jpg')
  },
  {
    id: '4',
    name: 'Double Bed',
    price: '₱15,000',
    location: 'Davao',
    image: require('../../assets/images/listings/double-bed.jpg')
  },
  {
    id: '5',
    name: 'iPhone 13 Pro',
    price: '₱45,000',
    location: 'Manila',
    image: require('../../assets/images/listings/iphone-13-pro.jpg')
  },
  {
    id: '6',
    name: 'Wooden Dining Table',
    price: '₱12,000',
    location: 'Quezon City',
    image: require('../../assets/images/listings/wooden-dining-table.jpg')
  },
  {
    id: '7',
    name: 'Running Shoes',
    price: '₱3,500',
    location: 'Cebu',
    image: require('../../assets/images/listings/running-shoes.jpg')
  },
  {
    id: '8',
    name: 'Double Bed',
    price: '₱15,000',
    location: 'Davao',
    image: require('../../assets/images/listings/double-bed.jpg')
  },
  {
    id: '9',
    name: 'iPhone 13 Pro',
    price: '₱45,000',
    location: 'Manila',
    image: require('../../assets/images/listings/iphone-13-pro.jpg')
  },
  {
    id: '10',
    name: 'Wooden Dining Table',
    price: '₱12,000',
    location: 'Quezon City',
    image: require('../../assets/images/listings/wooden-dining-table.jpg')
  },
  {
    id: '11',
    name: 'Running Shoes',
    price: '₱3,500',
    location: 'Cebu',
    image: require('../../assets/images/listings/running-shoes.jpg')
  },
  {
    id: '12',
    name: 'Double Bed',
    price: '₱15,000',
    location: 'Davao',
    image: require('../../assets/images/listings/double-bed.jpg')
  }
]

export default function HomeScreen() {
  const navigation = useNavigation()
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>
        <View className='flex-row items-center justify-between mb-4 border-b border-gray-200 p-4'>
          <View className='flex-row items-center'>
            <Image
              source={require('../../assets/logo.png')}
              className='w-10 h-10 mr-2'
              resizeMode='contain'
            />
            <Text className='text-2xl font-bold'>TindaMo</Text>
          </View>
          <Pressable onPress={() => navigation.navigate('profile' as never)}>
            <Image
              source={require('../../assets/images/avatars/avatar-male.jpg')}
              className='w-10 h-10 rounded-full'
              resizeMode='cover'
            />
          </Pressable>
        </View>
        <View className='flex-1 p-4'>
          <View className='flex-col mb-4 gap-y-4'>
            <View className='flex-row items-center'>
              <TextInput
                placeholder='Search'
                className='flex-1 text-black bg-gray-200 px-4 py-5 rounded-full'
              />
            </View>
            <View className='flex-row self-end items-center'>
              <Text>Barter</Text>
              <Switch className='ml-2' />
            </View>
          </View>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <View className='flex-1 mb-4 p-2'>
                <Image
                  source={item.image}
                  className='w-full h-40 rounded-lg'
                  resizeMode='cover'
                />
                <Text className='text-lg font-bold'>{item.name}</Text>
                <Text>{item.price}</Text>
                <Text>{item.location}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
