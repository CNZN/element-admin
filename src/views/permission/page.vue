<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
    <input type="text">
    <input type="text"><input type="text"><input type="text">
  </div>
</template>

<script>
import SwitchRoles from './components/SwitchRoles'

export default {
  name: 'PagePermission',
  components: { SwitchRoles },
  methods: {
    handleRolesChange() {
      this.$router.push({ path: '/permission/index?' + +new Date() })
    }
  }
}
</script>
