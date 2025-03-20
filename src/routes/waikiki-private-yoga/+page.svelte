<script>
  import Newsletter from "$lib/Components/Newsletter.svelte";
  import WpyRegisterAndLogin from "$lib/WaikikiPrivateYoga/WPYRegisterAndLogin.svelte";
  import WpySelectStudent from "$lib/WaikikiPrivateYoga/WPYSelectStudent.svelte";
  import WpySelectPaymentPage from "$lib/WaikikiPrivateYoga/WPYSelectPaymentPage.svelte";

  import { onMount, afterUpdate } from "svelte";
  let swiperInstance;
  let newsletterButtonColor = "orange-btn";
  import dayjs from "dayjs";
  import {
    currentDay,
    privateModalOpen,
    selectedSchedule,
    teachers,
  } from "$lib/store/private.store";
  import YogaPrivateModal from "$lib/WaikikiPrivateYoga/YogaPrivateModal.svelte";

  let selected = 0;
  let selectedTeacher = $teachers[0];
  let selectedOption = 0;
  let numberOfClasses = 1;
  let pax = 1;



  onMount(() => {
  teachers.subscribe(value => {
    if (value.length > 0) {
      selectedTeacher = value[0];  
      $selectedSchedule.selectedTeacher = selectedTeacher;
      $selectedSchedule.selectedDuration = selectedTeacher.options[0];  // Default duration सेट करें
      $selectedSchedule.numberOfClasses=numberOfClasses;
    }
  });
});

 
 

  function handleTeacherSelect(index) {

    teachers.update((t) => {
        return t.map((teacher, i) => ({
            ...teacher,
            selected: i === index, 
        }));
    });
    selectedTeacher = $teachers[index];  
    $selectedSchedule.selectedTeacher = selectedTeacher;

    if (selectedTeacher.options.length > 0) {
        $selectedSchedule.selectedDuration = selectedTeacher.options[selectedOption];
    }
    // console.log({ "selectedSchedule": $selectedSchedule });
}


  const handleDurationSelect = (index) => {   
    selectedOption = index;
    // $selectedSchedule.selectedDuration = $teachers[selected].options[index];
    if (selectedTeacher && selectedTeacher.options.length > index) {
        $selectedSchedule.selectedDuration = selectedTeacher.options[index];
    }
    // console.log({ "selectedSchedule": $selectedSchedule });
  };    

  function handleClassSelection(selectedNumber) {
    numberOfClasses = selectedNumber;
    $selectedSchedule.numberOfClasses = selectedNumber;
    // console.log("Updated selectedSchedule:", $selectedSchedule);
  }

 

  const handleDayClick = (index) => {
    $currentDay = index + 1;
    $privateModalOpen = true;
  };

  onMount(() => {
    initializeSwiper();
  });

  afterUpdate(() => {
    if (swiperInstance) swiperInstance.update();
  });

  function initializeSwiper() {
    swiperInstance = new Swiper(".home-showcaseSlider", {
      speed: 3000,
      slidesPerView: 1,
      parallax: true,
      autoplay: {
        delay: 12000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".showcaseSlider-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".showcaseSlider-next",
        prevEl: ".showcaseSlider-prev",
      },
      on: {
        init: function () {
          const firstSlide = document.querySelector(
            ".swiper-slide:first-child"
          );
          const filterElement = firstSlide.querySelector(".filter");

          if (filterElement) {
            filterElement.style.opacity = "0";
            filterElement.style.transition = "opacity 2s ease-in-out";

            setTimeout(() => {
              filterElement.style.transition = "opacity 3s ease-in-out";
              filterElement.style.opacity = "1";
            }, 5000);
          }

          const activeSlide = document.querySelector(".swiper-slide-active");
          const textContainer = activeSlide.querySelector(
            ".text-container .bigTitlejp"
          );
          const bigTitleText = activeSlide.querySelector(
            ".text-container .bigTitle"
          );

          if (textContainer) textContainer.style.animationName = "none";
          if (bigTitleText) bigTitleText.style.animationName = "none";
        },
        slideChangeTransitionStart: function () {
          const slides = document.querySelectorAll(".swiper-slide");
          slides.forEach((slide, index) => {
            const textContainer = slide.querySelector(
              ".text-container .bigTitlejp"
            );
            const bigTitleText = slide.querySelector(
              ".text-container .bigTitle"
            );

            if (index === this.previousIndex) {
              if (textContainer)
                textContainer.style.animationName = "slideOutToRight";
              if (bigTitleText)
                bigTitleText.style.animationName = "slideOutToLeft";
            }
          });
        },
        slideChangeTransitionEnd: function () {
          const activeSlide = document.querySelector(".swiper-slide-active");
          const textContainer = activeSlide.querySelector(
            ".text-container .bigTitlejp"
          );
          const bigTitleText = activeSlide.querySelector(
            ".text-container .bigTitle"
          );

          setTimeout(() => {
            if (textContainer) {
              textContainer.style.animationName = "none";
              textContainer.offsetHeight;
              textContainer.style.animationName = "slideInFromLeft";
            }
            if (bigTitleText) {
              bigTitleText.style.animationName = "none";
              bigTitleText.offsetHeight;
              bigTitleText.style.animationName = "slideInFromLeft";
            }
          }, 4000);
        },
        slideChange: function () {
          const slides = document.querySelectorAll(".swiper-slide");
          slides.forEach((slide, index) => {
            const filterElement = slide.querySelector(".filter");
            if (index === this.activeIndex) {
              filterElement.style.opacity = "0";
              filterElement.style.transition = "opacity 2s ease-in-out";
              setTimeout(() => {
                filterElement.style.transition = "opacity 2s ease-in-out";
                filterElement.style.opacity = "1";
              }, 7000);
            } else {
              if (filterElement) {
                filterElement.style.opacity = "0";
                filterElement.style.transition = "opacity 2s ease-in-out";
              }
            }
          });
        },
      },
    });
  }

  let activeClass = "";
  let isYogaPrivateVisible = true;
  let isYogaFormVisible = false;
  let isReserveFormVisible = false;
  let IsRegisterFormVisible = false;
  let IsShowClassDetails = false;

  // Scroll to the top of a specific form
  function scrollToForm() {
    const formElement = document.querySelector(".srcl");
    if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
 }

  // const handleSignUpClick = () => {
  //   activeClass = "activeblank";
  //   isYogaPrivateVisible = false;
  //   isYogaFormVisible = false;
  //   isReserveFormVisible = true;
  //   scrollToForm();
  // };

  function handleSignUpClick() {
    // Check if all selected classes have a date and time
    for (let i = 1; i <= numberOfClasses; i++) {
        const schedule = $selectedSchedule[`day${i}`];

        if (!schedule || !schedule.date || !schedule.slot) {
            alert(`Please select date and time for Day ${i} before signing up.`);
            return;
        }
    }
 
    activeClass = "activeblank";
    isYogaPrivateVisible = false;
    isYogaFormVisible = false;
    isReserveFormVisible = true;
    scrollToForm();
    
}


  const handleRegisterClick = () => {
    activeClass = "activeblank";
    isYogaPrivateVisible = false;
    isYogaFormVisible = false;
    isReserveFormVisible = false;
    IsRegisterFormVisible = true;
    scrollToForm();
  };

  const handleClassDetailslsShow = () => {
    activeClass = "activeblank";
    isYogaPrivateVisible = false;
    isYogaFormVisible = false;
    isReserveFormVisible = false;
    IsRegisterFormVisible = false;
    IsShowClassDetails = true;
    scrollToForm();
  };

  const handleBackToCalendarClick = () => {
    activeClass = "";
    IsRegisterFormVisible = false;
    isYogaFormVisible = false;
    isReserveFormVisible = false;
    IsShowClassDetails = false;
    isYogaPrivateVisible = true;
    scrollToForm();
  };

    
  
</script>



<section class="home-showcase">
  <div class="swiper home-showcaseSlider">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div
          class="swiper-image"
          data-swiper-parallax-x="3%"
          style="background-image:url('/assets/img/banner3.jpg')"
        >
          <div class="text-container">
            <h1 class="bigTitle">
              Schedule your <br />
              Private Yoga<br />
              Class in Waikiki
            </h1>
          </div>
          <div class="filter"></div>
        </div>
      </div>
      <div class="swiper-slide">
        <div
          class="swiper-image"
          data-swiper-parallax-x="3%"
          style="background-image:url('/assets/img/img1.jpg')"
        >
          <div class="text-container">
            <h1 class="bigTitlejp">
              時間と曜日を選べる<br />
              プライベートヨガを<br />
              ワイキキで
            </h1>
          </div>
          <div class="filter"></div>
        </div>
      </div>
    </div>
    <div class="swiper-pagination showcaseSlider-pagination"></div>
    <div class="showcaseSlider-nav">
      <div class="swiper-button-prev showcaseSlider-prev or2"></div>
      <div class="swiper-button-next showcaseSlider-next or2"></div>
    </div>
  </div>
  <a href="#scroll1" class="scrollSliderButton">
    Scroll
    <div class="line"></div>
  </a>
</section>
<section class="about-content-main" id="scroll1">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="about-cnt-in">
          <h2>
            Improve your body and mind with Waikiki Beach Yoga and make your
            trip to Hawaii even more enjoyable!
          </h2>
          <div class="box-container">
            <div class="box4">Box 1</div>
            <div class="box4">Box 2</div>
            <div class="box4">Box 3</div>
            <div class="box4">Box 4</div>
            <div class="box4">Box 5</div>
            <div class="box4">Box 6</div>
          </div>
          <p>
            Enjoy yoga in the tropical paradise of Waikiki Beach Park! The
            perfect location for a clear blue ocean, palm trees swaying in the
            breeze, and a tropical breeze. Why not enjoy a relaxing yoga session
            with the power of the sun?
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="calender-map orange-bg11">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="calender-in">
          <h2>Schedule</h2>
          <p>ビーチでヨガをしながら、体全体で昇る太陽と波の音を感じる。</p>
        </div>
        <br />

        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="imgst">
              <img
                src="assets/img/yoga3.jpg"
                class="img-fluid"
                alt="Morning Yoga"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="pricing-container-yg-green oranger">
              <h3>Waikiki Private Yoga</h3>
              <p>
                Yoga at a power spot in Waikiki, shining in the morning sun.
              </p>
              <div class="img-stst11">
                <img src="assets/img/any.png" class="img-fluid" alt="st" />
              </div>
              <div class="srcl"></div>
            </div>
          </div>
        </div>
        <br />

        <div class="calender-in">
          <h2>JOIN US FOR MORNING YOGA</h2>
          <p>下記カレンダーからクラスを選んで簡単申込み。</p>
        </div>
        <br />
        <div class="calender-in-btm">
          <div
            class="bcxform1"
            id="formbcxmain1"
            class:hidden={!isYogaPrivateVisible}
            style="padding: 35px;"
          >
            <div class="inquiry">
              <div class="chs-std-main">
                <h3>
                  Yoga Private <span class="badge badge-custom badge-zoom"
                    >ONLINE-ZOOM</span
                  >
                  <span class="badge badge-custom badge-inperson"
                    >IN-PERSON</span
                  >
                </h3>
              </div>

              <YogaPrivateModal/> 
              
              <div class="teacher-selection">
                <h4>Choose a Teacher from Below</h4>
                <div class="teacher-cards">
                  {#each $teachers as teacher, i}
                    <div
                      class="teacher-card {teacher.selected ? 'selected' : ''}"
                    >
                      <div class="teacher_img">
                        <img src={teacher.image} alt={teacher.name} />
                      </div>
                      <div class="teacher_detail">
                        <h3>{teacher.name}</h3>
                        <p>{teacher.designation}</p>
                        {#if teacher.selected}
                          <a class="button selected">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              class="w-5 h-5"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clip-rule="evenodd"
                              >
                              </path>
                            </svg>
                            <span>Selected</span>
                          </a>
                        {:else}
                          <a
                            class="button"
                            on:click={() => handleTeacherSelect(i)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clip-rule="evenodd"
                              >
                              </path>
                            </svg>
                            <span>Select</span>
                          </a>
                        {/if}
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
  
              <div class="options time_duration">
                <h4>Select Duration</h4>
                <div class="option-group">
                    {#each selectedTeacher.options as option, i}
                        <button 
                            on:click={() => handleDurationSelect(i)}
                            class={`${
                                selectedOption == i 
                                    ? "selected" 
                                    : ""
                            }  `}>
                            
                            {option.duration} mins<br>
                            ${option.amount}.00 <span>{option.currency}</span>
                            
                            {#if selectedOption == i}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="right_arrow">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/>
                                </svg>
                            {/if}
                        </button>
                    {:else}
                        <p>No duration options available</p>
                    {/each}
                </div>
             </div>
            
              <div class="options">
                <h4>Select Number of Classes</h4>
                <div class="option-group">
                  {#each Array(5) as _, i}
                    <button
                    on:click={() => handleClassSelection(i + 1)}
                      class={`${
                        numberOfClasses == i + 1 ? "selected" : " "
                      }   `}
                    >
                      {i + 1}
                    </button>
                  {/each}
                </div>

                {#if numberOfClasses === 5}
                  <p class="info flex items-center text-teal-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="w-5 h-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    You're now eligible for 1 bonus private
                  </p>
                {:else}
                  <p class="info">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="#facc15"
                      class="w-4 h-4"
                    >
                      <path
                        d="M10 1a6 6 0 00-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 00.572.729 6.016 6.016 0 002.856 0A.75.75 0 0012 15.1v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0010 1zM8.863 17.414a.75.75 0 00-.226 1.483 9.066 9.066 0 002.726 0 .75.75 0 00-.226-1.483 7.553 7.553 0 01-2.274 0z"
                      >
                      </path>
                    </svg>Sign up for 5 privates and receive 1 bonus
                  </p>
                {/if}
              </div>

             
              <div class="date-picker">
                <h4>Select Date & Time</h4>
                
                <!-- Iterate through the days -->
                {#each Array(numberOfClasses) as _, i}
                  <div class="select_date_time_box">
                    <div class="text-sm uppercase">Day {i + 1}</div>
                    <div  role="button" tabindex="0" on:keydown   class="select_date_time" on:click={() => handleDayClick(i)}>
                      <span>
                        { $selectedSchedule[`day${i + 1}`]?.slot ? $selectedSchedule[`day${i + 1}`]?.slot : "Choose Date" }
                      </span> 
                      <span class="timezone-box">
                        { $selectedSchedule[`day${i + 1}`]?.timezone ? $selectedSchedule[`day${i + 1}`]?.timezone : "" }
                      </span> 
                      <p>
                        {dayjs($selectedSchedule[`day${i + 1}`]?.date).format("YYYY-MM-DD") || "Choose Date"}
                      </p>
                    </div>
                  </div>
                {/each}
              
                <!-- Bonus Day for 5 classes -->
                {#if numberOfClasses === 5}
                  <div class="select_date_time_box">
                    <div class="text-sm uppercase">Day 6 (Bonus)</div>
                    <div role="button" tabindex="0" on:keydown class="select_date_time" on:click={() => handleDayClick(5)}>
                      <span>
                        { $selectedSchedule[`day${6}`]?.slot ? $selectedSchedule[`day${6}`]?.slot : "Choose Date" }
                      </span>
                      <span class="timezone-box">
                        { $selectedSchedule[`day${6}`]?.timezone ? $selectedSchedule[`day${6}`]?.timezone : "" }
                      </span> 
                      <p>
                        {dayjs($selectedSchedule[`day6`]?.date).format("YYYY-MM-DD") || "Choose Date"}
                      </p>
                    </div>
                  </div>
                {/if}
              </div>
          
              <div class="sign_up_btn">
                <button
                  class="btnbcx"
                  id="backToReserve"
                  on:click={handleSignUpClick}>Sign Up</button
                >
              </div>
            </div>
          </div>

          <WpyRegisterAndLogin
            {isReserveFormVisible}
            {handleBackToCalendarClick}
            {handleRegisterClick}
          />

          <WpySelectStudent
            {IsRegisterFormVisible}
            {handleBackToCalendarClick}
            {handleClassDetailslsShow}
          />

          <WpySelectPaymentPage
            {IsShowClassDetails}
            {handleBackToCalendarClick}
          />
        </div>
      </div>
    </div>
  </div>
</section>

<div class={`hide_with_form ${activeClass}`}>
  <section class="gatering-main" data-aos="fade-up">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="gathering-in">
            <h2>Gathering Spot</h2>
            <p>
              In front of Barefoot Beach Cafe on the ocean side (look for the
              cafe umbrella)
            </p>
            <br />
            <div class="map-main">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3718.1300024677926!2d-157.8222394!3d21.266321!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c00726ff958afd7%3A0x283d722b912d17d2!2sBarefoot%20Beach%20Cafe%20%40%20Queen&#39;s%20Surf%20Beach!5e0!3m2!1sen!2sin!4v1731933527275!5m2!1sen!2sin"
                width="100%"
                height="400"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Youtube-video"
              ></iframe>
            </div>
            <h3>Barefoot Beach Cafe</h3>
            <p>
              With the Waikiki hotels behind you, walk along the beach towards
              Kapiolani Park. Just past the white lifeguard tower on the beach,
              the "2F" lifeguard tower, you will find Barefoot Beach Cafe,
              popular among locals. Please come to the front of the cafe on the
              ocean side. After gathering, we will move to the shade of the
              trees in the park, so please come early so you don't get late.
              It's about a 15-minute walk from the Moana Surfrider. Enjoy a
              morning stroll through the beach park.
            </p>
            <div class="img-beach">
              <img
                src="/assets/img/beach.jpg"
                alt="yoga-beach"
                class="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="faq-main-detail padd1" data-aos="fade-up">
    <div class="container">
      <h2 class="heading-main">Class Detail</h2>
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <div class="faq-in">
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="heading1">
                  <button
                    class="accordion-button collapsed htg2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse1"
                    aria-expanded="false"
                    aria-controls="collapse1"
                  >
                    Day
                  </button>
                </h2>
                <div
                  id="collapse1"
                  class="accordion-collapse collapse"
                  aria-labelledby="heading1"
                  data-bs-parent="#accordionExample"
                  style=""
                >
                  <div class="accordion-body ypy-page">
                    <div class="links-acrd">
                      <a href="#">Monday</a>
                      <a href="#">Tuesday</a>
                      <a href="#">Wednesday</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button
                    class="accordion-button collapsed htg2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Time
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body ypy-page">
                    <p>12:12 AM</p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="heading3">
                  <button
                    class="accordion-button collapsed htg2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse3"
                    aria-expanded="false"
                    aria-controls="collapse3"
                  >
                    Price
                  </button>
                </h2>
                <div
                  id="collapse3"
                  class="accordion-collapse collapse"
                  aria-labelledby="heading3"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body ypy-page">$000</div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="h4">
                  <button
                    class="accordion-button collapsed htg2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#cl4"
                    aria-expanded="false"
                    aria-controls="cl4"
                  >
                    Place
                  </button>
                </h2>
                <div
                  id="cl4"
                  class="accordion-collapse collapse"
                  aria-labelledby="h4"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body ypy-page">Name</div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="h5">
                  <button
                    class="accordion-button collapsed htg2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#cl5"
                    aria-expanded="false"
                    aria-controls="cl5"
                  >
                    Calculation
                  </button>
                </h2>
                <div
                  id="cl5"
                  class="accordion-collapse collapse"
                  aria-labelledby="h5"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body ypy-page">$000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="faq-in">
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="heading4">
                  <button
                    class="accordion-button collapsed htg2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse4"
                    aria-expanded="false"
                    aria-controls="collapse4"
                  >
                    What to bring?
                  </button>
                </h2>
                <div
                  id="collapse4"
                  class="accordion-collapse collapse"
                  aria-labelledby="heading4"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body ypy-page">
                    It is hidden by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="heading5">
                  <button
                    class="accordion-button collapsed htg2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse5"
                    aria-expanded="false"
                    aria-controls="collapse5"
                  >
                    Helpful hints
                  </button>
                </h2>
                <div
                  id="collapse5"
                  class="accordion-collapse collapse"
                  aria-labelledby="heading5"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body ypy-page">
                    These classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="heading6">
                  <button
                    class="accordion-button collapsed htg2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse6"
                    aria-expanded="false"
                    aria-controls="collapse6"
                  >
                    Weather
                  </button>
                </h2>
                <div
                  id="collapse6"
                  class="accordion-collapse collapse"
                  aria-labelledby="heading6"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body ypy-page">
                    These classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="heading7">
                  <button
                    class="accordion-button collapsed htg2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse7"
                    aria-expanded="false"
                    aria-controls="collapse7"
                  >
                    Class change
                  </button>
                </h2>
                <div
                  id="collapse7"
                  class="accordion-collapse collapse"
                  aria-labelledby="heading7"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body ypy-page">
                    These classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="heading8">
                  <button
                    class="accordion-button collapsed htg2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse8"
                    aria-expanded="false"
                    aria-controls="collapse8"
                  >
                    Cancelation
                  </button>
                </h2>
                <div
                  id="collapse8"
                  class="accordion-collapse collapse"
                  aria-labelledby="heading8"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body ypy-page">
                    These classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="follow-main" data-aos="fade-up">
    <div class="container">
      <h2 class="heading-main-follow">Follow me!</h2>
      <div class="box-container">
        <div class="box8">Box 1</div>
        <div class="box8">Box 2</div>
        <div class="box8">Box 3</div>
        <div class="box8">Box 4</div>
        <div class="box8">Box 5</div>
        <div class="box8">Box 6</div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-4">
          <a href="https://x.com/i/flow/login">
            <div class="feed-in">
              <div class="img_feed">
                <img
                  src="/assets/img/img4.png"
                  alt="yoga-img4"
                  class="img-fluid"
                />
                <div class="overlay">
                  <img
                    src="/assets/img/twit.png"
                    alt="yoga-twit"
                    class="img-fluid"
                  />
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="col-lg-4">
          <a href="https://www.instagram.com/accounts/login/">
            <div class="feed-in">
              <div class="img_feed">
                <img
                  src="/assets/img/img3.png"
                  alt="yoga-img3"
                  class="img-fluid"
                />
                <div class="overlay">
                  <img
                    src="/assets/img/ins.png"
                    alt="yoga-ins"
                    class="img-fluid"
                  />
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="col-lg-4">
          <a href="https://www.facebook.com/login/">
            <div class="feed-in">
              <div class="img_feed">
                <img src="/assets/img/img2.jpg" alt="img2" class="img-fluid" />
                <div class="overlay">
                  <img
                    src="/assets/img/face.png"
                    alt="yoga-face"
                    class="img-fluid"
                  />
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <div class="imgst v1">
            <img
              src="/assets/img/yoga4.jpg"
              class="img-fluid"
              alt="Morning Yoga"
            />
          </div>
        </div>
        <div class="col-md-7">
          <div class="pricing-container-yg oranger">
            <h3>Instructor</h3>
            <p>
              Masumi / Lives in Honolulu. Spreads the word about yoga that
              "everyone can enjoy." Holds cooking classes on the idea that food
              is medicine (Indian medicine/Ayurveda). Utilizing her 20+ years of
              experience in English education, she is active in a wide range of
              fields, including English courses for learning about yoga around
              the world and "Yoga taught in English." Her bases of operations
              are Waikiki and Tokyo. She co-teachs and manages the school with
              her husband Ted. She is YAT600/RYT500 certified. Morning yoga will
              be taught by Masumi in Japanese. I'm looking forward to seeing
              you!
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="video-yt">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="yt-main">
            <iframe
            width="100%"
            height="500"
            src="https://www.youtube-nocookie.com/embed/eL9UfALQrhk?si=U-IVy6fyKiGGz6Oa&rel=0&autoplay=0&loop=1&playlist=eL9UfALQrhk"
            title="YouTube video player"
            frameborder="0"
            allow="web-share"
            style="border-radius: 10px; overflow: hidden;"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          >
            </iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="awareness-main orange-bg">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="awareness-main-in">
            <div class="img-lg">
              <img
                src="/assets/img/logo.png"
                alt="Yoga-waikiki-logo"
                class="img-fluid"
              />
            </div>
            <div class="img-bottom">
              <div class="img-btm">
                <img
                  src="https://yogawaikikibeach.com/wp-content/themes/YogaAwareness/images/common/common_course_pic_01.jpg"
                  class="img-fluid"
                  alt="Yoga-waikiki"
                />
                <h3>Self training</h3>
                <div class="">
                  <a class="cta arrow-button cnt orange-btn mobile-mr" href="#">
                    Learn more
                    <img
                      src="/assets/img/right.png"
                      alt="Yoga-waikiki-right"
                      class="img-fluid"
                    />
                  </a>
                </div>
              </div>
              <div class="img-btm">
                <img
                  src="https://yogawaikikibeach.com/wp-content/themes/YogaAwareness/images/common/common_course_pic_03.jpg"
                  class="img-fluid"
                  alt="Yoga-waikiki"
                />
                <h3>Teacher training</h3>
                <div class="">
                  <a class="cta arrow-button cnt orange-btn" href="#">
                    Learn more
                    <img
                      src="/assets/img/right.png"
                      alt="Yoga-waikiki-right"
                      class="img-fluid"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div class="box-btm">
              <div class="btm-set-lft">
                <img
                  src="https://yogawaikikibeach.com/wp-content/themes/YogaAwareness/images/common/common_course_ryt_img.png"
                  class="img-fluid"
                  alt="Yoga-waikiki"
                />
              </div>
              <div class="btm-set-rgt">
                <p>
                  Learn in Waikiki and Tokyo! Short-term yoga and Ayurveda
                  courses. Yoga Alliance certified RYT200/RYT500 instructor
                  training course. Popular for its detailed instruction and
                  reliable support. Please feel free to contact us.
                </p>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Newsletter {newsletterButtonColor} />
  
</div>

<style>
  .hidden {
    display: none !important;
  }

  .select_date_time_box{
    display: inline-block;
    text-decoration: none;
    font-size: 16px;
    margin-right: 10px;
    color: #c2410c;
}

.select_date_time_timeZone{
    display: inline-block; 
    text-decoration: none;
    border: 1px solid #c2410c;
    font-size: 16px;
    border-radius: 5px;
    color: #c2410c;
    width: 164px;
    padding: 22px 20px 22px 16px;
    background-color: white;
}

/* Change hover color of dropdown items */
.dropdown-item:hover {
  background-color: #c2410c;
  color: white;  /* Optional: Change text color for better contrast */
}

 
.select_date_time .timezone-box {
    font-size: 15px;
    font-weight: bold;
    margin-left: 3px;
    color: #c2410c;
    opacity: 0.9;
}

 
</style>
