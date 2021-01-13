<template>
  <form class="p-10" @submit.prevent="onSubmit">
    <span class="price bold">{{price}} zł</span>
    <div class="rating">
      <template v-for="(n, index) in maxRating">
        <i class="material-icons" :key="index">
          {{ rating >= n ? 'star' : (rating > n - 1) ? 'star_half' : 'star_border' }}
        </i>
      </template>
      <span class="rating-value bold">{{rating}}</span>
    </div>
    <hr class="w-100">
    <span>Dates</span>
    <DatePicker :disabled-dates="disabledDates" @selectedDates="d => selectedDates = d"/>
    <input class="w-100 sample-field mt-10" v-model="formField"/>
    <button :disabled="applyButtonDisabled" class="w-100 mt-10 p-10" type="submit">Apply</button>
  </form>
</template>
<script>
import DatePicker from './DatePicker.vue'

export default {
  name: 'FormComponent',
  components: {
    DatePicker
  },
  props: {
    disabledDates: {
      type: Array,
      default: () => []
    },
    minDate: {
      type: Date,
      default: () => new Date()
    },
    price: {
      type: String,
      default: '--'
    },
    rating: {
      type: Number,
      default: 4.5
    },
    maxRating: {
      type: Number,
      default: 5
    },
    field: {
      type: String,
      defautl: () => ''
    }
  },
  data () {
    return {
      selectedDates: null,
    }
  },
  methods: {
    onSubmit() {
      this.$emit('apply', this.selectedDates, this.formField)
    },
  },
  computed: {
    formField:{
      get() { 
        return this.field 
      },
      set(val) { 
        this.$emit('update:field', val)
      }
    },
    applyButtonDisabled() {
      return !this.formField|| !this.selectedDates
    },
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 350px;
  border: 1px solid gray;
}
hr {
  margin: 15px 0px;
}
.w-100 {
  width: 100%;
} 
.mt-10 {
  margin-top: 10px;
}
.p-10 {
  padding: 10px;
}
.price{
  font-size: 20px;
}
.rating {
  display: flex;
  align-items: center;
}
.rating-value{
  font-size: 14px;
  margin-left: 5px;
}
.material-icons {
  color: #37a269;
  font-size: 16px;
}
.sample-field{
  border: 1px solid gray;
  height: 34px;
  box-sizing: border-box;
}
.gray {
  color: gray;
}
.bold {
  font-weight: 600;
}
</style>
