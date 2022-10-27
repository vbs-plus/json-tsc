<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { JSON_TSC } from 'json-tsc'
import { example1, example2 } from '../../constants'

const inputCode = ref('')
const outputCode = ref('')
const configModel = reactive({
  prependWithO: true,
  sortAlphabetically: false,
  prependExport: true,
  useArrayGeneric: false,
  optionalFields: false,
  prefix: '',
  rootObjectName: 'RootObject',
})

const { t } = useI18n()

const handleTransform = () => {
  if (!inputCode.value) {
    ElNotification({
      title: 'Warning',
      message: 'The json field is required !',
      type: 'warning',
    })
    return
  }
  const json_tsc = new JSON_TSC(unref(configModel))

  try {
    const json = JSON.parse(inputCode.value)
    outputCode.value = json_tsc.transform(json)
  } catch (e: any) {
    ElNotification({
      title: 'Error',
      message: e.message,
      type: 'error',
    })
  }
}

const { copy, copied } = useClipboard({ source: decodeURIComponent(outputCode.value) })

const handleCopy = () => {
  if (outputCode.value) {
    try {
      copy(decodeURIComponent(outputCode.value))
      ElNotification({
        title: 'Success',
        message: 'Copied to clipboard Successfully!',
        type: 'success',
      })
    } catch (e:any) {
      ElNotification({
        title: 'Copy Error',
        message: e.message,
        type: 'error',
      })
    }
  }
}

const handleImport = (type: string) => {
  const json_tsc = new JSON_TSC(unref(configModel))
  try {
    inputCode.value = JSON.stringify(type === 'example1' ? example1 : example2)
    const json = JSON.parse(JSON.stringify(type === 'example1' ? example1 : example2))
    outputCode.value = json_tsc.transform(json)
  } catch (e: any) {
    ElNotification({
      title: 'Error',
      message: e.message,
      type: 'error',
    })
  }
}

const handleReset = () => {
  inputCode.value = ''
  outputCode.value = ''
  configModel.optionalFields = false
  configModel.prependExport = true
  configModel.prependWithO = true
  configModel.sortAlphabetically = false
  configModel.useArrayGeneric = false
  configModel.prefix = ''
  configModel.rootObjectName = 'RootObject'
}
</script>

<template>
  <div flex flex-wrap w-full h-full>
    <div m-r-20px m-b-20px w-80>
      <el-card h-full class="card-style">
        <template #header>
          <div class="card-header">
            <span>{{ t('config.title') }}</span>
          </div>
        </template>
        <div space-y-3>
          <div flex justify-between items-center>
            <span>{{ t('config.prependWithO') }}</span>
            <el-switch v-model="configModel.prependWithO" style="--el-switch-on-color: #38E54D" />
          </div>
          <div flex justify-between items-center>
            <span>{{ t('config.sortAlphabetically') }}</span>
            <el-switch v-model="configModel.sortAlphabetically" style="--el-switch-on-color: #38E54D" />
          </div>
          <div flex justify-between items-center>
            <span>{{ t('config.prependExport') }}</span>
            <el-switch v-model="configModel.prependExport" style="--el-switch-on-color: #38E54D" />
          </div>
          <div flex justify-between items-center>
            <span>{{ t('config.useArrayGeneric') }}</span>
            <el-switch v-model="configModel.useArrayGeneric" style="--el-switch-on-color: #38E54D" />
          </div>
          <div flex justify-between items-center>
            <span>{{ t('config.optionalFields') }}</span>
            <el-switch v-model="configModel.optionalFields" style="--el-switch-on-color: #38E54D" />
          </div>
        </div>
        <el-divider />
        <div space-y-3>
          <el-input v-model="configModel.prefix" :placeholder="t('config.prefix')" />
          <el-input v-model="configModel.rootObjectName" :placeholder="t('config.rootObjectName')" />
          <button class="grident-btn" @click="handleTransform">
            {{ t('btn.transform') }}
          </button>
          <button class="grident-btn" @click="handleCopy">
            {{ copied ? t('btn.copied') : t('btn.copy') }}
          </button>
          <button class="grident-btn" @click="handleReset">
            {{ t('btn.reset') }}
          </button>
        </div>
        <el-divider />
        <div flex justify="between" flex-wrap>
          <el-button link @click="handleImport('example1')">
            {{ t('btn.import_first') }}
          </el-button>
          <el-button link style="margin-left: 0" @click="handleImport('example2')">
            {{ t('btn.import_second') }}
          </el-button>
        </div>
      </el-card>
    </div>
    <div flex-1 space-y-4 flex flex-col m-b-20px>
      <div h-90>
        <el-input v-model="inputCode" type="textarea" :placeholder="t('textarea.inputCode')" />
      </div>
      <div flex-1>
        <el-input v-model="outputCode" type="textarea" :placeholder="t('textarea.outputCode')" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-style {
  color: rgba(255, 255, 255, 1);
  background: transparent;
  border-width: 1px;
  border-style: solid;
  --un-border-opacity: 1;
  border-color: rgba(233, 236, 239, var(--un-border-opacity));
}

.grident-btn {
  color: #fff;
  background: -webkit-gradient(linear, left top, right top, from(#029ddf), color-stop(#68efaf), color-stop(#ff01d9), color-stop(#6702ff), to(#029ddf));
  background: linear-gradient(to right, #029ddf, #68efaf, #ff01d9, #6702ff, #029ddf);
  background-size: 400%;
  width: 100%;
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 4px;
  font-family: "DINPro-Regular";
  cursor: pointer;
}

@-webkit-keyframes kvAnimate {
  0% {
    background-position: 0%;
  }

  100% {
    background-position: -400%;
  }
}

@keyframes kvAnimate {
  0% {
    background-position: 0%;
  }

  100% {
    background-position: -400%;
  }
}

.grident-btn:hover {
  animation: kvAnimate 8s linear Infinite;
  color: #fff;
  -webkit-filter: drop-shadow(0 0 5px #ffffff);
  filter: drop-shadow(0 0 5px #ffffff);
}

:deep(.el-input__wrapper) {
  background-color: transparent;
}

:deep(.el-textarea__inner) {
  background-color: transparent;
  height: 100%;
}

:deep(.el-input) {
  --el-input-hover-border: rgba(255, 255, 255, 1);
  --el-input-text-color: rgba(255, 255, 255, 1);
  --el-input-focus-border-color: rgba(255, 255, 255, 1);
  --el-input-placeholder-color: #EDEDED;
}

:deep(.el-textarea) {
  --el-input-hover-border: rgba(255, 255, 255, 1);
  --el-input-text-color: rgba(255, 255, 255, 1);
  --el-input-focus-border-color: rgba(255, 255, 255, 1);
  --el-input-placeholder-color: #EDEDED;
  height: 100%;
}
:deep(.el-button.is-link) {
  color: #68efaf;
}
</style>
