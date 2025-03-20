<script>
  import { SubmitContactWithUsForm } from "$lib/Service";
  import { ChatWithUsValidateForm } from "$lib/Validation";

  export let toggleModal; 
  export let headerClass;

  let firstName = '';
  let lastName = '';
  let email = '';
  let message = '';
  let website='ywb';
  let errors = {};
    
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
      toggleModal();  
    }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting the form. Please try again.');
    }
   }
</script>

<div class="modal" >
    <div class="modal-content">
      <button class="close-btn" on:click={toggleModal}>×</button>
      <div data-mdb-input-init="" class="form-outline">
        <h4 class="mdl-heading">Connect with us <img src="assets/img/rightr.png" class={`img-fluid ${headerClass === 'ykb' ? 'blg-btn' : headerClass === 'ymg' ? 'green-btn' : headerClass === 'ympr' ? 'orange-btn' : ''}`} alt="rightr"></h4>
        <textarea class="form-control"   bind:value={message} id="message" rows="3" placeholder="Enter text here..." on:input={() => (errors.message = '')}></textarea>
        {#if errors.message} <p class="error">{errors.message}</p>{/if}
        <div class="form-inputs">
          <div class="form-group">
            <input type="text" id="firstName"  class="form-control" bind:value={firstName} placeholder="First name" on:input={() => (errors.firstName = '')}>
            {#if errors.firstName} <p class="error">{errors.firstName}</p>{/if}
          </div>
          <div class="form-group">
            <input type="text" id="lastName"  class="form-control" bind:value={lastName} placeholder="Last name" on:input={() => (errors.lastName = '')}>
            {#if errors.lastName} <p class="error">{errors.lastName}</p>{/if}
          </div>
          <div class="form-group">
            <input type="email" id="email" class="form-control" bind:value={email} placeholder="Email" on:input={() => (errors.email = '')}>
            {#if errors.email} <p class="error">{errors.email}</p>{/if}
          </div>
        </div><button  on:click={submitFormHandler} class={` ${headerClass === 'ykb' ? 'blg-btn' : headerClass === 'ymg' ? 'green-btn' : headerClass === 'ympr' ? 'orange-btn' : ''}`}>Send Now!</button>
      </div>
    </div>
</div>

<style>
  .close-btn {
    cursor: pointer;
  }
  .error {
    color: red;
    font-size: 0.85rem;
    margin-top: 0.25rem;
  }
</style>