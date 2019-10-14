var slideIndex = 1;
showSlides(slideIndex);
var emailValue = document.getElementById("email");
var messValue = document.getElementById("message");
var noEmailNotice = document.getElementById("no-email-notice");
var invalidEmail = document.getElementById("invalid-email");
var noMessNotice = document.getElementById("no-message-notice");
var invalidMessage = document.getElementById("too-long-message");
var isTurnOff = true;
var timeout;

$(document).ready(function() {
  $(".carousel-inner").click(function() {
    if (isTurnOff) {
      $(".carousel").carousel({
        interval: 3000
      });
      isTurnOff = false;
    } else {
      $(".carousel").carousel("pause");
      isTurnOff = true;
    }
  });
});

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function hideEmailNotice() {
  noEmailNotice.style.display = "none";
  invalidEmail.style.display = "none";
}

function hideMessNotice() {
  noMessNotice.style.display = "none";
  invalidMessage.style.display = "none";
}

function checkValidMessage() {
  if (messValue.value.length > 128) {
    invalidMessage.style.display = "block";
    event.preventDefault();
  } else {
    invalidMessage.style.display = "none";
  }
}

function checkValid() {
  if (emailValue.value == "") {
    noEmailNotice.style.display = "block";
    event.preventDefault();
  } else if (messValue.value == "") {
    noMessNotice.style.display = "block";
    event.preventDefault();
  } else if (emailValue.value == "" && messValue.value == "") {
    noEmailNotice.style.display = "block";
    noMessNotice.style.display = "block";
    event.preventDefault();
  } else if (!validateEmail(emailValue.value)) {
    invalidEmail.style.display = "block";
    event.preventDefault();
  }
}

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

function autoSlideshow() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  timeout = setTimeout(autoSlideshow, 2000); // Change image every 2 seconds
}

function stopAutoSlideshow() {
  clearTimeout(timeout);
}

function changeSlideshowMode() {
  if (isTurnOff) {
    autoSlideshow();
    isTurnOff = false;
  } else {
    stopAutoSlideshow();
    isTurnOff = true;
  }
}
