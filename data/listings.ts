import { Listing } from '@/types'

export const listings: Listing[] = [
  {
    id: '1',
    name: 'iPhone 13 Pro',
    price: '₱45,000',
    location: 'Manila',
    image: require('../assets/images/listings/iphone-13-pro.jpg')
  },
  {
    id: '2',
    name: 'Wooden Dining Table',
    price: '₱12,000',
    location: 'Quezon City',
    image: require('../assets/images/listings/wooden-dining-table.jpg')
  },
  {
    id: '3',
    name: 'Running Shoes',
    price: '₱3,500',
    location: 'Cebu',
    image: require('../assets/images/listings/running-shoes.jpg')
  },
  {
    id: '4',
    name: 'Double Bed',
    price: '₱15,000',
    location: 'Davao',
    image: require('../assets/images/listings/double-bed.jpg')
  }
]
