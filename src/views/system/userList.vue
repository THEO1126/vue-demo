<template>
  <div id="view">
    <div id="box">
      <vxe-toolbar>
          <template #buttons>
            <vxe-input v-model="data.filterName" type="search" placeholder="输入账号或姓名" @keyup="searchEvent()"></vxe-input>
            <vxe-button status="primary" icon="vxe-icon-square-plus" @click="insertEvent()">新增</vxe-button>
          </template>
        </vxe-toolbar>
        <vxe-table :data="data.list" class="table"
            border
            ref="userTable"
            height="80%"
            :row-config="{isHover: true}"
            :loading="tableLoading">
            <vxe-column type="seq" width="100"></vxe-column>
            <vxe-column field="nickName" title="姓名" width="100" sortable type="html"></vxe-column>
            <vxe-column field="username" title="账号" width="100" type="html"></vxe-column>
            <vxe-column field="mobile" title="电话" width="120"></vxe-column>
            <vxe-column field="identity" title="身份证" width="100"></vxe-column>
            <vxe-column field="homeAddress" title="家庭住址" width="150"></vxe-column>
            <vxe-column field="onboardingTime" title="入职时间" width="130" sortable></vxe-column>
            <vxe-column field="departureTime" title="离职时间" width="130" sortable></vxe-column>
            <vxe-column field="status" title="状态" width="100"></vxe-column>
            <vxe-column title="操作" width="180" show-overflow>
            <template #default="{ row,rowIndex }">
              <vxe-button status="primary" icon="vxe-icon-edit" @click="editEvent(row)"></vxe-button>
              <vxe-button status="danger" icon="vxe-icon-delete" @click="removeEvent(row,rowIndex)"></vxe-button>
            </template>
          </vxe-column>
            <template #empty>
            <span style="color: red;">
              <img src="https://n.sinaimg.cn/sinacn17/w120h120/20180314/89fc-fyscsmv5911424.gif">
              <p>没有更多数据了！</p>
            </span>
          </template>
      </vxe-table>
      <vxe-pager
        :loading="tableLoading"
        :current-page="tablePage.currentPage"
        :page-size="tablePage.pageSize"
        :page-sizes= "tablePage.pageSizes"
        :total="tablePage.total"
        :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
        @page-change="handlePageChange">
      </vxe-pager>

      <!-- 弹出的新增或编辑表单 -->
      <vxe-modal v-model="showEdit" :title="selectRow ? '编辑&保存' : '新增&保存'" width="800" 
            min-width="600" min-height="300" :loading="submitLoading" resize destroy-on-close>
          <template #default>
            <vxe-form :data="formData" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent">
              <vxe-form-item field="nickName" title="姓名" :span="12" :item-render="{}">
                <template #default="{ data }">
                  <vxe-input v-model="data.nickName" placeholder="请输入名称"></vxe-input>
                </template>
              </vxe-form-item>
              <vxe-form-item field="identity" title="身份证" :span="12" :item-render="{}">
                <template #default="{ data }">
                  <vxe-input v-model="data.identity" placeholder="请输入身份证"></vxe-input>
                </template>
              </vxe-form-item>
              <vxe-form-item field="age" title="年龄" :span="12" :item-render="{}">
                <template #default="{ data }">
                  <vxe-input v-model="data.age" placeholder="请输年龄"></vxe-input>
                </template>
              </vxe-form-item>
              <vxe-form-item field="mobile" title="电话" :span="12" :item-render="{}">
                <template #default="{ data }">
                  <vxe-input v-model="data.mobile" placeholder="请输入电话"></vxe-input>
                </template>
              </vxe-form-item>
              <vxe-form-item field="username" title="用户名" :span="12" :item-render="{}">
                <template #default="{ data }">
                  <vxe-input v-model="data.username" placeholder="请输入用户名"></vxe-input>
                </template>
              </vxe-form-item>

              <vxe-form-item field="password" title="密码" :span="12" :item-render="{}" v-if="!selectRow">
                <template #default="{ data }">
                  <vxe-input v-model="data.password" placeholder="请输入密码"></vxe-input>
                </template>
              </vxe-form-item>

              <vxe-form-item field="onboardingTime" title="入职时间" :span="12" :item-render="{}">
                <template #default="{ data }">
                  <vxe-input v-model="data.onboardingTime" type="date" placeholder="请选择日期" transfer></vxe-input>
                </template>
              </vxe-form-item>
              <vxe-form-item field="departureTime" title="离职时间" :span="12" :item-render="{}">
                <template #default="{ data }">
                  <vxe-input v-model="data.departureTime" type="date" placeholder="请选择日期" transfer></vxe-input>
                </template>
              </vxe-form-item>

              <!-- 角色 下拉框多选 -->
              <vxe-form-item field="roleIdList" title="角色" :span="12" :item-render="{}">
                <template #default="{ data }">
                  <vxe-select v-model="data.roleIdList" multiple clearable transfer>
                    <vxe-option v-for="item in roleList" :key="item.roleId" :value="item.roleId" :label="item.roleName"></vxe-option>
                  </vxe-select>
                </template>
              </vxe-form-item>

              <!-- 状态 单选 -->
              <vxe-form-item field="status" title="状态" :span="12" :item-render="{}">
                <template #default="{ data }">
                  <vxe-radio-group v-model="data.status">
                    <vxe-radio label="在职" content="在职"></vxe-radio>
                    <vxe-radio label="离职" content="离职"></vxe-radio>
                  </vxe-radio-group>
                </template>
              </vxe-form-item>

              <vxe-form-item field="homeAddress" title="家庭住址" :span="24" :item-render="{}">
                <template #default="{ data }">
                  <vxe-textarea v-model="data.homeAddress" :autosize="{minRows: 2, maxRows: 4}"></vxe-textarea>
                </template>
              </vxe-form-item>
              
              <vxe-form-item align="center" title-align="left" :span="24">
                <template #default>
                  <vxe-button status="primary" type="submit">提交</vxe-button>
                  <vxe-button type="reset">重置</vxe-button>
                </template>
              </vxe-form-item>
            </vxe-form>
          </template>
        </vxe-modal>
  </div>
</div>
</template>
<script>
 import { defineComponent, reactive, ref } from 'vue'
import {dataFormat} from '../../utils/dateUtil'  // 日期格式化
import { VXETable,VxeTableInstance } from 'vxe-table'
import console from 'console'
export default { 
  name:"userList",
  data() {
    return {
      tableLoading: false,
      submitLoading: false,
      tablePage: {
        currentPage: 1,
        pageSize: 5,
        pageSizes:[5,10,20,50,100],
        total: 0
      },
      data:{
        filterName: '',
        list: [],  // 用于在界面显示的数据
        tableData:[],  // 存放真正的数据
        listCopy:[], // 用于查询前后存放的假数据
      },
      showEdit: false,
      selectRow:null,
      formRules: {
        username: [
          { required: true, message: '请输入用户名' },
        ],
        nickName: [
          { required: true, message: '请输入姓名' }
        ],
        age: [
          { required: true, message: '请输入年龄' }
        ],
        mobile:[
          { required: true, message: '请输入手机号' },
          { min: 11, max: 11, message: '长度 11 个字符' }
        ],
        identity:[
          { required: true, message: '请输入身份证' },
          { min: 18, max: 18, message: '长度 18 个字符'}
        ],
        homeAddress:[
          { required: true, message: '请输入家庭住址' }
        ],
        roleIdList:[
          { required: true, message: '请选择角色' }
        ],
        status:[
          { required: true, message: '请选择状态' }
        ],
        password:[
          { required: true, message: '请输入密码' }
        ]
      },      
      formData: { // 弹出的表单数据
        username: '',
        nickName: '',
        mobile:'',
        roleName: '',
        onboardingTime:'',
        departureTime:'',
        age: '',
        homeAddress:'',
        status:'',
        roleIdList:'',
        identity:'',
        password:'',
      },
      roleList: [],
      xTable:ref<VxeTableInstance>({})
    }
  },

  methods:{
      insertEvent(){
        this.showEdit=true,
        this.selectRow=null,
        this.getRoleNameList()
        this.formData = {
          username: '',
          nickName: '',
          mobile:'',
          identity:'',
          onboardingTime:'',
          departureTime:'',
          age: '',
          homeAddress:'',
          status:'',
          identity:'',
          password:'',
          roleIdList:'',
        }
      },
      editEvent(row){
        this.getRoleNameList()
        this.selectRow = row
        this.showEdit = true
        this.formData = {
          userId:row.userId,
          username: row.username,
          nickName: row.nickName,
          mobile:row.mobile,
          onboardingTime:row.onboardingTime,
          departureTime:row.departureTime,
          age: row.age,
          homeAddress:row.homeAddress,
          status:row.status,
          identity:row.identity,
          roleIdList:row.roleIdList
        }
      },
      // 获取员工列表
      getUserList(){
          this.tableLoading = true
          setTimeout(() => {
              this.$store.dispatch('GetUserList').then((res) => {
                let statusCode = res.data.statusCode
                  // 判断结果
              if (statusCode==200) {
                  this.data.tableData=res.data.data     
                  // 日期格式化            
                  this.data.tableData.forEach(item=>{
                    var roleIdList=[]
                    item.roleList.forEach(i=>{
                      roleIdList.push(i.roleId)
                    })
                    item.roleIdList=roleIdList
                    if(item.onboardingTime!=null){
                      item.onboardingTime =dataFormat(item.onboardingTime)
                    }
                    if(item.departureTime!=null){
                      item.departureTime =dataFormat(item.departureTime)
                    }
                  })         
                  this.tablePage.total = res.data.data.length
                  this.tableLoading = false
              } else {
                  this.$message({
                      showClose: true,
                      message: '加载失败！',
                      type: 'error'
                  });
              }
              }).catch((err) => {
                console.log(err)
                  this.$message({
                      showClose: true,
                      message: '无权访问！',
                      type: 'error'
                  });
              })
          },200)
      },

      //  分页查询
      getUserListByPage(){
        this.tableLoading = true
          setTimeout(() => {
              this.$store.dispatch('GetUserListByPage',this.tablePage).then((res) => {
                let statusCode = res.data.statusCode
                    // 判断结果
                if (statusCode==200) {
                    this.data.list=res.data.data
                    this.data.listCopy=this.data.list
                    this.tableLoading = false
                    this.data.list.forEach(item=>{
                      var roleIdList=[]
                      item.roleList.forEach(i=>{
                        roleIdList.push(i.roleId)
                      })
                      item.roleIdList=roleIdList
                      if(item.onboardingTime!=null){
                        item.onboardingTime =dataFormat(item.onboardingTime)
                      }
                      if(item.departureTime!=null){
                        item.departureTime =dataFormat(item.departureTime)
                      }
                    })
                } else {
                    console.log("错误")
                }
              }).catch((err) => {
                  console.log(err);
                  this.$message({
                    showClose: true,
                    message: '无权访问！',
                    type: 'error'
                  });
              })
          },200)
      },
      // 搜索事件
      searchEvent() {
        const filterName = this.$XEUtils.toValueString(this.data.filterName).trim().toLowerCase()
        if (filterName) {
          const filterRE = new RegExp(filterName, 'gi')
          const searchProps = ['nickName','username']
          const rest = this.data.tableData.filter(item => searchProps.some(key => this.$XEUtils.toValueString(item[key]).toLowerCase().indexOf(filterName) > -1))
          this.data.list = rest.map(row => {
            const item = Object.assign({}, row)
            searchProps.forEach(key => {
              item[key] = this.$XEUtils.toValueString(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
            })
            return item
          })
        } else {
          this.data.list = this.data.listCopy
      }
    },
    insertUser(userInfo){
      this.$store.dispatch("InsertUser",userInfo).then((res)=>{
          console.log(res.data)
          if(res.data){
            this.submitLoading = false
            VXETable.modal.message({ content: '新增成功', status: 'success' })
            this.getUserListByPage()
            this.showEdit = false
          }else{
            this.submitLoading = false
            this.showEdit = true
            VXETable.modal.message({ content: '新增错误', status: 'error' })
          }
      }).catch((err)=>{
          this.submitLoading = false
          this.showEdit = true
          console.log("错误"+err)
          VXETable.modal.message({ content: '新增错误', status: 'error' })
      })
    },
    updateUser(userInfo){
      this.$store.dispatch("UpdateUser",userInfo).then((res)=>{
          if(res.data){
            this.submitLoading = false
            VXETable.modal.message({ content: '更新成功', status: 'success' })
            this.getUserListByPage()
            this.showEdit = false
          }else{
            this.submitLoading = false
            this.showEdit = true
            VXETable.modal.message({ content: '更新错误', status: 'error' })
          }
      }).catch((err)=>{
          this.submitLoading = false
          this.showEdit = true
          VXETable.modal.message({ content: '更新错误', status: 'error' })
      })
    },
    //  提交
    submitEvent() {
      this.submitLoading = true
        var roleList=[];
        var submitFromData={};
        for(var i=0;i<this.formData.roleIdList.length;i++){
            roleList[i]={}
            roleList[i]["roleId"]=this.formData.roleIdList[i]
        }
        for(var item in this.formData){
          if(this.formData[item]){
            submitFromData[item]=this.formData[item]
          }
        }
        submitFromData["roleList"]=roleList
      if(!this.selectRow){
        this.insertUser(submitFromData)
      }else{
        this.updateUser(submitFromData)
      }
    },
    
    // 删除  async 和 await来实现同步和异步
    async removeEvent(row) {
      const type = await VXETable.modal.confirm('您确定要删除该数据?')
      if (type === 'confirm'){
        let userId=row.userId
        let index = (this.data.list).findIndex(item => {
          if (item.userId==userId) {
            console.log("item.userId:"+item.userId)
            return true
          }
        })
        await this.deleteUser(userId)
        this.data.tableData.splice(index,1)
        this.tablePage.total =  this.data.tableData.length
        this.getUserListByPage()
      }
    },
    // 删除员工
    deleteUser(userId){
        this.$store.dispatch('DeleteUser',userId).then((res=>{
            if(res){
              this.$message({
                showClose: true,
                message: '删除成功！',
                type: 'success'
              });
            }else{
              this.$message({
                showClose: true,
                message: '删除失败！',
                type: 'error'
              });
            }
        }))
    },

    // 获取所有的角色名
    getRoleNameList(){
      this.$store.dispatch('GetRoleNameList').then((res=>{
        this.roleList=res.data;
      }))
    },
    // 分页组件触发 
    handlePageChange ({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.getUserListByPage()
    },
  },

  async created(){
      await this.getUserList()
      await this.getUserListByPage()
  }
}
</script>
  
  <style scoped>
  #box{
    width: 95%;
    height: 100%;
    margin: auto;
    margin-top: 20px;
  }
  #box .table{
    margin-top: 20px;
    margin: auto;
  }
  </style>