import request from '@/utils/request'

const api_name = '/eduservice/teacher'
export default {
  //查询讲师列表
  getPageList(page, limit, teacherQuery) {
    return request({
      url: `${api_name}/pageList/${page}/${limit}`,
      method: 'post',
      data: teacherQuery
    })
  },
  //查询所有讲师列表
  list(teacherQuery) {
    return request({
      url: `${api_name}/list`,
      method: 'get',
      data: teacherQuery
    })
  },
  //根据id查询讲师
  getById(id) {
      return request({
          url: `${api_name}/getById/${id}`,
          method: 'get'
      })
  },
  //逻辑删除讲师
// eslint-disable-next-line eol-last
  removeById(teacherId) {
    return request({
        url: `${api_name}/removeById/${teacherId}`,
        method: 'delete'
    })
  },
  //修改讲师
  updateById(teacherId,teacher) {
      return request({
          url: `${api_name}/updateById/${teacherId}`,
          method: 'put',
          data: teacher
      })
  },
  //新增讲师
  save(teacher) {
      return request({
          url: `${api_name}/save`,
          method: 'post',
          data: teacher
      })
  },
  //更新讲师
  updateById(teacher) {
      return request({
          url: `${api_name}/updateById/${teacher.id}`,
          method: 'put',
          data: teacher
      })
  }
}