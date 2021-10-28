<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'Services' }" @click.native="chageSubMenus('services')">Services</router-link> |
      <router-link :to="{ name: 'Network ACL' }" @click.native="chageSubMenus('policies')">Policies</router-link> |
      <router-link :to="{ name: 'Event' }" @click.native="chageSubMenus('services')">Event</router-link> |
      <router-link :to="{ name: 'Compliances' }" @click.native="chageSubMenus('services')">Compliances</router-link> |
      <router-link :to="{ name: 'Iam' }" @click.native="chageSubMenus('services')">IAM</router-link> |
      <router-link :to="{ name: 'Admin' }" @click.native="chageSubMenus('services')">Admin</router-link>
    </div>

    <div class="container">
      <div class="item">
        <div v-for="subMenu in menus[selectedMenu]" :key="subMenu.id" class="menu-item">
          <router-link :to="{ name: subMenu.name }">
            <h3>{{ subMenu.name }}</h3>
          </router-link>
        </div>
      </div>
      <div class="item">
        <router-view></router-view>
      </div>
    </div>
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
          { name: "Access Key", id: 5 },
        ],
        policies: [
          { name: "Network ACL", id: 1 },
          { name: "Security Group", id: 2 },
        ],
      },
      selectedMenu: "",
    };
  },
  methods: {
    chageSubMenus(menu) {
      this.selectedMenu = menu;
    },
  },
  created() {
    this.selectedMenu = this.$route.path.split("/")[1];
  },
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
