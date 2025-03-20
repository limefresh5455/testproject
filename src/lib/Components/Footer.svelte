<script>
 import { goto } from "$app/navigation";
 import { page } from '$app/stores';
  import { SubmitContactWithUsForm } from "$lib/Service";
  import { ChatWithUsValidateForm } from "$lib/Validation";

    // State to hold the current header class
    let headerClass = 'ykb';
    let arrowConnectWithUs = '';
    let sendNowButton = '';
    let buttomFooter='';
    let BackgroundFooter=""
    let firstName = '';
   let lastName = '';
   let email = '';
   let message = '';
   let website='ywb';
   let errors = {};
  
    // Functions to update the header class
    const setClassToYKB = () => {
      headerClass = 'ykb';
      arrowConnectWithUs = '';
      sendNowButton = '';
      buttomFooter='';
      BackgroundFooter="";
    };
    const setClassToYMG = () => {
        if ($page.url.pathname !== "/waikiki-morning-yoga") {
      goto("/waikiki-morning-yoga");
    }
      headerClass = 'ymg';
      arrowConnectWithUs = 'gr1';
      sendNowButton ='green-btn';
      buttomFooter='btm-footer-gr';
      BackgroundFooter="green-bg";
    };
    const setClassToYMPR = () => {
        if ($page.url.pathname !== "/waikiki-private-yoga") {
        goto("/waikiki-private-yoga");
        }
      headerClass = 'ympr';
      arrowConnectWithUs = 'orange-btn1';
      sendNowButton = 'orange-btn';
      buttomFooter='btm-footer-or';
      BackgroundFooter="orange-bg";
    };

  // Check the URL and call the appropriate function when the page loads
  $: {
    if ($page.url.pathname === "/") {
      setClassToYKB();
    } else if ($page.url.pathname.startsWith("/waikiki-morning-yoga")) {
      setClassToYMG();
    } else if ($page.url.pathname.startsWith("/waikiki-private-yoga")) {
      setClassToYMPR();
    }
  }


  async function submitFormHandler() {
   
    const { isValid, errors: validationErrors }  = await ChatWithUsValidateForm({firstName, lastName, email, message});
    errors = validationErrors;
    if(!isValid) return;
 
    const formData = {
      firstname:firstName,
      lastname:lastName,
      email:email,
      message:message,
      website:website
    };
    try {
      const response = await SubmitContactWithUsForm(formData);   
 
      if(response.status === 201){
      alert('Your message has been sent successfully!');
      firstName = '';
      lastName = '';
      email = '';
      message = '';
      errors = {};
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting the form. Please try again.');
    }
   }

</script>

<footer class={`${BackgroundFooter}`}>
    <div class="container">
       <div class="row align-items-center ">
          <div class="col-md-6 bz1">
             <div class="footer-contact">
                <h4>
                   Connect With Us
                   <div class={`img-icon-right-header ${arrowConnectWithUs}`}>
                      <img src="/assets/img/rightr.png" alt="" class="img-fluid"/>
                   </div>
                </h4>
                <div data-mdb-input-init class="form-outline">
                   <textarea class="form-control" bind:value={message} id="textAreaExample1" rows="3"
                      placeholder="Enter text here..." on:input={() => (errors.message = '')}></textarea>
                      {#if errors.message} <p class="error">{errors.message}</p>{/if}
                   <div class="form-inputs">
                      <div class="form-group">
                         <input type="text" bind:value={firstName} class="form-control"  
                            placeholder="First name" on:input={() => (errors.firstName = '')}>
                            {#if errors.firstName} <p class="error">{errors.firstName}</p>{/if}
                      </div>
                      <div class="form-group">
                         <input type="text" bind:value={lastName} class="form-control"  
                            placeholder="Last name" on:input={() => (errors.lastName = '')}>
                            {#if errors.lastName} <p class="error">{errors.lastName}</p>{/if}
                      </div>
                      <div class="form-group">
                         <input type="email" bind:value={email} class="form-control" 
                            placeholder="Email" on:input={() => (errors.email = '')}>
                            {#if errors.email} <p class="error">{errors.email}</p>{/if}
                      </div>
                   </div>
                   <button on:click={submitFormHandler}  class={`${sendNowButton}`}>Send Now!</button>
                </div>
             </div>
          </div>
          <div class="col-md-6">
             <h4 class="ftg-social">Social Media
             </h4>
             <div class="feed-in1">
                <div class="img_feed1">
                   <img src="/assets/img/img4.png" class="img-fluid" alt="img4">
                   <div class="overlay1"><img src="assets/img/twit.png" class="img-fluid" alt="twit"></div>
                </div>
                <div class="img_feed1">
                   <img src="/assets/img/img1.jpg" class="img-fluid" alt="img1">
                   <div class="overlay1"><img src="assets/img/ins.png" class="img-fluid" alt="twit"></div>
                </div>
                <div class="img_feed1">
                   <img src="/assets/img/img3.png" class="img-fluid" alt="img3">
                   <div class="overlay1"><img src="assets/img/face.png" class="img-fluid" alt="twit"></div>
                </div>
             </div>
          </div>
       </div>
    </div>
    <div  class={`btm-footer ${buttomFooter}`}>
       <div class="container">
          <div class="row align-items-center">
             <div class="col-md-4">
                <div class="copyright cn1">
                   <p>© Copyright Yoga Waikiki Beach 2024</p>
                </div>
             </div>
             <div class="col-md-2">
                <div class="link-ftg-nav mtr-mb">
                   <a href="/">Yoga Waikiki Beach
                      <span>ヨガ ワイキキビーチ</span></a>
                </div>
             </div>
             <div class="col-md-2">
                <div class="link-ftg-nav">
                   <a href="/waikiki-morning-yoga">Waikiki Morning Yoga<span>ワイキキ モーニングヨガ</span></a>
                </div>
             </div>
             <div class="col-md-2">
                <div class="link-ftg-nav">
                   <a href="/waikiki-private-yoga">Waikiki Private Yoga<span>ワイキキ プライベートヨガ</span></a>
                </div>
             </div>
             <div class="col-md-2">
                <div class="link-ftg-nav1">
                   <a href="#">Terms of Use</a>
                   <a href="#">Privacy Policy</a>
                </div>
             </div>
             <div class="col-md-4">
                <div class="copyright cn2">
                   <p>© Copyright Yoga Waikiki Beach 2024</p>
                </div>
             </div>
          </div>
       </div>
    </div>
 </footer>

<style>
    .error {
    color: red;
    font-size: 0.85rem;
    margin-top: 0.25rem;
  }
</style>