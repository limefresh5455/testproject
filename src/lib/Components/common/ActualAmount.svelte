

<script>
  import { onMount } from "svelte";

  export let type ; // Default type
  export let amount ;
  export let currency ;
  export let currencies ; // Ensure it's always an object

  onMount(() => {
    //   console.log({ amount, currency, currencies });
  });
 
</script>



{#if Object.keys(currencies).length > 0 && currency}
  {#if type === "lg"}
      <div class="amount-container">
          <div class="amount-lg bold">{currencies[currency].prefix || "$"}</div>
          <div class="amount-lg bold">{parseFloat(amount || 0).toFixed(2)}</div>
          <div class="amount-suffix">{currencies[currency].suffix || "USD"}</div>
      </div>
  {:else}
      <div class="amount-container">
          <div class="currency-symbol">{currencies[currency].prefix || "$"}</div>
          <div class="price-value">{parseFloat(amount || 0).toFixed(2)}</div>
          <div class="currency-name">{currencies[currency].suffix || "USD"}</div>
      </div>
  {/if}
{:else}
  {#if type === "lg"}
      <div class="amount-container">
          <div class="price-display">{"$"} {parseFloat(0).toFixed(2)}</div>
          <div class="currency-label"> {"USD"}</div>
      </div>
  {:else}
      <div class="amount-container">
          <div>{"$"} {parseFloat(0).toFixed(2)}</div>
          <div class="currency-text">{"USD"}</div>
      </div>
  {/if}
{/if}

<style>
.amount-container {
    display: flex;
    align-items: center;
    /* gap: 5px;   */
}

.amount-lg {
    font-size: 1.25rem; /* Equivalent to text-xl */
    font-weight: bold; /* Equivalent to font-semibold */
    color: black;
}

.amount-suffix {
    font-size: 0.85rem; /* Equivalent to text-xs */
    color: gray; /* Equivalent to text-gray-400 */
    height: 28px; /* Equivalent to h-[28px] */
    display: flex;
    align-items: center;
    margin-left: 5px; 
}

.currency-symbol {
    font-size: 1rem; /* Normal text size */
    display: flex;
}

.price-value {
    display: flex;
    font-weight: bold;
    color: black;
}

.currency-name {
    font-size: 0.85rem; /* Small text */
    color: gray;
    height: 24px;
    display: flex;
    margin-left: 5px; 
    align-items: center;
}

.price-display {
    font-size: 20px; /* Equivalent to text-xl */
    font-weight: bold; /* Equivalent to font-semibold */
}

.currency-label {
    font-size: 12px; /* Equivalent to text-xs */
    display: flex;
    align-items: center;
    color: gray; /* Equivalent to text-gray-400 */
}

.currency-text {
    font-size: 12px; /* Equivalent to text-xs */
    display: flex;
    align-items: center;
    color: gray; /* Equivalent to text-gray-400 */
}

</style>


<!-- <script>
    import { onMount } from "svelte";

    export let amount;
    export let currency;
    export let currencies; 

    onMount(async () => {
        console.log({ amount, currency, currencies });
    });
</script>

{#if Object.values(currencies)?.length > 0 && currency}

<div class="amount-container">
    <span class="currency-symbol">{currencies[currency].prefix || "$"}</span>
    <span class="amount">{parseFloat(amount || 0).toFixed(2)}</span>
    <span class="currency-code">{currencies[currency].suffix || "USD"}</span>
</div>

{:else}

<div class="amount-container">
    <span class="currency-symbol">$</span>
    <span class="amount">{parseFloat(0).toFixed(2)}</span>
    <span class="currency-code">USD</span>
</div>

{/if}

<style>
  .amount-container {
      display: flex;
      align-items: center;
  }

  .currency-symbol,
  .amount {
    font-size: 16px;
    font-weight: 700;
    color: #212121;
  }

  .currency-code {
    font-size: 16px;
    font-weight: 700;
    color: #212121;
    margin-left: 4px; /* सिर्फ "USD" को अलग दिखाने के लिए */
  }
</style> -->