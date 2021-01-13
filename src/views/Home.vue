<template>
  <div class="home">
    <FormComponent :field.sync="fiedValue" :disabled-dates="disabledDates" :price="'298'"/>
  </div>
</template>

<script>
import FormComponent from '@/components/FormComponent.vue'

export default {
  name: 'Home',
  components: {
    FormComponent
  },
  data() {
    return {
      disabledDates: [
        { 
          from: new Date("2021-01-19"),
          to: new Date("2021-01-22")
        },
        { 
          from: new Date("2021-01-24"),
          to: new Date("2021-01-25")
        },
      ],
      dates: null,
      fiedValue: null
    }
  }
}
</script>
