import request from '@/utils/request'

export const getProductList = async () => {
  const res = await request({
    url: '/api/admin/products',
    method: 'get',
  })
  return {
    data: res.data
  }
}

export const addProduct = async (data) => {
  const res = await request({
    url: '/api/admin/products',
    method: 'post',
    data,
  })
  return {
    data: res.data
  }
}

export const editProduct = async (id, data) => {
  const res = await request({
    url: `/api/admin/products/${id}`,
    method: 'put',
    data,
  })
  return {
    data: res.data
  }
}

export const crmSync = async () => {
  const res = await request({
    url: `/api/admin/products/crm/force-sync`,
    method: 'post',
  })
  return {
    data: res.data
  }
}

export const hideProduct = async (id) => {
  const res = await request({
    url: `/api/admin/products/${id}`,
    method: 'delete',
  })
  return {
    data: res.data
  }
}


export const restoreProduct = async (id) => {
  const res = await request({
    url: `/api/admin/products/${id}/restore`,
    method: 'put',
  })
  return {
    data: res.data
  }
}
