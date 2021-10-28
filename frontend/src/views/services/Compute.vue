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
        { text: "Region", datafield: "Region", width: 240 },
        { text: "VpcId", datafield: "VpcId", width: 240 },
        { text: "Name", datafield: "Name", width: 150 },
        { text: "InstanceId", datafield: "InstanceId" },
        { text: "InstanceType", datafield: "InstanceType", width: 240 },
        { text: "PrivateIpAddress", datafield: "PrivateIpAddress", width: 240 },
        { text: "PrivateDnsName", datafield: "PrivateDnsName", width: 150 },
        { text: "PublicIpAddress", datafield: "PublicIpAddress" },
        { text: "PublicDnsName", datafield: "PublicDnsName", width: 240 },
        { text: "SecurityGroup", datafield: "SecurityGroup", width: 240 },
        { text: "InstanceState", datafield: "InstanceState", width: 150 },
        {
          text: "CheckDate",
          datafield: "UserInput.$.CheckDate",
          width: "20%",
          createeditor: (row, cellvalue, editor, cellText, width, height) => {
            let container = document.createElement("input");
            container.className = "description";
            container.style.border = "none";
            editor[0].appendChild(container);
            let options = {
              width: width,
              height: height,
              displayMember: "UserInput.$.CheckDate",
              source: this.getEditorDataAdapter("UserInput.$.CheckDate")
            };
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
        { name: "UserInput.$.Comment", type: "string", map: "11" },
        { name: "UserInput.$.CheckDate", type: "string", map: "12" }
      ]
    };
  },
  methods: {
    getEditorDataAdapter: function (datafield) {
      let dataAdapter = new jqx.dataAdapter(this.source, {
        uniqueDataFields: [datafield]
      });
      return dataAdapter;
    },
    csvBtnOnClick: function () {
      this.$refs.ec2grid.exportdata("csv", "ec2instances" + new Date());
    }
  }
};
</script>

<style>
@import "~jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
</style>
