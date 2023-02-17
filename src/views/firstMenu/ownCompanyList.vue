<template>
  <div id="view">
    <div id="box">
      <vxe-toolbar>
          <template #buttons>
            <vxe-input v-model="filter.name"  placeholder="输入要查询的客户信息" @keyup.enter.native="searchEvent()"></vxe-input>
            <vxe-button  status="primary" content="查询" @click="searchEvent()"></vxe-button>
            <vxe-button  content="返回全部数据" status="danger"  @click="resetEvent()" :disabled="!searchFlag"></vxe-button>
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
            <vxe-column field="ownCompanyName" title="公司名称" width="300" type="html"></vxe-column>
            <vxe-column field="createTime" title="创建时间" width="300" sortable></vxe-column>
            <vxe-column field="createBy" title="创建者" width="300" type="html"></vxe-column>
            <vxe-column title="操作" width="200" show-overflow>
            <template #default="{ row}">
              <vxe-button status="primary" icon="vxe-icon-edit" @click="editEvent(row)">...详情</vxe-button>
              <vxe-button status="danger" icon="vxe-icon-delete" @click="removeEvent(row)">删除</vxe-button>
            </template>
          </vxe-column>
            <template #empty>
            <span style="color: red;">
              <img src="https://n.sinaimg.cn/sinacn17/w240h240/20180314/89fc-fyscsmv5911424.gif">
              <p>没有更多数据了！</p>
            </span>
          </template>
      </vxe-table>

      <!-- 弹出的新增或编辑表单 -->
      <vxe-modal v-model="showEdit" :title="selectRow ? '编辑&保存' : '新增&保存'" width="500" 
            min-width="400" min-height="300" :loading="submitLoading" resize destroy-on-close>
          <template #default>
            <vxe-form :data="formData" :rules="formRules" title-align="center" title-width="100" @submit="submitEvent">
              <vxe-form-item field="ownCompanyName" title="公司名称" :span="24" :item-render="{}">
                <template #default="{ data }">
                  <vxe-input v-model="data.ownCompanyName" placeholder="请输入公司名称" :disabled="!editCompany"></vxe-input>
                </template>
              </vxe-form-item>
              <vxe-form-item v-if="selectRow"  field="createBy" title="创建者" :span="24" :item-render="{}">
                <template #default="{ data }">
                  <vxe-input v-model="data.createBy" disabled></vxe-input>
                </template>
              </vxe-form-item>
              <vxe-form-item v-if="selectRow" field="createTime" title="创建时间" :span="24" :item-render="{}">
                <template #default="{ data }">
                  <vxe-input v-model="data.createTime" disabled></vxe-input>
                </template>
              </vxe-form-item>

              <vxe-form-item align="center" title-align="left" :span="24">
                <template #default>
                  <vxe-button v-if="!editCompany" status="primary" @click="update">修改</vxe-button>
                  <vxe-button  status="primary" type="submit" :disabled="!editCompany">提交</vxe-button>
                  <vxe-button  @click="cancel">取消</vxe-button>
                </template>
              </vxe-form-item>
            </vxe-form>
          </template>
        </vxe-modal>
      <vxe-pager
        :loading="tableLoading"
        :current-page="tablePage.currentPage"
        :page-size="tablePage.pageSize"
        :page-sizes= "tablePage.pageSizes"
        :total="tablePage.total"
        :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
        @page-change="handlePageChange">
      </vxe-pager>

  </div>
</div>
</template>
<script>
import {timeFormat} from '../../utils/dateUtil'  // 日期格式化
import { VXETable } from 'vxe-table'
import console from 'console'

export default { 
  name:"ownCompanyList",
  data() {
    return {
      searchFlag:false, // 搜索标志
      username: JSON.parse(window.localStorage.getItem("user")).username,
      tableLoading: false,
      submitLoading: false,
      tablePage: {
        currentPage: 1,
        pageSize: 5,
        pageSizes:[5,10,20,50,100],
        total: 0
      },
      filter:{
        name:''
      },
      searchInfo:{
        name:'',
        currentPage:'',
        pageSize:''
      },
      data:{
        list: [],  // 用于在界面显示的数据
        tableData:[],  // 存放真正的数据
        tableTotal:0,
        searchTotal:0
        // listCopy:[], // 用于查询前后存放的假数据
      },
      showEdit: false,
      selectRow:null,
      editCompany:false,
      formRules: {
        ownCompanyName: [
          { required: true, message: '请输入公司名称' },
        ]
      },      
      formData: { // 弹出的表单数据
        ownCompanyName:'',
        createTime:'',
        createBy:''
      },
    }
  },

  methods:{
      //  取消按钮
      cancel(){
        this.showEdit=false
        this.editCompany=false
      },
      update(){
        this.editCompany=true
      },
      insertEvent(){
        this.showEdit=true,
        this.selectRow=null,
        this.editCompany=true
        this.formData = {
          id:'',
          ownCompanyName:'',
          createTime:'',
          createBy:''
        }
      },
      editEvent(row){
        this.selectRow = row
        this.showEdit = true
        this.editCompany=false
        this.formData = {
          id:row.id,
          ownCompanyName:row.ownCompanyName,
          createTime:row.createTime,
          createBy:row.createBy
        }
      },

    resetEvent(){
      if(this.searchFlag){
        this.searchFlag=false
        this.filter.name='',
        this.getCompanyListByPage()
        this.tablePage.total=this.data.tableTotal
      }
    },
    searchCompanyListTotalPage(){
      this.$store.dispatch('SearchCompanyListTotalPage',this.searchInfo).then((res) => {  
        this.data.searchTotal=res.data.data
        this.tablePage.total=this.data.searchTotal
        this.tableLoading = false
        }).catch((err) => {
          console.log(err)
            this.$message({
                showClose: true,
                message: '无权访问！',
                type: 'error'
            });
        })
    },
    searchCompanyList(){
      this.$store.dispatch("SearchCompanyList",this.searchInfo).then((res)=>{
        let statusCode = res.data.statusCode
        if (statusCode==200) {
            this.data.list=res.data.data
            this.data.list.forEach(item=>{
              if(item.createTime!=null){
                item.createTime =timeFormat(item.createTime)
            }})
            this.tableLoading = false   
            this.searchCompanyListTotalPage()         
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
    },

    getCompanyListTotalPage(){
      this.$store.dispatch('GetCompanyListTotalPage').then((res) => {  
        this.data.tableTotal=res.data.data
        this.tablePage.total=this.data.tableTotal
        this.tableLoading = false
        }).catch((err) => {
          console.log(err)
            this.$message({
                showClose: true,
                message: '无权访问！',
                type: 'error'
            });
        })
    },
      // 搜索事件
    async searchEvent() {
      const name = this.$XEUtils.toValueString(this.filter.name).trim().toLowerCase()
      if(name){
        this.searchFlag=true
        this.searchInfo.name=name
        this.searchInfo.currentPage=this.tablePage.currentPage
        this.searchInfo.pageSize=this.tablePage.pageSize
        await this.searchCompanyList()
      }
    },
    insertCompany(menu){
       this.$store.dispatch("InsertCompany",menu).then((res)=>{
          let statusCode = res.data.statusCode
          if(statusCode==200){
            this.submitLoading = false
            VXETable.modal.message({ content: '新增成功', status: 'success' })
            this.getCompanyListByPage()
            this.showEdit = false
            this.data.tableTotal=this.data.tableTotal+1
            this.tablePage.total=this.data.tableTotal
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
    updateCompany(menu){
      this.$store.dispatch("UpdateCompany",menu).then((res)=>{
        let statusCode = res.data.statusCode
          if(statusCode==200){
            this.submitLoading = false
            VXETable.modal.message({ content: '更新成功', status: 'success' })
            this.getCompanyListByPage()
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
      var submitFormData={};
      submitFormData["ownCompanyName"]=this.formData['ownCompanyName']
      if(this.selectRow){
         submitFormData["id"]=this.formData['id'],
          this.updateCompany(submitFormData)
      }
      if(!this.selectRow){
        submitFormData["createBy"]=this.username
        this.insertCompany(submitFormData)
      }
    },
    
    // 删除  async 和 await来实现同步和异步
    async removeEvent(row) {
      console.log(row.id)
      const type = await VXETable.modal.confirm('您确定要删除该数据?')
      if (type === 'confirm'){
        let id=row.id
        let index = (this.data.list).findIndex(item => {
          if (item.id==id) {
            return true
          }
        })
        await this.deleteCommpanyById(id)
        this.getCompanyListByPage()
      }
    },
    // 删除员工
    deleteCommpanyById(id){
      this.$store.dispatch('DeleteCommpanyById',id).then((res=>{
        let statusCode = res.data.statusCode
          if(statusCode==200){
            VXETable.modal.message({ content: '删除成功', status: 'success' })
            this.data.tableTotal=this.data.tableTotal-1
            this.tablePage.total=this.data.tableTotal
          }else{
            VXETable.modal.message({ content: '删除失败', status: 'error' })
          }
      }))
    },

     //  分页查询
     getCompanyListByPage(){
        this.tableLoading = true
          this.$store.dispatch('GetCompanyListByPage',this.tablePage).then((res) => {
            let statusCode = res.data.statusCode
                // 判断结果
            if (statusCode==200) {
                this.data.list=res.data.data
                this.data.list.forEach(item=>{
                if(item.createTime!=null){
                  item.createTime =timeFormat(item.createTime)
                }
              }) 
              this.data.tableData=this.data.list
              this.tableLoading = false
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
      },
    // 分页组件触发 
    handlePageChange ({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      if(this.searchFlag){
        this.searchEvent()
      }else{
        this.getCompanyListByPage()
      }
    },
  },

  async created(){
      // await this.getAllCompany()

      await this.getCompanyListByPage()
      await this.getCompanyListTotalPage()
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