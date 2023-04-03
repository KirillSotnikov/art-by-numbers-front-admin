import request from '@/utils/request'
import { ProductType, ProductSize, Difficult, Category } from '@/types'

const mockCards = [
  {
    // id: String(Math.floor(Math.random() * 1000)),
    id: 'qwedsa',
    type: ProductType.mosaik,
    articul: 'articul',
    size: ProductSize['30_30'],
    difficult: Difficult.FIVE,
    description: 'some description',
    price: 200,
    category: Category.picture_by_numbers,
    gallery: {
      images: [
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
      ]
    },
    inSale: Math.random() > 0.5,
    name: 'Some name',
    deletedAt: Date.now(),
    discountPrice: Math.random() > 0.5 ? 150 : undefined,
  },
  {
    id: String(Math.floor(Math.random() * 1000)),
    type: ProductType.transport,
    articul: 'articul',
    size: ProductSize['30_30'],
    difficult: Difficult.FIVE,
    description: 'some description',
    price: 200,
    category: Category.picture_by_numbers,
    gallery: {
      images: [
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
      ]
    },
    inSale: Math.random() > 0.5,
    name: 'Some name',
    discountPrice: Math.random() > 0.5 ? 150 : undefined,
  },
  {
    id: String(Math.floor(Math.random() * 1000)),
    type: ProductType.patriotic,
    articul: 'articul',
    size: ProductSize['30_30'],
    difficult: Difficult.FIVE,
    description: 'some description',
    price: 200,
    category: Category.picture_by_numbers,
    gallery: {
      images: [
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
      ]
    },
    inSale: Math.random() > 0.5,
    name: 'Some name',
    discountPrice: Math.random() > 0.5 ? 150 : undefined,
  },
  {
    id: String(Math.floor(Math.random() * 1000)),
    type: ProductType.patriotic,
    articul: 'articul',
    size: ProductSize['30_30'],
    difficult: Difficult.FIVE,
    description: 'some description',
    price: 200,
    category: Category.picture_by_numbers,
    gallery: {
      images: [
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
      ]
    },
    inSale: Math.random() > 0.5,
    name: 'Some name',
    discountPrice: Math.random() > 0.5 ? 150 : undefined,
  },
  {
    id: String(Math.floor(Math.random() * 1000)),
    type: ProductType.patriotic,
    articul: 'articul',
    size: ProductSize['30_30'],
    difficult: Difficult.FIVE,
    description: 'some description',
    price: 200,
    category: Category.picture_by_numbers,
    gallery: {
      images: [
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
      ]
    },
    inSale: Math.random() > 0.5,
    name: 'Some name',
    discountPrice: Math.random() > 0.5 ? 150 : undefined,
  },
  {
    id: String(Math.floor(Math.random() * 1000)),
    type: ProductType.patriotic,
    articul: 'articul',
    size: ProductSize['30_30'],
    difficult: Difficult.FIVE,
    description: 'some description',
    price: 200,
    category: Category.picture_by_numbers,
    gallery: {
      images: [
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
      ]
    },
    inSale: Math.random() > 0.5,
    name: 'Some name',
    discountPrice: Math.random() > 0.5 ? 150 : undefined,
  },
  {
    id: String(Math.floor(Math.random() * 1000)),
    type: ProductType.patriotic,
    articul: 'articul',
    size: ProductSize['30_30'],
    difficult: Difficult.FIVE,
    description: 'some description',
    price: 200,
    category: Category.picture_by_numbers,
    gallery: {
      images: [
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
      ]
    },
    inSale: Math.random() > 0.5,
    name: 'Some name',
    discountPrice: Math.random() > 0.5 ? 150 : undefined,
  },
  {
    id: String(Math.floor(Math.random() * 1000)),
    type: ProductType.patriotic,
    articul: 'articul',
    size: ProductSize['30_30'],
    difficult: Difficult.FIVE,
    description: 'some description',
    price: 200,
    category: Category.picture_by_numbers,
    gallery: {
      images: [
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
      ]
    },
    inSale: Math.random() > 0.5,
    name: 'Some name',
    discountPrice: Math.random() > 0.5 ? 150 : undefined,
  },
  {
    id: String(Math.floor(Math.random() * 1000)),
    type: ProductType.patriotic,
    articul: 'articul',
    size: ProductSize['30_30'],
    difficult: Difficult.FIVE,
    description: 'some description',
    price: 200,
    category: Category.picture_by_numbers,
    gallery: {
      images: [
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
      ]
    },
    inSale: Math.random() > 0.5,
    name: 'Some name',
    discountPrice: Math.random() > 0.5 ? 150 : undefined,
  },
  {
    id: String(Math.floor(Math.random() * 1000)),
    type: ProductType.patriotic,
    articul: 'articul',
    size: ProductSize['30_30'],
    difficult: Difficult.FIVE,
    description: 'some description',
    price: 200,
    category: Category.picture_by_numbers,
    gallery: {
      images: [
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
      ]
    },
    inSale: Math.random() > 0.5,
    name: 'Some name',
    discountPrice: Math.random() > 0.5 ? 150 : undefined,
  },
  {
    id: String(Math.floor(Math.random() * 1000)),
    type: ProductType.patriotic,
    articul: 'articul',
    size: ProductSize['30_30'],
    difficult: Difficult.FIVE,
    description: 'some description',
    price: 200,
    category: Category.picture_by_numbers,
    gallery: {
      images: [
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
      ]
    },
    inSale: Math.random() > 0.5,
    name: 'Some name',
    discountPrice: Math.random() > 0.5 ? 150 : undefined,
  },
  {
    id: String(Math.floor(Math.random() * 1000)),
    type: ProductType.patriotic,
    articul: 'articul',
    size: ProductSize['30_30'],
    difficult: Difficult.FIVE,
    description: 'some description',
    price: 200,
    category: Category.picture_by_numbers,
    gallery: {
      images: [
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
      ]
    },
    inSale: Math.random() > 0.5,
    name: 'Some name',
    discountPrice: Math.random() > 0.5 ? 150 : undefined,
  },
  {
    id: String(Math.floor(Math.random() * 1000)),
    type: ProductType.patriotic,
    articul: 'articul',
    size: ProductSize['30_30'],
    difficult: Difficult.FIVE,
    description: 'some description',
    price: 200,
    category: Category.picture_by_numbers,
    gallery: {
      images: [
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
      ]
    },
    inSale: Math.random() > 0.5,
    name: 'Some name',
    discountPrice: Math.random() > 0.5 ? 150 : undefined,
  },
  {
    id: String(Math.floor(Math.random() * 1000)),
    type: ProductType.patriotic,
    articul: 'articul',
    size: ProductSize['30_30'],
    difficult: Difficult.FIVE,
    description: 'some description',
    price: 200,
    category: Category.picture_by_numbers,
    gallery: {
      images: [
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
      ]
    },
    inSale: Math.random() > 0.5,
    name: 'Some name',
    discountPrice: Math.random() > 0.5 ? 150 : undefined,
  },
  {
    id: String(Math.floor(Math.random() * 1000)),
    type: ProductType.patriotic,
    articul: 'articul',
    size: ProductSize['30_30'],
    difficult: Difficult.FIVE,
    description: 'some description',
    price: 200,
    category: Category.picture_by_numbers,
    gallery: {
      images: [
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
      ]
    },
    inSale: Math.random() > 0.5,
    name: 'Some name',
    discountPrice: Math.random() > 0.5 ? 150 : undefined,
  },
  {
    id: String(Math.floor(Math.random() * 1000)),
    type: ProductType.patriotic,
    articul: '1articul',
    size: ProductSize['30_30'],
    difficult: Difficult.FIVE,
    description: 'some description some description some description some description some description some description some descriptionsome description some description some description',
    price: 200,
    category: Category.picture_by_numbers,
    gallery: {
      images: [
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
        'https://mk.holst.kz/image/catalog/010.jpg',
      ]
    },
    inSale: Math.random() > 0.5,
    name: 'Some name',
    discountPrice: Math.random() > 0.5 ? 150 : undefined,
  },
]

export const getProductList = async (params) => {
  // return request({
  //   url: '/vue-admin-template/table/list',
  //   method: 'get',
  //   params
  // })
  await new Promise((r) => { setTimeout(r, 200) });
  return {
    data: mockCards
  }
}
