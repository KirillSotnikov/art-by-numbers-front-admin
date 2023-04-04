import request from '@/utils/request'
import { ProductType, ProductSize, Difficult, Category } from '@/types'

export const getTestionialsList = async () => {
  return request({
    url: '/api/v1/testimonials',
    method: 'get',
  })
}

export const hideTestimonial = async (id) => {
  return request({
    url: `/api/v1/testimonials/${id}`,
    method: 'delete',
  })
}

export const restoreTestimonial = async (id) => {
  return request({
    url: `/api/v1/testimonials/${id}`,
    method: 'put',
  })
}
