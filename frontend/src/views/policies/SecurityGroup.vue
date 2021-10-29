<template>
  <JqxGrid
    ref="ec2grid"
    :width="'100%'"
    :source="dataAdapter"
    :columns="columns"
    :pageable="true"
    :sortable="true"
    :editable="true"
    :fillterable="true"
  />
</template>

<script>
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";

export default {
  components: {
    JqxGrid,
  },
  data() {
    return {
      dataAdapter: new jqx.dataAdapter(this.source),
      columns: [
        { text: "Group Name", datafield: "GroupName", editable: false },
        { text: "Group ID", datafield: "GroupId", editable: false },
        { text: "VPC ID", datafield: "VpcId", editable: false },
        { text: "Description", datafield: "Description", editable: false },
        { text: "Comment", datafield: "InputValue", editable: true, classname: "input-column" },
      ],
    };
  },
  methods: {
    newButton() {
      return '<input type="button" onclick="delete(' + cellvalue + ')" value="DEL"/>';
    },
  },
  beforeCreate() {
    this.source = {
      id: "_id",
      url: "http://localhost:5000/security-group/sgs",
      datatype: "json",
      datafield: [
        { name: "GroupName", type: "string" },
        { name: "GroupId", type: "string" },
        { name: "VpcId", type: "string" },
        { name: "Description", type: "string" },
        { name: "InputValue", type: "string" },
      ],
    };
  },
};
</script>

<style>
@import "~jqwidgets-scripts/jqwidgets/styles/jqx.base.css";

.input-column {
  background: crimson;
  color: white;
}
</style>
