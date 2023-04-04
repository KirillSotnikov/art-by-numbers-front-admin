import request from '@/utils/request'

export const getClientWorksList = async (params) => {
  return request({
    url: '/api/v1/client-works',
    method: 'get',
  })
}

export const addClientWork = async (data) => {
  return request({
    url: '/api/v1/client-works',
    method: 'post',
    data,
  })
}

export const editClientWork = async (id, data) => {
  return request({
    url: `/api/v1/client-works/${id}`,
    method: 'put',
    data,
  })
}


export const removeClientWork = async (id) => {
  return request({
    url: `/api/v1/client-works/${id}`,
    method: 'delete',
  })
}


export const restoreClientWork = async (id) => {
  return request({
    url: `/api/v1/client-works/${id}/restore`,
    method: 'put',
  })
}
