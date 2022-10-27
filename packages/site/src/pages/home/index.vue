<script setup lang="ts">
import { ElMessage, ElNotification } from 'element-plus'
import { JSON_TSC } from 'json-tsc'
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
    copy(decodeURIComponent(outputCode.value))
    ElMessage({
      message: 'Copied Success!',
      type: 'success',
    })
  }
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
            <span>Begins with the letter O:</span>
            <el-switch v-model="configModel.prependWithO" style="--el-switch-on-color: #38E54D" />
          </div>
          <div flex justify-between items-center>
            <span>Sort by letter:</span>
            <el-switch v-model="configModel.sortAlphabetically" style="--el-switch-on-color: #38E54D" />
          </div>
          <div flex justify-between items-center>
            <span>Add export staement:</span>
            <el-switch v-model="configModel.prependExport" style="--el-switch-on-color: #38E54D" />
          </div>
          <div flex justify-between items-center>
            <span>Use Array notaion:</span>
            <el-switch v-model="configModel.useArrayGeneric" style="--el-switch-on-color: #38E54D" />
          </div>
          <div flex justify-between items-center>
            <span>Use optional fields:</span>
            <el-switch v-model="configModel.optionalFields" style="--el-switch-on-color: #38E54D" />
          </div>
        </div>
        <el-divider />
        <div space-y-3>
          <el-input v-model="configModel.prefix" placeholder="Please input the interface prefix" />
          <el-input v-model="configModel.rootObjectName" placeholder="Please input the root object name" />
          <button class="grident-btn" @click="handleTransform">
            Transform
          </button>
          <button class="grident-btn" @click="handleCopy">
            {{ copied ? 'Copied' : 'Copy Result' }}
          </button>
        </div>
      </el-card>
    </div>
    <div flex-1 space-y-4 flex flex-col m-b-20px>
      <div h-90>
        <el-input v-model="inputCode" type="textarea" placeholder="Please input the json" />
      </div>
      <div flex-1>
        <el-input v-model="outputCode" type="textarea" placeholder="Show the transformed code" />
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
</style>
