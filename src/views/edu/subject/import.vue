<template>
<div class="app-container">
    <el-form label-width="120px">

    <el-form-item label="Excel模版上传">
        <el-upload
        ref="uploadExcelTemplate"
        :auto-upload="false"
        :on-success="excelTemplateFileUploadSuccess"
        :on-error="excelTemplateFileUploadError"
        :disabled="importExcelTemplateBtnDisabled"
        :limit="1"
        :action="BASE_API+'/ossservice/file/uploadExcel'"
        name="file"
        accept="xlsx,xls">
        <el-button slot="trigger" size="small" type="primary">选择Excel模版</el-button>
        <el-button
            :loading="excelTemplateloading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUploadExcelTemplate">点击上传Excel模版</el-button>
        </el-upload>
    </el-form-item>
    
    <el-form-item label="信息描述">
        <el-tag type="info">excel模版下载</el-tag>
        <el-tag>
            <i class="el-icon-download"/>
            <a :href="OSS_PATH + '/template/excel/courseExample.xls'">点击下载模版</a>
        </el-tag>
    </el-form-item>

    <el-form-item label="选择Excel">
        <el-upload
        ref="upload"
        :auto-upload="false"
        :on-success="fileUploadSuccess"
        :on-error="fileUploadError"
        :disabled="importBtnDisabled"
        :limit="1"
        :action="BASE_API+'/eduservice/subject/addSubject'"
        name="file"
        accept="xlsx,xls">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload">{{ fileUploadBtnText }}</el-button>
        </el-upload>
    </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {

  data() {
    return {
      BASE_API: 'http://10.211.55.5:80', // 接口API地址
      OSS_PATH: 'http://pxlngu001.oss-cn-hangzhou.aliyuncs.com', // 阿里云OSS地址
      fileUploadBtnText: '导入课程信息', // 按钮文字
      importBtnDisabled: false, // 按钮是否禁用,
      importExcelTemplateBtnDisabled: false, // 按钮是否禁用,
      loading: false,
      excelTemplateloading:false
    }
  },methods: {
        submitUpload() {
            this.fileUploadBtnText = '正在上传'
            this.importBtnDisabled = true
            this.loading = true
            this.$refs.upload.submit()
        },

        fileUploadSuccess(response) {
            if (response.success === true) {
            this.fileUploadBtnText = '导入成功'
            this.loading = false
            this.$message({
                type: 'success',
                message: response.message
            })
            } 
        },

        fileUploadError(response) {
            this.fileUploadBtnText = '导入失败'
            this.loading = false
            this.$message({
            type: 'error',
            message: '导入失败'
            })
        },

        submitUploadExcelTemplate() {
            this.fileUploadExcelTemplateBtnText = '正在上传'
            this.importExcelTemplateBtnDisabled = true
            this.excelTemplateloading = true
            this.$refs.uploadExcelTemplate.submit()
        },

        excelTemplateFileUploadSuccess(response) {
            if (response.success === true) {
                this.fileUploadExcelTemplateBtnText = '导入成功'
                this.excelTemplateloading = false
                this.$message({
                    type: 'success',
                    message: response.message
                })
            } 
        },

        excelTemplateFileUploadError(response) {
                this.fileUploadExcelTemplateBtnText = '导入失败'
                this.excelTemplateloading = false
                this.$message({
                type: 'error',
                message: '导入失败'
            })
        }
    }
}
</script>