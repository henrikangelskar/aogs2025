<template>
  <div
    style="
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      background: #2501ec;
    "
    class="d-flex justify-center align-center"
  >
    <div class="loader1"></div>
  </div>
</template>
<style scoped>
/* HTML: <div class="loader"></div> */
.loader1 {
  height: 87px;
  aspect-ratio: 5;
  --c: #ffffff 90deg, #0000 0;
  background: conic-gradient(from 135deg at top, var(--c)),
    conic-gradient(from -45deg at bottom, var(--c)) 12.5% 100%;
  background-size: 20% 50%;
  background-repeat: repeat-x;
  animation: l1 0.8s infinite linear;
}
@keyframes l1 {
  to {
    background-position: 25% 0, 37.5% 100%;
  }
}
</style>
