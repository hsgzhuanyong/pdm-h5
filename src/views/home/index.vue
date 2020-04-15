<template>
  <div>
    <ul>
      <li class="list" v-for="(item, index) in pageData" :key="index">{{ item.id }}</li>
    </ul>
  </div>
</template>

<script>
import * as demo from '@/api/demo';
export default {
  data () {
    return {
      pageData: []
    };
  },
  created () {
    this.getData();
  },
  methods: {
    getData () {
      demo.list({ id: 2 }).then(({ data }) => {
        this.pageData = data.list;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .list {
    text-align: center;
    font-size: .5rem;
    line-height: 2;
  }
</style>
