import React from 'react'
import {
  FlatList,
  SafeAreaView,
  Switch,
  Text,
  TextInput,
  View
} from 'react-native'
import { listings } from '../../data/listings'
import { Header } from '../components/Header'
import { ListingCard } from '../components/ListingCard'

export default function HomeScreen() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>
        <Header />
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
            data={listings}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => <ListingCard item={item} />}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
