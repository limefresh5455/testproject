<script>
    import { browser } from "$app/environment";
    import { timezones,globalTimeZone } from "$lib/store/main.store";
    import { onMount } from "svelte";
    import Select from "svelte-select";

    const loadOptions = async (filterText) => {
        const data = Object.keys(timezones).map((key) => {
            return { label: key, value: { ...timezones[key], v: key } };
        });
        const filteredList = data.filter((v, i) =>
            v.label.includes(filterText?.toLowerCase())
        );
        return filteredList;
    };

    // $: console.log({ l: loadOptions() });

    const handleSelect = {};
 


$: if($globalTimeZone.label && browser) {

        const item = JSON.stringify($globalTimeZone)

        localStorage.setItem("timezone", item)

    }

</script>


<Select
    inputStyles="text-xs"
    class="header-select"
    {loadOptions}
    debounceWait={300}
    bind:value={$globalTimeZone}
    listAutoWidth={true}
    showChevron
    clearable={false}
>
    <div slot="chevron-icon">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            class="w-4 h-4"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
        </svg>
    </div>
</Select>

<style lang="postcss">
   :global(.header-select) {
        @apply text-sm border p-0 max-h-8 pl-4 pr-2 rounded !important;
       border: 1px solid #15803d !important;
    }

    :global(.header-select .svelte-select-list) {
        @apply min-w-[150px] -left-5 top-10 !important;
        
    }

 
        :global(.header-select .svelte-select-list div:hover) {
            background-color: #15803d !important;
            color: white !important;
        }
 
        :global(.header-select .svelte-select-list div.selected),
        :global(.header-select .svelte-select-list div[aria-selected="true"]) {
            background-color: #15803d !important;
            color: white !important;
        }

        /* Ensuring active item in dropdown is also highlighted */
        :global(.header-select .svelte-select-list div.active),
        .item.active {
            background: #15803d !important;
            color: white !important;
        }



    :global(.header-select .value-container) {
        @apply max-h-20 !important;
    }

    :global(.header-select .prepend) {
        
        @apply h-0 hidden !important;
    }

    /* :global(.header-select .selected-item) {
        @apply p-0 text-sm text-[#0066ff] relative  !important;
       
    } */

  .header-select .selected-item{
    padding: 0px !important;
    font-size: small !important;
    position: relative !important;
    background-color: #15803d !important; /* Green background */
    border: 1px solid #15803d !important; /* Green border */
    color: white !important; /* White text */
}


    /* :global(.header-select .selected-item) {
        @apply underline !important;
    } */

    :global(.header-select input) {
        @apply text-sm text-[#0066ff] leading-tight  !important;
        padding: 0px !important;
        
    }

    :global(.header-select input):hover + .selected-item {
        @apply underline !important;
        background-color: #15803d !important;
        /* padding: 0px !important; */
    }

    :global(.header-select input::placeholder) {
        @apply text-sm text-[#0066ff] !important;
        /* padding: 0px !important; */
    }

    :global(.header-select input::placeholder) {
        @apply underline !important;
    }

  
    :global(.header-select .indicators) {
    color: #15803d !important;
    }

    :global(.header-select .indicators .icon) {
        color: #15803d !important;
        display: block !important;
        padding-right: 20px !important;
        padding-top: 9px;
    }
    
    .header-select:hover {
        background-color: #15803d !important;
    }
 
</style>
  
