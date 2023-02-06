<template>
  <div>
    <div class="right">
      <head-area class="head"></head-area>
      <router-view class="view"></router-view>
    </div>
      <side-bar></side-bar>
  </div>
</template>

<script>
import SideBar from "@/views/SideBar";
import HeadArea from "@/views/Head";
import MainArea from "@/views/Main";
export default {
  name: "Main",
  components:{
    SideBar,
    HeadArea,
    MainArea
  }
}
</script> 
<style scoped>

.right{
  height:100%;
  /* background-color: #009688; */
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  border-right: 1px solid #e3e3e3;
  padding-left: 250px;
  overflow: hidden;
}
/* head */
.right .head{
  z-index: 1000;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.49);
  background-color: #009688;
  top: 0px;
  right: 0px;
  height: 50px;
}
.right .view{
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  /* background-color: #009688; */
}

</style>