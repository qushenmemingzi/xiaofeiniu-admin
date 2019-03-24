<template>
  <div>
    {{$store.state.adminName}}
    <h3>左侧导航栏</h3>
    <div>
      <h3>右侧头部</h3>
      <h3>右侧主体内容</h3>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>

</style>
