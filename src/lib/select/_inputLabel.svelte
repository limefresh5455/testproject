<script>

</script>
<label for={$$props.for} class="text-base font-medium">
    <slot></slot> 
    {#if $$props.required}
        <span class=" text-red-400">*</span>
    {/if}
</label>