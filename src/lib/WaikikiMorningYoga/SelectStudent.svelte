<script>
  import AddFriend from "$lib/Components/AddFriend.svelte";
  import { page } from '$app/stores';
  import ActualAmount from "$lib/Components/common/ActualAmount.svelte";
  import { onMount } from "svelte";
  import CheckBox from "$lib/Components/common/CheckBox.svelte";
  export let IsRegisterFormVisible;
  export let handleBackToCalendarClick;
  export let handleClassDetailslsShow;
  export let inquiryData;
  export let profileData;
  export let localCurrency;
  let allProfiles = [];
  let isModalVisible = false;
  let headerClass = 'ymg';

  // $: console.log(inquiryData,"inquiryData", "profileData",profileData,"localCurrency",localCurrency);
  
  $: total =
    inquiryData && inquiryData.items
      ? inquiryData.items.reduce((a, c) => (a = a + c.unit_cost * c.pax), 0)
      : 0;

  $: ya_total =
    inquiryData && inquiryData.items
      ? inquiryData.items.reduce((a, c) => (a = a + c.ya_cost * c.pax), 0)
      : 0;


    
  
 
      onMount(() => {
      if (allProfiles.length > 0) {
        allProfiles[0].selected = true;
        allProfiles = [...allProfiles];
      }
     });

     
     $: if (profileData?.results) {
        allProfiles = [...profileData.results]; // Ensure reactivity
        // if (allProfiles.length > 0 && allProfiles.every(p => !p.selected)) {
        // allProfiles[0].selected = true;
        // allProfiles = [...allProfiles];  
        // }
      }
      $: selectedProfiles = allProfiles.filter((item) => item.selected == true);
   
    //  console.log(selectedProfiles,"selectedProfiles")



  function capitalize(name) {
    return name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : "";
  }

  const toggleModal = () => {
    isModalVisible = !isModalVisible;  
  };

</script>

<div class="bcxform3" class:hidden={!IsRegisterFormVisible} id="formbcxmain3">
  <div class="detail-top-main">
    <div class="options">
      <h4>Select Number of Students for your Group Class</h4>
      <div class="option-group">
        <button class="selected">1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
      </div>
    </div>
    <div class="reserve-form-main">
      <div class="check-mbcx hlk">
        {#each allProfiles as profile, i}
       <div class="form-check">
          <CheckBox
          hint={profile.dob &&
            `${-spacetime.now().diff(profile.dob).years} years`}
          bind:checked={allProfiles[i].selected}
          label={`${capitalize(profile.firstname)} ${capitalize(profile.lastname)}`}
        ></CheckBox>
       </div>
        {/each}
        <button class="add_friend" on:click={toggleModal}>Add a friend</button>
      </div>
      <div class="btn-bcx">
        <button
          class="cancle-btn "
          on:click={handleBackToCalendarClick}>Cancel</button
        >
        <button
          class="btn-bcx1"
          id="backtoform4"
          on:click|preventDefault={handleClassDetailslsShow}>Register</button
        >
      </div>
    </div>

    <div class="class_details">
      <div class="chs-std-main">
        <h3>Group Class Details</h3>
      </div>
      <div class="class_details_inner">
        {#each inquiryData?.items as item, i}
        <div
          class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3"
        >
          <div class="order_id">
            <div>
              <h4> {item?.reference_name}</h4>
              <p>{item?.reference}</p>
            </div>
          </div>
        </div>
        {:else}
        <div>No Details Found</div>
        {/each}
        {#if !inquiryData?.user?.ya && inquiryData?.kind == 'ClassSchedule'}
          <div class="class_discription">
            <p>
              If you have &nbsp;<b>Yoga Class Pass &nbsp;</b>pay only &nbsp;
            <b><ActualAmount
                  type="span"
                  amount={ya_total * selectedProfiles?.length}
                  currency={inquiryData?.currency}
                  currencies={localCurrency}
                ></ActualAmount></b> <a href="#"
                >Learn More</a
              >
            </p>
          </div>
        {/if}
        <div class="student_list mt-3">
          <div class="student_list_item">
            <div class="list_student">
              <h4 class="m-0">Student 1: <span>Tamie Kerns</span></h4>
            </div>
            <div class="list_price">
              <p>(100% rate) <b>$ 100.00 </b></p>
            </div>
          </div>
          <div class="student_list_item">
            <div class="list_student">
              <h4 class="m-0">Student 2: <span>Amelia Dolim</span></h4>
            </div>
            <div class="list_price">
              <p>(25% rate) <b>$ 25.00 </b></p>
            </div>
          </div>
          <div class="student_list_item">
            <div class="list_student">
              <h4 class="m-0">Student 3: <span>Jim Bickerton</span></h4>
            </div>
            <div class="list_price">
              <p>(25% rate) <b>$ 25.00 </b></p>
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center  justify-content-between pb-1">
          <div class="total_ammount">
           {#if inquiryData?.user?.ya && inquiryData?.kind == 'ClassSchedule'}
             <p class="small-text">
               Yoga Class Pass Discount Applied
             </p>
           {/if}
           </div>
           <div class="class_price">
           {#if inquiryData?.user?.ya && inquiryData?.kind == 'ClassSchedule'}
             <p class="ermal-text">
               {(
                 ya_total * selectedProfiles.length -
                 total * selectedProfiles.length
               ).toFixed(2)}
             </p>
           {/if}
           </div>
         </div>
        <div class="d-flex align-items-center justify-content-between pb-3">
          <div class="total_ammount">
            <h4 class="m-0">Total Amount</h4>
          </div>
         
          <div class="class_price">
            <!-- <p><b>(3 Students) $ 150.00 </b></p> -->
            <ActualAmount
            type="lg"
            amount={inquiryData?.user?.ya == true && inquiryData?.kind == 'ClassSchedule'
              ? ya_total * selectedProfiles?.length
              : total * selectedProfiles?.length}
            currency={inquiryData?.currency}
            currencies={localCurrency}
          ></ActualAmount>
          </div>

        </div>
      </div>
    </div>
  </div>
         {#if isModalVisible}
        <AddFriend  {toggleModal} {headerClass}/>
         {/if}
</div>

<style>
  .hidden {
    display: none;
  }
  button.btn-bcx1 {
    background: #15803d;
    border-color: #15803d;
  }
  .ermal-text {
    font-size: 12px;
    color: #16a34a; /* Equivalent to text-green-600 */
    /* margin: 0 !important; */
}
.small-text {
  font-size: 10px; /* Equivalent to text-xxs */
  text-transform: uppercase; /* Equivalent to uppercase */
  color: #16a34a; /* Equivalent to text-green-600 */
}

</style>
