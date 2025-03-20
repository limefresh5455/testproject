<script>
  import InputHintText from "./_inputHintText.svelte";
  import InputLabel from "./_inputLabel.svelte";
  export let checked;
</script>

<div class="" class:with-hint={$$props.hint}>
  <input
    type="checkbox"
    bind:checked
    on:blur
    on:change
    class="form-check-input"
    {...$$props}
  />
  {#if $$props.label}
    <div class="">
      <InputLabel for={$$props.id} required={$$props.required}>
        {$$props.label}
        {#if $$props.link && $$props.linkText}
          <a href={$$props.link} class="link">{$$props.linkText}</a>
        {/if}
      </InputLabel>

      {#if $$props.hint}
        <InputHintText>
          {$$props.hint}
        </InputHintText>
      {/if}
    </div>
  {/if}
</div>

<style>
 

  .with-hint {
    align-items: flex-start; /* Equivalent to items-start */
  }

  .link {
    color: #15803d !important; /* Equivalent to text-blue-600 */
    margin-left: 1px; /* Equivalent to ml-px */
  }
</style>
