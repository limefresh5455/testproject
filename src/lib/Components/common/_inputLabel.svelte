<script>
    
</script>

<label for={$$props.for} class="form-check-label">
    <slot></slot> 
    {#if $$props.required}
        <span class="required">*</span>
    {/if}
</label>

<style>
    /* .label {
        font-size: 0.875rem;  
        font-weight: 500; 
    } */

    .required {
        color: #f87171; /* Equivalent to text-red-400 */
    }
</style>
