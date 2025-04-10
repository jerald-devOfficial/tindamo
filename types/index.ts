import { ImageSourcePropType } from 'react-native'

export interface Listing {
  id: string
  name: string
  price: string
  location: string
  image: ImageSourcePropType
}
