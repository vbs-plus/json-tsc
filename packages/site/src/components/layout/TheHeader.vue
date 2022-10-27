<template>
  <header h-16 flex justify-between items-center px-8>
    <div flex justify-start items-center gap-4>
      <div w-8 h-8 class="icon-btn" i-logos:google-cloud />
      <h1 class="text-gradent">
        JSON-TSC
      </h1>
    </div>
    <a
      class="icon-btn"
      text-lg
      i-carbon-logo-github
      rel="noreferrer"
      href="https://github.com/251205668/vitest-vue-starter"
      target="_blank"
      title="GitHub"
    />
  </header>
</template>

<style scoped>
.text-gradent {
  font-weight: 800;
  background: #FF0000;
  background: linear-gradient(to left, #FF0000 0%, #000000 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}
</style>
