(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top,
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#sideNav",
  });

  $(".download").on("click", function () {
    const url = "files/Resume.pdf";
    $.ajax({
      url: url,
      cache: false,
      xhr: function () {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 2) {
            if (xhr.status == 200) {
              xhr.responseType = "blob";
            } else {
              xhr.responseType = "text";
            }
          }
        };
        return xhr;
      },
      success: function (data) {
        //Convert the Byte Data to BLOB object.
        var blob = new Blob([data], { type: "application/octetstream" });

        //Check the Browser type and download the File.
        var isIE = false || !!document.documentMode;
        if (isIE) {
          window.navigator.msSaveBlob(blob, fileName);
        } else {
          var url = window.URL || window.webkitURL;
          link = url.createObjectURL(blob);
          var a = $("<a />");
          a.attr("download", fileName);
          a.attr("href", link);
          $("body").append(a);
          a[0].click();
          $("body").remove(a);
        }
      },
    });
  });
})(jQuery); // End of use strict
