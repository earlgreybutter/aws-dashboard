<template>
  <div style="margin-top: 20px">
    <h1>Storge</h1>
    <div style="float: left; margin-left: 10px">
      <JqxButton @click="csvBtnOnClick()">Export to CSV</JqxButton>
    </div>
    <JqxGrid
      ref="s3grid"
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
        { text: "BucketName", datafield: "Name", editable: false, width: 240 },
        { text: "CreationDate", datafield: "CreationDate", editable: false, width: 240 },
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

            fetch("http://localhost:5000/data/userinputs3", {
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
      url: "http://localhost:5000/data/s3",
      datatype: "json",
      datafields: [
        { name: "Name", type: "string" },
        { name: "CreationDate", type: "string" },
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
      this.$refs.s3grid.exportdata("csv", "S3" + new Date());
    }
  }
};
</script>

<style></style>
