<template>
  <div class="container">
    <div class="item">
      <div v-for="subMenu in subMenus" :key="subMenu.id" class="menu-item">
        <router-link :to="{ name: subMenu.name, params: { subMenus } }">
          <h3>{{ subMenu.name }}</h3>
        </router-link>
      </div>
    </div>
    <div class="item">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  props: ["subMenus"]
};
</script>

<style>
.container {
  display: flex;
  margin: 15px;
}
.item:nth-child(1) {
  flex-basis: 250px;
}
.item:nth-child(2) {
  flex-grow: 1;
  margin: 10px;
  padding: 13px;
  border: 1px solid;
}
.menu-item h3 {
  background: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  margin: 10px auto;
  cursor: pointer;
  color: #444;
}
.menu-item h3:hover {
  background: #ddd;
}
.menu-item a {
  text-decoration: none;
}
</style>
