<template>
  <div class="loader">
    <img src="/media/gif/loader.gif" />
    <p>Loading...</p>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  width: 100%;
  min-height: calc(100vh - 70px - 91px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  flex-direction: column;

  img {
    height: 60px;
    aspect-ratio: 1;
  }
}
</style>
