var prisoners = document.getElementById('prisoners');
var thousand = document.getElementById('thousand');
var counter = document.getElementById('counter');
var title = document.getElementById('title');
var curve_wrapper_outer = document.getElementById('curve-wrapper-outer');
var scroll_count = 0;

function setHeight() {
  var browser_width = window.innerWidth || document.body.clientWidth;
  var icons_per_card = 200;
  var pixel_height_per_card = 500;
  var pixel_width_per_card = 400;

  var cards_per_row = browser_width / pixel_width_per_card;
  var icons_per_row = icons_per_card * cards_per_row;
  var number_of_rows = 2300000/icons_per_row;

  var height = Math.floor(number_of_rows * pixel_height_per_card);
  prisoners.style.height = height + "px";

  var thousand_height = Math.floor((1000/icons_per_row) * pixel_height_per_card);
  thousand.style.height = thousand_height + "px";
}
setHeight();

window.addEventListener("orientationchange", setHeight);
window.addEventListener("resize", setHeight);

var observer = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if (entry.isIntersecting || entry.intersectionRatio > 0) {
      prisoners.classList = "person prisoners";
      prisoners.classList.add(entry.target.dataset.background);
    }
  })
})
document.querySelectorAll('[data-background]').forEach(function(target){
  observer.observe(target);
});

var until_recently_shown = false;
var since_it_began_shown = false;

var curveObserver = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if (entry.isIntersecting || entry.intersectionRatio > 0) {
      if (entry.target.id === 'since-it-began') {
        since_it_began_shown = true;
      }
      if (entry.target.id === 'until-recently') {
        until_recently_shown = true;
      }
      if (entry.target.id === 'none-of-this') {
        since_it_began_shown = false;
        until_recently_shown = false;
        curve_wrapper_outer.classList.remove('stretched');
        curve_wrapper_outer.classList.remove('show-correlation');
      }
    }
    if (entry.target.id === 'until-recently' && !entry.isIntersecting && until_recently_shown === true) {
      curve_wrapper_outer.classList.add('stretched');
    }
    if (entry.target.id === 'since-it-began' && !entry.isIntersecting && until_recently_shown === true) {
      curve_wrapper_outer.classList.add('show-correlation');
    }
  })
})
document.querySelectorAll('.curve-section').forEach(function(target){
  curveObserver.observe(target);
});



var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1;
if (isAndroid) {
  document.body.classList.add("android");
}

window.addEventListener('scroll', function(e) {
  scroll_count = getScrollCount();
  if (scroll_count > 2000) {
    counter.innerHTML = scroll_count.toLocaleString();
  }
  else {
    counter.innerHTML = '';
  }
});

function getScrollCount() {
  var body = document.documentElement || document.body;
  var total_height = prisoners.clientHeight;
  var scroll_percent = (body.scrollTop - prisoners.offsetTop + body.clientHeight) / total_height;
  var count = Math.floor(scroll_percent * 2300000);
  return count;
}

function toggleExpand(outer, inner) {
  var outerEl = document.getElementById(outer);
  var innerEl = document.getElementById(inner);
  var offset = Math.abs(outerEl.offsetTop - innerEl.offsetTop);
  innerEl.style.top = offset + 'px';
  outerEl.classList.add('expanded')
}

function showTooltip(e) {
  var tooltip = e.parentElement.getElementsByClassName('tooltip')[0]
  tooltip.classList.add('open')
}
function closeTooltip(e) {
  e.parentElement.classList.remove('open');
}
