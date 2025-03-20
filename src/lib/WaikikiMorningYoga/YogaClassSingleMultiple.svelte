<script>
  import ActualTime from "$lib/Components/common/ActualTime.svelte";
  import ZoneSelect from "$lib/Components/common/ZoneSelect.svelte";
  import { timezones,globalTimeZone } from "$lib/store/main.store";

  export let isSelectClasses;
  export let handleBackToCalendarClick;
  // export let handleSelectClass;
  export let handleTeacherSelectClass;
  export let filteredData;
  
//   $: if ($globalTimeZone) {
//     console.log("Selected Timezone:", $globalTimeZone);
// }

</script>

<div class="bcxform1" id="selectClasses" class:hidden={!isSelectClasses}>
  {#each filteredData as classData (classData.id)}
  <div class="card card-custom">
    <div class="detail-top-main">
      <div class="detail-top">
        <h5 class="card-title">
          Yoga Class 
          {#if classData.isOnline}<span class="badge badge-custom badge-zoom">ONLINE-ZOOM</span>{/if}
          {#if classData.isOffline}<span class="badge badge-custom badge-inperson">IN-PERSON</span>{/if}
        </h5>
        <p class="mb-1"><ActualTime time={classData.actual_time} display="full-date"/>  @ <ActualTime time={classData.actual_time} display="time-timezone" /></p>
        <div class="dropdown bcx-tgl">
         
          <div class="ZoneSelect-box">
            <ZoneSelect  />
          </div>
          
        </div>
        <div class="bcx-main">
            {#if classData.studio}
            <div class="bcx1">
              <h4>Studio:</h4>
              <span>{classData.studio?.name}</span>
              <p>{classData.studio?.city.city}, {classData.studio?.city.province}, {classData
                      .studio?.city.country}</p>
            </div>
            {:else}
            <div class="bcx1">
              <h4>Studio:</h4>
              <span>Some Amazing Studio</span>
              <p>Bangalore, Karnataka, India</p>
            </div>
            {/if}
          <div class="select_box">
            <div class="bcx1">
              <h4>Teacher:</h4>
              <span>{classData?.teacher?.label}</span>
              <p>Level {classData.teacher?.level}</p>
            </div>
            <div class="flx-btn">
          
            <button
             class="btn-bcx2 "  
             on:click={handleBackToCalendarClick}>Cancel</button
            >
            <button
              href="#"
              class="select_btn"
              id="toselectedClass1"
              on:click={() => handleTeacherSelectClass(classData.id)}>Select</button
            >
          </div>
        </div>
        </div>
      </div>
      <div class="img-user">
        <img src="/assets/img/user.png" alt="Profile" class="img-fluid" />
        <h4>
          Masumi Muramatsu ますみ<br />
          Tokyo, Japan & Honolulu, Hawaii<br />
          Yoga Awareness YAT 600 certified teacher<br />
          Yoga Alliance RYT500, E-RYT 200, YACEP registered
        </h4>
      </div>
    </div>
  </div>
  {/each}
</div>

<style>
  .hidden {
    display: none;
  }
</style> 

 