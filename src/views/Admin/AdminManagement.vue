<template>
  <div class="AdminManagement">
  <AdminHeader></AdminHeader>
  </div>
</template>


<script>
// @ is an alias to /src
import AdminHeader from '../../components/AdminHeader.vue'
import api from '../../util/api'
export default {
  name: 'AdminManagement',
  components: {
    AdminHeader
  },
  mounted() {
    console.log(api.path)
  }
}
</script>
