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
      @cellbeginedit="onCellBeginEdit($event)"
      @cellendedit="onCellEndEdit($event)"
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
        { text: "KeyName", datafield: "KeyName", editable: false, width: 240 },
        {
          text: "KeyFingerprint",
          datafield: "KeyFingerprint",
          editable: false,
          width: 240
        },
        {
          text: "Comment",
          datafield: "InputValue.Comment",
          columntype: "textbox",
          editable: true,
          width: "20%"
        },
        {
          text: "CheckDate",
          datafield: "InputValue.CheckDate",
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

            console.log(rowData);

            fetch("http://localhost:5000/data/userinputkeypairs", {
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
      url: "http://localhost:5000/data/keypairs",
      datatype: "json",
      datafields: [
        { name: "KeyName", type: "string" },
        { name: "KeyPairId", type: "string"},
        { name: "KeyFingerprint", type: "string" },
        { name: "InputValue.Comment", type: "string" },
        { name: "InputValue.CheckDate", type: "string" }
      ]
    };
  },
  methods: {
    onCellBeginEdit: function (event) {
      let args = event.args;
      let columnDataField = args.datafield;
      let rowIndex = args.rowindex;
      let cellValue = args.value;
    },
    onCellEndEdit: function (event) {
      let args = event.args;
      let columnDataField = args.datafield;
      let rowIndex = args.rowindex;
      let cellValue = args.value;
      let oldValue = args.oldvalue;
    },
    csvBtnOnClick: function () {
      this.$refs.keypairgrid.exportdata("csv", "EC2_Access_Key" + new Date());
    }
  }
};
</script>

<style></style>
