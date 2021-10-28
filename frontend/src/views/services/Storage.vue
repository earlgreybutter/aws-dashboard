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
        { text: "BucketName", datafield: "Name", width: 240 },
        { text: "CreationDate", datafield: "CreationDate", width: 240 },
        {
          text: "Comment",
          datafield: "UserInput.$.Comment",
          width: "20%",
          createeditor: (row, cellvalue, editor, cellText, width, height) => {
            let container = document.createElement("input");
            container.className = "Comment";
            container.style.border = "none";
            editor[0].appendChild(container);
            let options = {
              width: width,
              height: height,
              displayMember: "UserInput.$.Comment",
              source: this.getEditorDataAdapter("UserInput.$.Comment")
            };
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
      this.$refs.s3grid.exportdata("csv", "S3" + new Date());
    }
  }
};
</script>

<style></style>
