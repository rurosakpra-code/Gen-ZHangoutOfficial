// script.js — countdown logic and small interactions
(function(){
  // EDIT: change this to the exact event time (YYYY, M-1, D, H, Min, Sec)
  // Current default: Dec 28, 2025 at 00:00:00 local time
  const eventDate = new Date(2025, 11, 28, 0, 0, 0); // month is 0-indexed: 11 = December

  const $days = document.getElementById('days');
  const $hours = document.getElementById('hours');
  const $minutes = document.getElementById('minutes');
  const $seconds = document.getElementById('seconds');

  // Store previous values for animation
  let prev = {days: null, hours: null, minutes: null, seconds: null};

  function pad(n){ return String(n).padStart(2,'0'); }

  function animateChange($el, newVal) {
    if ($el.textContent !== pad(newVal)) {
      $el.classList.remove('animated');
      // Force reflow for restart animation
      void $el.offsetWidth;
      $el.classList.add('animated');
    }
  }

  function updateCountdown(){
    const now = new Date();
    let diff = Math.max(0, eventDate - now); // milliseconds

    const s = Math.floor(diff / 1000);
    const days = Math.floor(s / (24*3600));
    const hours = Math.floor((s % (24*3600)) / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;

    // Animate if value changed
    if (prev.days !== days) animateChange($days, days);
    if (prev.hours !== hours) animateChange($hours, hours);
    if (prev.minutes !== minutes) animateChange($minutes, minutes);
    if (prev.seconds !== seconds) animateChange($seconds, seconds);

    $days.textContent = pad(days);
    $hours.textContent = pad(hours);
    $minutes.textContent = pad(minutes);
    $seconds.textContent = pad(seconds);

    prev = {days, hours, minutes, seconds};

    // When countdown hits zero, change CTA and show message
    if(diff <= 0){
      document.querySelector('.countdown').innerHTML = '<div class="time-block"><strong>Event started</strong></div>';
      const btn = document.getElementById('tickets-btn');
      if(btn) btn.textContent = 'EDIT: Event Live';
      clearInterval(timer);
    }
  }

  // Initial run
  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);

  // Small accessibility enhancement: allow keyboard focus styling for buttons
  document.addEventListener('keydown', function(e){
    if(e.key === 'Tab') document.body.classList.add('show-focus');
  });
})();