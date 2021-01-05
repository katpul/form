<template>
  <form @submit.prevent>
    <span>Dates</span>
      <DatePicker
        v-model="range"
        is-range
        color="green"
        :masks="masks"
        :min-date="minDate"
        :disabled-dates="disabledDates">
        <template v-slot="{ inputValue, inputEvents, isDragging }">
        <div class="input-wrapper">
          <div>
            <input
              :class="isDragging ? 'gray' : 'gray bold'"
              :value="inputValue.start ? inputValue.start : 'Check in'"
              v-on="inputEvents.start"/>
          </div>
          <span>
            &#8594;
          </span>
          <div>
            <input
              :class="isDragging ? 'gray' : 'gray bold'"
              :value="inputValue.end ? inputValue.end : 'Check out'"
              v-on="inputEvents.end"/>
          </div>
        </div>
      </template>
    </DatePicker>
  </form>
</template>
<script>

import DatePicker from 'v-calendar/lib/components/date-picker.umd'

export default {
  components: {
    DatePicker
  },
  props:{
    disabledDates: {
      type: Array,
      default: () => []
    },
    dates: {
      type: Object,
      default: () => {}
    },
    rating: {
      type: Number,
      default: 0
    },
    price: {
      type: String,
      default: '--'
    }
  },
  data() {
    return {
      range: {
        start: null,
        end: null
      },
      masks: {
        input: 'DD-MM-YYYY',
        type: String
      },
    };
  },
  computed: {
    minDate(){
      return new Date()
    }
  },
}
</script>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.input-wrapper {
  display: flex;
}
.gray {
  color: gray;
}
.bold {
  font-weight: 600;
}
</style>
