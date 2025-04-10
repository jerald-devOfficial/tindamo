import { Listing } from '@/types'
import { Image, Text, View } from 'react-native'

interface ListingCardProps {
  item: Listing
}

export function ListingCard({ item }: ListingCardProps) {
  return (
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
  )
}
