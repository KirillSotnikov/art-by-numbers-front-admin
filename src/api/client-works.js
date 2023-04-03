import request from '@/utils/request'

const mockWorks = [
  {
    id: 'id',
    image: 'https://mk.holst.kz/image/catalog/010.jpg',
    nickname: '123k_solovchuk',
    link: 'https://www.instagram.com/_r_a_i_n_b_o_w__kirill/',
    deletedAt: Date.now(),
  },
  {
    id: 'id',
    image: 'https://mk.holst.kz/image/catalog/010.jpg',
    nickname: 'k_solovchuk',
    link: 'https://www.instagram.com/_r_a_i_n_b_o_w__kirill/',
  },
  {
    id: 'id',
    image: 'https://mk.holst.kz/image/catalog/010.jpg',
    nickname: 'k_solovchuk',
    link: 'https://www.instagram.com/_r_a_i_n_b_o_w__kirill/',
  },
  {
    id: 'id',
    image: 'https://mk.holst.kz/image/catalog/010.jpg',
    nickname: 'k_solovchuk',
    link: 'https://www.instagram.com/_r_a_i_n_b_o_w__kirill/',
  },
  {
    id: 'id',
    image: 'https://mk.holst.kz/image/catalog/010.jpg',
    nickname: 'k_solovchuk',
    link: 'https://www.instagram.com/_r_a_i_n_b_o_w__kirill/',
  },
  {
    id: 'id',
    image: 'https://mk.holst.kz/image/catalog/010.jpg',
    nickname: 'k_solovchuk',
    link: 'https://www.instagram.com/_r_a_i_n_b_o_w__kirill/',
  },
  {
    id: 'id',
    image: 'https://mk.holst.kz/image/catalog/010.jpg',
    nickname: 'k_solovchuk',
    link: 'https://www.instagram.com/_r_a_i_n_b_o_w__kirill/',
  },
  {
    id: 'id',
    image: 'https://mk.holst.kz/image/catalog/010.jpg',
    nickname: 'k_solovchuk',
    link: 'https://www.instagram.com/_r_a_i_n_b_o_w__kirill/',
  },
  {
    id: 'id',
    image: 'https://mk.holst.kz/image/catalog/010.jpg',
    nickname: 'k_solovchuk',
    link: 'https://www.instagram.com/_r_a_i_n_b_o_w__kirill/',
  },
  {
    id: 'id',
    image: 'https://mk.holst.kz/image/catalog/010.jpg',
    nickname: 'k_solovchuk',
    link: 'https://www.instagram.com/_r_a_i_n_b_o_w__kirill/',
  },
  {
    id: 'id',
    image: 'https://mk.holst.kz/image/catalog/010.jpg',
    nickname: 'k_solovchuk',
    link: 'https://www.instagram.com/_r_a_i_n_b_o_w__kirill/',
  },
  {
    id: 'id',
    image: 'https://mk.holst.kz/image/catalog/010.jpg',
    nickname: 'k_solovchuk',
    link: 'https://www.instagram.com/_r_a_i_n_b_o_w__kirill/',
  },
  {
    id: 'id',
    image: 'https://mk.holst.kz/image/catalog/010.jpg',
    nickname: 'k_solovchuk',
    link: 'https://www.instagram.com/_r_a_i_n_b_o_w__kirill/',
  },
  {
    id: 'id',
    image: 'https://mk.holst.kz/image/catalog/010.jpg',
    nickname: 'k_solovchuk',
    link: 'https://www.instagram.com/_r_a_i_n_b_o_w__kirill/',
  },
  {
    id: 'id',
    image: 'https://mk.holst.kz/image/catalog/010.jpg',
    nickname: 'k_solovchuk',
    link: 'https://www.instagram.com/_r_a_i_n_b_o_w__kirill/',
  },
  {
    id: 'id',
    image: 'https://mk.holst.kz/image/catalog/010.jpg',
    nickname: 'k_solovchuk',
    link: 'https://www.instagram.com/_r_a_i_n_b_o_w__kirill/',
  },
  {
    id: 'id',
    image: 'https://mk.holst.kz/image/catalog/010.jpg',
    nickname: 'k_solovchuk',
    link: 'https://www.instagram.com/_r_a_i_n_b_o_w__kirill/',
  },
  {
    id: 'id',
    image: 'https://mk.holst.kz/image/catalog/010.jpg',
    nickname: 'k_solovchuk',
    link: 'https://www.instagram.com/_r_a_i_n_b_o_w__kirill/',
  },
  {
    id: 'id',
    image: 'https://mk.holst.kz/image/catalog/010.jpg',
    nickname: 'k_solovchuk',
    link: 'https://www.instagram.com/_r_a_i_n_b_o_w__kirill/',
  },
  {
    id: 'id',
    image: 'https://mk.holst.kz/image/catalog/010.jpg',
    nickname: 'k_solovchuk',
    link: 'https://www.instagram.com/_r_a_i_n_b_o_w__kirill/',
  },
]

export const getClientWorksList = async (params) => {
  // return request({
  //   url: '/vue-admin-template/table/list',
  //   method: 'get',
  //   params
  // })
  await new Promise((r) => { setTimeout(r, 200) });
  return {
    data: mockWorks
  }
}
