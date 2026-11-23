/* One place for the things Alex supplies. Swap these and nothing else. */
var SITE = {
  bookingUrl: "",                       // [BOOKING LINK] e.g. https://calendly.com/...  Empty = falls back to email
  email: "alex.graham.tech@outlook.com",// [EMAIL] confirm before launch
  gaId: "G-KC4H3C1MBB",                 // Google Analytics 4. Loads only after the visitor accepts
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

/* Analytics: Google Analytics loads only after the visitor clicks Accept. Choice is remembered. */
(function(){
  if(!SITE.gaId) return;
  var KEY="analytics-consent", saved=null;
  try{ saved=localStorage.getItem(KEY); }catch(e){}
  function load(){
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){dataLayer.push(arguments)};
    gtag("js",new Date()); gtag("config",SITE.gaId,{anonymize_ip:true});
    var s=document.createElement("script"); s.async=true;
    s.src="https://www.googletagmanager.com/gtag/js?id="+SITE.gaId; document.head.appendChild(s);
  }
  function save(v){ try{ localStorage.setItem(KEY,v); }catch(e){} }
  if(saved==="yes"){ load(); return; }
  if(saved==="no") return;
  var bar=document.createElement("div");
  bar.className="consent"; bar.setAttribute("role","region"); bar.setAttribute("aria-label","Analytics cookies");
  var root=location.pathname.indexOf("/privacy/")>-1||location.pathname.indexOf("/case-study/")>-1||location.pathname.indexOf("/business/")>-1?"../":"";
  bar.innerHTML='<p>I\u2019d like to use Google Analytics cookies to see which pages are useful. Nothing loads unless you accept. <a href="'+root+'privacy/">Privacy</a></p><div class="btn-row"><button type="button" class="btn btn-primary" data-yes>Accept</button><button type="button" class="btn btn-secondary" data-no>Decline</button></div>';
  document.body.appendChild(bar);
  bar.querySelector("[data-yes]").addEventListener("click",function(){ save("yes"); bar.remove(); load(); });
  bar.querySelector("[data-no]").addEventListener("click",function(){ save("no"); bar.remove(); });
})();
