<template>
  <div class="suspension" :style="_styles">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    top: {
      type: String,
      default: '6.98rem'
    },
    right: {
      type: String,
      default: '0rem'
    }
  },
  computed: {
    _styles () {
      return `right: ${this.right};top: ${this.top}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.suspension {
  position: fixed;
  z-index: 100;
}
</style>
