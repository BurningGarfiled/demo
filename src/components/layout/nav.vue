<template>
  <div>
    <template v-for="item in routes">
      <el-submenu v-if="item.menu_item && item.menu_item.length > 0" :index='item.path' :key="item.path">
        <template slot="title">
          <i class="iconfont" v-html="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <template v-for="child in item.menu_item">
          <nav-item v-if="child.menu_item && child.menu_item.length > 0" :routes='[child]' :index='child.path' :key="child.path"></nav-item>
          <router-link v-else :to="item.path + '/' + child.path" :key="child.path">
            <el-menu-item :index='child.path'>
              <i class="iconfont" v-html="child.icon"></i>
              <span>{{child.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
      <router-link v-else :to="item.path" :key="item.path">
        <el-menu-item :index="item.path">
          <i class="iconfont" v-html="item.icon"></i>
          <span>{{item.title}}</span>
        </el-menu-item>
      </router-link>
    </template>
  </div>
</template>

<script>
export default {
  name: 'NavItem',
  props: {
    routes: {
      type: Array
    }
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
