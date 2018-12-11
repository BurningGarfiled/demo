<template>
  <div class="app-warp">
    <div class='nav-content'>
      <el-menu
        :default-active="$route.path"
        background-color="#1E1E1E"
        text-color="#aaa">
        <nav-item :routes='menu'></nav-item>
      </el-menu>
    </div>
    <div class="app-main">
      <!-- <Header></Header>
      <Tag></Tag> -->
      <AppMain></AppMain>
    </div>
  </div>
</template>

<script>
import NavItem from './nav'
import Header from './header'
import Tag from './tag'
import AppMain from './AppMain'

export default {
  components: {
    NavItem, Header, Tag, AppMain
  },
  data () {
    return {
      menu: [
        {
          title: 'HTML5/CSS3特效',
          icon: '&#xe64c;',
          path: '/one',
          menu_item: [
            {
              title: '图片滑块验证码',
              icon: '',
              path: 'PictureSlider'
            }
          ]
        },
        {
          title: 'webSocket',
          icon: '&#xe64c;',
          path: '/webSocket'
        }
      ]
    }
  }
}
</script>

<style scoped>
 .app-warp{
   height:100%;
   width:100%;
 }
 .app-main{
   height:100%;
   overflow:auto;
 }
 .nav-content{
    width:200px;
    height:100%;
    overflow: hidden;
    background:#0C142D;
    float:left;
  }
 .app-main {
   box-sizing: border-box;
   padding: 10px;
 }
</style>
