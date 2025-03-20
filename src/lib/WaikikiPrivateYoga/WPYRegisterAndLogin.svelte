<script>
  import { LoginFormService, RegisterFormService } from "$lib/Service";
  import { validateLogin, validateRegister } from "$lib/Validation";

  export let isReserveFormVisible;
  export let handleBackToCalendarClick;
  export let handleRegisterClick;

  let loginData = { email: "", password: "" };
  let registerData = {
    firstName: "",
    lastName: "",
    otherName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };
  let errors = { login: {}, register: {} };
  let isYogaAwarenessUser = false; // Default to "No"

  // Reactive statement to handle form visibility
  $: showRegisterForm = !isYogaAwarenessUser; // Show register form when "No" is selected
  $: showLoginForm = isYogaAwarenessUser; // Show login form when "Yes" is selected

  const handleSubmitlogin = async (event) => {
   event.preventDefault();
    const { isValid, errors: loginErrors } = validateLogin(loginData);
    errors.login = loginErrors;
    if (!isValid) return;
    try {
      const response = await LoginFormService(loginData);
      if (response.data) {
        const { user, access_token } = response.data;
        const YogaUserData = { user, access_token };
        localStorage.setItem("userData", JSON.stringify(YogaUserData));
        // console.log(response.data, "Login Data");
        alert("Login successful!");
      }
    } catch (error) {
      // console.log(error.response?.data?.message,"error")
      console.error("Login error:", error);
      const { status } = error.response;
      if (status === 404 || status === 400 || status === 409) {
        alert(error.response?.data?.message);
      } else if (status === 500) {
        alert("Error submitting the login form. Please try again.");
      }
    }
  };

  const handleSubmitRegister = async (event) => {
   event.preventDefault();
    const { isValid, errors: registerErrors } = validateRegister(registerData);
    errors.register = registerErrors;
    if (!isValid) return;
    try {
      const response = await RegisterFormService(registerData);
      if (response.data) {
        alert("Register successful!");
      }
    } catch (error) {
      alert("Error submitting the register form. Please try again.");
      console.error("Login error:", error);
    }
  };
</script>


<div class="bcxform2"  class:hidden={!isReserveFormVisible} id="formbcxmain2">
  <div class="detail-top-main">
  <div class="reserve-form-main">
       <div class="chs-std-main">
          <h3>Reserve Now</h3>
       </div>

       <div class="check-mbcx">
          <h4>Are you a Yoga Awareness User?</h4>
          <div class="form-check">
             <input class="form-check-input" type="checkbox"  checked={!isYogaAwarenessUser}
             on:change={() => (isYogaAwarenessUser = false)} id="flexCheckDefault"> <label
                class="form-check-label" for="flexCheckDefault">No</label>
          </div>
          <div class="form-check">
             <input class="form-check-input" type="checkbox"  checked={isYogaAwarenessUser}
             on:change={() => (isYogaAwarenessUser = true)} id="flexCheckChecked" >
             <label class="form-check-label" for="flexCheckChecked">Yes</label>
          </div>
       </div>

       {#if showRegisterForm}
       <div class="form-in-cld">
          <form>
            <div class="form-group">
               <div class="flex-cdl">
                <div class="input_error_box"> 
                <input
                  type="text"
                  class="form-control"
                  placeholder="Your first name"
                  bind:value={registerData.firstName}
                  on:input={() => (errors.register.firstName = '')}
                  id="firstName"
                  autocomplete="given-name"
                />
                {#if errors.register.firstName}
                <span class="error">{errors.register.firstName}</span>
                 {/if}
                </div>
                <div class="input_error_box"> 
                <input
                  type="text"
                  class="form-control"
                  placeholder="Your last name"
                  id="lastName"
                  bind:value={registerData.lastName}
                  on:input={() => (errors.register.lastName = '')}
                  autocomplete="family-name"
                />
                {#if errors.register.lastName}
                <span class="error">{errors.register.lastName}</span>
                 {/if}
           </div>
              </div>  
          
            </div>
  
            <div class="form-group">
              <div class="flex-cdl">
                <div class="input_error_box"> 
                <input
                  type="text"
                  class="form-control"
                   id="otherName"
                  placeholder="Other name (if any)"
                  bind:value={registerData.otherName}
                  on:input={() => (errors.register.otherName = '')}
                />
                {#if errors.register.otherName}
                <span class="error">{errors.register.otherName}</span>
                   {/if}
                </div>
                <div class="input_error_box"> 
                <input
                  type="text"
                  class="form-control"
                  placeholder="Your phone number"
                   id="phone"
                  bind:value={registerData.phone}
                  on:input={() => (errors.register.phone = '')}
                  autocomplete="tel"
                />
                {#if errors.register.phone}
                <span class="error">{errors.register.phone}</span>
                   {/if}
                </div>
              </div>
            </div>
  
            <div class="form-group">
              <div class="flex-cdl">
                <div class="input_error_box w-100"> 
                <input
                  type="email"
                  class="form-control"
                  placeholder="Your email address"
                   id="email"
                  bind:value={registerData.email}
                  on:input={() => (errors.register.email = '')}
                  autocomplete="username"
                />
                {#if errors.register.email}
                <span class="error">{errors.register.email}</span>
                   {/if}
              </div>
              </div>
            </div>
            <div class="form-group">
              <div class="flex-cdl">
                <div class="input_error_box"> 
                <input
                  type="password"
                  class="form-control"
                  placeholder="Create new password"
                   id="password"
                  bind:value={registerData.password}
                  on:input={() => (errors.register.password = '')}
                  autocomplete="new-password" 
                />
                {#if errors.register.password}
            <span class="error">{errors.register.password}</span>
               {/if}
                </div> 
                <div class="input_error_box"> 
                <input
                  type="password"
                  class="form-control"
                  placeholder="Repeat password"
                   id="confirmPassword"
                  bind:value={registerData.confirmPassword}
                  on:input={() => (errors.register.confirmPassword = '')}
                  autocomplete="new-password" 
                />
                {#if errors.register.confirmPassword}
            <span class="error">{errors.register.confirmPassword}</span>
               {/if}
              </div>
              </div>
            </div>

             <div class="btn-bcx">
                <button class="cancle-btn " on:click|preventDefault={handleBackToCalendarClick}>Cancel</button>
                <button class="btn-bcx1" id="backtoform3" on:click|preventDefault={handleRegisterClick}>Register</button>
                <!-- <a href="javascript:void(0)" class="btn-bcx1" id="backtoform3" on:click={handleRegisterClick}>Register</a> -->
             </div>
          </form>
       </div>
       {/if}

       {#if showLoginForm}
       <div class="form-in-cld">
          <form>
            <div class="form-group">
               <div class="flex-cdl">
                 <div class="input_error_box w-100"> 
                 <input
                   type="email"
                   class="form-control"
                   placeholder="Your email address"
                   bind:value={loginData.email}
                   on:input={() => (errors.login.email = '')}
                   id="email"
                   autocomplete="username"
                 />
                 {#if errors.login.email}
                 <span class="error">{errors.login.email}</span>
                    {/if}
               </div>
               </div>
             </div>
   
             <div class="form-group">
               <div class="flex-cdl">
                 <div class="input_error_box w-100"> 
                 <input
                   type="password"
                   class="form-control"
                   placeholder="Create new password"
                   bind:value={loginData.password}
                   id="password"
                   on:input={() => (errors.login.password = '')}
                   autocomplete="current-password" 
                 />
                 {#if errors.login.password}
             <span class="error">{errors.login.password}</span>
                {/if}
                 </div> 
               </div>
             </div>

             <div class="btn-bcx">
                <button class="cancle-btn " on:click|preventDefault={handleBackToCalendarClick}>Cancel</button>
                <button  class="btn-bcx1" id="backtoform3" on:click|preventDefault={handleRegisterClick}>Login</button>
                <!-- <a href="javascript:void(0)" class="btn-bcx1" id="backtoform3" on:click={handleRegisterClick}>Login</a> -->
             </div>
          </form>
       </div>
       {/if}
    </div>
    <div class="class_details">
       <div class="chs-std-main">
          <h3>Class Detail</h3>
       </div>
       <div class="class_details_inner">
          <div class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
             <div class="order_id">
                <div>
                   <h4>Class by Tedd Surman</h4>
                   <p>67875e8af966072420421408</p>
                </div>
             </div>
             <div class="class_price">
                <p><b>$ 100.00 </b>USD</p>
             </div>
          </div>
          <div class="d-flex align-items-center justify-content-between pb-3">
             <div class="total_ammount">
                <h4 class="m-0">Total Amount</h4>
             </div>
             <div class="class_price">
                <p><b>$ 100.00 </b>USD</p>
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

  .error {
    color: red;
    font-size: 0.85rem;
    margin-top: 4px;
  }

  button.btn-bcx1 {
   background: #c2410c;
   border-color: #c2410c;
}
 
a.btn-bcx1 {
   background: #c2410c;
   border-color: #c2410c;
}

</style>
