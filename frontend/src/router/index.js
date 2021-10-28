import Vue from "vue";
import VueRouter from "vue-router";

import DashboardLayout from "../views/DashboardLayout.vue";

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
    redirect: "/services",
  },
  {
    path: "/services",
    name: "Services",
    redirect: "/services/compute",
    component: DashboardLayout,
    children: [
      {
        path: "compute",
        name: "Compute",
        component: Compute,
      },
      {
        path: "db",
        name: "DB",
        component: Database,
      },
      {
        path: "networkd",
        name: "Network",
        component: Network,
      },
      {
        path: "storage",
        name: "Storage",
        component: Storage,
      },
      {
        path: "access-key",
        name: "Access Key",
        component: AccessKey,
      },
    ],
  },
  {
    path: "/policies",
    name: "Policies",
    component: DashboardLayout,
    children: [
      {
        path: "nacl",
        name: "Network ACL",
        component: NetworkAcl,
      },
      {
        path: "sg",
        name: "Security Group",
        component: SecurityGroup,
      },
    ],
  },
  {
    path: "/event",
    name: "Event",
    component: DashboardLayout,
  },
  {
    path: "/compliances",
    name: "Compliances",
    component: DashboardLayout,
  },
  {
    path: "/iam",
    name: "Iam",
    component: DashboardLayout,
  },
  {
    path: "/admin",
    name: "Admin",
    component: DashboardLayout,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
