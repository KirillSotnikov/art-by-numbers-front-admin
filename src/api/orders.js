import request from '@/utils/request'


export const getOrdersList = async () => {
  return request({
    url: '/api/admin/orders',
    method: 'get',
  })
}
