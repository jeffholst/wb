<template>
  <div>
    <span>{{displayHours}}:{{displayMinutes}}:{{displaySeconds}}</span>
    <span v-if="showMilliseconds">:{{displayMilliseconds}}</span>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue'
export default defineComponent({
  name: 'Timer',
  props: {
    hours: {
      type: Number,
      required: true
    },
    minutes: {
      type: Number,
      required: true
    },
    seconds: {
      type: Number,
      required: true
    }
  },
  setup: (props) => {
    let handler: number
    const showMilliseconds = ref(false)
    const displayHours = ref('')
    const displayMinutes = ref('')
    const displaySeconds = ref('')
    const displayMilliseconds = ref('000')
    const target: Date = new Date()             // used for count "down" timer
    const startMillisconds: number = Date.now() // used for count "up" timer

    const display2Digits = (val: number): string => {
      return val.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
    }

    const timer = () => {
      // This is the regular timer that counts "up"
      showMilliseconds.value = true
      const elapsedTime = Date.now() - startMillisconds
      const milliseconds = elapsedTime / 1000 % 1
      displayMilliseconds.value = milliseconds.toFixed(3).substring(2)
      const seconds = Math.floor((elapsedTime / 1000) % 60)
      displaySeconds.value = display2Digits(seconds)
      const minutes = Math.floor((elapsedTime / (1000 *60)) % 60)
      displayMinutes.value = display2Digits(minutes)
      const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
      displayHours.value = display2Digits(hours)
    }

    const countdown = () => {
      // This is the timer that counts "down"
      let time: number = target.getTime()
      target.setTime(time - 1000) // substract 1 second with every tick
      
      displaySeconds.value = display2Digits(target.getSeconds())
      displayMinutes.value = display2Digits(target.getMinutes())
      displayHours.value = display2Digits(target.getHours())

      if (
        target.getHours() === 0 &&
        target.getMinutes() === 0 &&
        target.getSeconds() === 0
      ) { // counter should stop
        clearInterval(handler);
      }
    }

    onMounted(() => {
      displayHours.value = display2Digits(props.hours)
      displayMinutes.value = display2Digits(props.minutes)
      displaySeconds.value = display2Digits(props.seconds)
      if (props.hours === 0 && props.minutes === 0 && props.seconds ===0) {
        handler = setInterval(timer, 1)
      }
      else if (props.hours >= 0 && props.minutes >= 0 && props.seconds >= 0) {
        target.setHours(props.hours)
        target.setMinutes(props.minutes)
        target.setSeconds(props.seconds)
        target.setMilliseconds(0)
        handler = setInterval(countdown, 1000)
      }
      else console.log("Invalid paramaters received")
    })
    return { displayHours,
            displayMinutes,
            displaySeconds,
            displayMilliseconds,
            showMilliseconds
    }
  },
})
</script>
