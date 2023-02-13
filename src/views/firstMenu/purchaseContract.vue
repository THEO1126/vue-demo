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
            :loading="tableLoading">
            <vxe-column type="seq" width="100"></vxe-column>
            <vxe-column field="purchaseContractNo" title="采购合同编号" width="100" sortable type="html"></vxe-column>
            <vxe-column field="customerEnterpriseName" title="供货商公司名" width="100" type="html"></vxe-column>
            <vxe-column field="ownCompanyName" title="己方公司名" width="120"></vxe-column>
            <vxe-column field="squeezeSeason" title="榨季" width="100"></vxe-column>
            <vxe-column field="inboundTime" title="入库时间" width="150"></vxe-column>
            <vxe-column field="onboardingTime" title="入职时间" width="130" sortable></vxe-column>
            <vxe-column field="departureTime" title="离职时间" width="130" sortable></vxe-column>
            <vxe-column field="status" title="状态" width="100">
              <template v-slot="{ row }">
                <el-tag v-if="row.status=='在职'" type="success">{{ row.status }}</el-tag>
                <el-tag v-else type="info">{{ row.status }}</el-tag>
              </template>
            </vxe-column>
            <vxe-column title="操作" width="180" show-overflow>
            <template #default="{ row}">
              <vxe-button status="primary" icon="vxe-icon-edit" @click="editEvent(row)"></vxe-button>
              <vxe-button status="danger" icon="vxe-icon-delete" @click="removeEvent(row)"></vxe-button>
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
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: "purchaseContract",
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
      }
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