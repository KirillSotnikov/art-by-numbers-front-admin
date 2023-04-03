import request from '@/utils/request'
import {
  OrderStatus,
  DeliveryType,
  PaymentType,
  ProductType,
  ProductSize,
  Difficult,
  Category,
} from '@/types'


const mockOrders = [
  {
    id: 'id1',
    orderNumber: '473 218 473',
    status: OrderStatus.REQUESTED,
    deliveryType: DeliveryType.POST,
    paymentType: PaymentType.CARD,
    clientData: {
      firstName: 'Kyrylo',
      lastName: 'Sotnykov',
      phone: '+380682549110',
      mail: 'comicon2508@gmail.com',
    },
    deliveryData: {
      city: 'Одеса',
      postOfficeNumber: '30'
    },
    total: 500,
    comment: 'Some comment Some comment Some comment Some commentSome comment Some comment',
    products: [
      {
        item: {
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
        amount: 1,
      },
      {
        item: {
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
        amount: 2,
      },
    ],
    createdAt: Date.now(),
  },
  {
    id: 'id2',
    orderNumber: '123 456 473',
    status: OrderStatus.REQUESTED,
    deliveryType: DeliveryType.TAKEAWAY,
    paymentType: PaymentType.COD,
    clientData: {
      firstName: 'Kyrylo',
      lastName: 'Sotnykov',
      phone: '+380682549110',
      mail: 'comicon2508@gmail.com',
    },
    deliveryData: {
      city: 'Одеса',
      postOfficeNumber: '30'
    },
    total: 300,
    products: [
      {
        item: {
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
        amount: 1,
      },
      {
        item: {
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
        amount: 2,
      },
    ],
    createdAt: Date.now(),
  },
]

export const getOrdersList = async (params) => {
  // return request({
  //   url: '/vue-admin-template/table/list',
  //   method: 'get',
  //   params
  // })
  await new Promise((r) => { setTimeout(r, 200) });
  return {
    data: mockOrders
  }
}
