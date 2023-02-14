<template>
  <div id="view">
    <div id="box">
      <vxe-toolbar>
          <template #buttons>
            <vxe-input v-model="filter.name"  placeholder="输入角色名称" @keyup.enter.native="searchEvent()"></vxe-input>
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
            <vxe-column type="seq" width="90"></vxe-column>
            <vxe-column field="roleName" title="角色名称" width="350" type="html"></vxe-column>
            <vxe-column field="remark" title="角色描述" width="350"></vxe-column>
            <vxe-column title="操作" width="400" show-overflow>
            <template #default="{ row}">
              <vxe-button status="primary" icon="vxe-icon-edit" @click="editEvent(row)">编辑</vxe-button>
              <vxe-button status="success" icon="vxe-icon-edit" @click="showMenuBtn(row)">修改权限</vxe-button>
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
              <vxe-form-item field="roleName" title="角色名称" :span="24" :item-render="{}">
                <template #default="{ data }">
                  <vxe-input v-model="data.roleName" placeholder="请输入角色名称" ></vxe-input>
                </template>
              </vxe-form-item>
              <vxe-form-item  field="remark" title="备注" :span="24" :item-render="{}">
                <template #default="{ data }">
                  <vxe-input v-model="data.remark"  placeholder="请输入备注"></vxe-input>
                </template>
              </vxe-form-item>

              <vxe-form-item align="center" title-align="left" :span="24">
                <template #default>
                  <vxe-button  status="primary" type="submit">提交</vxe-button>
                  <vxe-button  @click="cancel">取消</vxe-button>
                </template>
              </vxe-form-item>
            </vxe-form>
          </template>
        </vxe-modal>

      <!-- 分配权限 -->
      <vxe-modal v-model="showMenu" title="分配权限" width="400" 
            min-width="300" min-height="300" height="680" destroy-on-close>
        <template #default>
          <vxe-table class="table"
          border="inner"
          height="550"
          ref="parentMenu"
          :show-header="false"
          :row-config="{isHover: true, isCurrent: true,trigger:'row',keyField: 'id'}"
          :tree-config="{transform: true, rowField: 'id', trigger:'row',parentField: 'parentId',expandAll:true}"
          :checkbox-config="{labelField: 'name',checkRowKeys: checkRowKeys }"
          @checkbox-change="selectChangeEvent"
          :data="menuList"
          >
            <vxe-column type="checkbox" title="分配权限" field="name" tree-node>
              <template #default="{row}">
                <span> {{ row.name }}</span>
              </template> 
            </vxe-column>
          </vxe-table>
          <template>
            <vxe-button status="primary" style="margin-top: 20px" @click="submitEvent()">提交</vxe-button>
            <vxe-button  @click="cancel">取消</vxe-button>
          </template>
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
      checkRowKeys:[],  // 默认选中的分配权限
      showMenu:false,
      menulist:[],
      searchFlag:false, // 搜索标志
      username: JSON.parse(window.localStorage.getItem("user")).data.username,
      tableLoading: false,
      submitLoading: false,
      selectRoleMenu:{
        roleId:'',
        menuList:'',
      },
      tablePage: {
        currentPage: 1,
        pageSize: 10,
        pageSizes:[10,20,50,100],
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
        roleName: [
          { required: true, message: '请输入角色名称' },
        ]
      },      
      formData: { // 弹出的表单数据
        roleId:'',
        roleName:'',
        remark:'',
      },
    }
  },

  methods:{

    // 选择 的 分配权限
    selectChangeEvent({ $table }){
      this.selectMenuId=[]
      const records = $table.getCheckboxRecords()
      records.forEach(item=>{
        this.selectMenuId.push(item.id)
      })
      var MenuIdList=[]
      for(var i=0;i<this.selectMenuId.length;i++){
        MenuIdList[i]={}
        MenuIdList[i]['id']=this.selectMenuId[i]
      }
      this.selectRoleMenu.menuList=[]
      this.selectRoleMenu.menuList=MenuIdList;
    },
      //  取消按钮
    cancel(){
      if(this.showMenu){
        this.showMenu=false
      }else{
        this.showEdit=false
      }
    },
      insertEvent(){
        this.showEdit=true,
        this.selectRow=null
        this.formData = {
          roleId:'',
          roleName:'',
          remark:'',
        }
      },
      editEvent(row){
        this.selectRow = row
        this.showEdit = true
        this.formData = {
          roleId:row.roleId,
          roleName:row.roleName,
          remark:row.remark
        }
      },
    async showMenuBtn(row){
      this.checkRowKeys=[]
      this.selectRoleMenu={}
      await row.menuList.forEach(item=>{
        this.checkRowKeys.push(item.id)
      })
      this.showMenu=true
      this.selectRoleMenu['roleId']=row.roleId
      var MenuIdList=[]
      for(var i=0;i<this.checkRowKeys.length;i++){
        MenuIdList[i]={}
        MenuIdList[i]['id']=this.checkRowKeys[i]
      }
      this.selectRoleMenu.menuList=MenuIdList;
    },
    getAllMenu(){
      this.tableLoading = true
      this.$store.dispatch("GetAllMenu").then((res)=>{
          let statusCode = res.data.statusCode
          if(statusCode==200){
            this.menuList=res.data.data
            this.tableLoading = false
          }else{
            this.tableLoading = false
            VXETable.modal.message({ content: '加载失败', status: 'error' })
          }
      }).catch((err)=>{
        this.tableLoading = false
        VXETable.modal.message({ content: '加载失败', status: 'error' })
      })
    },
    getRoleList(){
      this.$store.dispatch('GetRoleList').then((res) => {  
        let statusCode = res.data.statusCode
        if(statusCode==200){
            this.data.tableTotal=res.data.data.length
            this.tablePage.total=this.data.tableTotal
            this.data.tableData=res.data.data
            this.data.list=this.data.tableData
            this.tableLoading = false
        }
        }).catch((err) => {
          console.log(err)
            this.$message({
                showClose: true,
                message: '无权访问！',
                type: 'error'
            });
        })
    },

    resetEvent(){
      if(this.searchFlag){
        this.searchFlag=false
        this.filter.name='',
        this.getRoleList()
        this.tablePage.total=this.data.tableTotal
      }
    },

    searchRoleByName(roleName){
      this.$store.dispatch("SearchRoleByName",roleName).then((res)=>{
        let statusCode = res.data.statusCode
        if (statusCode==200) {
            this.data.list=res.data.data
            this.data.searchTotal=res.data.data.length
            this.tablePage.total=this.data.searchTotal
            this.tableLoading = false               
        } else {
            console.log("错误")
        }
      }).catch((err) => {
          VXETable.modal.message({ content: '无权访问', status: 'error' })
      })
    },

      // 搜索事件
    async searchEvent() {
      const roleName = this.$XEUtils.toValueString(this.filter.name).trim().toLowerCase()
      if(roleName){
        this.searchFlag=true
        this.searchInfo.name=roleName
        // this.searchInfo.currentPage=this.tablePage.currentPage
        // this.searchInfo.pageSize=this.tablePage.pageSize
        await this.searchRoleByName(roleName)
      }
    },

    insertRole(roleInfo){
       this.$store.dispatch("InsertRole",roleInfo).then((res)=>{
        console.log(roleInfo)
          let statusCode = res.data.statusCode
          if(statusCode==200){
            this.submitLoading = false
            VXETable.modal.message({ content: '新增成功', status: 'success' })
            this.getRoleList()
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
    updateRole(roleInfo){
      this.$store.dispatch("UpdateRole",roleInfo).then((res)=>{
        let statusCode = res.data.statusCode
          if(statusCode==200){
            this.submitLoading = false
            VXETable.modal.message({ content: '更新成功', status: 'success' })
            this.getRoleList()
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
      for(var item in this.formData){
          if(this.formData[item])
            submitFormData[item]=this.formData[item]
      }
      if(!this.showMenu){
        if(this.selectRow){
          submitFormData["updateBy"]=this.username
          this.updateRole(submitFormData)
        }
        else{
          submitFormData["createBy"]=this.username
          this.insertRole(submitFormData)
        }
      }else{
        this.insertRoleMenu(this.selectRoleMenu)
      }
    },
    
    // 删除  async 和 await来实现同步和异步
    async removeEvent(row) {
      const type = await VXETable.modal.confirm('您确定要删除该数据?')
      if (type === 'confirm'){
        let roleId=row.roleId
        await this.deleteRoleById(roleId)
      }
    },
    
    insertRoleMenu(role){
      this.$store.dispatch("InsertRoleMenu",role).then((res)=>{
          console.log(role)
          let statusCode = res.data.statusCode
          if(statusCode==200){
            this.submitLoading = false
            VXETable.modal.message({ content: '修改成功', status: 'success' })
            this.getRoleList()
            this.showMenu=false
          }else{
            this.submitLoading = false
            this.showMenu=true
            VXETable.modal.message({ content: '修改成功', status: 'error' })
          }
      }).catch((err)=>{
          this.submitLoading = false
          this.showMenu=true
          console.log("错误"+err)
          VXETable.modal.message({ content: '修改错误', status: 'error' })
      })
    },

    // 删除
    deleteRoleById(roleId){
      this.$store.dispatch('DeleteRoleById',roleId).then((res=>{
        let statusCode = res.data.statusCode
          if(statusCode==200){
            VXETable.modal.message({ content: '删除成功', status: 'success' })
            this.data.tableTotal=this.data.tableTotal-1
            this.tablePage.total=this.data.tableTotal
            this.getRoleList()
          }else{
            VXETable.modal.message({ content: '删除失败', status: 'error' })
          }
      }))
    },

    // 分页组件触发 
    handlePageChange ({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      // if(this.searchFlag){
      //   this.searchEvent()
      // }else{
      //   this.getRoleList()
      // }
    },
  },

  async created(){
      await this.getRoleList()
      await this.getAllMenu()
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