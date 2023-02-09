import request from '@/utils/request'

const api_name = '/eduservice/subject'

export default {
    getCoursePublishInfoById(id) {
        return request({
            url: `${api_name}/getCoursePublishInfoById/${id}`,
            method: 'get'
        })
    },  
    publishCourse(id) {
        return request({
            url: `${api_name}/publishCourseById/${id}`,
            method: 'put'
        })
    }
}
