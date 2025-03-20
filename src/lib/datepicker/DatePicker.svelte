<script>
    import { createEventDispatcher, onMount } from "svelte";
    import Calendar from "./Calendar.svelte";
    import { getMonthName } from "./date-time.js";
  
    const dispatch = createEventDispatcher();
  
    // props
    export let isAllowed = () => true;
    export let selected = new Date();
  
    // state
    let date, month, year, showDatePicker;
  
    // so that these change with props
    $: {
      date = selected.getDate();
      month = selected.getMonth();
      year = selected.getFullYear();
    }
  
    // handlers
    const onFocus = () => {
      showDatePicker = true;
    };
  
    const next = () => {
      if (month === 11) {
        month = 0;
        year = year + 1;
        return;
      }
      month = month + 1;
    };
  
    const prev = () => {
      if (month === 0) {
        month = 11;
        year -= 1;
        return;
      }
      month -= 1;
    };
  
    const onDateChange = d => {
      // showDatePicker = false;
      dispatch("datechange", d.detail);
    };

    onMount(()=>{

      showDatePicker = true;
    })
  </script>
  
  <style>

  </style>
  
  <div>
    {#if showDatePicker} 
    <div class="calendar-container__header">
          <div class="calendar-container__title">{getMonthName(month)} {year}</div>
          <div class="left_right_icon">
            
            <button on:click={prev} aria-label="Go to previous month"   class="calendar-container__btn calendar-container__btn--left" title="Previous">
                  <i class="fa-solid fa-chevron-left"></i>
              </button> 
            <button on:click={next} aria-label="Go to next month" class="calendar-container__btn calendar-container__btn--right" title="Next">
                  <i class="fa-solid fa-chevron-right"></i>
             </button>
           </div>
    </div>
        <Calendar
          {month}
          {year}
          date={selected}
          {isAllowed}
          on:datechange={onDateChange} />
    {/if}
  </div>

 