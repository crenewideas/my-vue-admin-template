import request from '@/utils/request'

const api_name = '/eduservice/video'

export default {

  saveVideoInfo(videoInfo) {
    return request({
      url: `${api_name}/saveVideoInfo`,
      method: 'post',
      data: videoInfo
    })
  },

  getVideoInfoById(id) {
    return request({
      url: `${api_name}/getVideoInfoById/${id}`,
      method: 'get'
    })
  },

  updateVideoInfoById(videoInfo) {
    return request({
      url: `${api_name}/updateVideoInfoById/${videoInfo.id}`,
      method: 'put',
      data: videoInfo
    })
  },

  removeById(id) {
    return request({
      url: `${api_name}/removeById/${id}`,
      method: 'delete'
    })
  }
}