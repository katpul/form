<template>
  <div @dblclick="hide()">
    <div class="input-wrapper">
    <input class="input-date" v-model="from" @focus="show()" @mouseover="show()"/>
      <span class="arrow">
        &#8594;
      </span>
    <input class="input-date" v-model="to" @focus="show()" @mouseover="show()"/> 
    </div>
    <div class="calendar" v-if="openCalendar">
      <div class="header">
        <div class="center">
          <div class="left arrow" @click="changeMonth(-1)">&lt;</div>
          <div class="right arrow" @click="changeMonth(1)">&gt;</div>
          <div class="month">{{ curMonth | formatMonth }} {{ curYear }}</div>
        </div>
      </div>
      <table>
        <thead>
          <tr class="week">
            <td v-for="(day, index) in calendarDays" :key="index">{{day}}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="index">
            <td class="day"
              v-for="(date ,i) in row" :key="i" 
              :class="{
              'today': date.day.getDate() == currentDay.getDate() && date.day.getMonth() == currentDay.getMonth() && date.day.getFullYear() == currentDay.getFullYear(),
              'other-month': date.day.getMonth() !== curMonth,
              'selected': date.day.valueOf() > startDate.valueOf() && date.day.valueOf() < endDate.valueOf(),
              'hover-days': date.day.valueOf() >= startDate.valueOf() && date.day.valueOf() <= hoverEndDate.valueOf(),
              'first-selected': date.day.valueOf() == startDate.valueOf(),
              'last-selected': date.day.valueOf() == endDate.valueOf(),
              'disabled': date.disabled === true,
              }" 
              @click="selectDates(date)" @mouseenter="hoverOverDate(date.day)" @mouseout="noHover()">{{ date.day.getDate() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'DatePicker',
  props: {
    currentDay: {
      type: Date,
      default: () => new Date()
    },
    minDate:{
      type: Date
    },
    disabledDates: {
      type: Array
    }
  },
  data() {
    return {
      openCalendar: false,
      startDate: new Date(),
      selectEndDate: false,
      endDate: new Date(),
      hoverEndDate: new Date(),
      curYear: new Date().getFullYear(),
      curMonth: new Date().getMonth(),
      calendarDays: ['Sun','Mon','Tue','Wen','Thu','Fri','Sat']
    }
  },
  created() {
    this.updateDate();
  },
  computed: {
    leapYear() {
      if (this.curYear % 100 === 0) {
        return this.curYear % 400 === 0
      } else {
        return this.curYear % 4 === 0
      }
    },
    dates() {
      let visibleDays = []
      let firstDayOfMonth = new Date(this.curYear, this.curMonth, 1)
      let lastDayOfMonth = new Date(this.curYear, this.curMonth, this.getLastDayOfMonth(this.curMonth))
      visibleDays.unshift(firstDayOfMonth)
      for (let d = this.previousDates(firstDayOfMonth); d.getDay() !== 6; d = this.previousDates(d)) {
        visibleDays.unshift(d)
      }
      for (let d = this.nextDates(firstDayOfMonth); d <= lastDayOfMonth; d = this.nextDates(d)) {
        visibleDays.push(d)
      }
      for (let d = this.nextDates(lastDayOfMonth); d.getDay() !== 0; d = this.nextDates(d)) {
        visibleDays.push(d)
      }
      
      let getAllDaysArray = function(start, end) {
        for(let date = new Date(start); date <= end; date.setDate(date.getDate()+1)){
            allDisabledDates.push(new Date(date))
        }
      };

      let allDisabledDates = []
      if(this.disabledDates){
      this.disabledDates.forEach(x => {getAllDaysArray(x.from, x.to)})
      }

      let oldDays = []
      if(this.minDate) {
      oldDays = visibleDays.filter(x => x.getTime() < this.minDate.getTime())
      }

      let disabled = [...allDisabledDates, ...oldDays]
      let allDays = visibleDays.map(x => ({day: x, disabled: disabled.find(element => moment(element).format('DD MM YY') === moment(x).format('DD MM YY')) ? true : false}))

      return allDays
    },
    rows() {
      return this.dates.reduce(function(p, c, i) {
        if (i % 7 === 0) {
          p[p.length] = []
        }
        p[p.length - 1].push(c)
        return p
      }, [])
    }
  },
  methods: {
    hide(){
      this.openCalendar = false
    },
    updateDate(){
      if (!this.endDate) {
        this.selectEndDate = true
      }
      if(this.startDate.valueOf() && this.endDate.valueOf() == new Date().valueOf()) {
        this.from = 'Check in';
        this.to = 'Check out';
      }
      else {
        this.from = moment(this.startDate).format("DD MM YYYY");
        this.to = moment(this.endDate).format("DD MM YYYY");
      }
    },
    changeMonth(n) {
      let index = this.curMonth + n
      if (index < 0) {
        this.curYear -= 1
      } 
      else if (index >= 12) {
        this.curYear += 1
      }
      this.curMonth = ((index) + 12) % 12
    },
    nextDates(d) {
      let ret = new Date(d.valueOf())
      ret.setDate(d.getDate() + 1)
      return ret
    },
    previousDates(d) {
      let lastDays = new Date(d.valueOf())
      lastDays.setDate(d.getDate() - 1)
      return lastDays
    },
    getLastDayOfMonth(m) {
      let lastDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      if (this.leapYear) {
        lastDays[1] = 29
      }
      return lastDays[m]
    },
    selectDates(date) {
      let day = date.day
      let disabled = date.disabled
      if(disabled === false) {
        if (!this.selectEndDate || day.valueOf() < this.startDate.valueOf()) {
          this.endDate = day
          this.startDate = day
          this.curMonth = day.getMonth()
          this.curYear = day.getFullYear()
          this.selectEndDate = true
          this.hoverEndDate = day
        } else if (this.selectEndDate && day.valueOf() >= this.startDate.valueOf()){
          this.endDate = day
          this.curMonth = day.getMonth()
          this.curYear = day.getFullYear()
          this.selectEndDate = false
          this.openCalendar = false
        }
        this.updateDate()
        this.$emit('selectedDates', { from: this.startDate, to: this.endDate })
      }
    },
    hoverOverDate(d) {
      if (this.selectEndDate && d.valueOf() >= this.startDate.valueOf()){
        this.hoverEndDate = d
      }
    },
    noHover() {
      this.hoverEndDate = this.startDate
    },
    show() {
      this.openCalendar = true;
    },
  },
  filters: {
    formatMonth(m) {
      return [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ][m]
    }
  }
}
</script>

<style scoped>
body {
  font-family: Arial;
}
.input-wrapper {
  display: flex;
  border: 1px solid gray;
  padding: 5px
}
.arrow {
  margin: 0px 10px;
}
.input-date {
  min-width: 140px;
  border: none;
  width: 100%;
}
.input-date:focus{
  outline: none;
  background: #66b588;
  color: white;
}
.today {
  box-shadow: 0 0 0 1px #83c5a2;
}
td.min-date {
  background: #ddd !important;
  color: gray;
  cursor: not-allowed;
}
td.disabled{
  background: #ddd !important;
  color: gray;
  cursor: not-allowed;
}
.min-date:hover{
  background: #ddd;
}
.first-selected, .last-selected {
  background: #37a269 !important;
  box-shadow: none;
}
.hover-days {
  background: #83c5a2;
  box-shadow: none;
}
.other-month {
  color: gray;
}
.arrow {
  cursor: pointer;
  width: 1.5em;
}
.arrow:hover {
  color: steelblue;
  font-weight: 400;
}
.year, .month {
  height: 1.2em;
}
.left {
  float: left;
}
.right {
  float: right;
}
.center {
  text-align: center;
  clear: both;
}
table {
  clear: both;
}
table .week td {
  color: gray;
  font-size: 12px;
}
table td {
  width: 2em;
  height: 2em;
  vertical-align: middle;
  text-align: center;
}
tbody td {
  cursor: pointer;
  border-radius: 0;
}
tbody td.selected {
  background: #83c5a2;
  box-shadow: none;
}
tbody td.selected:hover {
  background: gray;
}
tbody td.hover {
  background: steelblue;
}
tbody td:hover {
  background-color: #37a269; 
}
.calendar {
  background-color: #ffffff;
  border-radius: 5px;
  margin-top: 5px;
  position: absolute;
  border: 1px solid gray;
  left: 65px;
}
.calendar .header {
  background: #84c5a1;
  padding: 10px 5px;
}
</style>