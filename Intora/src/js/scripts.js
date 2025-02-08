

$(function () {
  "use strict";

  /* ===============================  Navbar Menu  =============================== */

  var wind = $(window);

  wind.on("scroll", function () {
    var bodyScroll = wind.scrollTop(),
      navbar = $(".navbar.change"),
      logo = $(".navbar.change .logo > img");

    if (bodyScroll > 300) {
      navbar.addClass("nav-scroll");
      logo.attr("src", "img/logo-dark.png");
    } else {
      navbar.removeClass("nav-scroll");
      logo.attr("src", "img/logo-light.png");
    }
  });

  // Search functionality
  

  



  /* ===============================  Swiper slider  =============================== */

  
  /* ===============================  Work background  =============================== */

  $(".full-bg .cluom").on("mouseenter", function () {
    var tab_id = $(this).attr("data-tab");
    $(".full-bg .cluom").removeClass("current");
    $(this).addClass("current");

    $(".glry-img .tab-img ").removeClass("current");
    $("#" + tab_id).addClass("current");

    if ($(this).hasClass("current")) {
      return false;
    }
  });

  /* ===============================  Var Background image  =============================== */

  var pageSection = $(".bg-img, section");
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css(
        "background-image",
        "url(" + $(this).data("background") + ")"
      );
    }
  });

  /* ===============================  slick Carousel  =============================== */

  
  /* ===============================  YouTubePopUp  =============================== */

  $("a.vid").YouTubePopUp();

  /* ===============================  Before & After Section  =============================== */

  $(".twentytwenty-container").twentytwenty();

  /* ===============================  parallaxie  =============================== */

  $(".parallaxie").parallaxie({
    speed: 0.2,
    size: "cover",
  });

  /* ===============================  justifiedGallery  =============================== */

 
  /* ===============================  skills-circle  =============================== */

  var c4 = $(".skills-circle .skill");
  var myVal = $(this).attr("data-value");

  $(".skills-circle .skill").each(function () {
    c4.circleProgress({
      startAngle: (-Math.PI / 2) * 1,
      value: myVal,
      thickness: 5,
      size: 200,
      fill: { color: "#b19777" },
    });
  });

  wind.on("scroll", function () {
    $(".skill-progress .progres").each(function () {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      var myVal = $(this).attr("data-value");
      if (bottom_of_window > bottom_of_object) {
        $(this).css({
          width: myVal,
        });
      }
    });
  });

  /* ===============================  blog-grid  =============================== */

  var blgImg = $(".blog-grid .post-img .img").outerHeight() + 120;

  $(".blog-grid .bg-pattern").css("height", blgImg);
});

/* ===============================  Wow Animation  =============================== */

wow = new WOW({
  animateClass: "animated",
  offset: 100,
});
wow.init();

// === window When Loading === //

    
  /* ===============================  SPLITTING TEXT  =============================== */

  Splitting();

  /* ===============================  thumparallax  =============================== */

  var imageUp = document.getElementsByClassName("thumparallax");
  new simpleParallax(imageUp, {
    delay: 1,
    scale: 1.1,
  });

  var imageDown = document.getElementsByClassName("thumparallax-down");
  new simpleParallax(imageDown, {
    orientation: "down",
    delay: 1,
    scale: 1.1,
  });

  /* ===============================  isotope Masonery  =============================== */

  $(".gallery").isotope({
    itemSelector: ".items",
  });

  var $gallery = $(".gallery").isotope();

  $(".filtering").on("click", "span", function () {
    var filterValue = $(this).attr("data-filter");
    $gallery.isotope({ filter: filterValue });
  });

  $(".filtering").on("click", "span", function () {
    $(this).addClass("active").siblings().removeClass("active");
  });

  /* ===============================  contact validator  =============================== */

  $("#contact-form").validator();

  $("#contact-form").on("submit", function (e) {
    if (!e.isDefaultPrevented()) {
      var url = "contact.php";

      $.ajax({
        type: "POST",
        url: url,
        data: $(this).serialize(),
        success: function (data) {
          var messageAlert = "alert-" + data.type;
          var messageText = data.message;

          var alertBox =
            '<div class="alert ' +
            messageAlert +
            ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
            messageText +
            "</div>";
          if (messageAlert && messageText) {
            $("#contact-form").find(".messages").html(alertBox);
            $("#contact-form")[0].reset();
          }
        },
      });
      return false;
    }
  });


function adjustViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

window.addEventListener("resize", adjustViewportHeight);
adjustViewportHeight();

/* ===============================  Preloader page  =============================== */

PaceOptions = {
      ajax: true,
      document: true,
      eventLag: false,
      minTime: 0,
      maxTime: 0,
      ghostTime: 0,
    };

    Pace.on("done", function () {
      $("#preloader").addClass("isdone");
      $(".loading-text").addClass("isdone");
    });

/* ===============================  Scroll back to top  =============================== */

$(document).ready(function () {
  "use strict";

  var progressPath = document.querySelector(".progress-wrap path");
  var pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = "none";
  progressPath.style.strokeDasharray = pathLength + " " + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition =
    "stroke-dashoffset 10ms linear";
  var updateProgress = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;
  };
  updateProgress();
  $(window).scroll(updateProgress);
  var offset = 150;
  var duration = 550;
  jQuery(window).on("scroll", function () {
    if (jQuery(this).scrollTop() > offset) {
      jQuery(".progress-wrap").addClass("active-progress");
    } else {
      jQuery(".progress-wrap").removeClass("active-progress");
    }
  });
  jQuery(".progress-wrap").on("click", function (event) {
    event.preventDefault();
    jQuery("html, body").animate({ scrollTop: 0 }, duration);
    return false;
  });
});

/* ===============================  Mouse effect  =============================== */

function mousecursor() {
  if ($("body")) {
    const e = document.querySelector(".cursor-inner"),
      t = document.querySelector(".cursor-outer");
    let n,
      i = 0,
      o = !1;
    (window.onmousemove = function (s) {
      o ||
        (t.style.transform =
          "translate(" + s.clientX + "px, " + s.clientY + "px)"),
        (e.style.transform =
          "translate(" + s.clientX + "px, " + s.clientY + "px)"),
        (n = s.clientY),
        (i = s.clientX);
    }),
      $("body").on("mouseenter", "a, .cursor-pointer", function () {
        e.classList.add("cursor-hover"), t.classList.add("cursor-hover");
      }),
      $("body").on("mouseleave", "a, .cursor-pointer", function () {
        ($(this).is("a") && $(this).closest(".cursor-pointer").length) ||
          (e.classList.remove("cursor-hover"),
          t.classList.remove("cursor-hover"));
      }),
      (e.style.visibility = "visible"),
      (t.style.visibility = "visible");
  }
}

$(function () {
  mousecursor();
});
