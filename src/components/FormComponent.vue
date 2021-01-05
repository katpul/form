<template>
  <form @submit.prevent>
    <div class="rating">
    <template v-for="(n, index) in max">
        <i class="material-icons" :key="index">
          {{ rating >= n ? 'star' : (rating > n - 1) ? 'star_half' : 'star_border' }}
        </i>
    </template>
    <span>{{rating}}</span>
    </div>
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
    chosenDates: {
      type: Object,
      default () {
        return {
          start: null,
          end: null
        }
      }
    },
    rating: {
      type: Number,
      default: 4.5
    },
    price: {
      type: String,
      default: '--'
    }
  },
  data() {
    return {
      masks: {
        input: 'DD-MM-YYYY',
        type: String
      },
      max: 5
    };
  },
  computed: {
    range: {
      get() { return this.chosenDates },
      set(val) { this.$emit('update:dates', val) }
    },
    minDate() { 
      return new Date()
    },
  },
}
</script>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.rating {
  display: flex;
  align-items: center;
}
.material-icons {
  color: #37a269;
  font-size: 16px;
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
