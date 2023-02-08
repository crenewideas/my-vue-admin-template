import request from '@/utils/request'

const api_name = '/eduservice/subject'
export default {
  //查询
  getNestedTreeList(nestedTreeList) {
    return request({
      url: `${api_name}/getNestedTreeList`,
      method: 'get',
      data: nestedTreeList
    })
  }
}