<!-- prettier-ignore -->
<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'Services', params: { subMenus: menus.services } }">Services</router-link> |
      <router-link :to="{ name: 'Policies', params: { subMenus: menus.policies } }">Policies</router-link> |
      <router-link to="/event">Event</router-link> |
      <router-link to="/compliances">Compliances</router-link> |
      <router-link to="/iam">IAM</router-link> |
      <router-link to="/admin">Admin</router-link>
    </div>
    <router-view v-bind:subMenus="menus[selectedMenu]"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: {
        services: [
          { name: "Compute", id: 1 },
          { name: "DB", id: 2 },
          { name: "Network", id: 3 },
          { name: "Storage", id: 4 },
          { name: "Access Key", id: 5 }
        ],
        policies: [
          { name: "Network ACL", id: 1 },
          { name: "Security Group", id: 2 }
        ]
      },
      selectedMenu: ""
    };
  },
  created() {
    this.selectedMenu = this.$route.name.toLowerCase();
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
}

#nav a.router-link-active {
  color: white;
  background: crimson;
}
</style>
