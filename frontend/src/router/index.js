import Vue from "vue";
import VueRouter from "vue-router";

import Dashboard from "../views/Dashboard.vue";

import Compute from "../views/services/Compute.vue";
import Database from "../views/services/Database.vue";
import Network from "../views/services/Network.vue";
import Storage from "../views/services/Storage.vue";
import AccessKey from "../views/services/AccessKey.vue";

import NetworkAcl from "../views/policies/NetworkAcl.vue";
import SecurityGroup from "../views/policies/SecurityGroup.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/services"
  },
  {
    path: "/services",
    name: "Services",
    component: Dashboard,
    props: true,
    children: [
      {
        path: "compute",
        name: "Compute",
        component: Compute
      },
      {
        path: "db",
        name: "DB",
        component: Database
      },
      {
        path: "network",
        name: "Network",
        component: Network
      },
      {
        path: "storage",
        name: "Storage",
        component: Storage
      },
      {
        path: "access-key",
        name: "Access Key",
        component: AccessKey
      }
    ]
  },
  {
    path: "/policies",
    name: "Policies",
    component: Dashboard,
    props: true,
    children: [
      {
        path: "nacl",
        name: "Network ACL",
        component: NetworkAcl
      },
      {
        path: "sg",
        name: "Security Group",
        component: SecurityGroup
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
