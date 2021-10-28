<template>
  <div style="margin-top: 20px">
    <h1>Access Key</h1>
    <div style="float: left; margin-left: 10px">
      <JqxButton @click="csvBtnOnClick()">Export to CSV</JqxButton>
    </div>
    <JqxGrid
      ref="keypairgrid"
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
        { text: "KeyName", datafield: "KeyName", width: 240 },
        { text: "KeyFingerprint", datafield: "KeyFingerprint", width: 240 },
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
      url: "http://localhost:5000/data/keypairs",
      datatype: "json",
      datafields: [
        { name: "KeyName", type: "string" },
        { name: "KeyFingerprint", type: "string" },
        { name: "UserInput.$.Comment", type: "string" },
        { name: "UserInput.$.CheckDate", type: "string" }
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
      this.$refs.keypairgrid.exportdata("csv", "EC2_Access_Key" + new Date());
    }
  }
};
</script>

<style></style>
