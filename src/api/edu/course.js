import request from '@/utils/request'

const api_name = '/eduservice/course'

export default {
  saveCourseInfo(courseInfo) {
    return request({
      url: `${api_name}/saveCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },
  getCourseInfoById(id) {
    return request({
        url: `${api_name}/getCourseInfoFormById/${id}`,
        method: 'get'
    })
  },
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/queryCourses/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  removeCourseById(courseId) {
    return request({
        url: `${api_name}/removeCourseById/${courseId}`,
        method: 'delete'
    })
  }
}