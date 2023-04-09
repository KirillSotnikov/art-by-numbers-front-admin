import request from '@/utils/request'


export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return request({
    url: '/api/admin/image-upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
    },
  })
}
