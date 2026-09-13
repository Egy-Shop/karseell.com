document.getElementById('year').textContent = new Date().getFullYear();

// ---- Hamburger side menu (shared behavior with main site) ----
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sideMenu = document.getElementById('sideMenu');
const sideMenuOverlay = document.getElementById('sideMenuOverlay');
const sideMenuClose = document.getElementById('sideMenuClose');

function openSideMenu() { sideMenu.classList.add('is-open'); sideMenuOverlay.classList.add('is-open'); }
function closeSideMenu() { sideMenu.classList.remove('is-open'); sideMenuOverlay.classList.remove('is-open'); }
hamburgerBtn.addEventListener('click', openSideMenu);
sideMenuClose.addEventListener('click', closeSideMenu);
sideMenuOverlay.addEventListener('click', closeSideMenu);
document.querySelectorAll('.side-menu-link').forEach(function (link) { link.addEventListener('click', closeSideMenu); });

// =====================================================================
// PRODUCT DATA — edit this object to change any product's content
// =====================================================================
const PRODUCTS = {
  mask: {
    name: 'ماسك الشعر بالكولاجين',
    eyebrow: 'الأنسب للتجربة',
    price: 599,
    oldPrice: 1268,
    discountPercent: 53,
    ratingText: 'التقييم العالمي على موقع Karseell الرسمي: 4.98 من 5',
    desc: 'ماسك ترميم عميق مُغذّى بالكولاجين والكيراتين وزيت الأرجان وخلاصة الماكا، بيرجّع رطوبة الشعر، يحسّن نعومته، يقلل الهيشان، ويرجّعله لمعانه الصحي.',
    features: [
      'ترميم عميق للأطراف الجافة والهشة',
      'ترطيب مكثف يعوّض الرطوبة المفقودة',
      'قوة الكولاجين لمرونة أفضل',
      'نعومة حريرية وتقليل الهيشان',
      'آمن على الشعر المصبوغ والمعالج كيميائيًا'
    ],
    images: ['assets/products/mask/mask.webp', 'assets/products/mask/mask-jar-clean.webp', 'assets/products/mask/mask-jar-texture.webp', 'assets/products/mask/mask-strengthen-repair.webp', 'assets/products/mask/mask-hero-banner.webp'],
    steps: [
      { title: 'التنظيف', text: 'اغسلي شعرك بالشامبو واشطفيه كويس، شيلي المياه الزيادة برفق' },
      { title: 'التطبيق', text: 'وزّعي الماسك بالتساوي على منتصف الشعر والأطراف' },
      { title: 'الانتظار', text: 'سيبيه 5-10 دقايق (ممكن توصلي لـ15 دقيقة لو الشعر تالف جدًا)' },
      { title: 'الشطف', text: 'اشطفي كويس وصففي شعرك عادي، كرري 1-2 مرة أسبوعيًا' }
    ],
    howtoTip: 'نصيحة: وزّعي الماسك بمشط واسع الأسنان ولفي شعرك بمنشفة دافية لنتيجة أعمق',
    ingredients: ['كولاجين محلل', 'خلاصة الماكا', 'زيت الأرجان', 'كيراتين محلل', 'زبدة الشيا', 'بانثينول'],
    beforeAfter: ['assets/products/mask/mask-before-after-1.webp', 'assets/products/mask/mask-before-after-2.webp'],
    inStock: true
  },

  duo: {
    name: 'طقم شامبو وبلسم بالكولاجين',
    eyebrow: 'الأكثر طلبًا',
    price: 699,
    oldPrice: 2345,
    discountPercent: 70,
    ratingText: 'التقييم العالمي على موقع Karseell الرسمي: 4.98 من 5',
    desc: 'دويتو غسيل وعناية يومي بيغسل شعرك بلطف، يرجّعله رطوبته، ويخليه أقوى وأنعم وأسهل في التسريح.',
    features: [
      'تنضيف لطيف من غير ما يجرح فروة الرأس',
      'ترطيب مكثف',
      'يفك تشابك الشعر وينعمه',
      'يزود الشعر حجم وكثافة',
      'تنعيم ولمعان طبيعي'
    ],
    images: ['assets/products/duo/duo.webp', 'assets/products/duo/duo-main.webp', 'assets/products/duo/duo-repair-tagline.webp', 'assets/products/duo/duo-set-box.webp'],
    steps: [
      { title: 'الشامبو', text: 'وزّعيه على شعر وفروة رأس مبللة، دلكي برفق لحد ما تعمل رغوة، اشطفي كويس' },
      { title: 'البلسم', text: 'حطيه من نص الشعر للأطراف (بعيد عن فروة الرأس)، سيبيه 1-3 دقايق، اشطفيه' },
      { title: 'النتيجة', text: 'شعر أنعم، أسهل في التسريح، وبلمعان طبيعي بعد الروتين الكامل' }
    ],
    howtoTip: 'للاستخدام اليومي أو كل يوم بالتبادل حسب نوع شعرك',
    ingredients: ['كولاجين', 'خلاصة الماكا', 'زيت الأرجان', 'خالي من الكبريتات والبارابين'],
    beforeAfter: ['assets/products/duo/duo-before-after.webp'],
    inStock: true
  },

  full: {
    name: 'الباقة الكاملة (ماسك + شامبو + بلسم)',
    eyebrow: 'الأكثر توفيرًا',
    price: 1199,
    oldPrice: 3613,
    discountPercent: 67,
    ratingText: 'التقييم العالمي على موقع Karseell الرسمي: 4.98 من 5',
    desc: 'روتين عناية متكامل بالكولاجين: ماسك ترميم عميق + شامبو وبلسم للاستخدام اليومي، عشان تعتني بشعرك بخصم أكبر.',
    features: [
      'روتين عناية متكامل في باقة واحدة',
      'ترميم عميق + تنظيف وترطيب يومي',
      'أفضل قيمة مقابل السعر',
      'شحن مجاني دايمًا مهما كانت الكمية',
      'مناسب لكل أنواع الشعر'
    ],
    images: ['assets/products/full/bundle.webp'],
    steps: [
      { title: 'الشامبو', text: 'اغسلي شعرك بشامبو Karseell ودلكي فروة الرأس برفق' },
      { title: 'البلسم', text: 'وزّعي البلسم من النص للأطراف واتركيه 2-3 دقائق قبل الشطف' },
      { title: 'الماسك', text: 'حطي الماسك على الشعر المبلل واتركيه 5-15 دقيقة حسب حالة شعرك' },
      { title: 'الشطف النهائي', text: 'اشطفي شعرك كويس بالمية الفاترة واستمتعي بالنتيجة' }
    ],
    howtoTip: 'استخدمي الشامبو والبلسم يوميًا، والماسك مرة أو مرتين أسبوعيًا',
    ingredients: ['كولاجين', 'خلاصة الماكا', 'زيت الأرجان', 'كيراتين محلل'],
    beforeAfter: [],
    inStock: true
  },

  serum: {
    name: 'سيروم زيت الأرجان المغربي',
    eyebrow: 'قريبًا',
    price: 1099,
    oldPrice: 2198,
    discountPercent: 50,
    ratingText: 'التقييم العالمي على موقع Karseell الرسمي: 4.99 من 5',
    desc: 'سيروم خفيف بزيت الأرجان المغربي بيغذي شعرك، ينعمه، يتحكم في الهيشان، ويرجّعله لمعانه الصحي من غير ما يحسسه بالتقل.',
    features: [
      'تغذية عميقة وترميم حقيقي للشعر',
      'لمعان ونعومة ملحوظة من أول استخدام',
      'تقليل الهيشان والشعر الطائر',
      'حماية من الحرارة وتقوية الشعرة'
    ],
    images: ['assets/products/serum/serum-main.webp', 'assets/products/serum/serum-hero-text.webp', 'assets/products/serum/serum-lightweight.webp', 'assets/products/serum/serum-revitalize.webp'],
    steps: [
      { title: 'كعلاج مكثف', text: 'حطي كام قطرة على شعر مبلل بالمنشفة، وسيبيه من غير شطف' },
      { title: 'كمنعّم يومي', text: 'وزّعي كمية بسيطة على الأطراف لتهدئة الهيشان وزيادة اللمعان' },
      { title: 'كمنتج تصفيف', text: 'استخدميه على شعر جاف لتنعيمه والتحكم في الشعر الطائر' }
    ],
    howtoTip: 'قليل منه بيكفي — ابدئي بكمية بسيطة وزوّدي حسب طول شعرك',
    ingredients: ['زيت الأرجان المغربي', 'فيتامين E', 'أحماض دهنية أساسية', 'خلاصة نباتية طبيعية', 'زيت جوز الهند'],
    beforeAfter: ['assets/products/serum/serum-before-after1.webp', 'assets/products/serum/serum-before-after2.webp'],
    video: 'assets/products/serum/serum-video.webm',
    inStock: false
  }
};

const BUNDLE_OF_2_PRICE = { mask: 999, duo: 1300, full: 1999 };
const FREE_SHIPPING_THRESHOLD = 1000;
const SHIPPING_FEE = 35;
const COUPON_CODE = 'KARSEELL15';
const COUPON_DISCOUNT = 0.15;
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzyvclP3ma7KSbrA05xGojVDf470S8plyetSRo1OEWbOBsWG-ZnwE41rWmrLUz6tiLo/exec';

// ---- Resolve current product from URL ----
const params = new URLSearchParams(window.location.search);
const productId = PRODUCTS[params.get('id')] ? params.get('id') : 'mask';
const product = PRODUCTS[productId];

let quantity = 1;
let couponApplied = false;

// ---- Render static product content ----
document.getElementById('pageTitle').textContent = 'Karseell | ' + product.name;
document.getElementById('pageDescription').setAttribute('content', product.desc);
document.getElementById('productEyebrow').textContent = product.eyebrow;
document.getElementById('productName').textContent = product.name;
document.getElementById('productRatingText').textContent = product.ratingText;
document.getElementById('productDesc').textContent = product.desc;
document.getElementById('orderProductLabel').textContent = 'المنتج: ' + product.name;

// Gallery
const mainImage = document.getElementById('mainImage');
mainImage.src = product.images[0];
mainImage.alt = product.name;
const thumbsWrap = document.getElementById('galleryThumbs');
product.images.forEach(function (src, i) {
  const thumb = document.createElement('img');
  thumb.src = src;
  thumb.alt = product.name + ' - صورة ' + (i + 1);
  thumb.className = 'gallery-thumb' + (i === 0 ? ' is-active' : '');
  thumb.addEventListener('click', function () {
    mainImage.src = src;
    document.querySelectorAll('.gallery-thumb').forEach(function (t) { t.classList.remove('is-active'); });
    thumb.classList.add('is-active');
  });
  thumbsWrap.appendChild(thumb);
});

// Price block
document.getElementById('productPriceNew').textContent = product.price + ' جنيه';
document.getElementById('productPriceOld').textContent = product.oldPrice + ' جنيه';
document.getElementById('productDiscountBadge').textContent = 'خصم ' + product.discountPercent + '%';
document.getElementById('productShippingNote').textContent = product.price >= FREE_SHIPPING_THRESHOLD
  ? 'شحن مجاني'
  : '+ ' + SHIPPING_FEE + ' جنيه شحن (مجاني من عبوتين)';

// Feature list
const featureListEl = document.getElementById('productFeatureList');
product.features.forEach(function (f) {
  const li = document.createElement('li');
  li.textContent = f;
  featureListEl.appendChild(li);
});

// How to use steps
const stepsEl = document.getElementById('productSteps');
product.steps.forEach(function (s, i) {
  const div = document.createElement('div');
  div.className = 'step';
  div.innerHTML = '<span class="step-num">' + (i + 1) + '</span><p><strong>' + s.title + ':</strong> ' + s.text + '</p>';
  stepsEl.appendChild(div);
});
document.getElementById('howtoTip').textContent = product.howtoTip || '';

// Ingredients
const ingredientsGrid = document.getElementById('ingredientsGrid');
product.ingredients.forEach(function (ing) {
  const div = document.createElement('div');
  div.className = 'ingredient-chip';
  div.textContent = ing;
  ingredientsGrid.appendChild(div);
});

// Before/after
const beforeAfterSection = document.getElementById('beforeAfterSection');
const beforeAfterGrid = document.getElementById('beforeAfterGrid');
if (product.beforeAfter && product.beforeAfter.length) {
  product.beforeAfter.forEach(function (src) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'نتيجة قبل وبعد استخدام ' + product.name;
    img.loading = 'lazy';
    beforeAfterGrid.appendChild(img);
  });
} else {
  beforeAfterSection.hidden = true;
}

// Optional product video (serum)
if (product.video) {
  const videoSection = document.createElement('section');
  videoSection.className = 'product-video-section';
  videoSection.innerHTML =
    '<div class="wrap"><h2 class="section-title">شوفي المنتج في الحركة</h2>' +
    '<video class="product-video" controls playsinline poster="' + product.images[0] + '">' +
    '<source src="' + product.video + '" type="video/webm"></video></div>';
  document.querySelector('.related-products').insertAdjacentElement('beforebegin', videoSection);
}

// Out of stock handling
if (!product.inStock) {
  document.getElementById('outOfStockBadge').hidden = false;
  document.getElementById('productCtaGroup').hidden = true;
  document.getElementById('outOfStockMsg').hidden = false;
  document.getElementById('order').hidden = true;
  document.querySelector('.mobile-sticky-cta').hidden = true;
}

// Related products (all others, excluding current)
const relatedGrid = document.getElementById('relatedGrid');
Object.keys(PRODUCTS).forEach(function (id) {
  if (id === productId) return;
  const p = PRODUCTS[id];
  const card = document.createElement('a');
  card.href = 'product.html?id=' + id;
  card.className = 'related-card';
  card.innerHTML =
    '<img src="' + p.images[0] + '" alt="' + p.name + '" loading="lazy">' +
    '<h3>' + p.name + '</h3>' +
    (p.inStock ? '<p class="related-price">' + p.price + ' جنيه</p>' : '<p class="related-price out">قريبًا</p>');
  relatedGrid.appendChild(card);
});

// =====================================================================
// Order logic (single-product version of the main site's cart logic)
// =====================================================================
if (product.inStock) {
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

  function computeTotals() {
    const isBundleOf2 = quantity === 2 && BUNDLE_OF_2_PRICE[productId] !== undefined;
    const lineTotal = isBundleOf2 ? BUNDLE_OF_2_PRICE[productId] : product.price * quantity;
    const shipping = isBundleOf2 ? 0 : (lineTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE);
    return { lineTotal: lineTotal, shipping: shipping, isBundleOf2: isBundleOf2 };
  }

  function updateSummary() {
    const totals = computeTotals();
    orderSummary.hidden = false;
    summaryOfferName.textContent = product.name;
    qtyValue.textContent = quantity;

    summaryPrice.textContent = totals.isBundleOf2
      ? totals.lineTotal + ' جنيه (عرض عبوتين)'
      : (quantity > 1 ? product.price + ' × ' + quantity + ' = ' + totals.lineTotal + ' جنيه' : totals.lineTotal + ' جنيه');

    summaryDiscount.textContent = 'خصم ' + product.discountPercent + '%';

    if (totals.shipping === 0) {
      summaryShipping.textContent = 'شحن مجاني';
      summaryShipping.classList.add('summary-free');
    } else {
      summaryShipping.textContent = totals.shipping + ' جنيه';
      summaryShipping.classList.remove('summary-free');
    }

    const subtotal = totals.lineTotal + totals.shipping;
    const total = couponApplied ? Math.round(subtotal * (1 - COUPON_DISCOUNT)) : subtotal;
    summaryTotal.textContent = total + ' جنيه';
  }

  qtyMinus.addEventListener('click', function () { if (quantity > 1) { quantity -= 1; updateSummary(); } });
  qtyPlus.addEventListener('click', function () { quantity += 1; updateSummary(); });

  applyCouponBtn.addEventListener('click', function () {
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
    updateSummary();
  });

  // Show the summary as soon as the page loads (single product, always "selected")
  updateSummary();

  if (typeof fbq === 'function') {
    fbq('track', 'ViewContent', { content_name: product.name, value: product.price, currency: 'EGP' });
  }

  let checkoutStarted = false;
  const form = document.getElementById('orderForm');
  form.addEventListener('input', function () {
    if (checkoutStarted) return;
    checkoutStarted = true;
    if (typeof fbq === 'function') {
      fbq('track', 'InitiateCheckout', { content_name: product.name, value: product.price, currency: 'EGP' });
    }
  }, { once: true });

  const formMessage = document.getElementById('formMessage');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const totals = computeTotals();
    const subtotal = totals.lineTotal + totals.shipping;
    const total = couponApplied ? Math.round(subtotal * (1 - COUPON_DISCOUNT)) : subtotal;

    const data = {
      eventId: 'order_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
      offer: productId,
      offerLabel: product.name + (quantity > 1 ? ' (الكمية: ' + quantity + ')' : ''),
      quantity: quantity,
      price: totals.lineTotal,
      discountPercent: product.discountPercent,
      shipping: totals.shipping,
      couponApplied: couponApplied,
      total: total,
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      governorate: form.governorate.value,
      address: form.address.value.trim(),
      timestamp: new Date().toISOString()
    };

    console.log('Order submitted:', data);
    try { sessionStorage.setItem('karseellLastOrder', JSON.stringify(data)); } catch (err) {}

    const payload = JSON.stringify(data);
    let sent = false;
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'text/plain;charset=UTF-8' });
      sent = navigator.sendBeacon(GOOGLE_SCRIPT_URL, blob);
    }

    if (sent) {
      window.location.href = 'thankyou.html';
    } else {
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: payload
      }).catch(function (err) { console.error('Failed to send order:', err); })
        .finally(function () { window.location.href = 'thankyou.html'; });
    }
  });
}
