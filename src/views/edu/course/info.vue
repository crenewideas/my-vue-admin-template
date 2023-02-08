<template>
    <div class="app-container">
        
        <h2 style="text-align: center;">发布新课程</h2>
        <el-form label-width="120px">
        <el-form-item label="课程标题">
            <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
        </el-form-item>

        <!-- 所属分类：级联下拉列表 -->
        <!-- 一级分类 -->
        <el-form-item label="课程类别">
            <el-select
                @change="subjectLevelOneChanged"
                v-model="courseInfo.subjectParentId"
                placeholder="请选择">
                <el-option
                v-for="subject in subjectNestedList"
                :key="subject.id"
                :label="subject.title"
                :value="subject.id"/>
            </el-select>
            <!-- 二级分类 -->
            <el-select v-model="courseInfo.subjectId" placeholder="请选择">
            <el-option
                v-for="subject in subSubjectList"
                :key="subject.value"
                :label="subject.title"
                :value="subject.id"/>
            </el-select>
        </el-form-item>
        
        <!-- 课程讲师 -->
        <el-form-item label="课程讲师">
            <el-select
                v-model="courseInfo.teacherId"
                placeholder="请选择">
                <el-option
                v-for="teacher in teacherList"
                :key="teacher.id"
                :label="teacher.name"
                :value="teacher.id"/>
            </el-select>
        </el-form-item>

        <el-form-item label="总课时">
            <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
        </el-form-item>

        <el-form-item label="课程价格">
            <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
        </el-form-item>

        <!-- 课程简介-->
        <el-form-item label="课程简介">
            <el-input v-model="courseInfo.description" :rows="5" type="textarea"/>
        </el-form-item>

        <el-form-item label="课程封面">
            <el-upload
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :action="'http://10.211.55.5:80/ossservice/file/uploadCourseCover'"
                class="avatar-uploader">
                <img :src="courseInfo.cover">
            </el-upload>
        </el-form-item>

        <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
            <el-step title="填写课程基本信息"/>
            <el-step title="创建课程大纲"/>
            <el-step title="提交审核"/>
        </el-steps>
  
        <el-form label-width="120px">
            <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
            </el-form-item>
        </el-form>
        </el-form>
    </div> 
  </template>

<script>
    import course from '@/api/edu/course'
    import subject from '@/api/edu/subject'
    import teacher from '@/api/edu/teacher'
    const defaultForm = {
        title: '',
        subjectParentId:'',
        subjectId: '',
        cover: 'http://pxlngu001.oss-cn-hangzhou.aliyuncs.com/images/courseCover/aaa.jpeg',
        teacherId: '',
        lessonNum: 0,
        description: '',
        price: 0
    }
    export default {
        data() {
            return {
                teacherList: [], // 讲师列表
                subjectNestedList: [],//一级分类列表
                subSubjectList: [],//二级分类列表,
                courseInfo:defaultForm,
                saveBtnDisabled: false, // 保存按钮是否禁用
                courseId:''
            }
        },
        watch: {
            $route(to, from) {
                console.log('watch $route')
                this.init()
            }
        },
        created() {
            console.log('info created')
            // 表单初始化时获取一级分类嵌套列表
            // 初始化分类列表
            this.initSubjectList()
            // 获取讲师列表
            this.initTeacherList()
            //获取路由id值
            if(this.$route.params && this.$route.params.id) {
                this.courseId = this.$route.params.id
                // 调用根据id查询课程的方法
                // 根据id获取课程基本信息
                this.courseInfo = null
                this.fetchCourseInfoById(this.courseId)
            }
        },
        
        // init() {
            //TODO 未生效！
            // 初始化分类列表
            //this.initSubjectList()
        // },
    
        methods: {
            handleAvatarSuccess(res, file) {
                console.log(res)// 上传响应
                console.log(URL.createObjectURL(file.raw))// base64编码
                this.courseInfo.cover = res.data
            },

            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg'
                const isLt2M = file.size / 1024 / 1024 < 2

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!')
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!')
                }
                return isJPG && isLt2M
            },
            // 获取讲师列表
            initTeacherList() {
                teacher.list().then(response => {
                    this.teacherList = response.data
                })
            },
            //一级分类的change事件，目的是为了加载二级分类列表数据。
            subjectLevelOneChanged(value) {
                console.log(value)
                for (let i = 0; i < this.subjectNestedList.length; i++) {
                    if (this.subjectNestedList[i].id === value) {
                        this.subSubjectList = this.subjectNestedList[i].children
                        this.courseInfo.subjectId = ''
                    }
                }
            },
            //一级分类列表数据展示。
            initSubjectList() {
                subject.getNestedTreeList().then(response => {
                    this.subjectNestedList = response.data
                })
            },
            fetchCourseInfoById(id) {
                //这个方法的目的：点击上一步时，回显一级分类和二级分类信息。
                course.getCourseInfoById(id).then(response => {
                    console.log("点击上一步时，回显的课程数据信息：" + response.data)
                    this.courseInfo = response.data
                    // 初始化分类列表
                    for (let i = 0; i < this.subjectNestedList.length; i++) {
                        if (this.subjectNestedList[i].id === this.courseInfo.subjectParentId) {
                            this.subSubjectList = this.subjectNestedList[i].children
                        }
                    }
                }).catch((response) => {
                    this.$message({
                    type: 'error',
                    message: response.message
                    })
                })
            },
            next() {
                console.log('next')
                // this.saveBtnDisabled = true
                if (!this.courseInfo.id) {
                    console.log("下一步执行的是插入方法！")
                    this.saveData()
                } else {
                    console.log('下一步执行的是更新方法！课程id为：' + this.courseInfo.id)
                    this.updateData()
                }
            },
            // 保存
            saveData() {
                course.saveCourseInfo(this.courseInfo).then(response => {
                    this.$message({type: 'success',message: '保存成功!'})
                    return response// 将响应结果传递给then
                }).then(response => {
                    this.$router.push({ path: '/edu/course/chapter/' + response.data })
                }).catch((response) => {
                    this.$message({
                        type: 'error',
                        message: response.message
                    })
                })
            },
            updateData() {
                course.saveCourseInfo(this.courseInfo).then(response => {
                    this.$message({type: 'success',message: '更新成功!'})
                    return response// 将响应结果传递给then
                }).then(response => {
                    this.$router.push({ path: '/edu/course/chapter/' + this.courseInfo.id })
                }).catch((response) => {
                    this.$message({
                        type: 'error',
                        message: response.message
                    })
                })
                
            }
        }
    }
  </script>