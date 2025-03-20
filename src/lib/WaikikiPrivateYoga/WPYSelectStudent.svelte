<script>
  import AddFriend from "$lib/Components/AddFriend.svelte";
  export let IsRegisterFormVisible;
  export let handleBackToCalendarClick;
  export let handleClassDetailslsShow;
  let isModalVisible = false;
  let headerClass = 'ympr';
  const toggleModal = () => {
    isModalVisible = !isModalVisible;  
  };
</script>

<div class="bcxform3" class:hidden={!IsRegisterFormVisible} id="formbcxmain3">
  <div class="detail-top-main">
  <div class="options">
       <h4>Select Number of Students for your Private Class</h4>
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
          <div class="form-check">
             <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
             <label class="form-check-label" for="flexCheckChecked">Amelia Dolim</label>
          </div>
          <div class="form-check">
             <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
             <label class="form-check-label" for="flexCheckDefault">Jim Bickerton</label>
          </div>
          <div class="form-check">
             <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
             <label class="form-check-label" for="flexCheckDefault">Amelia Dolim</label>
          </div>
          <div class="form-check">
             <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
             <label class="form-check-label" for="flexCheckDefault">Jim Bickerton</label>
          </div>
          <div class="form-check">
             <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
             <label class="form-check-label" for="flexCheckDefault">Amelia Dolim</label>
          </div>
          <button class="add_friend" on:click={toggleModal}>Add a friend</button>
       </div>
       <div class="btn-bcx">
          <button class="cancle-btn " on:click={handleBackToCalendarClick}>Cancel</button>
          <a href="javascript:void(0)" class="btn-bcx1" id="backtoform4" on:click={handleClassDetailslsShow}>Register</a>
       </div>
    </div>

    <div class="class_details">
       <div class="chs-std-main">
          <h3>Private Class Details</h3>
       </div>
       <div class="class_details_inner">
          <div class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
             <div class="order_id">
                <div>
                   <h4>Class by Tedd Surman</h4>
                   <p>67875e8af966072420421408</p>
                </div>
             </div>
          </div>

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
          <div class="d-flex align-items-center justify-content-between pb-3">
             <div class="total_ammount">
                <h4 class="m-0">Total Amount</h4>
             </div>
             <div class="class_price">
                <p><b>(3 Students) $ 150.00 </b></p>
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
  
</style>
