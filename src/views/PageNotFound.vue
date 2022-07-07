<template>
  <div class="row" style="margin-right: 0">
    <div class="col-md-3"></div>
    <!-- <div class="col-sm-1"></div> -->
    <div
      class="col-md-6 col-sm-10"
      style="
        margin-left: 12px;
        max-height: 88vh;
        overflow-y: scroll;
        overflow-x: hidden;
        height: 100vh;
      "
    >
      <div style="height: 30px"></div>
      <div class="alert alert-primary">
        server error 404<br />
        你的页面找不到了!
      </div>
      <div style="height: 12px"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>
