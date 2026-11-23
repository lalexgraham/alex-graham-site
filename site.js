/* One place for the things Alex supplies. Swap these and nothing else. */
var SITE = {
  bookingUrl: "",                       // [BOOKING LINK] e.g. https://calendly.com/...  Empty = falls back to email
  email: "alex.graham.tech@outlook.com",// [EMAIL] confirm before launch
  charityName: ""                       // Beyond The Horizon, once signed off. Empty = anonymous
};
(function(){
  var mail = "mailto:" + SITE.email + "?subject=" + encodeURIComponent("Free 30 minute call");
  document.querySelectorAll("[data-cta]").forEach(function(a){ a.href = SITE.bookingUrl || mail; if(SITE.bookingUrl){a.target="_blank";a.rel="noopener"} });
  document.querySelectorAll("[data-email]").forEach(function(a){ a.href = "mailto:" + SITE.email; a.textContent = SITE.email; });
  if(SITE.charityName){ document.querySelectorAll("[data-charity]").forEach(function(s){ s.textContent = SITE.charityName; }); }
  var pl = document.querySelector("[data-play]"), v = document.querySelector("video");
  if(pl && v){ pl.addEventListener("click", function(e){ e.preventDefault(); v.scrollIntoView({block:"center"}); v.play(); }); }
})();
