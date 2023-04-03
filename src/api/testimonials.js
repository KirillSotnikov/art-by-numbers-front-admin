import request from '@/utils/request'
import { ProductType, ProductSize, Difficult, Category } from '@/types'

const mockTestimonials = [
  {
    id: 'id',
    name: 'Sara Connor',
    comment: 'You are awesome!',
    createdAt: Date.now(),
    rate: Math.random() > 0.5 ? 3 : 5,
    product: {
      id: '489',
      name: 'Some name',
    }
  },
  {
    id: 'id',
    name: 'Sara Connor',
    comment: 'You are awesome!',
    createdAt: Date.now(),
    rate: Math.random() > 0.5 ? 3 : 5,
    product: {
      id: '489',
      name: 'Some name',
    }
  },
  {
    id: 'id',
    name: 'Sara Connor',
    comment: 'You are awesome!',
    createdAt: Date.now(),
    rate: Math.random() > 0.5 ? 3 : 5,
    product: {
      id: '489',
      name: 'Some name',
    }
  },
  {
    id: 'id',
    name: 'Alex',
    comment: 'You are awesome! You are awesome! You are awesome! You are awesome! You are awesome! You are awesome!',
    createdAt: Date.now(),
    rate: Math.random() > 0.5 ? 3 : 5,
    product: {
      id: '489',
      name: 'Some name',
    },
    deletedAt: Date.now(),
  }
]

export const getTestionialsList = async (params) => {
  // return request({
  //   url: '/vue-admin-template/table/list',
  //   method: 'get',
  //   params
  // })
  await new Promise((r) => { setTimeout(r, 200) });
  return {
    data: mockTestimonials
  }
}
