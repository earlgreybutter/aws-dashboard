<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'Services' }">Services</router-link> | <router-link :to="{ name: 'Network ACL' }">Policies</router-link> |
      <router-link :to="{ name: 'Event' }">Event</router-link> | <router-link :to="{ name: 'Compliances' }">Compliances</router-link> |
      <router-link :to="{ name: 'Iam' }">IAM</router-link> |
      <router-link :to="{ name: 'Admin' }">Admin</router-link>
    </div>

    <div>
      <p>Security Group</p>
      <select v-model="sgSelected">
        <option disabled value="">Select Time Interval</option>
        <option v-for="option in options" :value="option.value" :key="option.value">
          {{ option.text }}
        </option>
      </select>
      <button :disabled="!sgSelected" type="submit" @click="changeSgInterval(sgSelected)">Submit</button>
    </div>

    <div>
      <p>EC2 Instance</p>
      <select v-model="instanceSelected">
        <option disabled value="">Select Time Interval</option>
        <option v-for="option in options" :value="option.value" :key="option.value">
          {{ option.text }}
        </option>
      </select>
      <button :disabled="!instanceSelected" type="submit" @click="changeIntancesInterval(instanceSelected)">Submit</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      sgSelected: "",
      instanceSelected: "",
      options: [
        { text: "5 m", value: 5 },
        { text: "15 m", value: 15 },
        { text: "30 m", value: 30 },
        { text: "60 m", value: 60 },
      ],
    };
  },
  methods: {
    changeSgInterval(sgSelected) {
      axios
        .post("http://localhost:5000/admin/taskOne", { interval: sgSelected })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    changeIntancesInterval(instanceSelected) {
      axios
        .post("http://localhost:5000/admin/taskTwo", { interval: instanceSelected })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
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
</style>
