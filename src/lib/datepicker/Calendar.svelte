<script>
  import { getDateRows, noop } from "./date-time.js";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  // Props
  export let date;
  export let month;
  export let year;
  export let isAllowed;

  // Local vars
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let cells;
  let today = new Date();
  let selectedDate=null;
  // Function helpers
  const onChange = (date) => {
    selectedDate = new Date(year, month, date);
    dispatch("datechange", new Date(year, month, date));
  };

  const allow = (year, month, date) => {
    if (!date) return false; // Hide empty dates
    return isAllowed(new Date(year, month, date));
  };

  $: cells = getDateRows(month, year).map((c) => {
    if (!c) return { value: null, allowed: false, type: "empty" };

    let currentDate = new Date(year, month, c);
    let todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    let type = "future"; // Default future
    if (currentDate < todayDate) type = "past";
    else if (currentDate.getTime() === todayDate.getTime()) type = "today";
    if (selectedDate && currentDate.getTime() === selectedDate.getTime()) type = "selected"; // Mark selected date
  
    return { value: c, allowed: allow(year, month, c), type };
  });
</script>

<div class="calendar-container">
  <div class="calendar-container__body">
    <table class="calendar-table">
      <thead class="calendar-table__header">
        <tr class="calendar-table__row">
          {#each weekdays as day}
            <th>
              <div class="calendar-table__col">{day}</div>
            </th>
          {/each}
        </tr>
      </thead>

      <tbody class="calendar-table__body">
        {#each Array(6) as _, rowIndex}
          <tr class="calendar-table__row">
            {#each cells.slice(rowIndex * 7, (rowIndex + 1) * 7) as { allowed, value, type }, i (value || `${rowIndex}-${i}`)}
              <td
                class="calendar-table__col {type === 'past'
                  ? 'calendar-table__inactive'
                  : ''} {type === 'today' && !selectedDate ? 'calendar-table__active' : ''} {type === 'selected' ? 'calendar-table__active' : ''}"
              >
                {#if value}
                  <button
                    class="calendar-table__item"
                    on:click={allowed ? () => onChange(value) : noop}
                    class:disabled={!allowed}
                  >
                    {value}
                  </button>
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  /* .calendar-table__col {
        text-align: center;
        padding: 16px;
    } */

  .calendar-table__inactive {
    color: grey;
  }

  .calendar-table__active {
    color: white;
    font-weight: bold;
    border-radius: 50%;
  }

  .calendar-table__item {
    border: none;
    padding: 8px;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .calendar-table__item:disabled {
    color: grey;
    pointer-events: none;
  }
  @media (max-width: 1200px) {
    .calendar-table__item {
      width: 35px;
      height: 35px;
      font-size: 12px;
    }
  }
  @media (max-width: 370px) {
    .calendar-table__item {
      width: 30px;
      height: 30px;
    }
  }
</style>
