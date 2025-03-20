<script>
  import Newsletter from "$lib/Components/Newsletter.svelte";
  import { onMount, afterUpdate } from "svelte";
  let newsletterButtonColor=""
  let swiperInstance;

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
  
</script>

<section class="home-showcase">
  <div class="swiper home-showcaseSlider">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div
          class="swiper-image"
          data-swiper-parallax-x="3%"
          style="background-image: url('/assets/img/banner4.jpg')"
        >
          <div class="text-container">
            <h1 class="bigTitle">
              Enjoy Yoga<br />
              at Waikiki Beach<br />
              in Hawaii
            </h1>
          </div>
          <div class="filter"></div>
        </div>
      </div>
      <div class="swiper-slide">
        <div
          class="swiper-image"
          data-swiper-parallax-x="3%"
          style="background-image:url('/assets/img/banner3.jpg')"
        >
          <div class="text-container">
            <h1 class="bigTitlejp">
              ハワイの自然を感じる<br />
              ワイキキビーチで<br />
              ヨガを楽しもう
            </h1>
          </div>
          <div class="filter"></div>
        </div>
      </div>
    </div>
    <div class="swiper-pagination showcaseSlider-pagination"></div>
    <div class="showcaseSlider-nav">
      <div class="swiper-button-prev showcaseSlider-prev"></div>
      <div class="swiper-button-next showcaseSlider-next"></div>
    </div>
  </div>
  <a href="#scroll1" class="scrollSliderButton">
    Scroll
    <div class="line"></div>
  </a>
</section>

<section class="about-content-main hm" id="scroll1">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="about-cnt-in">
          <h2>
            Improve your body and mind with Waikiki Beach Yoga and make your
            trip to Hawaii even more enjoyable!
          </h2>
          <div class="box-container">
            <div class="box">Box 1</div>
            <div class="box">Box 2</div>
            <div class="box">Box 3</div>
            <div class="box">Box 4</div>
            <div class="box">Box 5</div>
            <div class="box">Box 6</div>
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

<section>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="pricing-container">
          <div class="pricing-card popular">
            <div class="plan-icon">
              <img
                src="/assets/img/yoga2.jpg"
                alt="Waikiki Morning Yoga"
                class="img-fluid"
              />
            </div>
            <h3>Waikiki<br /> Morning Yoga</h3>
            <p>Yoga at a power spot in Waikiki, shining in the morning sun.</p>
            <div class="price">
              <span> At 7:45 AM, & 8:00 AM (60 minutes)</span>
            </div>
            <div class="price-click">$20/per person</div>
            <a href="/waikiki-morning-yoga" class="cta-button">Book Now</a>
          </div>
          <div class="pricing-card popular" style="background-color:#fed7aa;">
            <div class="plan-icon">
              <img
                src="/assets/img/img3.png"
                alt="Waikiki Private Yoga"
                class="img-fluid"
              />
            </div>
            <h3 class="clr-h3">Waikiki<br /> Private Yoga</h3>
            <p>
              As the sun sinks into the horizon, yoga will soothe your travel
              fatigue.
            </p>
            <div class="price">
              <span> Any time for 45, 60, 90 minutes</span>
            </div>
            <div class="price-click">$45/per person</div>
            <a
              href="/waikiki-private-yoga"
              class="cta-button"
              style="background-color: #c2410c;">Book Now</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="map-rd">
  <section
    class="yoga-section d-flex justify-content-center align-items-center"
  >
    <div class="content-wrapper container position-relative">
      <div class="row align-items-center">
        <div class="col-md-7">
          <div
            class="image-box"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
          >
            <img
              src="/assets/img/img1.jpg"
              alt="Yoga Image2"
              class="img-fluid"
            />
          </div>
        </div>
        <div class="col-md-5 text-box">
          <div class="heading-sg">
            <div class="svg1">
              <img
                src="/assets/img/h1-svg.svg"
                alt="Yoga Image2"
                class="img-fluid"
              />
            </div>
            <h2>ワイキキビーチの広々とした空間を楽しんでください。</h2>
          </div>
          <p>
            イベントはカピオラニ公園の木陰で、海を見渡しながら、またはワイキキの海が目の前に広がるビーチで行われます。少し違った方法で楽しみ、特別な思い出を作りましょう！
          </p>
        </div>
      </div>
    </div>
  </section>
  <section
    class="yoga-section d-flex justify-content-center align-items-center"
  >
    <div class="content-wrapper1 container position-relative">
      <div class="row align-items-center">
        <div class="col-md-5 text-box">
          <div class="heading-sg">
            <div class="svg1">
              <img
                src="/assets/img/h2-svg.svg"
                alt="Yoga Image2"
                class="img-fluid"
              />
            </div>
            <h2>ワイキキビーチの開放感を満喫しましょう。</h2>
          </div>
          <p>
            旅行中にヨガをすることで、時差ボケから早く回復できると言われています。長旅や観光、ショッピングで疲れた体にぴったりです！
          </p>
        </div>
        <div class="col-md-7">
          <div
            class="image-box"
            data-aos="fade-left"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
          >
            <img
              src="/assets/img/img2.jpg"
              alt="Yoga Image2"
              class="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  <section
    class="yoga-section d-flex justify-content-center align-items-center"
  >
    <div class="content-wrapper container position-relative">
      <div class="row align-items-center">
        <div class="col-md-7">
          <div
            class="image-box"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
          >
            <img
              src="/assets/img/img3.png"
              alt="Yoga Image2"
              class="img-fluid"
            />
          </div>
        </div>
        <div class="col-md-5 text-box">
          <div class="heading-sg">
            <div class="svg1">
              <img
                src="/assets/img/h3-svg.svg"
                alt="Yoga Image1"
                class="img-fluid"
                style="max-width: 78px;"
              />
            </div>
            <h2>ヨガ初心者も大歓迎！ 誰でも楽しめます。</h2>
          </div>
          <p>
            ヨガが初めての方、インストラクターの方、男性も女性も大歓迎です！多くのカップル、友人、そして家族が参加し、アットホームな雰囲気を作り出しています。
          </p>
        </div>
      </div>
    </div>
  </section>
  <section
    class="yoga-section d-flex justify-content-center align-items-center"
  >
    <div class="content-wrapper1 container position-relative">
      <div class="row align-items-center">
        <div class="col-md-5 text-box">
          <div class="heading-sg">
            <div class="svg1">
              <img
                src="/assets/img/h4-svg.svg"
                alt="Yoga Image1"
                class="img-fluid"
                style="max-width: 80px;"
              />
            </div>
            <h2>
              英語が話せなくても心配しないでください！すべて日本語で説明します！
            </h2>
          </div>
          <p>
            レッスンは日本語で行われるので、言語に心配することなくレッスンを楽しむことができます。もちろん、予約も日本語で行えます！
          </p>
        </div>
        <div class="col-md-7">
          <div
            class="image-box"
            data-aos="fade-left"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
          >
            <img
              src="/assets/img/img4.png"
              alt="Yoga Image1"
              class="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

<section class="faq-main" data-aos="fade-up">
  <div class="container">
    <h2 class="heading-main">Frequently Asked Questions</h2>
    <div class="row">
      <div class="col-lg-6">
        <div class="faq-in">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="heading1">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse1"
                  aria-expanded="false"
                  aria-controls="collapse1"
                >
                  How Do I Sign Up For The Online Yoga Teacher Training Program?
                </button>
              </h2>
              <div
                id="collapse1"
                class="accordion-collapse collapse"
                aria-labelledby="heading1"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <strong>This is the second item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Can I Teach Yoga Without Being Certified?
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <strong>This is the second item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="heading3">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse3"
                  aria-expanded="false"
                  aria-controls="collapse3"
                >
                  What Can I Expect in Online Yoga Teacher Training?
                </button>
              </h2>
              <div
                id="collapse3"
                class="accordion-collapse collapse"
                aria-labelledby="heading3"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="faq-in">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="heading4">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse4"
                  aria-expanded="false"
                  aria-controls="collapse4"
                >
                  What Certification Do I Need to Teach Yoga?
                </button>
              </h2>
              <div
                id="collapse4"
                class="accordion-collapse collapse"
                aria-labelledby="heading4"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <strong>This is the second item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="heading5">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse5"
                  aria-expanded="false"
                  aria-controls="collapse5"
                >
                  Can Beginners Take Yoga Teacher Training?
                </button>
              </h2>
              <div
                id="collapse5"
                class="accordion-collapse collapse"
                aria-labelledby="heading5"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <strong>This is the second item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="heading6">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse6"
                  aria-expanded="false"
                  aria-controls="collapse6"
                >
                  How Students Are Enrolled in Each Teacher Training At Time?
                </button>
              </h2>
              <div
                id="collapse6"
                class="accordion-collapse collapse"
                aria-labelledby="heading6"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="follow-main clickzxc" data-aos="fade-up">
  <div class="container">
    <h2 class="heading-main-follow">Follow me!</h2>
    <div class="box-container">
      <div class="box1">Box 1</div>
      <div class="box1">Box 2</div>
      <div class="box1">Box 3</div>
      <div class="box1">Box 4</div>
      <div class="box1">Box 5</div>
      <div class="box1">Box 6</div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-4">
        <a href="https://x.com/i/flow/login">
          <div class="feed-in">
            <div class="img_feed">
              <img
                src="/assets/img/img4.png"
                alt="img_Jump"
                class="img-fluid"
              />
              <div class="overlay">
                <img
                  src="/assets/img/twit.png"
                  alt="img_Jump"
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
                alt="img_yoga"
                class="img-fluid"
              />
              <div class="overlay">
                <img
                  src="/assets/img/ins.png"
                  alt="img_yoga"
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
              <img
                src="/assets/img/img2.jpg"
                alt="img_feed"
                class="img-fluid"
              />
              <div class="overlay">
                <img
                  src="/assets/img/face.png"
                  alt="img_feed"
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
            src="assets/img/yoga4.jpg"
            class="img-fluid"
            alt="Morning Yoga"
          />
        </div>
      </div>
      <div class="col-md-7">
        <div class="pricing-container-yg">
          <h3>Instructor</h3>
          <p>
            Masumi / Lives in Honolulu. Spreads the word about yoga that
            "everyone can enjoy." Holds cooking classes on the idea that food is
            medicine (Indian medicine/Ayurveda). Utilizing her 20+ years of
            experience in English education, she is active in a wide range of
            fields, including English courses for learning about yoga around the
            world and "Yoga taught in English." Her bases of operations are
            Waikiki and Tokyo. She co-teachs and manages the school with her
            husband Ted. She is YAT600/RYT500 certified. Morning yoga will be
            taught by Masumi in Japanese. I'm looking forward to seeing you!
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

<section class="awareness-main">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="awareness-main-in">
          <div class="img-lg">
            <img
              src="/assets/img/logo.png"
              alt="Yoga_Video"
              class="img-fluid"
            />
          </div>
          <div class="img-bottom">
            <div class="img-btm">
              <img
                src="https://yogawaikikibeach.com/wp-content/themes/YogaAwareness/images/common/common_course_pic_01.jpg"
                class="img-fluid"
                alt="Yoga_Video"
              />
              <h3>Self training</h3>
              <div class="">
                <a class="cta arrow-button cnt mobile-mr" href="#">
                  Learn more
                  <img
                    src="/assets/img/right.png"
                    alt="Yoga_Video"
                    class="img-fluid"
                  />
                </a>
              </div>
            </div>
            <div class="img-btm">
              <img
                src="https://yogawaikikibeach.com/wp-content/themes/YogaAwareness/images/common/common_course_pic_03.jpg"
                class="img-fluid"
                alt="Yoga_Video"
              />
              <h3>Teacher training</h3>
              <div class="">
                <a class="cta arrow-button cnt" href="#">
                  Learn more
                  <img
                    src="/assets/img/right.png"
                    alt="Yoga_Video"
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
                alt="Yoga_Video"
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

<Newsletter {newsletterButtonColor}/>
 

<style>
</style>
