<template>
  <div class="home">
    <FormComponent :field.sync="fiedValue" :chosen-dates.sync="dates" :disabled-dates="disabledDates" :price="'298'"/>
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
          start: new Date(2021, 0, 21),
          end: new Date(2021, 0, 24)
        },
        {
          start: new Date(2021, 0, 26),
          end: new Date(2021, 0, 27)
        },
      ],
      dates: null,
      fiedValue: null
    }
  }
}
</script>
