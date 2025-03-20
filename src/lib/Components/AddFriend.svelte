<script>
    import { SubmitAddFriendForm } from "$lib/Service";
    import { AddAFriendValidateForm } from "$lib/Validation";
  
    export let toggleModal; 
    export let headerClass;
  
    let firstName = '';
    let lastName = '';
    let otherName = '';
    let phone = '';
    let email = '';
    
 
    let errors = {};
      
    async function submitFormHandler() {
      const { isValid, errors: validationErrors }  = await AddAFriendValidateForm({firstName, lastName,otherName, email, phone});
      errors = validationErrors;
      if(!isValid) return;
      const formData = {
        firstname:firstName,
        lastname:lastName,
        othername:otherName,
        phone:phone,
        email:email
      };
      try {
        const response = await SubmitAddFriendForm(formData);   
        if(response.status === 201){
        alert('Your message has been sent successfully!');
        firstName = '';
        lastName = '';
        otherName = '';
        phone = '';
        email = '';
        errors = {};
        toggleModal();  
      }
      } catch (error) {
        console.error('Error:', error);
        alert('Error submitting the form. Please try again.');
      }
     }
  </script>
  
  <div class="modal">
    <div class="modal-content">
      <button class="close-btn" on:click={toggleModal}>×</button>
      <h4 class="mdl-heading">Add a friend</h4>
      
      <div class="form-inputs-addfriend">
        <div class="form-group-addfriend">
          <input type="text" id="firstNameAddFriend" class="form-control-addfriend" on:input={() => (errors.firstName = '')} bind:value={firstName} placeholder="First Name">
          {#if errors.firstName} <p class="error">{errors.firstName}</p>{/if}
        </div>
        <div class="form-group-addfriend">
          <input type="text" id="lastNameAddFriend" class="form-control-addfriend" on:input={() => (errors.lastName = '')} bind:value={lastName} placeholder="Last Name">
          {#if errors.lastName} <p class="error">{errors.lastName}</p>{/if}
        </div>
        <div class="form-group-addfriend">
          <input type="text" id="otherNameAddFriend" class="form-control-addfriend" on:input={() => (errors.otherName = '')} bind:value={otherName} placeholder="Other Name">
          {#if errors.otherName} <p class="error">{errors.otherName}</p>{/if}
        </div>
        <div class="form-group-addfriend">
          <input type="text" id="phoneAddFriend" class="form-control-addfriend" on:input={() => (errors.phone = '')} bind:value={phone} placeholder="Mobile Number">
          {#if errors.phone} <p class="error">{errors.phone}</p>{/if}
        </div>
        <div class="form-groups-addfriend">
          <input type="email" id="emailAddFriend" class="form-control-addfriend" on:input={() => (errors.email = '')} bind:value={email} placeholder="Profile Email">
          {#if errors.email} <p class="error">{errors.email}</p>{/if}
        </div>
      </div>
  
      <button on:click|preventDefault={submitFormHandler} class={`submit-btn-addfriend ${ headerClass === 'ymg' ? 'green-btn' : 'orange-btn'}`}>Add Friend</button>
    </div>
  </div>
  
  <style>
  
    .form-inputs-addfriend {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: space-between;
    }
  
    .form-group-addfriend {
      width: 48%;
    }

    .form-groups-addfriend {
      width: 100%;
      margin-bottom: 15px;
    }
  
    .form-control-addfriend {
        width: 100%;
        padding: 8px; 
        border-radius: .25rem;
        transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        background: #fff;
        border: 1px solid #0a0a0a14;
        box-shadow: 0px 0px 2px #07070724;
        font-size: 15px;
        font-weight: 500;
        color: #000;
    }
  
    .form-inputs-addfriend .form-control-addfriend::placeholder {
        color: #212121;
    }
 
    .form-control-addfriend:focus {
        border: 1px solid #cacaca;
        outline: none;  
    }
    .submit-btn-addfriend {
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      width: 100%;
    }
  
    @media (max-width: 768px) {
      .form-group-addfriend {
        width: 100%;
      }
    }

    .close-btn {
      cursor: pointer;
    }
    .error {
      color: red;
      font-size: 0.75rem;
      margin-top: 0.20rem;
      margin-bottom: 0px !important;
    }
 

  </style>