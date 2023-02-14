<template>
  <div id="view">
    <div id="box">
      <vxe-toolbar>
          <template #buttons>
            <vxe-button status="primary" icon="vxe-icon-square-plus" @click="insertEvent()">新增</vxe-button>
          </template>
      </vxe-toolbar>
      <vxe-table class="table"
          border
          height="80%"
          ref="menuTable"
          :row-config="{isHover: true}"
          :column-config="{resizable: true}"
          :tree-config="{transform: true, rowField: 'id', parentField: 'parentId',expandAll:true}"
          :data="menuList"
          :loading="tableLoading">
          <vxe-column field="name" title="菜单名称" tree-node width="180" ></vxe-column>
          <vxe-column field="type" title="类型" width="160">
            <template v-slot="{ row }">
              <el-tag v-if="row.type==0">目录</el-tag>
              <el-tag v-if="row.type==1" type="success">菜单</el-tag>
              <el-tag v-if="row.type==2" type="danger">按钮</el-tag>
            </template>
          </vxe-column>
          <vxe-column field="icon" title="图标" width="160">
            <template v-slot="{ row }">
               <span v-if="row.icon!=null" :class="`iconfont icon-${ row.icon.toLowerCase()}`"></span>
            </template>
          </vxe-column>
          <vxe-column field="name" title="路由名称" width="160"></vxe-column>
          <vxe-column field="url" title="路由地址" width="170"></vxe-column>
          <vxe-column field="perms" title="权限字段" width="160"></vxe-column>
          <vxe-column title="操作" width="200">
            <template #default="{ row}">
              <vxe-button status="primary" icon="vxe-icon-edit" @click="editEvent(row)">编辑</vxe-button>
              <vxe-button status="danger" icon="vxe-icon-delete" @click="removeEvent(row)">删除</vxe-button>
            </template>
          </vxe-column>
      </vxe-table>

      <!-- 弹出的新增或编辑表单 -->
      <vxe-modal v-model="showEdit" :title="selectRow ? '编辑&保存' : '新增&保存'" width="700" 
            min-width="600" min-height="330" :loading="submitLoading"  resize destroy-on-close>
        <template #default>
          <vxe-form :data="formData" :rules="formRules" title-align="right" title-width="120" @submit="submitEvent">
            <!-- 菜单类型 单选 -->
            <vxe-form-item field="type" title="菜单类型" :span="20" :item-render="{}">
              <template #default="{ data }">
                <vxe-radio-group v-model="data.type">
                  <vxe-radio label="0" content="目录"></vxe-radio>
                  <vxe-radio label="1" content="菜单"></vxe-radio>
                  <vxe-radio label="2" content="按钮"></vxe-radio>
                </vxe-radio-group>
              </template>
            </vxe-form-item>
            <vxe-form-item field="parentName" title="上级菜单" :span="12" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.parentName" placeholder="请输入上级菜单" @click="showParentMenuBtn()"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item field="name" title="菜单名称" :span="12" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.name" placeholder="请输入菜单名称"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item field="icon" title="菜单图标" :span="12" :visible-method="visibleMethod">
              <template #default="{ data }">
                <vxe-input v-model="data.icon" placeholder="请输入菜单图标"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item #default="{ data }" field="url" title="路由url" :span="12" :visible-method="visibleMethod">
              <template>
                <vxe-input v-model="data.url" placeholder="请输路由url"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item field="orderNum" title="菜单序号" :span="12" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.orderNum" placeholder="请输入菜单序号" type="integer"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item field="perms" title="权限字段" :span="12" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.perms" placeholder="请输入权限字段"></vxe-input>
              </template>
            </vxe-form-item>

            <vxe-form-item align="center" :span="24">
              <template #default>
                <vxe-button status="primary" type="submit">提交</vxe-button>
                <vxe-button v-if="!selectRow" type="reset">重置</vxe-button>
                <vxe-button v-else @click="cancel">取消</vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
        </template>
      </vxe-modal>

        <!-- 选择上级菜单 -->
      <vxe-modal v-model="showParentMenu" title="上级菜单" width="300" 
            min-width="300" min-height="300" height="650" destroy-on-close>
        <template #default>
          <vxe-table class="table"
          border="inner"
          height="500"
          ref="parentMenu"
          :show-header="false"
          :row-config="{isHover: true, isCurrent: true,trigger:'row'}"
          :tree-config="{transform: true, rowField: 'id', trigger:'row',parentField: 'parentId',expandAll:true}"
          :radio-config="{labelField: 'name', highlight: true,trigger:'row'}"
          :data="parentMenuList"
          @radio-change="currentChangeEvent">
            <vxe-column type="radio" title="上级菜单名称" field="name" tree-node>
              <template #default="{row}">
                <span v-if="row.type!=2"> {{ row.name }}</span>
              </template> 
            </vxe-column>
          </vxe-table>
          <template>
            <vxe-button status="primary" style="margin-top: 20px" @click="submitEvent()">提交</vxe-button>
            <vxe-button  @click="cancel">取消</vxe-button>
          </template>
        </template>
      </vxe-modal>
    </div>
  </div>
</template>
  
<script>
import { VXETable } from 'vxe-table'
import { defineComponent, reactive, ref } from 'vue'
import console from 'console'
 export default {
  name:"menuList",
  data(){
    return {
      menuList:[], // 全部的菜单
      parentMenuList:[], // 上级菜单
      tableLoading: false,
      submitLoading: false,
      // selectMenuRow:null,
      showEdit: false,
      selectRow:null,
      showParentMenu:false,
      formData: { // 弹出的表单数据
        id:'',
        type: '',
        parentName: '',
        parentId: '',
        name:'',
        icon: '',
        url:'',
        orderNum:'',
        perms:'',
      },
      formRules: {
        type: [
          { required: true, message: '请选择菜单类型' },
        ],
        parentName: [
          { required: true, message: '请选择上级菜单' },
        ],
        name: [
          { required: true, message: '请输入菜单名称' }
        ],
        url: [
          { required: true, message: '请输路由url' }
        ]
      },  
    }
  },

  //  处理响应式事件 ，当菜单类型是按钮，不显示路由url和图表
  setup(){
    const setUpData=reactive({
      selectMenuRow:null
    })
    const visibleMethod = ({ data }) => {
      return data.type != '2'
    }
    const currentChangeEvent = ({ row }) => {
      setUpData.selectMenuRow = row
    }

    return {
      visibleMethod,
      currentChangeEvent,
      setUpData
    }
  },
  methods:{
    showParentMenuBtn(){
      this.showParentMenu=true
      this.setUpData.selectMenuRow=null
      this.parentMenuList=[]
      this.menuList.forEach(item=>{
        if(item.type!=2){
          this.parentMenuList.push(item)
        }
      })
    },
    
    //  取消按钮
    cancel(){
      if(this.showParentMenu){
        this.showParentMenu=false
      }else{
        this.showEdit=false
      }
    },
    //  提交
    submitEvent() {
      if(this.showParentMenu){
        if(this.setUpData.selectMenuRow!=null){
            let selectMenuRow = this.setUpData.selectMenuRow
            this.formData.parentId=selectMenuRow.id
            this.formData.parentName=selectMenuRow.name
            this.showParentMenu=false
        }else{
          VXETable.modal.message({ content: '请选择上级菜单', status: 'error' })
        }
      }else{
        // 深拷贝
        // let submitFormData=JSON.parse(JSON.stringify(this.formData))
        var submitFormData={};
        for(var item in this.formData){
          if(this.formData[item]){
            if(item=='type'||item=='orderNum'){
              submitFormData[item]=parseInt(this.formData[item])
            }else{
              submitFormData[item]=this.formData[item]
            }
          }
        }
        if(this.selectRow){
          console.log(submitFormData)
          this.updateMenu(submitFormData)
        }
        if(!this.selectRow){
          console.log(submitFormData)
          this.insertMenu(submitFormData)
        }
      }
    },
    // 修改
    editEvent(row){
        this.setUpData.selectMenuRow=null
        this.selectRow = row
        this.showEdit = true
        this.formData = {
          id:row.id,
          parentId:row.parentId,
          type: row.type.toString(),
          parentName: row.parentName,
          name:row.name,
          icon: row.icon,
          orderNum:row.orderNum,
          perms:row.perms,
          url: row.url
      }
    },
    // 新增
    insertEvent(){
      this.setUpData.selectMenuRow=null
      this.showEdit=true
      this.selectRow=null
      this.formData = {
        id:'',
        type: '',
        parentName: '',
        parentId: '',
        name:'',
        icon: '',
        url:'',
        orderNum:'',
        perms:'',
      }
    },
     // 删除  async 和 await来实现同步和异步
    async removeEvent(row) {
      const type = await VXETable.modal.confirm('您确定要删除该数据?')
      if (type === 'confirm'){
        let id=row.id
        await this.deleteMenu(id)
        this.getAllMenu()
      }
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
    insertMenu(menu){
      this.$store.dispatch("InsertMenu",menu).then((res)=>{
          let statusCode = res.data.statusCode
          if(statusCode==200){
            this.submitLoading = false
            VXETable.modal.message({ content: '新增成功', status: 'success' })
            this.getAllMenu()
            this.showEdit = false
          }else{
            this.submitLoading = false
            this.showEdit = true
            VXETable.modal.message({ content: '新增错误', status: 'error' })
          }
      }).catch((err)=>{
          this.submitLoading = false
          this.showEdit = true
          VXETable.modal.message({ content: '新增错误', status: 'error' })
      })
    },
    updateMenu(menu){
      this.$store.dispatch("UpdateMenu",menu).then((res)=>{
          let statusCode = res.data.statusCode
          console.log(res)
          if(statusCode==200){
            this.submitLoading = false
            VXETable.modal.message({ content: '更新成功', status: 'success' })
            this.showEdit = false
            this.getAllMenu()
          }else{
            this.submitLoading = false
            this.showEdit = true
            VXETable.modal.message({ content: '更新错误', status: 'error' })
          }
      }).catch((err)=>{
          console.log("更新错误")
          this.submitLoading = false
          this.showEdit = true
          VXETable.modal.message({ content: '更新错误', status: 'error' })
      })
    },
    deleteMenu(id){
      this.$store.dispatch('DeleteMenu',id).then((res=>{
          let statusCode = res.data.statusCode
          if(statusCode==200){
            VXETable.modal.message({ content: '删除成功', status: 'success' })
            this.getAllMenu()
          }else{
            VXETable.modal.message({ content: '删除失败', status: 'error' });
          }
      }))
    },
  },
  created(){
    this.getAllMenu()
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