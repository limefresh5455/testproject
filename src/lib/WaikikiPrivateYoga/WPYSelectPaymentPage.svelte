<script>
  export let IsShowClassDetails;
  export let handleBackToCalendarClick;
</script>

<div class="bcxform4" class:hidden={!IsShowClassDetails} id="formbcxmain4">
  <div class="detail-top-main">
  <div class="reserve-form-main payment_option">
       <div class="chs-std-main">
          <h3 class="mb-0">Choose Payment Method</h3>
       </div>
       <div class="payment_box">
          <div class="payment_method">
             <div class="form__group">
                <div class="form__radio-group">
                   <input id="credit_card" type="radio" class="form__radio-input checked"
                      name="payment" />
                   <label for="credit_card" class="form__radio-label">
                      <span class="form__radio-button"></span>
                      <span class="form__radio-label-text">Credit/Debit Cards<span></label>
                </div>
             </div>
          </div>
          <div class="card_detail">
             <div class="form-group">
                <label>Card Number</label>
                <div class="payment_input">
                   <input type="text" class="form-control" placeholder="1234 1234 1234 1234">
                   <ul>
                      <li><img src="assets/img/visa.svg"></li>
                      <li><img src="assets/img/mastercard.svg"></li>
                      <li><img src="assets/img/amex.svg"></li>
                      <li><img src="assets/img/discover.svg"></li>
                   </ul>
                </div>
             </div>
             <div class="row">
                <div class="col-md-6">
                   <div class="form-group">
                      <label>Expiry Date</label>
                      <input type="text" class="form-control" placeholder="MM / YY">
                   </div>
                </div>
                <div class="col-md-6">
                   <div class="form-group">
                      <label>CVC</label>
                      <input type="text" class="form-control" placeholder="CVC">
                   </div>
                </div>
             </div>
             <div class="row">
                <div class="col-md-6">
                   <div class="form-group mb-3 mb-md-0">
                      <label>Country</label>
                      <select class="country form-control" name="">
                         <option name="">
                            Country
                         </option>
                         <option name="">
                            Country1
                         </option>
                         <option name="">
                            Country2
                         </option>
                         <option name="">
                            Country3
                         </option>
                         <option name="3">
                            Country4
                         </option>
                         <option name="">
                            Country5
                         </option>
                      </select>
                   </div>
                </div>
                <div class="col-md-6">
                   <div class="form-group mb-0">
                      <label>ZIP code</label>
                      <input type="text" class="form-control" placeholder="12345">
                   </div>
                </div>
                <div class="col-md-12">
                   <div class="btn-bcx">
                      <button class="cancle-btn " on:click={handleBackToCalendarClick}>Cancel</button>
                      <a href="#" class="pay_btn">Pay $ 100.00 <span>USD</span></a>
                   </div>
                </div>
             </div>
          </div>
       </div>
       <div class="payment_mode">
          <div class="form__group">
             <div class="form__radio-group">
                <input id="credit_account" type="radio" class="form__radio-input" name="payment" />
                <label for="credit_account" class="form__radio-label">
                   <span class="form__radio-button"></span>
                   <span class="form__radio-label-text"> Credit Account<span></label>
             </div>
          </div>
       </div>
       <div class="payment_mode">
          <div class="form__group">
             <div class="form__radio-group">
                <input id="pay_later" type="radio" class="form__radio-input" name="payment" />
                <label for="pay_later" class="form__radio-label">
                   <span class="form__radio-button"></span>
                   <span class="form__radio-label-text">Pay Later<span></label>
             </div>
          </div>
       </div>
    </div>
    <div class="order_summary">
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
</div>

<style>
  .hidden {
    display: none;
  }
</style>
