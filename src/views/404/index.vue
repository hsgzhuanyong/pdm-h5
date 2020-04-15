<script src="../../../../../huiyuanyundian/activity-cli/src/router/routes.js"></script>
<template>
  <div class="page-404">
    <img src="@img/404/404.png" class="img" />
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.page-404 {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: #f3f3f3;
}

.img {
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  -webkit-transform: translate(0, -64%);
  -moz-transform: translate(0, -64%);
  -ms-transform: translate(0, -64%);
  -o-transform: translate(0, -64%);
  transform: translate(0, -64%);
}
</style>
