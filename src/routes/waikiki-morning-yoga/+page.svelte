<script>
  import Newsletter from "$lib/Components/Newsletter.svelte";
  import { GetCalenderData, GetClassScheduleById, GetCurrencies, GetInquiryService, GetLocalLanguage, GetProfileService } from "$lib/Service";
  import SelectPaymentPage from "$lib/WaikikiMorningYoga/SelectPaymentPage.svelte";
  import SelectStudent from "$lib/WaikikiMorningYoga/SelectStudent.svelte";
  import WmyRegisterAndLogin from "$lib/WaikikiMorningYoga/WMYRegisterAndLogin.svelte";
  import YogaClassSingle from "$lib/WaikikiMorningYoga/YogaClassSingle.svelte";
  import YogaClassSingleMultiple from "$lib/WaikikiMorningYoga/YogaClassSingleMultiple.svelte";
  import { onMount, afterUpdate } from "svelte";
  let swiperInstance;
  let newsletterButtonColor = "green-btn";

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();
  let selectedDate = null;
  let calenderDetails=[];
  let filteredData = [];
  let localLanguages = [];
  let localCurrency = {};
  let scheduleTeacher = {};
  let inquiryData = {};
  let profileData = {};


  onMount(async() => {
    initializeSwiper();
    await fetchCalenderData(currentMonth,currentYear)
    generateCalendar(currentYear, currentMonth); 
  });
 
  const months = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];

  const daysOfWeek = ["月", "火", "水", "木", "金", "土", "日"];

  let days = [];

 
// const availableDates = new Set(["2025-02-25","2025-02-28","2025-02-23", "2025-03-26", "2025-03-25"]); // Available dates
const availableDates = new Set();  

function generateCalendar(year, month) {
  let firstDay = new Date(year, month, 1).getDay();
  let lastDate = new Date(year, month + 1, 0).getDate();
  let prevMonthLastDate = new Date(year, month, 0).getDate();
  let today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

  let tempDays = [];
  let date = 1;
  let nextMonthDate = 1;

  for (let i = 0; i < 6; i++) {
    let row = [];
    for (let j = 0; j < 7; j++) {
      let fullDate;
      if (i === 0 && j < (firstDay || 7) - 1) {
        fullDate = new Date(year, month - 1, prevMonthLastDate - ((firstDay || 7) - 2 - j));
      } else if (date > lastDate) {
        fullDate = new Date(year, month + 1, nextMonthDate++);
      } else {
        fullDate = new Date(year, month, date++);
      }

      let formattedDate = `${fullDate.getFullYear()}-${String(fullDate.getMonth() + 1).padStart(2, "0")}-${String(fullDate.getDate()).padStart(2, "0")}`;

      let isPast = fullDate < today;
      let isAvailable = availableDates.has(formattedDate);
      let isFuture = fullDate >= today && !isAvailable;
      let isSelected = formattedDate === selectedDate;
      row.push({
        date: fullDate,
        isAvailable,
        isPast,
        isFuture,
        isSelected,
      });
    }
    tempDays.push(row);
  }
  console.log(tempDays,"tempDays")

  days = tempDays;
}



  function changeMonth(event) {
    currentMonth = Number(event.target.value);
    generateCalendar(currentYear, currentMonth);
    fetchCalenderData(currentMonth,currentYear);
  }

  function changeYear(event) {
    currentYear = Number(event.target.value);
    generateCalendar(currentYear, currentMonth);
    fetchCalenderData(currentMonth,currentYear);
  }


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
      passiveListeners: true,
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
            },5000);
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
          },4000);
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

 


  const fetchCalenderData=async(month,year)=>{
    try{
 
    const res = await GetCalenderData(month,year);
    const resCurrencies= await GetCurrencies()
    localCurrency=resCurrencies
    const resLocalLanguage= await GetLocalLanguage()
    localLanguages=resLocalLanguage.data
    if (res.status === 201 || res.status === 200) {
        //  console.log(res.data.results,"response")
        //  console.log(localCurrency,"localCurrency")
        //  console.log(localLanguages,"localLanguages")
         calenderDetails= [
        {
            "isOffline": false,
            "isOnline": true,
            "published": false,
            "isLive": true,
            "isCancelled": false,
            "tag": "678de4785f7c6bdabbec796c",
            "durationHrs": 0,
            "durationMins": 0,
            "cancelConfig": {
                "isVideo": false
            },
            "limits": {
                "minStudents": 1,
                "maxStudents": 20,
                "_id": "678de4785f7c6bdabbec797a",
                "lastDate": null,
                "lastTime": null,
                "closesBeforeHrs": 1,
                "actualExpiry": "2025-03-24T17:00:00.000Z"
            },
            "pricing": {
                "ya": "15",
                "nonya": "20"
            },
            "timezone": {
                "name": "us/hawaii",
                "value": {
                    "offset": -10,
                    "hem": "n",
                    "v": "us/hawaii"
                }
            },
            "actual_time": "2025-03-24T18:00:00.000Z",
            "actual_teacher": "65a4bf0b53462276ecc5b272",
            "actual_timezone": "us/hawaii",
            "teacher": {
                "label": "Tedd Surman",
                "id": "65a4bf0b53462276ecc5b272",
                "level": 1
            },
            "language": "6387187118e0793d24118ebf",
            "currency": "636f78313c1e591f8d8cca8b",
            "date": "2025-03-24", 
            "time": "08:00",
            "created_by": "65a4bf0b53462276ecc5b26f",
            "students": [
                {
                    "due": 20,
                    "paid": 0,
                    "currency": "USD",
                    "profile": "67610ba8df88760eaca8712f",
                    "firstname": "Druv",
                    "lastname": "Rathi",
                    "actual_currency": "636f78313c1e591f8d8cca8b",
                    "order": "6790721d2a00414538bfd745",
                    "updatedAt": "2025-01-22T04:20:47.858Z"
                },
                {
                    "due": 20,
                    "paid": 0,
                    "currency": "USD",
                    "profile": "66d16f1828afdd042fdcd65b",
                    "firstname": "TestM",
                    "lastname": "DemoM",
                    "actual_currency": "636f78313c1e591f8d8cca8b",
                    "order": "67931cc35f7c6bdabbeca2c6",
                    "updatedAt": "2025-01-24T04:53:23.347Z"
                },
                {
                    "due": 20,
                    "paid": 0,
                    "currency": "USD",
                    "profile": "65a4bf0b53462276ecc5b272",
                    "firstname": "Tedd",
                    "lastname": "Surman",
                    "actual_currency": "636f78313c1e591f8d8cca8b",
                    "order": "679af179375f4b44488a7cae",
                    "updatedAt": "2025-01-30T03:26:49.121Z"
                }
            ],
            "id": "678de4785f7c6bdabbec7979"
        },
        {
            "isOffline": false,
            "isOnline": true,
            "published": false,
            "isLive": true,
            "isCancelled": false,
            "tag": "678de4785f7c6bdabbec796c",
            "durationHrs": 0,
            "durationMins": 0,
            "cancelConfig": {
                "isVideo": false
            },
            "limits": {
                "minStudents": 1,
                "maxStudents": 20,
                "_id": "678de4785f7c6bdabbec7974",
                "lastDate": null,
                "lastTime": null,
                "closesBeforeHrs": 1,
                "actualExpiry": "2025-03-26T17:00:00.000Z"
            },
            "pricing": {
                "ya": "15",
                "nonya": "20"
            },
            "timezone": {
                "name": "us/hawaii",
                "value": {
                    "offset": -10,
                    "hem": "n",
                    "v": "us/hawaii"
                }
            },
            "actual_time": "2025-03-26T18:00:00.000Z",
            "actual_teacher": "65a4bf0b53462276ecc5b272",
            "actual_timezone": "us/hawaii",
            "teacher": {
                "label": "Tedd Surman",
                "id": "65a4bf0b53462276ecc5b272",
                "level": 1
            },
            "language": "6387187118e0793d24118ebf",
            "currency": "636f78313c1e591f8d8cca8b",
            "date": "2025-03-26", 
            "time": "08:00",
            "created_by": "65a4bf0b53462276ecc5b26f",
            "students": [
                {
                    "due": 20,
                    "paid": 0,
                    "currency": "USD",
                    "profile": "676245ec1987010930c6a8a9",
                    "firstname": "Nikol",
                    "lastname": "tesla",
                    "actual_currency": "636f78313c1e591f8d8cca8b",
                    "order": "679b51aeed35a82d80de882c",
                    "updatedAt": "2025-01-30T10:17:20.029Z"
                },
                {
                    "due": 20,
                    "paid": 0,
                    "currency": "USD",
                    "profile": "65a4bf0b53462276ecc5b272",
                    "firstname": "Tedd",
                    "lastname": "Surman",
                    "actual_currency": "636f78313c1e591f8d8cca8b",
                    "order": "67a025af8aadda652744053f",
                    "updatedAt": "2025-02-03T02:10:55.534Z"
                }
            ],
            "id": "678de4785f7c6bdabbec7973"
        },
        {
            "isOffline": false,
            "isOnline": true,
            "published": false,
            "isLive": true,
            "isCancelled": false,
            "tag": "678de4785f7c6bdabbec796c",
            "durationHrs": 0,
            "durationMins": 0,
            "cancelConfig": {
                "isVideo": false
            },
            "limits": {
                "minStudents": 1,
                "maxStudents": 20,
                "_id": "678de4785f7c6bdabbec7974",
                "lastDate": null,
                "lastTime": null,
                "closesBeforeHrs": 1,
                "actualExpiry": "2025-03-26T17:00:00.000Z"
            },
            "pricing": {
                "ya": "15",
                "nonya": "20"
            },
            "timezone": {
                "name": "us/hawaii",
                "value": {
                    "offset": -10,
                    "hem": "n",
                    "v": "us/hawaii"
                }
            },
            "actual_time": "2025-03-26T18:00:00.000Z",
            "actual_teacher": "65a4bf0b53462276ecc5b272",
            "actual_timezone": "us/hawaii",
            "teacher": {
                "label": "Tedd Surman",
                "id": "65a4bf0b53462276ecc5b272",
                "level": 1
            },
            "language": "6387187118e0793d24118ebf",
            "currency": "636f78313c1e591f8d8cca8b",
            "date": "2025-03-26", 
            "time": "08:00",
            "created_by": "65a4bf0b53462276ecc5b26f",
            "students": [
                {
                    "due": 20,
                    "paid": 0,
                    "currency": "USD",
                    "profile": "676245ec1987010930c6a8a9",
                    "firstname": "Nikol",
                    "lastname": "tesla",
                    "actual_currency": "636f78313c1e591f8d8cca8b",
                    "order": "679b51aeed35a82d80de882c",
                    "updatedAt": "2025-01-30T10:17:20.029Z"
                },
                {
                    "due": 20,
                    "paid": 0,
                    "currency": "USD",
                    "profile": "65a4bf0b53462276ecc5b272",
                    "firstname": "Tedd",
                    "lastname": "Surman",
                    "actual_currency": "636f78313c1e591f8d8cca8b",
                    "order": "67a025af8aadda652744053f",
                    "updatedAt": "2025-02-03T02:10:55.534Z"
                }
            ],
            "id": "678de4785f7c6bdabbec7977"
        }]
        // Extract available dates
      availableDates.clear();
      calenderDetails.forEach((item) => {
        if (item.date) {
          availableDates.add(item.date);
        }
      });
      generateCalendar(year, month);
      // console.log(availableDates,"availableDates")
      }
    }catch(error){
      console.log("Error fetching calendar data:", error);
    }
  }

  const formatDate = (date) => {
    const Dates = new Date(date);
    const year = Dates.getFullYear();
    const month = String(Dates.getMonth() + 1).padStart(2, '0');  
    const day = String(Dates.getDate()).padStart(2, '0');  
    return `${year}-${month}-${day}`;
};



async function selectDate(date) {
  try {
    const selectedDateFormatted = formatDate(date);

    filteredData = calenderDetails.filter((item) => {
      const itemDate = formatDate(item.date);
      return itemDate === selectedDateFormatted;
    });

    if (filteredData.length > 1) {
      selectedDate = date;
      handleDateClick();  
    } else if (filteredData.length === 1) {
      selectedDate = date;
      const selectedId = filteredData[0].id;
      const res = await GetClassScheduleById(selectedId);
      if (res.status === 200) {
        scheduleTeacher = res.data;
        handleSelectClass();  
      }
    }
  } catch (error) {
    console.error("Error in selectDate:", error);
  }
}




  let activeClass = "";
  let isCalendarVisible = true;
  let isSelectClasses = false;
  let isYogaFormVisible = false;
  let isReserveFormVisible = false;
  let IsRegisterFormVisible = false;
  let IsShowClassDetails = false;

 

  function scrollToForm() {
    const formElement = document.querySelector(".srcl");
    if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
 }


 const handleTeacherSelectClass = async (Id) => {
  try {
    const res = await GetClassScheduleById(Id);
    if (res.status === 200 || res.status === 201) {
      scheduleTeacher = res.data; 
      handleSelectClass(); 
    }  
  } catch (error) {
    console.error("Error fetching class schedule:", error);
  }
};

const handleSignUpInquiryData=async(data)=>{
  try {
    // console.log(data,"data inquiry")
    scheduleTeacher = data; 
    handleSignUpClick();
  } catch (error) {
    console.error("Error fetching in SignUp Inquiry :", error);
  }
}

const handleRegisterUserClick=async(id)=>{
  try {
     if(id){
      const res=await GetInquiryService(id)
      if(res.status ===200||res.status===201){
        inquiryData=res.data
        const userId=res.data?.user?.id
        if(userId){
          const res = await GetProfileService(userId)
          profileData=res.data
          handleRegisterClick();
        }
      }
     }
    
  } catch (error) {
    console.error("Error fetching in handleRegisterUserClick:", error);
  }
}


  // Event handler to handle calendar date click
  const handleDateClick = () => {
    activeClass = "activeblank";
    isCalendarVisible = false;
    isSelectClasses = true;
    scrollToForm();
  };

  const handleSelectClass = () => {
    activeClass = "activeblank";
    isCalendarVisible = false;
    isSelectClasses = false;
    isYogaFormVisible = true;
    scrollToForm();
  };

  // Event handler to handle "Sign Up" button click
  const handleSignUpClick = () => {
    activeClass = "activeblank";
    isCalendarVisible = false;
    isSelectClasses = false;
    isYogaFormVisible = false;
    isReserveFormVisible = true;
    scrollToForm();
  };

  const handleRegisterClick = () => {
    activeClass = "activeblank";
    isCalendarVisible = false;
    isSelectClasses = false;
    isYogaFormVisible = false;
    isReserveFormVisible = false;
    IsRegisterFormVisible = true;
    scrollToForm();
  };

  const handleClassDetailslsShow = () => {
    activeClass = "activeblank";
    isCalendarVisible = false;
    isYogaFormVisible = false;
    isSelectClasses = false;
    isReserveFormVisible = false;
    IsRegisterFormVisible = false;
    IsShowClassDetails = true;
    scrollToForm();
  };

  // Event handler to go back to calendar
  const handleBackToCalendarClick = () => {
    activeClass = "";
    isCalendarVisible = true;
    IsRegisterFormVisible = false;
    isYogaFormVisible = false;
    isSelectClasses = false;
    isReserveFormVisible = false;
    IsShowClassDetails = false;
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
          style="background-image:url(/assets/img/banner2.jpg)"
        >
          <div class="text-container">
            <h1 class="bigTitle">
              Join our<br />
              Morning Yoga<br />
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
              鳥のさえずりがBGMの<br />
              ワイキキモーニングヨガ<br />
              にようこそ
            </h1>
          </div>
          <div class="filter"></div>
        </div>
      </div>
    </div>
    <div class="swiper-pagination showcaseSlider-pagination"></div>
    <div class="showcaseSlider-nav">
      <div class="swiper-button-prev showcaseSlider-prev gr2"></div>
      <div class="swiper-button-next showcaseSlider-next gr2"></div>
    </div>
  </div>
  <a href="#scroll1" class="scrollSliderButton"
    >Scroll
    <div class="line"></div></a
  >
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
            <div class="box2">Box 1</div>
            <div class="box2">Box 2</div>
            <div class="box2">Box 3</div>
            <div class="box2">Box 4</div>
            <div class="box2">Box 5</div>
            <div class="box2">Box 6</div>
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

<section class="calender-map calender_wmy">
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
                src="/assets/img/yoga3.jpg"
                class="img-fluid"
                alt="Morning Yoga"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="pricing-container-yg-green">
              <h3>Waikiki Morning Yoga</h3>
              <p>
                Yoga at a power spot in Waikiki, shining in the morning sun.
              </p>
              <div class="price11">At 7:45 AM & 8:00 AM (60 minutes)</div>
              <div class="img-stst">
                <img src="/assets/img/ts.png" class="img-fluid" alt="ts" />
                <img src="/assets/img/st.png" class="img-fluid" alt="st" />
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

        <div class="calender-in-btm" class:hidden={!isCalendarVisible} data-aos="fade-up"  id="formbcxmain" >
          <main>
            <form>
              <div class="calendar">
                <div class="top">
                  <label>
                    <select
                      class="month"
                      name="months"
                      size="1"
                      on:change={changeMonth}
                    >
                      {#each months as month, index}
                        <option value={index} selected={index === currentMonth}
                          >{month}</option
                        >
                      {/each}
                    </select>
                  </label>
                  <label>
                    <select
                      class="year year-selector"
                      name="years"
                      size="1"
                      on:change={changeYear}
                    >
                      {#each Array(15)
                        .fill()
                        .map((_, i) => 2025 - i) as year}
                        <option value={year} selected={year === currentYear}
                          >{year}</option
                        >
                      {/each}
                    </select>
                  </label>
                </div>

                <div class="week">
                  {#each daysOfWeek as day}
                    <div class="week1">{day}</div>
                  {/each}
                </div>


                <div class="date">
                  {#each days as row}
                    <div class="date__row">
                      {#each row as item}
                        {#if item}
                          <div
                            class="date__number 
                              {selectedDate?.toDateString() === item.date.toDateString() ? 'selected' : ''}
                              {item.isPast ? 'past' : item.isAvailable ? 'available' : 'future'}"
                            on:click={() => !item.isPast && item.isAvailable && selectDate(item.date)}
                            role="button"   tabindex="0" on:keydown
                          >
                            {item.date.getDate()}
                          </div>     
                        {:else}
                          <div class="date__number disable"></div>
                        {/if}
                      {/each}
                    </div>
                  {/each}
                </div>
              </div>
            </form>
          </main>
        </div>

        <div class="calender-in-btm">

          <YogaClassSingleMultiple {filteredData} {isSelectClasses} {handleTeacherSelectClass} {handleBackToCalendarClick}/>

           
          <YogaClassSingle {localCurrency} {scheduleTeacher} {isYogaFormVisible} {handleBackToCalendarClick} {handleSignUpInquiryData}/>
         
          
          <WmyRegisterAndLogin {handleRegisterUserClick} {scheduleTeacher} {localCurrency} {isReserveFormVisible} {handleBackToCalendarClick}  />
        

          <SelectStudent {inquiryData} {profileData} {localCurrency} {IsRegisterFormVisible} {handleBackToCalendarClick} {handleClassDetailslsShow}/>

          <SelectPaymentPage {IsShowClassDetails} {handleBackToCalendarClick}/>

        </div>
      </div>
    </div>
  </div>
</section>

<div class={`hide_with_form ${activeClass}`}>
  <section class="gatering-main">
    <div class="container" data-aos="fade-up">
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
                title="YouTube video player"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3718.1300024677926!2d-157.8222394!3d21.266321!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c00726ff958afd7%3A0x283d722b912d17d2!2sBarefoot%20Beach%20Cafe%20%40%20Queen's%20Surf%20Beach!5e0!3m2!1sen!2sin!4v1731933527275!5m2!1sen!2sin"
                width="100%"
                height="400"
                style="border:0;"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
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
              <img src="/assets/img/beach.jpg" class="img-fluid" alt="beach" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="faq-main-detail" data-aos="fade-up">
    <div class="container">
      <h2 class="heading-main">Class Detail</h2>
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <div class="faq-in">
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="heading1">
                  <button
                    class="accordion-button collapsed htg1"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse1"
                    aria-expanded="false"
                    aria-controls="collapse1">Day</button
                  >
                </h2>
                <div
                  id="collapse1"
                  class="accordion-collapse collapse"
                  aria-labelledby="heading1"
                  data-bs-parent="#accordionExample"
                  style=""
                >
                  <div class="accordion-body ymy-page">
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
                    class="accordion-button collapsed htg1"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo">Time</button
                  >
                </h2>
                <div
                  id="collapseTwo"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body ymy-page">
                    <p>12:12 AM</p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="heading3">
                  <button
                    class="accordion-button collapsed htg1"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse3"
                    aria-expanded="false"
                    aria-controls="collapse3">Price</button
                  >
                </h2>
                <div
                  id="collapse3"
                  class="accordion-collapse collapse"
                  aria-labelledby="heading3"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body ymy-page">$000</div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="h4">
                  <button
                    class="accordion-button collapsed htg1"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#cl4"
                    aria-expanded="false"
                    aria-controls="cl4">Place</button
                  >
                </h2>
                <div
                  id="cl4"
                  class="accordion-collapse collapse"
                  aria-labelledby="h4"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body ymy-page">Name</div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="h5">
                  <button
                    class="accordion-button collapsed htg1"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#cl5"
                    aria-expanded="false"
                    aria-controls="cl5">Calculation</button
                  >
                </h2>
                <div
                  id="cl5"
                  class="accordion-collapse collapse"
                  aria-labelledby="h5"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body ymy-page">$000</div>
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
                    class="accordion-button collapsed htg1"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse4"
                    aria-expanded="false"
                    aria-controls="collapse4">What to bring?</button
                  >
                </h2>
                <div
                  id="collapse4"
                  class="accordion-collapse collapse"
                  aria-labelledby="heading4"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body ymy-page">
                    It is hidden by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="heading5">
                  <button
                    class="accordion-button collapsed htg1"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse5"
                    aria-expanded="false"
                    aria-controls="collapse5">Helpful hints</button
                  >
                </h2>
                <div
                  id="collapse5"
                  class="accordion-collapse collapse"
                  aria-labelledby="heading5"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body ymy-page">
                    These classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="heading6">
                  <button
                    class="accordion-button collapsed htg1"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse6"
                    aria-expanded="false"
                    aria-controls="collapse6">Weather</button
                  >
                </h2>
                <div
                  id="collapse6"
                  class="accordion-collapse collapse"
                  aria-labelledby="heading6"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body ymy-page">
                    These classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="heading7">
                  <button
                    class="accordion-button collapsed htg1"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse7"
                    aria-expanded="false"
                    aria-controls="collapse7">Class change</button
                  >
                </h2>
                <div
                  id="collapse7"
                  class="accordion-collapse collapse"
                  aria-labelledby="heading7"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body ymy-page">
                    These classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="heading8">
                  <button
                    class="accordion-button collapsed htg1"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse8"
                    aria-expanded="false"
                    aria-controls="collapse8">Cancelation</button
                  >
                </h2>
                <div
                  id="collapse8"
                  class="accordion-collapse collapse"
                  aria-labelledby="heading8"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body ymy-page">
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
        <div class="box7">Box 1</div>
        <div class="box7">Box 2</div>
        <div class="box7">Box 3</div>
        <div class="box7">Box 4</div>
        <div class="box7">Box 5</div>
        <div class="box7">Box 6</div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-4">
          <a href="https://x.com/i/flow/login">
            <div class="feed-in">
              <div class="img_feed">
                <img src="/assets/img/img4.png" class="img-fluid" alt="img4" />
                <div class="overlay">
                  <img
                    src="/assets/img/twit.png"
                    class="img-fluid"
                    alt="twit"
                  />
                </div>
              </div>
            </div></a
          >
        </div>
        <div class="col-lg-4">
          <a href="https://www.instagram.com/accounts/login/">
            <div class="feed-in">
              <div class="img_feed">
                <img src="/assets/img/img3.png" class="img-fluid" alt="img3" />
                <div class="overlay">
                  <img src="/assets/img/ins.png" class="img-fluid" alt="twit" />
                </div>
              </div>
            </div></a
          >
        </div>
        <div class="col-lg-4">
          <a href="https://www.facebook.com/login/">
            <div class="feed-in">
              <div class="img_feed">
                <img src="/assets/img/img2.jpg" class="img-fluid" alt="img2" />
                <div class="overlay">
                  <img
                    src="/assets/img/face.png"
                    class="img-fluid"
                    alt="twit"
                  />
                </div>
              </div>
            </div></a
          >
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
          <div class="pricing-container-yg greenr">
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
            <!-- <iframe
              width="100%"
              height="500"
              src="https://www.youtube.com/embed/eL9UfALQrhk?si=U-IVy6fyKiGGz6Oa&rel=0&autoplay=0&loop=1&playlist=eL9UfALQrhk"
              title="YouTube video player"
              frameborder="0"
              style="border-radius: 10px; overflow: hidden;"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            > -->
            <iframe
            width="100%"
            height="500"
            src="https://www.youtube-nocookie.com/embed/eL9UfALQrhk?si=U-IVy6fyKiGGz6Oa&rel=0&autoplay=0&loop=1&playlist=eL9UfALQrhk"
            title="YouTube video player"
            frameborder="0"
            style="border-radius: 10px; overflow: hidden;"
            allow="web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            >
            </iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="awareness-main green-bg">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="awareness-main-in">
            <div class="img-lg">
              <img src="/assets/img/logo.png" class="img-fluid" alt="logo" />
            </div>
            <div class="img-bottom">
              <div class="img-btm">
                <img
                  src="https://yogawaikikibeach.com/wp-content/themes/YogaAwareness/images/common/common_course_pic_01.jpg"
                  class="img-fluid"
                  alt="common_course_pic_01"
                />
                <h3>Self training</h3>
                <div class="">
                  <a class="cta arrow-button cnt green-btn mobile-mr" href="#"
                    >Learn more <img
                      src="/assets/img/right.png"
                      class="img-fluid"
                      alt="right"
                    /></a
                  >
                </div>
              </div>
              <div class="img-btm">
                <img
                  src="https://yogawaikikibeach.com/wp-content/themes/YogaAwareness/images/common/common_course_pic_03.jpg"
                  class="img-fluid"
                  alt="common_course_pic_03"
                />
                <h3>Teacher training</h3>
                <div class="">
                  <a class="cta arrow-button cnt green-btn" href="#"
                    >Learn more <img
                      src="/assets/img/right.png"
                      class="img-fluid"
                      alt="right"
                    /></a
                  >
                </div>
              </div>
            </div>
            <div class="box-btm">
              <div class="btm-set-lft">
                <img
                  src="https://yogawaikikibeach.com/wp-content/themes/YogaAwareness/images/common/common_course_ryt_img.png"
                  class="img-fluid"
                  alt="common_course_ryt_img"
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
  .year-selector {
    max-height: 150px; /* Define a max height */
    overflow-y: scroll; /* Enable vertical scrolling */
  }


  .alertbxc {
    background: #dcfce7;
    color: #212529;
  }

  
  .btn-bcx2 {
    color: #15803d;
    border-color: #15803d;
  }

  .dropdown.bcx-tgl button {
    border: 1px solid #15803d;
  }

  .reserve-form-main h3,
  .class_details h3,
  .order_summary h3 {
    color: #22c55e;
  }

  .form-check-input:checked {
    background-color: #15803d;
    border-color: #15803d;
  }



  .cancle-btn {
    color: #15803d;
    border-color: #15803d;
  }

 
  .class_discription p {
    background: #dcfce7;
    border: 1px solid hsl(142deg 72% 29% / 40%);
  }

  .order_summary h3 {
    color: #22c55e;
  }

  .check-mbcx.hlk {
    background: #dcfce7;
    padding: 30px;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  .payment_box {
    background: #dcfce7;
    border: 1px solid hsl(142deg 72% 29% / 40%);
  }

  .pay_btn {
    border: 1px solid #15803d;
    background: #15803d;
  }

  .order_summary h3 {
    color: #22c55e;
  }

  

.date__number.available {
  background: #bbf7d0; /* Dark Green */
  color: black;
  border-radius: 50%;
}

.date__number.available:hover {
  background: #15803d; /* Dark green when hovered */
  color: white;
}

.date__number.selected {
  background: #15803d; /* Dark green when selected */
  color: white;
}

.date__number.past {
  background: #efefef;  /* Light grey */
  color: rgb(150, 150, 150); /* Grey text */
  cursor: not-allowed;
  pointer-events: none;
}

.date__number.future {
  color: black; /* Black text for future unavailable dates */
  /* background: #efefef;   */
  cursor: not-allowed;
  pointer-events: none;
}




</style>
