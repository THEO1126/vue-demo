<template>
    <div>
      <h1>Welcome!{{msg}}</h1>
      {{test}}
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        msg: this.$route.query.data,
        test: JSON.parse(window.localStorage.getItem("user")).data
      };
    },
  //   data() { //这种方式也可以
  //     return {
  //       msg: null
  //     };
  //   },
    // created() {
    //   this.msg = this.$route.query.data;
    // }
  }
  </script>