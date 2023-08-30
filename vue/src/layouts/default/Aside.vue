<template>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        @click="rail = false" 
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
          nav
        >
          <!-- <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = false"
            ></v-btn>
          </template> -->
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <template v-for="menu in menus" :key="menu.name">
            <v-list-item v-if="!menu.children && menu.show" 
                        :prepend-icon="menu.icon" 
                        :title="menu.label" 
                        :value="menu.name"
                        :to="{name: menu.name}"
            />
            
            <v-list-group v-if="menu.children && menu.show" :value="menu.name">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                :prepend-icon="menu.icon"
                :title="menu.label"
              />
            </template>

            <template 
              v-for="child in menu.children"
              :key="child.name"
            >
              <v-list-item
                v-if="!child.children && child.show"
                :title="child.label"
                :prepend-icon="child.icon"
                :value="child.name"
                :to="{name : child.name}"
              />

              <v-list-group v-if="child.children && child.show" :value="child.name">
                <template v-slot:activator="{ props }">
                  <v-list-item
                    v-bind="props"
                    :title="child.label"
                  ></v-list-item>
                </template>

                <v-list-item
                  v-for="grand in child.children"
                  :key="grand.name"
                  :title="grand.label"
                  :value="grand.name"
                  :prepend-icon="grand.icon"
                  :to="{name : grand.name}"
                ></v-list-item>
              </v-list-group>
            </template>

          </v-list-group>
          
          </template>
        </v-list>

        <template v-slot:append>
          <v-list density="compact" nav>
            <v-list-item 
                        title="Logout" 
                        prepend-icon="mdi-logout"
                        @click-once="Logout"
            />
          </v-list>
        </template>

      </v-navigation-drawer>
  </template>

<script lang="ts" setup>
    import { inject } from 'vue'
    import { useAuthStore } from '@/store/auth';
    import menus from '@/utils/menus'
    import { useRouter } from 'vue-router'
    
    const auth = useAuthStore()
    const router = useRouter()
    const rail = inject('rail')
    const drawer = inject('drawer')

    async function Logout() {
      await auth.logout()
      router.push({ name: 'Login' })
    }
</script>
