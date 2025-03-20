<script>
  import { goto } from "$app/navigation";
  import ChatWithUs from "./ChatWithUs.svelte";
  import { page } from '$app/stores';
  import { onMount } from "svelte";

    // State to hold the current header class
    let headerClass = 'ykb';
    let arrowConnectWithUs = '';
    let smallarrowConnectWithUs = '';
    let mobileresponsiveNavbar='n1'
    let mobileResponsiveTextColor=""
    let isModalVisible = false;
    let isNavbarOpen = false;

const toggleNavbar = () => {
  isNavbarOpen = !isNavbarOpen;
};

const closeNavbar = () => {
  isNavbarOpen = false;
};

// Optional: Close navbar on page navigation
onMount(() => {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', closeNavbar,{ passive: true });
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', closeNavbar);
      });
    };
});
    
    const toggleModal = () => {
    isModalVisible = !isModalVisible; // Toggle the visibility
  };

 

  // Check the URL and call the appropriate function when the page loads
  $: {
    if ($page.url.pathname === "/") {
      headerClass = 'ykb';
      arrowConnectWithUs = '';
      smallarrowConnectWithUs = '';
      mobileresponsiveNavbar='n1';
      mobileResponsiveTextColor="";
    } else if ($page.url.pathname.startsWith("/waikiki-morning-yoga")) {
    if ($page.url.pathname !== "/waikiki-morning-yoga") {
      goto("/waikiki-morning-yoga");
    }
      headerClass = 'ymg';
      arrowConnectWithUs = 'gr1';
      smallarrowConnectWithUs = 'grarw';
      mobileresponsiveNavbar='n2';
      mobileResponsiveTextColor="cm1";
    } else if ($page.url.pathname.startsWith("/waikiki-private-yoga")) {
    if ($page.url.pathname !== "/waikiki-private-yoga") {
        goto("/waikiki-private-yoga");
        }
      headerClass = 'ympr';
      arrowConnectWithUs = 'orange-btn1';
      smallarrowConnectWithUs = 'orarw';
      mobileresponsiveNavbar='n3';
      mobileResponsiveTextColor="cm2";
    }
  }
</script>
  
  <header class={`header ${headerClass}`}>
      <nav class="navbar navbar-expand-lg">
          <div class="container">
              <button class="navbar-toggler" on:click={toggleNavbar} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon">
                      <img src="/assets/img/menu.png" class="img-fluid" alt="menu">
                  </span>
              </button>
              <div class={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarSupportedContent">
                  <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                      <li class="nav-item">
                          <a class={`nav-link clnv1   ${mobileresponsiveNavbar}`} aria-current="page" href="/"  >Yoga Waikiki Beach <span>ヨガ ワイキキビーチ</span></a>
                      </li>
                      <li class="nav-item">
                          <a class={`nav-link clnv2    ${mobileresponsiveNavbar}`} aria-current="page" href="/waikiki-morning-yoga"  >Waikiki Morning Yoga <span>ワイキキ モーニングヨガ</span></a>
                      </li>
                      <li class="nav-item">
                          <a class={`nav-link clnv3   ${mobileresponsiveNavbar}`} aria-current="page" href="/waikiki-private-yoga"  >Waikiki Private Yoga <span>ワイキキ プライベートヨガ</span></a>
                      </li>
                      <li class="nav-item">
                          <div class="cta-header" role="button"   tabindex="0" on:keydown={(event) => (event.key === 'Enter' || event.key === ' ') && toggleModal()}  on:click={toggleModal}>
                              <div class="btn-main-connect">Connect with us</div>
                              <div class={`img-icon-right-header ${arrowConnectWithUs}`}>
                                  <img src="/assets/img/rightr.png" class="img-fluid" alt="rightr">
                              </div>
                            </div>
                      </li>
                      <li class="nav-item">
                          <div class="social-icon">
                              <a href="#"><img src="/assets/img/twitter.png" class="img-fluid" alt="twitter"></a>
                              <a href="#"><img src="/assets/img/instagram.png" class="img-fluid" alt="instagram"></a>
                              <a href="#"><img src="/assets/img/facebook.png" class="img-fluid" alt="facebook"></a>
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
          <div class="header-arrow">
              <a class="cta-header5" href="javascript:void(0);" on:click={toggleModal}>
                  <div class={`img-icon-right-header ${smallarrowConnectWithUs}`}>
                      <img src="/assets/img/rightr.png" class="img-fluid" alt="rightr">
                  </div>
              </a>
          </div>
          {#if headerClass == "ykb"}
          <div class="act-pg">
            <a href="/">
                Yoga Waikiki Beach
               <span>ヨガ ワイキキビーチ</span>
               </a>
         </div> 
         {/if}
         {#if headerClass == "ymg"}
          <div class="act-pg cm1">
              <a href="/waikiki-morning-yoga">Waikiki Morning Yoga <span>ワイキキ モーニングヨガ</span></a>
          </div>
        {/if}
        {#if headerClass == "ympr"}
          <div class="act-pg  cm2">
            <a href="/waikiki-private-yoga">Waikiki Private Yoga
               <span>ワイキキ モーニングヨガ</span></a>
         </div>
         {/if}
          <div class="social-iconh1">
              <a href="#"><img src="/assets/img/twitter.png" class="img-fluid" alt="twitter"></a>
              <a href="#"><img src="/assets/img/instagram.png" class="img-fluid" alt="instagram"></a>
              <a href="#"><img src="/assets/img/facebook.png" class="img-fluid" alt="facebook"></a>
          </div>
      </nav>
  </header>
        {#if isModalVisible}
        <ChatWithUs  {toggleModal} {headerClass}/>
        {/if}
  <style>
       
  </style>
  