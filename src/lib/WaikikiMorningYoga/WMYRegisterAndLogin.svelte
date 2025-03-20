<script>
  import ActualAmount from "$lib/Components/common/ActualAmount.svelte";
  import {
    CreateActivityService,
    LoginFormService,
    RegisterFormService,
  } from "$lib/Service";
  import { validateLogin, validateRegister } from "$lib/Validation";

  export let isReserveFormVisible;
  export let handleBackToCalendarClick;
  export let handleRegisterUserClick;
  export let scheduleTeacher;
  export let localCurrency;

  // $: console.log(scheduleTeacher, "scheduleTeacher Register Login");

  $: total =
    scheduleTeacher && scheduleTeacher.items
      ? scheduleTeacher.items.reduce((a, c) => (a = a + c.unit_cost * c.pax), 0)
      : 0;
  $: ya_total =
    scheduleTeacher && scheduleTeacher.items
      ? scheduleTeacher.items.reduce((a, c) => (a = a + c.ya_cost * c.pax), 0)
      : 0;

  // console.log({ scheduleTeacher });

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

  const handleSubmitlogin = async () => {
    const { isValid, errors: loginErrors } = validateLogin(loginData);
    errors.login = loginErrors;
    if (!isValid) return;
    let updatedScheduleTeacher = {
      ...scheduleTeacher,
      email: loginData.email,
      password: loginData.password,
      isUser: true,
      isLoggedIn: false,
    };
    try {
      const response = await RegisterFormService(
        scheduleTeacher.id,
        updatedScheduleTeacher
      );
      if (response.data) {
        let inquiryUpdated = response.data;
        let text;
        if (!updatedScheduleTeacher.user) {
          text = "User Registration to Yoga event";
        }else{
          text = 'User LoggedIn to Yoga event';
        }
        let log = {
          activity_details: `${updatedScheduleTeacher.sourceItemName}`,
          profile_associated: `${updatedScheduleTeacher.firstname} ${updatedScheduleTeacher.lastname}`,
          via: text,
          inquiry: updatedScheduleTeacher.id,
        };
        // console.log(log,"log")
        const createActivityRes = await CreateActivityService(log);
        // console.log(response.data, "RegisterFormService");
        // console.log(createActivityRes.data, "createActivityRes");
        if (inquiryUpdated?.user && inquiryUpdated?.tokens) {
          const userData = {
            tokens: inquiryUpdated.tokens,
            user: inquiryUpdated.user,
          };
          localStorage.setItem("authData", JSON.stringify(userData)); // Store user data in local storage
          handleRegisterUserClick(updatedScheduleTeacher.id)
        }
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

  const handleSubmitRegister = async () => {
  
    const { isValid, errors: registerErrors } = validateRegister(registerData);
    errors.register = registerErrors;
    if (!isValid) return;
    let updatedScheduleTeacher = {
      ...scheduleTeacher,
      email: registerData.email,
      firstname: registerData.firstName,
      lastname: registerData.lastName,
      othername: registerData.otherName,
      password: registerData.password,
      repeat_password: registerData.confirmPassword,
      phone: registerData.phone,
      isLoggedIn: false,
    };
    try {
      const response = await RegisterFormService(
        scheduleTeacher.id,
        updatedScheduleTeacher
      );
      if (response.data) {
        let inquiryUpdated = response.data;
        let text;
        if (!updatedScheduleTeacher.user) {
          text = "User Registration to Yoga event";
        }
        let log = {
          activity_details: `${updatedScheduleTeacher.sourceItemName}`,
          profile_associated: `${updatedScheduleTeacher.firstname} ${updatedScheduleTeacher.lastname}`,
          via: text,
          inquiry: updatedScheduleTeacher.id,
        };
        const createActivityRes = await CreateActivityService(log);
        // console.log(response.data, "RegisterFormService");
        // console.log(createActivityRes.data, "createActivityRes");
        if (inquiryUpdated?.user && inquiryUpdated?.tokens) {
          const userData = {
            tokens: inquiryUpdated.tokens,
            user: inquiryUpdated.user,
          };
          localStorage.setItem("authData", JSON.stringify(userData)); // Store user data in local storage
          handleRegisterUserClick(updatedScheduleTeacher.id)
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      const { status } = error.response;
      if (status === 404 || status === 400 || status === 409) {
        alert(error.response?.data?.message);
      } else if (status === 500) {
        alert("Error submitting the register form. Please try again.");
      }
    }
  };
</script>

<div class="bcxform2" class:hidden={!isReserveFormVisible} id="formbcxmain2">
  <div class="detail-top-main">
    <div class="reserve-form-main">
      <div class="chs-std-main">
        <h3>Reserve Now</h3>
      </div>

      <div class="check-mbcx">
        <h4>Are you a Yoga Awareness User?</h4>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="flexCheckDefault"
            checked={!isYogaAwarenessUser}
            on:change={() => (isYogaAwarenessUser = false)}
          />
          <label class="form-check-label" for="flexCheckDefault">No</label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="flexCheckChecked"
            checked={isYogaAwarenessUser}
            on:change={() => (isYogaAwarenessUser = true)}
          />
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
                    on:input={() => (errors.register.firstName = "")}
                    autocomplete="given-name"
                    id="firstNameChatWithUs"
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
                    bind:value={registerData.lastName}
                    on:input={() => (errors.register.lastName = "")}
                    autocomplete="family-name"
                    id="lastNameChatWithUs"
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
                    placeholder="Other name (if any)"
                    bind:value={registerData.otherName}
                    on:input={() => (errors.register.otherName = "")}
                    id="otherNameChatWithUs"
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
                    bind:value={registerData.phone}
                    on:input={() => (errors.register.phone = "")}
                    autocomplete="tel"
                     id="phoneChatWithUs"
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
                    bind:value={registerData.email}
                    on:input={() => (errors.register.email = "")}
                    autocomplete="username"
                    id="emailChatWithUs"
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
                    bind:value={registerData.password}
                    on:input={() => (errors.register.password = "")}
                    autocomplete="new-password"
                    id="passwordChatWithUs"
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
                    bind:value={registerData.confirmPassword}
                    autocomplete="new-password"
                    on:input={() => (errors.register.confirmPassword = "")}
                    id="confirmPasswordChatWithUs"
                  />
                  {#if errors.register.confirmPassword}
                    <span class="error">{errors.register.confirmPassword}</span>
                  {/if}
                </div>
              </div>
            </div>

            <div class="btn-bcx">
              <button
                class="cancle-btn"
                on:click|preventDefault={handleBackToCalendarClick}
                >Cancel</button
              >
              <button
              class="btn-bcx1"
              id="backtoform3"
              on:click|preventDefault={handleSubmitRegister}>Register</button>
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
                    on:input={() => (errors.login.email = "")}
                    id="emailLoginChatWithUs"
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
                    id="passwordLoginChatWithUs"
                    on:input={() => (errors.login.password = "")}
                    autocomplete="current-password"
                  />
                  {#if errors.login.password}
                    <span class="error">{errors.login.password}</span>
                  {/if}
                </div>
              </div>
            </div>

            <div class="btn-bcx">
              <button
                class="cancle-btn"
                on:click|preventDefault={handleBackToCalendarClick}
                >Cancel</button
              >
              <button
              class="btn-bcx1"
              id="backtoform3"
              on:click|preventDefault={handleSubmitlogin}>Login</button>
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
        {#each scheduleTeacher.items as item, i}
          <div
            class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3"
          >
            <div class="order_id">
              <div>
                <h4>{item?.reference_name || "Class by Unknown Teacher"}</h4>
                <p>{item?.reference || "No ID Available"}</p>
              </div>
            </div>
            <div class="class_price">
              <p><b>${total.toFixed(2)} &nbsp;</b>USD</p>
            </div>
          </div>
        {:else}
          <div>No Details Found</div>
        {/each}
        <div class="d-flex align-items-center justify-content-between pb-3">
          <div class="total_ammount">
            <h4 class="m-0">Total Amount</h4>
          </div>
          <div class="class_price">
            <!-- <p><b>$ 100.00 &nbsp;</b>USD</p> -->
            <ActualAmount
              type="lg"
              amount={total}
              currency={scheduleTeacher?.currency}
              currencies={localCurrency}
            ></ActualAmount>
          </div>
        </div>
        {#if scheduleTeacher?.kind === "ClassSchedule"}
          <div class="class_discription">
            <p>
              If you have &nbsp;<b>Yoga Class Pass &nbsp;</b>pay only &nbsp;<b>
                <ActualAmount
                  type="span"
                  amount={ya_total}
                  currency={scheduleTeacher?.currency}
                  currencies={localCurrency}
                ></ActualAmount> <a href="#">Learn More</a></b
              >
            </p>
          </div>
        {/if}
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
    background: #15803d;
    border-color: #15803d;
  }

  a.btn-bcx1 {
    background: #15803d;
    border-color: #15803d;
  }
</style>
