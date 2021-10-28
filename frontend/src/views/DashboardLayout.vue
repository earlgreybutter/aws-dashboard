<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'Services' }" @click.native="chageSubMenus('services')">Services</router-link> |
      <router-link :to="{ name: 'Network ACL' }" @click.native="chageSubMenus('policies')">Policies</router-link> |
      <router-link :to="{ name: 'Event' }" @click.native="chageSubMenus('event')">Event</router-link> |
      <router-link :to="{ name: 'Compliances' }" @click.native="chageSubMenus('compliances')">Compliances</router-link> |
      <router-link :to="{ name: 'Iam' }" @click.native="chageSubMenus('iam')">IAM</router-link> |
      <router-link :to="{ name: 'Admin' }">Admin</router-link>
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
      selectedMenu: "",
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
        event: [
          { name: "IAM Console Access", id: 1 },
          { name: "EC2 Events", id: 2 },
          { name: "RDS Events", id: 3 },
          { name: "S3 Events", id: 4 },
          { name: "AccessKey Events", id: 5 },
        ],
        compliances: [
          { name: "Credential Report", id: 1 },
          { name: "Check Root Privilege", id: 2 },
          { name: "Check Account", id: 3 },
          { name: "Check Authentication", id: 4 },
          { name: "Check Access Key", id: 5 },
        ],
        iam: [
          { name: "IAM Users", id: 1 },
          { name: "IAM Grouops", id: 2 },
          { name: "IAM Roles", id: 3 },
          { name: "IAM Policies", id: 4 },
        ],
      },
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
