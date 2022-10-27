import router from '@/router'
import type { UserModule } from 'type'

export const install: UserModule = app => app.use(router)
