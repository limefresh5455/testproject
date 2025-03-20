import { browser } from "$app/environment";
import spacetime from "spacetime";
import { writable } from "svelte/store";

let timezone = "Asia/Calcutta";

if (browser && localStorage.getItem("timezone")) {
    timezone = JSON.parse(localStorage.getItem("timezone")).label;
}

export const globalTimeZone = writable({
    label: timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || "Choose Timezone"
});

export const timezones = spacetime.timezones();
