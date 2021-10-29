<template>
  <div style="margin-top: 20px">
    <h1>Compute</h1>
    <div style="float: left; margin-left: 10px">
      <JqxButton @click="csvBtnOnClick()">Export to CSV</JqxButton>
    </div>
    <JqxGrid
      ref="ec2grid"
      :width="'100%'"
      :source="dataAdapter"
      :columns="columns"
      :autoheight="true"
      :pageable="true"
      :sortable="true"
      :fillterable="true"
      :editable="true"
    />
  </div>
</template>

<script>
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";
import JqxInput from "jqwidgets-scripts/jqwidgets-vue/vue_jqxinput.vue";
import JqxButton from "jqwidgets-scripts/jqwidgets-vue/vue_jqxbuttons.vue";

export default {
  components: {
    JqxGrid,
    JqxButton
  },
  data: function () {
    return {
      dataAdapter: new jqx.dataAdapter(this.source),
      columns: [
        { text: "Region", datafield: "Region", editable: false, width: 240 },
        { text: "VpcId", datafield: "VpcId", editable: false, width: 240 },
        { text: "Name", datafield: "Name", editable: false, width: 150 },
        { text: "InstanceId", datafield: "InstanceId", editable: false},
        { text: "InstanceType", datafield: "InstanceType", editable: false, width: 240 },
        { text: "PrivateIpAddress", datafield: "PrivateIpAddress", editable: false, width: 240 },
        { text: "PrivateDnsName", datafield: "PrivateDnsName", editable: false, width: 150 },
        { text: "PublicIpAddress", datafield: "PublicIpAddress", editable: false},
        { text: "PublicDnsName", datafield: "PublicDnsName", editable: false, width: 240 },
        { text: "SecurityGroup", datafield: "SecurityGroup", editable: false, width: 240 },
        { text: "InstanceState", datafield: "InstanceState", editable: false, width: 150 },
        {
          text: "Comment",
          datafield: 'InputValue.Comment',
          columntype: "textbox",
          editable: true,
          width: "20%"
        },
        {
          text: "CheckDate",
          datafield: ['InputValue.CheckDate'],
          columntype: "datetimeinput",
          editable: true,
          width: "20%"
        },
        {
          text: "Submit",
          datafield: "Save",
          columntype: "button",
          cellsrenderer: function () {
            return "Save";
          },
          buttonclick: function (row, event) {
            var button = $(event.currentTarget);
            var grid = button.parents("[id^=jqxGrid]");
            var rowData = grid.jqxGrid("getrowdata", row);

            fetch("http://localhost:5000/data/userinputec2instances", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(rowData)
            })
              .then((response) => response.json())
              .then((data) => console.log(data));
          }
        }
      ]
    };
  },
  beforeCreate: function () {
    this.source = {
      id: "_id",
      url: "http://localhost:5000/data/ec2instances",
      datatype: "json",
      datafields: [
        { name: "Region", type: "string" },
        { name: "VpcId", type: "string" },
        { name: "Name", type: "string" },
        { name: "InstanceId", type: "string" },
        { name: "InstanceType", type: "string" },
        { name: "PrivateIpAddress", type: "string" },
        { name: "PrivateDnsName", type: "string" },
        { name: "PublicIpAddress", type: "string" },
        { name: "PublicDnsName", type: "string" },
        { name: "SecurityGroup", type: "string" },
        { name: "InstanceState", type: "string" },
        { name: "InputValue.Comment", type: "string"},
        { name: "InputValue.CheckDate", type: "string"}
      ]
    };
  },
  methods: {
    csvBtnOnClick: function () {
      this.$refs.ec2grid.exportdata("csv", "ec2instances" + new Date());
    }
  }
};
</script>

<style>
@import "~jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
</style>
