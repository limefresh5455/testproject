<script>
  import { NewsLetterService } from "$lib/Service";
  import { NewsLetterValidateForm } from "$lib/Validation";
  import { onMount, onDestroy } from 'svelte';

 export let newsletterButtonColor; 
  let firstName = '';
  let lastName = '';
  let email = '';
  let errors = {};


  async function submitNewsLetterFormHandler() {
    const { isValid, errors: validationErrors }  = await NewsLetterValidateForm({firstName, lastName, email});
    errors = validationErrors;
    if(!isValid) return;
 
    const formData = {
      firstName,
      lastName,
      email,
    };
    try {
      const response = await NewsLetterService(formData);   
      console.log(response.data)
      alert('Message sent successfully!');
      firstName = '';
      lastName = '';
      email = '';
      message = '';
      errors = {};
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting the form. Please try again.');
    }
   }


   let newsMains;

  function isInView(element) {
    const rect = element.getBoundingClientRect();
    return rect.bottom <= window.innerHeight - 60;
  }

  function handleScroll() {
    newsMains?.forEach(newsMain => {
      if (isInView(newsMain)) {
        newsMain.classList.add('in-view');
      } else {
        newsMain.classList.remove('in-view');
      }
    });
  }

  onMount(() => {
    newsMains = document.querySelectorAll('.news-main');
    handleScroll();
    window.addEventListener('scroll', handleScroll,{ passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll,{ passive: true });
    };
  });


</script>


<section class="news-main" style="background-image: url(assets/img/bg-btm.jpg)">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="news-letter-main">
            <h2>Sign up to recieve my newsletter!</h2>
            <div
              class="newsletter-form d-flex align-items-center justify-content-center"
            >
            <div
              class="main_int"
            >
              <input
                type="text"
                class="form-control"
                placeholder="First Name"
                aria-label="First Name"
                bind:value={firstName}
                on:input={() => (errors.firstName = '')}
                autocomplete="given-name"
                id="firstNameNewsletter"
              />
              {#if errors.firstName} <p class="error">{errors.firstName}</p>{/if}
              </div>
              <div
              class="main_int"
            >
              <input
                type="text"
                class="form-control"
                placeholder="Last Name"
                aria-label="Last Name"
                bind:value={lastName}
                on:input={() => (errors.lastName = '')}
                 autocomplete="family-name"
                id="lastNameNewsletter"
              />
              {#if errors.lastName} <p class="error">{errors.lastName}</p>{/if}
              </div>
              <div
              class="main_int"
            >
              <input
                type="email"
                class="form-control"
                placeholder="Email Address"
                aria-label="Email Address"
                bind:value={email}
                on:input={() => (errors.email = '')}
                 autocomplete="username"
                id="emailNewsletter"
              />
              {#if errors.email} <p class="error">{errors.email}</p>{/if}
              </div>
              <button class={`btn btn-primary ${newsletterButtonColor}`} on:click={submitNewsLetterFormHandler}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</section>

<style>
 .error {
    color: red;
    font-size: 0.85rem;
    margin-top: 0.25rem;
  }
</style>