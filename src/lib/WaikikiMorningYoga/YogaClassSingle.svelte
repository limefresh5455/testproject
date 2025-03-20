<script>
  import ActualAmount from "$lib/Components/common/ActualAmount.svelte";
  import ActualTime from "$lib/Components/common/ActualTime.svelte";
  import ZoneSelect from "$lib/Components/common/ZoneSelect.svelte";
  import { CreateNormalInquiry } from "$lib/Service";

  export let isYogaFormVisible;
  export let handleBackToCalendarClick;
  export let handleSignUpInquiryData;
  export let scheduleTeacher;
  export let localCurrency;

  const makeInquiry = async () => {
    try {
      const inquiry = {};
      inquiry.sourceItem = scheduleTeacher.id;
      inquiry.sourceItemName = `Class by ${scheduleTeacher.teacher.label}`;
      inquiry.kind = `ClassSchedule`;
      inquiry.currency = scheduleTeacher.currency;
      inquiry.meta = scheduleTeacher;
      inquiry.items = [];
      inquiry.inquiryType = `yoga`;
      inquiry.items = [
        {
          kind: "ClassSchedule",
          reference: scheduleTeacher.id,
          reference_name: `Class by ${scheduleTeacher.teacher.label}`,
          unit_cost: scheduleTeacher.pricing.nonya,
          ya_cost: scheduleTeacher.pricing.ya,
          net_cost: scheduleTeacher.pricing.nonya,
        },
      ];
      const res = await CreateNormalInquiry(inquiry);
      if (res.status === 200 || res.status === 201 || res.data.id) {
        handleSignUpInquiryData(res.data);
      }
    } catch (error) {
      console.log("Error During Make Inquiry", error);
    }
  };
</script>

<div class="bcxform1" id="formbcxmain1" class:hidden={!isYogaFormVisible}>
  <div class="card card-custom">
    <div class="detail-top-main">
      <div class="detail-top">
        <h5 class="card-title">
          Yoga Class
          {#if scheduleTeacher.isOnline}<span
              class="badge badge-custom badge-zoom">ONLINE-ZOOM</span
            >{/if}
          {#if scheduleTeacher.isOffline}
            <span class="badge badge-custom badge-inperson">IN-PERSON</span
            >{/if}
        </h5>
        <p class="mb-1">
          <ActualTime time={scheduleTeacher.actual_time} display="full-date" /> @
          <ActualTime
            time={scheduleTeacher.actual_time}
            display="time-timezone"
          />
        </p>
        <div class="dropdown bcx-tgl">
          <div class="ZoneSelect-box">
            <ZoneSelect />
          </div>
        </div>
        <div class="bcx-main">
          {#if scheduleTeacher.studio}
            <div class="bcx1">
              <h4>Studio:</h4>
              <span>{scheduleTeacher.studio?.name}</span>
              <p>
                {scheduleTeacher.studio?.city.city}, {scheduleTeacher.studio
                  ?.city.province}, {scheduleTeacher.studio?.city.country}
              </p>
            </div>
          {:else}
            <div class="bcx1">
              <h4>Studio:</h4>
              <span>Some Amazing Studio</span>
              <p>Bangalore, Karnataka, India</p>
            </div>
          {/if}
          <div class="bcx1">
            <h4>Teacher:</h4>
            <span>{scheduleTeacher.teacher?.label}</span>
            <p>Level {scheduleTeacher.teacher?.level}</p>
          </div>
          <div class="bcx1">
            {#if scheduleTeacher?.pricing && scheduleTeacher?.currency}
              <h4>Drop in Price</h4>
              <ActualAmount
                type="lg"
                currency={scheduleTeacher.currency}
                amount={scheduleTeacher.pricing?.nonya}
                currencies={localCurrency}
                ><span>{scheduleTeacher.pricing?.ya}</span></ActualAmount
              >
              <p>Level {scheduleTeacher.teacher?.level}</p>
            {/if}
          </div>
          <div class="bcx1">
            <h4>Yoga Class Pass:</h4>
            <ActualAmount
              type="lg"
              currency={scheduleTeacher.currency}
              amount={scheduleTeacher.pricing?.ya}
              currencies={localCurrency}
            >
              <span>{scheduleTeacher.pricing?.ya}</span></ActualAmount
            >
          </div>
        </div>
        {#if scheduleTeacher.isCancelled == true || (!scheduleTeacher.isCancelled && new Date(scheduleTeacher.limits?.actualExpiry) < new Date() && scheduleTeacher.students?.length < scheduleTeacher.limits?.minStudents)}
          <div class="cancelled-class">This Zoom Class has been Cancelled.</div>
        {:else if scheduleTeacher.isCancelled || new Date(scheduleTeacher.limits?.actualExpiry) < new Date() || scheduleTeacher.students?.length >= scheduleTeacher.limits?.maxStudents}
          <div class="closed-registration">
            Registration is Closed for this Class.
          </div>
        {:else}
          <div class="alertbxc">
            Registration will be closed on

            <ActualTime
              time={scheduleTeacher.limits?.actualExpiry}
              display="full-date"
            ></ActualTime>
            before
            <ActualTime
              time={scheduleTeacher.limits?.actualExpiry}
              display="time-timezone"
            ></ActualTime>
          </div>
        {/if}

        <div class="flx-btn">
          <button class="btn-bcx2" on:click={handleBackToCalendarClick}
            >Cancel</button
          >
          <button
            class="btnbcx"
            id="backToReserve"
            on:click={makeInquiry}
            disabled={scheduleTeacher.isCancelled == true ||
              (scheduleTeacher.isCancelled == false &&
                new Date(scheduleTeacher.limits.actualExpiry) < new Date())}
            >Sign Up</button
          >
        </div>
      </div>
      <div class="img-user">
        <img src="assets/img/user.png" alt="Profile" class="img-fluid" />
        <h4>
          Masumi Muramatsu ますみ<br />
          Tokyo, Japan & Honolulu, Hawaii<br />
          Yoga Awareness YAT 600 certified teacher<br />
          Yoga Alliance RYT500, E-RYT 200, YACEP registered
        </h4>
        <p class="mb-0">
          Masumi lives in Honolulu. Spreads the word about yoga that "everyone
          can enjoy." Holds cooking classes on the idea that food is medicine
          (Indian medicine/Ayurveda). Utilizing her 20+ years of experience in
          English education, she is active in a wide range of fields, including
          English courses for learning about yoga around the world and "Yoga
          taught in English." Her bases of operations are Waikiki and Tokyo. She
          co-teachs and manages the school with her husband Ted. She is
          YAT600/RYT500 certified. Morning yoga will be taught by Masumi in
          Japanese. I'm looking forward to seeing you!
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  .hidden {
    display: none;
  }

  .cancelled-class {
    background-color: #fecaca; /* red-200 */
    color: #7f1d1d; /* red-800 */
    padding: 8px 8px;
    margin-bottom: 10px;
    border-radius: 4px;
    font-size: 14px;
    width: 90%;
  }

  .closed-registration {
    background-color: #fecaca; /* red-200 */
    color: #7f1d1d; /* red-800 */
    padding: 7px 7px;
    margin-bottom: 10px;
    border-radius: 4px;
    font-size: 14px;
    width: 90%;
  }
  .btnbcx:disabled {
    background-color: #a8aca8; /* Light gray background */
    color: #717472; /* Dim text color */
    cursor: not-allowed; /* Show disabled cursor */
    opacity: 0.9; /* Reduce opacity */
    pointer-events: none; /* Prevent interaction */
  }
</style>
