<script>
    import { timezones,globalTimeZone } from "$lib/store/main.store";
    import spacetime from "spacetime";
    import soft from "timezone-soft";
    const time = spacetime($$props.time).goto($globalTimeZone.label);
</script>

{#if $$props.display == "time"}
    {time.time()}
{:else if $$props.display == "timezone"}
    {soft($globalTimeZone.label)[0].standard.abbr}
 
{:else if $$props.display == "time-timezone"}
    {time.time()} {soft($globalTimeZone.label)[0].standard.abbr}
{:else if $$props.display == "full-date"}
    {time.format()}
{:else if $$props.display == "date"}
    {time.date()}
{:else if $$props.display == "short-month"}
    {time.format("month-short")}
{:else}
    {soft($globalTimeZone.label)[0].standard.abbr}
{/if}