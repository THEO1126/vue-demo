<template>
  <div id="view">
    <div id="box" >
      <vxe-toolbar>
          <template #buttons>
            <vxe-input v-model="data.filterName" type="search" placeholder="输入账号或姓名" @keyup="searchEvent()"></vxe-input>
            <vxe-button status="primary" icon="vxe-icon-square-plus" @click="insertEvent()">新增</vxe-button>
          </template>
        </vxe-toolbar>
        <vxe-table  class="table"
            border
            ref="userTable"
            height="80%"
            :row-config="{isHover: true}"
            :loading="tableLoading"
            :data="data.list"
            align="center">
            <vxe-column field="purchaseContractNo" title="采购合同编号" width="150" sortable type="html"></vxe-column>
            <vxe-column field="customerEnterpriseName" title="供货商公司名" width="130" type="html"></vxe-column>
            <vxe-column field="ownCompanyName" title="己方公司名" width="120"></vxe-column>
            <vxe-column field="squeezeSeason" title="榨季" width="100"></vxe-column>
            <vxe-column field="inboundTime" title="入库时间" width="100">
              <template v-slot="{ row }">
                {{Date(row.inboundTime)|formatDate()}}
              </template>
            </vxe-column>
            <vxe-column field="factoryName" title="入库厂名" width="130">
              <template v-slot="{ row }">
                {{row.otherWarehouse.factoryName }}
              </template>
            </vxe-column>
            <vxe-column field="goodsName" title="采购货物名称" width="130"></vxe-column>
            <vxe-column field="goodsCount" title="采购货物数量" width="130"></vxe-column>
            <vxe-column field="goodsUnit" title="采购货物单位" width="130"></vxe-column>
            <vxe-column field="paymentAmount" title="采购总金额" width="130"></vxe-column>
            <vxe-column field="unpaidAmount" title="未结清金额" width="130"></vxe-column>
            <vxe-column field="contractPhoto" title="合同照片" width="130">
            <template v-slot="{ row }">
              <div style="width: 100px; height: 100px">
                  <el-image v-if="row.contractPhoto"
                    style="width: 100px; height: 100px"
                    :src="row.contractPhoto"
                    :preview-src-list="[row.contractPhoto]" lazy>
                  </el-image>
                </div>
            </template>
            </vxe-column>
            <vxe-column field="createTime" title="创建时间" width="150">
              <template v-slot="{ row }">
                {{Date(row.createTime)|formatTime()}}
              </template>
            </vxe-column>
            <vxe-column field="createBy" title="创建者" width="130"></vxe-column>
            <vxe-column title="操作" width="400" fixed="right" show-overflow>
            <template #default="{ row}">
              <vxe-button status="primary" @click="detailEvent(row)">...详情</vxe-button>
              <vxe-button status="info" icon="vxe-icon-edit" @click="editEvent(row)">修改</vxe-button>
              <vxe-button status="danger" icon="vxe-icon-delete" @click="removeEvent(row)">删除</vxe-button>
            </template>
          </vxe-column>
            <template #empty>
            <span style="color: red;">
              <img src="https://n.sinaimg.cn/sinacn17/w120h120/20180314/89fc-fyscsmv5911424.gif">
              <p>没有更多数据了！</p>
            </span>
          </template>
      </vxe-table>

      <!-- 弹窗查看详情 -->
      <vxe-modal v-model="showDetails" title="采购单详情" width="1000" min-width="1000" height="600" :mask="false" :lock-view="false" resize>
        <template #default>
            <div :data="detailData" class="detailDiv">
               <div>
                  <p><span>供货方公司名：</span>{{detailData.ownCompanyName }}</p>
                  <p><span>入库时间：</span>{{Date(detailData.inboundTime)|formatDate()}}</p>
                  <p><span>创建者：</span>{{detailData.createBy }}</p>
                  <p><span>创建时间：</span>{{Date(detailData.createTime)|formatTime()}}</p>
               </div>
               <div>
                  <p><span>采购合同编号：</span>{{detailData.purchaseContractNo }}</p>
                  <p><span>采购货物名称：</span>{{detailData.goodsName }}</p>
                  <p><span>采购货物单位：</span>{{detailData.goodsUnit }}</p>
                  <p><span>采购货物数量：</span>{{detailData.goodsCount }}</p>
               </div>
               <div>
                  <p><span>己方公司名：</span>{{detailData.customerEnterpriseName }}</p>
                  <p><span>采购总价：</span>{{detailData.paymentAmount }}</p>
                  <p><span>未结清金额：</span>{{detailData.unpaidAmount }}</p>
                  <p><span>榨季：</span>{{detailData.squeezeSeason }}</p>
               </div>
            </div>
            <vxe-table class="detailTable1"
                border="inner"
                auto-resize
                show-overflow
                height="350"
                :row-config="{isHover: true}"
                :data="objToArr(detailData)">
                <vxe-column field="unpaidAmount" title="未结清金额" width="130"></vxe-column>
            </vxe-table>
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
  import {timeFormat,dateFormat} from '../../utils/dateUtil'  // 日期格式化
  export default {
    name: "purchaseContract",
    data() {
      return {
        showDetails:false, // 显示详情
        detailData:[], // 详情的数据
        searchFlag:false, // 搜索标志
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
          // listCopy:[], // 用于查询前后存放的假数据
          tableTotal:0,
          searchTotal:0
        },
        showEdit: false,
        selectRow:null,
      }
    },
    // 过滤器 ：时间和日期格式化
    filters:{
        formatDate: function(value,args) {
          return dateFormat(value)
        },
        formatTime:function(value,args) {
          return timeFormat(value)
        }
    },
    methods:{
     // 一个对象转对象数组
      objToArr(obj) {
        var arr = []
        arr.push(obj)
        return arr;
      },
      // 详情
      detailEvent(row){
        this.showDetails=true
        this.detailData=row
      },
      getAllPurchaseContract(){
        this.tableLoading = true
        this.$store.dispatch('GetAllPurchaseContract').then((res) => {
          let statusCode = res.data.statusCode
          if(statusCode==200){
            this.data.list=res.data.data
            this.tableLoading = false
          }else{
            this.tableLoading = false
            VXETable.modal.message({ content: '加载失败', status: 'error' })
          }
          }).catch((err) => {
            VXETable.modal.message({ content: '无权访问', status: 'error' })
          })
      },
      getPurchaseContractByPage(){
        this.tableLoading = true
        this.$store.dispatch('GetPurchaseContractByPage',this.tablePage).then((res) => {
          let statusCode = res.data.statusCode
          if(statusCode==200){
            this.data.list=res.data.data
            this.tableLoading = false
          }else{
            this.tableLoading = false
            VXETable.modal.message({ content: '加载失败', status: 'error' })
          }
          }).catch((err) => {
            VXETable.modal.message({ content: '无权访问', status: 'error' })
          })
      },
      getPurchaseContractTotalPage(){
        this.$store.dispatch('GetPurchaseContractTotalPage').then((res) => {
            this.data.tableTotal=res.data.data
            this.tablePage.total=this.data.tableTotal
        })
      },
      // 分页组件触发 
      handlePageChange({ currentPage, pageSize }) {
        this.tablePage.currentPage = currentPage
        this.tablePage.pageSize = pageSize
        this.getPurchaseContractByPage()
      },
    },
    async created(){
      await this.getPurchaseContractByPage()
      await this.getPurchaseContractTotalPage()
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
  .detailDiv{
    display: flex;
    width: 100%;
    height: 160px;
    /* background-color: aqua; */
    gap: 50px;
  }
  .detailDiv div p{
    padding-top: 10px;
    font-size: 16px;
  }

  .detailDiv div p span{
    font-weight: 600;
  }
  .detailTable1{
    width: 50%;
  }
  </style>