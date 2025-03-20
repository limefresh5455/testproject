<script>
    import DatePicker from "$lib/datepicker/DatePicker.svelte";
    import {
        menuItems,
        privateModalOpen,
        selectedSchedule,
        currentDay,
        generateSlots,
        slots,
        formatAMPM,
    } from "$lib/store/private.store";
    import { fade } from "svelte/transition";
    import InputLabel from "$lib/select/_inputLabel.svelte";
    import { onMount } from "svelte";

    let currentDate = new Date();
    let currentTimeZone = { value: "HST", label: "Hawaii" };

    const onDateChange = (d) => {
        currentDate = d.detail;
        const startTime = new Date("2023-02-20T09:00:00");
        const endTime = new Date("2023-02-20T18:00:00");
        const duration = 30;

        $slots = generateSlots(currentDate, startTime, endTime, 30);
    };

     

        const selectTimeZone = (value, label) => {
            currentTimeZone = { value, label };
        };

    let selectedSlot = undefined;
    let selectedSlotTime = undefined;

    const handleSubmit = () => {};

    const handleSelectSlot = (i,slot) => {
        selectedSlot = i;
        selectedSlotTime = slot

    };

    const confirmSlot = (()=>{
        $selectedSchedule[`day${$currentDay}`] = {slot:selectedSlotTime, date:currentDate, timezone:currentTimeZone.value}
        $privateModalOpen  = false
        // console.log({schedules:$selectedSchedule})
    })

    let currentTab = 0;

    onMount(() => {
        const date = new Date("2023-02-20");
    });

    const closeModal = () => {
    $privateModalOpen = false;
   };
</script>

{#if $privateModalOpen == true}
    <div class="modal { $privateModalOpen ? 'show' : '' } fade" id="selectDate" tabindex="-1" aria-labelledby="selectDateLabel"  >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
           <div class="modal-content">
              <div class="date_modal">
                 <div class="container">
                    <div class="row">
                       <div class="col-md-5 col-lg-4">
                          <div class="heading_cont">
                             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" on:click={closeModal}><i
                                   class="fa-solid fa-chevron-left" ></i>Back</button>
                             <h3>Day #{$currentDay} Yoga Private</h3>
                             <p>1 Private Only • {$selectedSchedule.selectedTeacher?.name}</p>
                             <div class="time">
                                <i class="fa-solid fa-clock"></i>
                                <p>{$selectedSchedule.selectedDuration?.duration} mins</p>
                             </div>
                             <p>Select a slot for In-person session with {$selectedSchedule.selectedTeacher?.name}</p>
                          </div>
                       </div>
                       <div class="col-md-7 col-lg-6">
                          <div class="select_date">
                             <h5>Select a Date & Time</h5>
                             <div class="calendar-container">

                                <DatePicker
                                on:datechange={onDateChange}
                                selected={currentDate}
                                isAllowed={(date) => {
                                    const millisecs =
                                        date.getTime();
                                    if (
                                        millisecs +
                                            25 *
                                                3600 *
                                                1000 <
                                        Date.now()
                                    )
                                        return false;
                                    if (
                                        millisecs >
                                        Date.now() +
                                            3600 *
                                                24 *
                                                45 *
                                                1000
                                    )
                                        return false;
                                    return true;
                                }}
                            />         
                            </div>
                             
                             <h5 class="mb-2">Select Timezone</h5>
                             <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenutimezone" data-bs-toggle="dropdown" aria-expanded="false">
                                {currentTimeZone.label}
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenutimezone">
                                <li>
                                    <button class="dropdown-item"   on:click={() => selectTimeZone("HST", "Hawaii")}>Hawaii</button>
                                </li>
                                <li>
                                    <button class="dropdown-item"  on:click={() => selectTimeZone("IST", "Asia/Calcutta")}>Asia/Calcutta</button>
                                </li>
                                <li>
                                    <button class="dropdown-item"  on:click={() => selectTimeZone("IST", "Asia/Dilli")}>Asia/Dilli</button>
                                </li>
                                <li>
                                    <button class="dropdown-item"  on:click={() => selectTimeZone("IST", "Asia/Jaypura")}>Asia/Jaypura</button>
                                </li>
                            </ul>      
                          </div>
                       </div>

                       {#if currentDate && $slots.length > 0}
                         <div class="col-md-5 col-lg-2 ps-lg-0">
                                    <div class="select_time">
                                        <!-- Display Selected Date -->
                                        <h6>{currentDate.toDateString()}</h6>

                                        <div class="time_list">
                                            {#each $slots as slot, i}
                                                <div class="time_list_item {selectedSlot === i ? 'active' : ''}">
                                                    <!-- Time Box -->
                                                    <div 
                                                        role="button"
                                                        tabindex="0" 
                                                        on:keydown 
                                                        class="time_box" 
                                                        on:click={() => handleSelectSlot(i, slot)}
                                                    >
                                                        <span>{slot}</span>
                                                    </div>

                                                    <!-- Confirm Button -->
                                                    <button
                                                        on:click={() => confirmSlot()}
                                                        class="confirm_btn"
                                                    >
                                                        Confirm
                                                    </button>
                                                </div>
                                            {/each}
                                        </div>
                                    </div>
                                </div>
                            {/if}
                    </div>
                 </div>
              </div>
           </div>
        </div>
    </div>
 {/if}
