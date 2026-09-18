document.getElementById('year').textContent = new Date().getFullYear();

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzyvclP3ma7KSbrA05xGojVDf470S8plyetSRo1OEWbOBsWG-ZnwE41rWmrLUz6tiLo/exec';

// ---- Session journey tracking (which pages/buttons the visitor went through this session) ----
function logJourney(label) {
  try {
    const journey = JSON.parse(sessionStorage.getItem('karseellJourney') || '[]');
    journey.push(label);
    sessionStorage.setItem('karseellJourney', JSON.stringify(journey));
  } catch (err) {}
}
function getJourneyText() {
  try {
    return JSON.parse(sessionStorage.getItem('karseellJourney') || '[]').join(' ← ');
  } catch (err) { return ''; }
}
logJourney('زيارة: الصفحة الرئيسية');

// ---- Offer data ----
const offerLabels = {
  mask: 'الماسك لوحده',
  duo: 'الشامبو + البلسم',
  full: 'الباقة الكاملة'
};

const offerDetails = {
  mask: { price: 599, discountPercent: 53 },
  duo: { price: 699, discountPercent: 70 },
  full: { price: 1199, discountPercent: 67 }
};

// Special fixed price when a customer orders exactly 2 of the same offer (extra bundle discount, always free shipping)
const BUNDLE_OF_2_PRICE = {
  mask: 999,
  duo: 1300,
  full: 1999
};

const FREE_SHIPPING_THRESHOLD = 1000;
const SHIPPING_FEE = 35;

const COUPON_CODE = 'KARSEELL15';
const COUPON_DISCOUNT = 0.15;

const offerField = document.getElementById('offerField');
const selectedOfferLabel = document.getElementById('selectedOfferLabel');
const allOfferCards = document.querySelectorAll('.offer-card');

// ---- Hamburger side menu ----
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sideMenu = document.getElementById('sideMenu');
const sideMenuOverlay = document.getElementById('sideMenuOverlay');
const sideMenuClose = document.getElementById('sideMenuClose');

function openSideMenu() {
  sideMenu.classList.add('is-open');
  sideMenuOverlay.classList.add('is-open');
}
function closeSideMenu() {
  sideMenu.classList.remove('is-open');
  sideMenuOverlay.classList.remove('is-open');
}
hamburgerBtn.addEventListener('click', openSideMenu);
sideMenuClose.addEventListener('click', closeSideMenu);
sideMenuOverlay.addEventListener('click', closeSideMenu);
document.querySelectorAll('.side-menu-link').forEach(function (link) {
  link.addEventListener('click', closeSideMenu);
});

// ---- Product info tabs ----
document.querySelectorAll('.info-tab-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const target = btn.getAttribute('data-info-tab');

    document.querySelectorAll('.info-tab-btn').forEach(function (b) { b.classList.remove('is-active'); });
    btn.classList.add('is-active');

    document.querySelectorAll('.info-tab-pane').forEach(function (pane) {
      pane.classList.toggle('is-active', pane.id === 'tab-' + target);
    });
  });
});

// ---- Live viewer counter (cosmetic urgency element) ----
const liveViewersEl = document.getElementById('liveViewers');
if (liveViewersEl) {
  function randomViewerCount() { return Math.floor(Math.random() * (100 - 7 + 1)) + 7; }
  liveViewersEl.textContent = randomViewerCount();
  setInterval(function () {
    liveViewersEl.textContent = randomViewerCount();
  }, 2000);
}

// ---- Offers slider arrows (mobile only; harmless no-op on desktop grid) ----
(function () {
  const track = document.getElementById('offerGrid');
  const prevBtn = document.getElementById('offerPrev');
  const nextBtn = document.getElementById('offerNext');
  if (!track || !prevBtn || !nextBtn) return;

  function cardStep() {
    const firstCard = track.querySelector('.offer-card');
    if (!firstCard) return track.clientWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '0') || 0;
    return firstCard.getBoundingClientRect().width + gap;
  }

  function updateArrowState() {
    const maxScroll = track.scrollWidth - track.clientWidth - 2; // small tolerance
    // RTL note: scrollLeft is 0 at the visual start (right side) and negative/positive toward the end depending on browser,
    // so we measure using scrollLeft's absolute distance from both edges instead of assuming a sign.
    const distanceFromStart = Math.abs(track.scrollLeft);
    prevBtn.disabled = distanceFromStart <= 2;
    nextBtn.disabled = distanceFromStart >= Math.abs(maxScroll) - 2 || maxScroll <= 0;
  }

  function scrollByCard(direction) {
    // direction: 1 = next (toward the end), -1 = prev (toward the start)
    // In RTL, "next" visually means scrolling toward negative scrollLeft in most browsers.
    const amount = cardStep() * direction;
    track.scrollBy({ left: -amount, behavior: 'smooth' });
  }

  prevBtn.addEventListener('click', function () {
    stopPulse();
    scrollByCard(-1);
  });
  nextBtn.addEventListener('click', function () {
    stopPulse();
    scrollByCard(1);
  });

  track.addEventListener('scroll', function () {
    window.requestAnimationFrame(updateArrowState);
  }, { passive: true });

  // Gentle pulse on the "next" arrow to hint there's more to see, stops after first interaction
  function stopPulse() {
    nextBtn.classList.remove('is-pulsing');
    track.removeEventListener('scroll', stopPulseOnScroll);
  }
  function stopPulseOnScroll() { stopPulse(); }

  function maybeStartPulse() {
    if (window.matchMedia('(max-width: 860px)').matches) {
      nextBtn.classList.add('is-pulsing');
      track.addEventListener('scroll', stopPulseOnScroll, { passive: true });
    } else {
      nextBtn.classList.remove('is-pulsing');
    }
  }

  window.addEventListener('resize', function () {
    updateArrowState();
    maybeStartPulse();
  });

  updateArrowState();
  maybeStartPulse();
})();

// ---- Order summary elements ----
const orderSummary = document.getElementById('orderSummary');
const summaryOfferName = document.getElementById('summaryOfferName');
const summaryPrice = document.getElementById('summaryPrice');
const summaryDiscount = document.getElementById('summaryDiscount');
const summaryShipping = document.getElementById('summaryShipping');
const summaryTotal = document.getElementById('summaryTotal');
const couponInput = document.getElementById('couponInput');
const applyCouponBtn = document.getElementById('applyCouponBtn');
const couponMessage = document.getElementById('couponMessage');
const qtyMinus = document.getElementById('qtyMinus');
const qtyPlus = document.getElementById('qtyPlus');
const qtyValue = document.getElementById('qtyValue');

let couponApplied = false;
let quantity = 1;

// ---- Abandoned checkout tracking ----
let checkoutStarted = false;
let orderSubmitted = false;
let abandonedSent = false;

function computeOrderTotals(offerKey, qty) {
  const details = offerDetails[offerKey];
  if (!details) return null;

  const isBundleOf2 = qty === 2 && BUNDLE_OF_2_PRICE[offerKey] !== undefined;
  const lineTotal = isBundleOf2 ? BUNDLE_OF_2_PRICE[offerKey] : details.price * qty;
  const shipping = isBundleOf2 ? 0 : (lineTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE);

  return { lineTotal: lineTotal, shipping: shipping, isBundleOf2: isBundleOf2, discountPercent: details.discountPercent };
}

function updateSummary(offerKey) {
  const details = offerDetails[offerKey];
  if (!details) return;

  const totals = computeOrderTotals(offerKey, quantity);

  orderSummary.hidden = false;
  summaryOfferName.textContent = offerLabels[offerKey] || offerKey;
  qtyValue.textContent = quantity;

  const lineTotal = totals.lineTotal;
  if (totals.isBundleOf2) {
    summaryPrice.textContent = lineTotal + ' جنيه (عرض عبوتين)';
  } else {
    summaryPrice.textContent = (quantity > 1
      ? details.price + ' × ' + quantity + ' = ' + lineTotal + ' جنيه'
      : lineTotal + ' جنيه');
  }

  summaryDiscount.textContent = 'خصم ' + details.discountPercent + '%';

  const shipping = totals.shipping;
  if (shipping === 0) {
    summaryShipping.textContent = 'شحن مجاني';
    summaryShipping.classList.add('summary-free');
  } else {
    summaryShipping.textContent = shipping + ' جنيه';
    summaryShipping.classList.remove('summary-free');
  }

  const subtotal = lineTotal + shipping;
  const total = couponApplied ? Math.round(subtotal * (1 - COUPON_DISCOUNT)) : subtotal;
  summaryTotal.textContent = total + ' جنيه';
}

function selectOffer(offerKey) {
  const card = document.querySelector('.offer-card[data-offer="' + offerKey + '"]');
  if (!card) return;

  checkoutStarted = true;
  logJourney('اختارت عرض: ' + (offerLabels[offerKey] || offerKey));

  // reset quantity whenever a different offer is chosen
  if (offerField.value !== offerKey) {
    quantity = 1;
  }

  // move the highlighted/selected border to the chosen offer
  allOfferCards.forEach(function (c) { c.classList.remove('selected'); });
  card.classList.add('selected');

  offerField.value = offerKey;
  selectedOfferLabel.textContent = offerLabels[offerKey] || offerKey;

  if (typeof fbq === 'function') {
    fbq('track', 'InitiateCheckout', {
      content_name: offerLabels[offerKey] || offerKey,
      value: offerDetails[offerKey] ? offerDetails[offerKey].price : undefined,
      currency: 'EGP'
    });
  }

  updateSummary(offerKey);
}

document.querySelectorAll('.choose-offer').forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    const card = btn.closest('.offer-card');
    selectOffer(card.getAttribute('data-offer'));
  });
});

// ---- Quantity stepper ----
qtyMinus.addEventListener('click', function () {
  if (quantity > 1) {
    quantity -= 1;
    updateSummary(offerField.value);
  }
});

qtyPlus.addEventListener('click', function () {
  quantity += 1;
  updateSummary(offerField.value);
});

// ---- Hero CTA buttons: jump straight to a specific offer, pre-selected ----
function goToOffer(offerKey) {
  selectOffer(offerKey);
  const card = document.querySelector('.offer-card[data-offer="' + offerKey + '"]');
  if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  return false; // prevent the default anchor jump so the smooth scroll above is the only one that runs
}

// ---- Coupon ----
applyCouponBtn.addEventListener('click', function () {
  if (!offerField.value) {
    couponMessage.textContent = 'اختاري عرض الأول قبل ما تفعّلي الكود.';
    couponMessage.className = 'coupon-message error';
    return;
  }

  const entered = couponInput.value.trim().toUpperCase();

  if (entered === COUPON_CODE) {
    couponApplied = true;
    couponMessage.textContent = 'تم تفعيل الكود بنجاح، خصم إضافي 15% 🎉';
    couponMessage.className = 'coupon-message success';
  } else {
    couponApplied = false;
    couponMessage.textContent = 'الكود غير صحيح أو منتهي الصلاحية.';
    couponMessage.className = 'coupon-message error';
  }

  updateSummary(offerField.value);
});

// ---- Order form ----
const form = document.getElementById('orderForm');
const formMessage = document.getElementById('formMessage');

document.querySelectorAll('a[href="#order"]').forEach(function (link) {
  link.addEventListener('click', function () {
    checkoutStarted = true;
    logJourney('دوست: اطلبي الآن');
  });
});
form.addEventListener('input', function () { checkoutStarted = true; });

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (!offerField.value) {
    formMessage.textContent = 'من فضلك اختاري عرض من فوق الأول قبل تأكيد الطلب.';
    formMessage.className = 'form-message error';
    document.getElementById('offers').scrollIntoView({ behavior: 'smooth' });
    return;
  }

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const totals = computeOrderTotals(offerField.value, quantity);
  const lineTotal = totals ? totals.lineTotal : null;
  const shipping = totals ? totals.shipping : null;
  const discountPercent = totals ? totals.discountPercent : null;
  const subtotal = (lineTotal !== null && shipping !== null) ? lineTotal + shipping : null;
  const total = (subtotal !== null && couponApplied) ? Math.round(subtotal * (1 - COUPON_DISCOUNT)) : subtotal;

  const data = {
    eventId: 'order_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
    offer: offerField.value,
    // quantity is folded into the label so it shows up in the Google Sheet without needing to edit the Apps Script
    offerLabel: (offerLabels[offerField.value] || offerField.value) + (quantity > 1 ? ' (الكمية: ' + quantity + ')' : ''),
    quantity: quantity,
    price: lineTotal,
    discountPercent: discountPercent,
    shipping: shipping,
    couponApplied: couponApplied,
    total: total,
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    governorate: form.governorate.value,
    address: form.address.value.trim(),
    timestamp: new Date().toISOString()
  };

  // send the order to the connected Google Sheet
  orderSubmitted = true;
  const payload = JSON.stringify(data);

  console.log('Order submitted:', data);

  // save the order data locally in case you want to prefill/reference it on the thank-you page later
  try { sessionStorage.setItem('karseellLastOrder', payload); } catch (err) {}

  // sendBeacon is built for exactly this case: firing a request right before navigating away,
  // without the browser cancelling it mid-flight the way it can with a plain fetch().
  let sent = false;
  if (navigator.sendBeacon) {
    const blob = new Blob([payload], { type: 'text/plain;charset=UTF-8' });
    sent = navigator.sendBeacon(GOOGLE_SCRIPT_URL, blob);
  }

  if (sent) {
    window.location.href = 'thankyou.html';
  } else {
    // fallback: wait for the fetch to actually finish before leaving the page
    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: payload
    }).catch(function (err) {
      console.error('Failed to send order to Google Sheet:', err);
    }).finally(function () {
      window.location.href = 'thankyou.html';
    });
  }
});

// ---- Abandoned checkout: fires only if the customer started (clicked an "order now"
// button or typed anything) and left without completing the order ----
function sendAbandonedCheckout() {
  if (!checkoutStarted || orderSubmitted || abandonedSent) return;

  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const governorate = form.governorate.value;
  const address = form.address.value.trim();

  // nothing at all was picked or typed — not worth logging
  if (!offerField.value && !name && !phone && !governorate && !address) return;

  abandonedSent = true;

  const data = {
    type: 'abandoned',
    offer: offerField.value ? (offerLabels[offerField.value] || offerField.value) : '',
    name: name,
    phone: phone,
    governorate: governorate,
    address: address,
    page: window.location.href,
    journey: getJourneyText(),
    timestamp: new Date().toISOString()
  };

  const payload = JSON.stringify(data);
  if (navigator.sendBeacon) {
    const blob = new Blob([payload], { type: 'text/plain;charset=UTF-8' });
    navigator.sendBeacon(GOOGLE_SCRIPT_URL, blob);
  }
}

window.addEventListener('pagehide', sendAbandonedCheckout);
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'hidden') sendAbandonedCheckout();
});
