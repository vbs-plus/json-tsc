<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <header h-16 flex justify-between items-center px-8>
    <div flex justify-start items-center gap-4>
      <div w-8 h-8 class="icon-btn" i-logos:google-cloud />
      <h1 class="text-gradent">
        JSON-TSC
      </h1>
    </div>

    <div flex space-x-4>
      <a
        class="icon-btn mx-2"
        :class="locale === 'en' ? '' : '-rotate-y-180'"
        :title="t('btn.toggle_langs')"
        @click="toggleLocales()"
      >
        <div i-carbon:translate />
      </a>
      <a
        class="icon-btn"
        text-lg
        i-carbon-logo-github
        rel="noreferrer"
        href="https://github.com/vbs-plus/json-tsc"
        target="_blank"
        title="GitHub"
      />
    </div>
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
