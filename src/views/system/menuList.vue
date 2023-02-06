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
          :tree-config="{transform: true, rowField: 'id', parentField: 'parentId'}"
          :data="menuList">
          <vxe-column field="name" title="菜单名称" tree-node width="180" ></vxe-column>
          <vxe-column field="type" title="类型" sortable width="160">
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
            min-width="600" min-height="330" :loading="submitLoading" resize destroy-on-close>
          <template #default>
            <vxe-form :data="formData" title-align="right" title-width="120">
              <!-- 菜单类型 单选 -->
              <vxe-form-item field="type" title="菜单类型" :span="20" :item-render="{}">
                <template #default="{ data }">
                  <vxe-radio-group v-model="data.type">
                    <vxe-radio label="0" content="目录"></vxe-radio>
                    <vxe-radio label="1" content="菜单"></vxe-radio>
                    <vxe-radio label="2" content="按钮"  @change="test"></vxe-radio>
                  </vxe-radio-group>
                </template>
              </vxe-form-item>
              <vxe-form-item field="parentName" title="上级菜单" :span="12" :item-render="{}">
                <template #default="{ data }">
                  <vxe-input v-model="data.parentName" placeholder="请输入上级菜单"></vxe-input>
                </template>
              </vxe-form-item>
              <vxe-form-item field="name" title="菜单名称" :span="12" :item-render="{}">
                <template #default="{ data }">
                  <vxe-input v-model="data.name" placeholder="请输入菜单名称"></vxe-input>
                </template>
              </vxe-form-item>
              <vxe-form-item field="icon" title="菜单图标" :span="12" :visible="itemVisible">
                <template #default="{ data }">
                  <vxe-input v-model="data.icon" placeholder="请输入菜单图标"></vxe-input>
                </template>
              </vxe-form-item>
              <vxe-form-item #default="{ data }" field="url" title="路由url" :span="12" :visible="itemVisible">
                <template>
                  <vxe-input v-model="data.url" placeholder="请输路由url"></vxe-input>
                </template>
              </vxe-form-item>
              <vxe-form-item field="orderNum" title="菜单序号" :span="12" :item-render="{}">
                <template #default="{ data }">
                  <vxe-input v-model="data.orderNum" placeholder="请输入菜单序号"></vxe-input>
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
export default {

  name:"menuList",
  data(){
    return {
      menuList:[],
      tableLoading: false,
      submitLoading: false,
      showEdit: false,
      selectRow:null,
      itemVisible:true,
      t:'',
      formData: { // 弹出的表单数据
        type: '',
        parentName: '',
        name:'',
        icon: '',
        url:'',
        orderNum:'',
        perms:'',
        age: ''
      },
    }
  },
  methods:{
    test(){
      console.log("222")
      this.itemVisible=false
    },
    editEvent(row){
        this.selectRow = row
        this.showEdit = true
        this.formData = {
          type: row.type.toString(),
          parentName: row.parentName,
          name:row.name,
          icon: row.icon,
          orderNum:row.orderNum,
          perms:row.perms,
          url: row.url
        }
        this.t=this.formData.type
      },
    insertEvent(){
      this.showEdit=true
      this.selectRow=null
      this.formData = {
        type: '',
        parentName: '',
        name:'',
        icon: '',
        orderNum:'',
        perms:'',
        url:''
      },
      this.t=this.formData.type
    },
    getAllMenu(){
      this.$store.dispatch("GetAllMenu").then((res)=>{
          let statusCode = res.data.statusCode
          if(statusCode==200){
            this.menuList=res.data.data
          }else{

          }
      }).catch((err)=>{
          
      })
    }
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