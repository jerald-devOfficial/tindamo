import { useAuth } from '@/context/AuthContext'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { Image, Pressable, Text, View } from 'react-native'

interface HeaderProps {
  showAvatar?: boolean
  showBack?: boolean
  title?: string
}

export function Header({
  showAvatar = true,
  showBack = false,
  title = 'TindaMo'
}: HeaderProps) {
  const { user } = useAuth()
  const navigation = useNavigation()

  return (
    <View className='flex-row items-center justify-between mb-4 border-b border-gray-200 p-4'>
      <View className='flex-row items-center gap-x-4'>
        {showBack && (
          <Pressable onPress={() => navigation.goBack()}>
            <FontAwesome name='arrow-left' size={24} color='black' />
          </Pressable>
        )}
        <Image
          source={require('../../assets/images/logo/logo-small.png')}
          className='w-10 h-10 mr-2'
          resizeMode='contain'
        />
        <Text className='text-xl font-bold'>{title}</Text>
      </View>
      {showAvatar && (
        <Pressable onPress={() => navigation.navigate('profile' as never)}>
          <Image
            source={
              user?.photoURL
                ? { uri: user.photoURL }
                : require('../../assets/images/avatars/avatar-male.jpg')
            }
            className='w-10 h-10 rounded-full'
            resizeMode='cover'
          />
        </Pressable>
      )}
    </View>
  )
}
