import request from '@/utils/request'
import { ProductType, ProductSize, Difficult, Category } from '@/types'

const mockBoardContent = [
  {
    imageSrc: 'https://mk.holst.kz/image/catalog/010.jpg',
    text: 'патріотичні постери на полотні',
    label: 'Новинка!',
    buttonText: 'Переглянути сюжети',
    buttonLink: '/catalog'
  },
  {
    imageSrc: 'https://mk.holst.kz/image/catalog/010.jpg',
    text: 'патріотичні постери на полотні',
    label: 'Новинка!',
    buttonText: 'Переглянути сюжети',
    buttonLink: '/catalog'
  },
  {
    imageSrc: 'https://mk.holst.kz/image/catalog/010.jpg',
    text: 'патріотичні постери на полотні',
    label: 'Новинка!',
    buttonText: 'Переглянути сюжети',
    buttonLink: '/catalog'
  },
]

export const getMainBoardList = async (params) => {
  // return request({
  //   url: '/vue-admin-template/table/list',
  //   method: 'get',
  //   params
  // })
  await new Promise((r) => { setTimeout(r, 200) });
  return {
    data: mockBoardContent
  }
}
