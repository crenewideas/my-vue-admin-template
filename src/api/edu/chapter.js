import request from '@/utils/request'

const api_name = '/eduservice/chapter'

export default {
  getNestedTreeList(courseId,nestedTreeList) {
    return request({
      url: `${api_name}/nestedList/${courseId}`,
      method: 'get',
      data: nestedTreeList
    })
  },
  removeById(id) {
    return request({
      url: `${api_name}/removeById/${id}`,
      method: 'delete'
    })
  },
  save(chapter) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: chapter
    })
  },
  getById(id) {
    return request({
      url: `${api_name}/getById/${id}`,
      method: 'get'
    })
  },

  updateById(chapter) {
    return request({
      url: `${api_name}/updateById/${chapter.id}`,
      method: 'put',
      data: chapter
    })
  }
}