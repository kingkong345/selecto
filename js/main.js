$(window).on("load", function () {
  AOS.init({
    disable: function () {
      const desktop = 960;
      return window.innerWidth < desktop;
    },
  });
});

Splitting();

//console.log(document.querySelector("path").getTotalLength());
//const lengthTotal = Math.ceil($("#path").get(0).getTotalLength());
// const lengthTotal = 6744;
const lengthTotal = Math.ceil($("path").get(0).getTotalLength());
console.log("🚀 ~ file: main.js ~ line 7 ~ lengthTotal", lengthTotal);
//console.log(Math.ceil($("path").get(0).getTotalLength()));
$("#path").css({ strokeDasharray: lengthTotal + 1180, strokeDashoffset: lengthTotal + 1180 });

// const svgTL = gsap.timeline();
// svgTL.to("path", { strokeDashoffset: 0, duration: 5 });

const video = document.getElementById("myVideo");

const mainBtn = document.getElementById("myBtn");

function myFunction() {
  if (video.paused) {
    video.play();
    mainBtn.innerHTML = `<span class="material-icons">stop</span>`;
  } else {
    video.pause();
    mainBtn.innerHTML = `<span class="material-icons">play_arrow</span>`;
  }
}

const pjSwiper = new Swiper("#projects .mask .banner", {
  slidesPerView: 1,
  spaceBetween: 50,
  centeredSlides: true,
  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // },
  loop: true,
  loopAdditionalSlides: 1,
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    1280: {
      slidesPerView: 1,
    },
  },
  pagination: {
    el: ".projects-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: "#projects .btn-next",
    prevEl: "#projects .btn-prev",
  },
});

const etcSwiper = new Swiper("#etc .contents-box .banner", {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    400: {
      slidesPerView: 2,
    },
    640: {
      slidesPerView: 3,
    },
    1100: {
      slidesPerView: 5,
    },
  },
  pagination: {
    el: ".etc-pagination",
    clickable: true,
  },
  centeredSlides: true,
  // autoplay: {
  //   delay: 3000,
  //   disableOnInteraction: false,
  // },
  centeredSlides: true,
  loop: true,
  loopAdditionalSlides: 1,
});
const skill = {
  ui: 90,
  illust: 95,
  photoshop: 88,
  figma: 89,
  HTML5: 85,
  css3: 80,
  js: 70,
};

const myMarker = {
  fontSize: 20,
  indent: 20,
  startColor: "#000",
  endColor: "#00f",
};
gsap.defaults({ ease: "power4", duration: 1 });

const skillTL = gsap.timeline({
  scrollTrigger: {
    trigger: "#skills",
    pin: true,
    //pinSpacing: false,
    scrub: 1.5,
    // markers: myMarker,
    start: "top top",
    end: "bottom+=200% top",
  },
});
skillTL
  .to("path", { strokeDashoffset: 0, duration: 5 })
  .from(skill, {
    ui: 0,
    illust: 0,
    photoshop: 0,
    figma: 0,
    HTML5: 0,
    css3: 0,
    js: 0,
    onUpdate: function () {
      $("#skills .skill-txt:nth-child(2) .num .txt").text(Math.round(skill.ui));
      $("#skills .skill-txt:nth-child(3) .num .txt").text(Math.round(skill.illust));
      $("#skills .skill-txt:nth-child(4) .num .txt").text(Math.round(skill.photoshop));
      $("#skills .skill-txt:nth-child(5) .num .txt").text(Math.round(skill.figma));
      $("#skills .skill-txt:nth-child(6) .num .txt").text(Math.round(skill.HTML5));
      $("#skills .skill-txt:nth-child(7) .num .txt").text(Math.round(skill.css3));
      $("#skills .skill-txt:nth-child(8) .num .txt").text(Math.round(skill.js));
    },
  })
  .to("#skills .mask ul", {
    x: window.innerWidth >= 640 ? "-75%" : "-110%",
  });

// if (Cookies.get("oneDay") !== "ok") {
//   gsap.to(".popup", { top: 100, duration: 1, ease: "back" });
// } else {
//   $(".popup").remove();
// }

// $(".popup .btn-close").on("click", function () {
//   gsap.to(".popup", { top: -1000, ease: "back.in", duration: 1 });
// });
// $(".popup .btn-oneday").on("click", function () {
//   Cookies.set("oneDay", "ok", { expires: 1 });
//   gsap.to(".popup", { top: -1000, ease: "back.in", duration: 1 });
// });

$(".btn-send").on("click", function () {
  emailjs.init("MxSF_Q5sibFEF1uPm");
  const templateParams = {
    subject: $("#subject").val(),
    name: $("#name").val(),
    phone: $("#phone").val(),
    email: $("#email").val(),
    contents: $("#contents").val(),
  };

  emailjs.send("service_bm3trvg", "template_yghdhjp", templateParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      $(".message-box").addClass("on");
      $(".message-box .txt").text("메일이 발송 되었습니다.");
      $("#subject").val("");
      $("#name").val("");
      $("#phone").val("");
      $("#email").val("");
      $("#contents").val("");
    },
    function (error) {
      console.log("FAILED...", error);
      $(".message-box").addClass("on");
      $(".message-box .txt").text("알 수 없는 오류로 메일이 발송이 되지않았습니다.");
    }
  );
});
$(".message-box .btn-close").on("click", function () {
  $(".message-box").removeClass("on");
});

const header = $("#header");
const gnb = $("#gnb");
const btnTop = $(".btn-top");
const btnAll = $(".btn-all");
const depth = $("#gnb .depth");
let lastScrollTop = 0;

btnAll.on("click", function (e) {
  e.preventDefault();
  gnb.toggleClass("on");
  $(this).toggleClass("on");
});

$(window).on("scroll", function (e) {
  const st = $(window).scrollTop();
  if (lastScrollTop < st) {
    header.removeClass("nav-down").addClass("nav-up");
  } else {
    header.removeClass("nav-up").addClass("nav-down");
  }
  if (st > 0) {
    header.addClass("on");
  } else {
    header.removeClass("on");
  }
  if (st > 300) {
    btnTop.addClass("on");
  } else {
    btnTop.removeClass("on");
  }
  lastScrollTop = st;
});
btnTop.on("click", function () {
  gsap.to(window, { scrollTo: 0, duration: 1 });
});

// $(
//   ".depth".click(function (e) {
//     e.preventDefault();
//     $("html,body").animate({ scrollTop: $(this.hash).lffset().top }, 300);
//   })
// );

gnb.find("a").click(function (e) {
  const { hash } = $(this).data();
  let moveEl = $("#" + hash);
  gnb.toggleClass("on");
  btnAll.toggleClass("on");
  if (hash === "skills") {
    moveEl = moveEl.parent();
  }

  moveEl[0].scrollIntoView({ behavior: "smooth", block: "center", inline: "start" });

  e.preventDefault();
  e.stopPropagation();
});

Fancybox.bind("#main #etc .container .contents-box .banner a", {
  groupAll: true,
});
