document.getElementById('year').textContent = new Date().getFullYear();

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
// STOCK — single source of truth so the bundle can never show more
// stock than its most limited component.
// =====================================================================
const STOCK = {
  mask: 22,
  duo: 15
};
STOCK.full = Math.min(STOCK.mask, STOCK.duo);

// =====================================================================
// REVIEWS — real customer feedback, grouped per product
// =====================================================================
const REVIEWS = {
  mask: [
    { stars: 5, text: 'جربته كذا مرة وحسيت إن شعري بقى أنعم وأسهل في التصفيف، وكمان ريحته لطيفة.', name: 'سارة أحمد', city: 'القاهرة' },
    { stars: 4, text: 'الماسك حلو جدًا خصوصًا بعد الاستحمام، الشعر بقى أهدى ومش هايش زي الأول.', name: 'منة محمد', city: 'الجيزة' },
    { stars: 5, text: 'حطيته حوالي 10 دقايق وبعدها غسلت شعري، النتيجة كانت واضحة في النعومة.', name: 'نورهان محمود', city: 'الإسكندرية' },
    { stars: 5, text: 'عجبني إنه مش تقيل على الشعر، وبعده شعري بقى طري ولمعته أحسن.', name: 'آية خالد', city: 'القليوبية' },
    { stars: 4, text: 'من أول كام استخدام حسيت إن الأطراف بقت أطرى ومبقاش شكلها ناشف.', name: 'مريم أشرف', city: 'المنوفية' }
  ],
  duo: [
    { stars: 5, text: 'بستخدم الشامبو والبلسم مع بعض والروتين مريح جدًا، شعري بقى أسهل في التسريح.', name: 'ندى سامح', city: 'الشرقية' },
    { stars: 4, text: 'الشامبو بينضف كويس والبلسم بيفرق جدًا في التشابك بعد الغسيل.', name: 'بسنت علي', city: 'الدقهلية' },
    { stars: 5, text: 'ريحة المنتجات حلوة ومش مزعجة، والشعر بعد الغسيل بيبقى ناعم.', name: 'جنى مصطفى', city: 'الغربية' },
    { stars: 5, text: 'حبيت إن البلسم مش بيخلي الشعر تقيل، بالعكس بيساعد جدًا في التصفيف.', name: 'روان إبراهيم', city: 'البحيرة' },
    { stars: 4, text: 'بقالهم فترة معايا وحسيت إن شعري بقى أهدى وأقل هيشان.', name: 'فرح حسن', city: 'كفر الشيخ' }
  ],
  full: [
    { stars: 5, text: 'استخدمت الباقة كروتين كامل، والفرق بالنسبة لي كان أحسن من استخدام منتج واحد.', name: 'أسماء وليد', city: 'دمياط' },
    { stars: 5, text: 'بقيت بستخدم الشامبو والبلسم بشكل منتظم والماسك مرة في الأسبوع، شعري بقى أنعم بكتير.', name: 'ملك شريف', city: 'بورسعيد' },
    { stars: 4, text: 'الميزة إن المنتجات مكملة لبعض، ومش محتاجة أجيب منتجات كتير من أماكن مختلفة.', name: 'ياسمين عادل', city: 'الإسماعيلية' },
    { stars: 5, text: 'بعد فترة من الاستخدام حسيت إن شعري بقى أسهل في التصفيف وشكله صحي أكتر.', name: 'ريهام طارق', city: 'السويس' },
    { stars: 5, text: 'الباقة مناسبة جدًا لو حد عايز يعمل روتين كامل بدل ما يجرب منتجات عشوائية.', name: 'هاجر أحمد', city: 'الفيوم' }
  ],
  serum: [
    { stars: 5, text: 'بحط كمية صغيرة على الأطراف بعد الاستحمام، بيدي لمعة حلوة من غير إحساس دهني.', name: 'دعاء محمد', city: 'بني سويف' },
    { stars: 4, text: 'الزيت خفيف ومناسب للاستخدام اليومي، خصوصًا على الأطراف.', name: 'سمر محمود', city: 'المنيا' },
    { stars: 5, text: 'أكتر حاجة عجبتني إنه مش تقيل على الشعر ومش بيخليه لازق.', name: 'آلاء حسين', city: 'أسيوط' },
    { stars: 4, text: 'بستخدم منه نقط بسيطة قبل التصفيف، وفرق معايا في شكل الأطراف.', name: 'حبيبة سامح', city: 'سوهاج' },
    { stars: 5, text: 'ريحته هادية والملمس خفيف، وبيخلي الشعر شكله مرتب.', name: 'شهد عمرو', city: 'قنا' }
  ]
};

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
    images: ['assets/mask.webp', 'assets/mask-jar-clean.webp', 'assets/mask-jar-texture.webp', 'assets/mask-strengthen-repair.webp', 'assets/mask-hero-banner.webp'],
    steps: [
      { title: 'التنظيف', text: 'اغسلي شعرك بالشامبو واشطفيه كويس، شيلي المياه الزيادة برفق' },
      { title: 'التطبيق', text: 'وزّعي الماسك بالتساوي على منتصف الشعر والأطراف' },
      { title: 'الانتظار', text: 'سيبيه 5-10 دقايق (ممكن توصلي لـ15 دقيقة لو الشعر تالف جدًا)' },
      { title: 'الشطف', text: 'اشطفي كويس وصففي شعرك عادي، كرري 1-2 مرة أسبوعيًا' }
    ],
    howtoTip: 'نصيحة: وزّعي الماسك بمشط واسع الأسنان ولفي شعرك بمنشفة دافية لنتيجة أعمق',
    ingredients: [
      { name: 'كولاجين محلل', desc: 'يدعم قوة الشعرة ومرونتها' },
      { name: 'خلاصة الماكا', desc: 'تغذي الشعر الجاف والمجهد' },
      { name: 'زيت الأرجان', desc: 'يحبس الرطوبة ويزود اللمعان' },
      { name: 'كيراتين محلل', desc: 'يساعد على تنعيم الشعر المسامي والتالف' },
      { name: 'زبدة الشيا', desc: 'تنعّم الشعر وتحميه من الجفاف' },
      { name: 'بانثينول', desc: 'يحسّن النعومة وسهولة التصفيف' }
    ],
    faq: [
      { q: 'إزاي أستخدم الماسك عشان أضمن أحسن نتيجة؟', a: 'بعد غسل شعرك بالشامبو، وزّعي كمية كافية على الشعر المبلل من المنتصف للأطراف، مع التركيز على أكتر الأجزاء تضررًا. سيبيه من 5 لـ10 دقايق (ممكن توصل لـ15 دقيقة لو الشعر تالف جدًا)، واشطفيه كويس بمية فاترة.' },
      { q: 'يناسب أنهي نوع شعر؟', a: 'مناسب لكل أنواع الشعر، وبالذات الجاف والتالف والهايش والكيرلي والمصبوغ والمعالج كيميائيًا.' },
      { q: 'هل مناسب للشعر الخفيف أو الدقيق؟', a: 'أيوه، التركيبة خفيفة وبتتشرب في الشعرة نفسها بدل ما تقعد على السطح، فمش بتحسس الشعر بالتقل حتى لو كان خفيف.' },
      { q: 'أستخدمه كام مرة في الأسبوع؟', a: 'الأفضل مرة أو مرتين أسبوعيًا. لو شعرك تالف جدًا ممكن تستخدميه بعد كل غسلة لحد ما تشوفي تحسن، وبعدها ترجعي لمرة أو مرتين.' },
      { q: 'هو بديل عن البلسم العادي؟', a: 'لأ، ده علاج ترميم عميق بيدخل جوه الشعرة نفسها، بعكس البلسم اللي بينعم السطح بس. النتيجة بتدوم أطول وبتكون أعمق.' },
      { q: 'آمن على الشعر المصبوغ أو المفرود؟', a: 'أيوه، آمن تمامًا على الشعر المصبوغ والمفرود بالبروتين، وبيساعد يحافظ على لون الصبغة ويقلل من بهتانها بمرور الوقت.' },
      { q: 'هل الماسك آمن للاستخدام أثناء الحمل؟', a: 'المنتج للاستخدام الخارجي على الشعر فقط. يُنصح بالتركيز على أطراف الشعر وتجنب ملامسة فروة الرأس أثناء الحمل، واستشارة الطبيب لو عندك أي حساسية أو قلق.' },
      { q: 'هل يصلح للأطفال؟', a: 'المنتج مش مخصص للأطفال تحديدًا. لو حابة تستخدميه لطفلك، يُفضّل استشارة طبيب أطفال الأول، وتجنب ملامسته للعين وفروة الرأس.' }
    ],
    beforeAfter: ['assets/mask-before-after-1.webp', 'assets/mask-before-after-2.webp'],
    video: 'assets/mask-video.webm',
    hairTypes: ['مفرود', 'مموّج', 'كيرلي', 'أفريقي كثيف'],
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
    images: ['assets/duo.webp', 'assets/duo-main.webp', 'assets/duo-repair-tagline.webp', 'assets/duo-set-box.webp'],
    steps: [
      { title: 'الشامبو', text: 'وزّعيه على شعر وفروة رأس مبللة، دلكي برفق لحد ما تعمل رغوة، اشطفي كويس' },
      { title: 'البلسم', text: 'حطيه من نص الشعر للأطراف (بعيد عن فروة الرأس)، سيبيه 1-3 دقايق، اشطفيه' },
      { title: 'النتيجة', text: 'شعر أنعم، أسهل في التسريح، وبلمعان طبيعي بعد الروتين الكامل' }
    ],
    howtoTip: 'للاستخدام اليومي أو كل يوم بالتبادل حسب نوع شعرك',
    ingredients: [
      { name: 'كولاجين', desc: 'يدعم بنية الشعرة وقوتها' },
      { name: 'خلاصة الماكا', desc: 'تغذي فروة الرأس والشعر المجهد' },
      { name: 'زيت الأرجان', desc: 'يرطب ويضيف لمعان طبيعي' },
      { name: 'بروتين محلل', desc: 'يقوي الشعرة ويقلل التقصف' }
    ],
    faq: [
      { q: 'إزاي أستخدم الشامبو والبلسم مع بعض؟', a: 'ابدئي بالشامبو على شعر مبلل، دلكي فروة الرأس برفق لحد ما تعمل رغوة، واشطفي كويس. بعدها حطي البلسم من نص الشعر للأطراف (بعيد عن فروة الرأس)، سيبيه دقيقة لـ3 دقايق، واشطفيه بمية فاترة.' },
      { q: 'أستخدمهم كام مرة في الأسبوع؟', a: 'مناسبين للاستخدام اليومي أو يوم بعد يوم حسب نوع شعرك، من غير ما يضروا الشعر أو يثقّلوه.' },
      { q: 'يصلحوا للشعر المصبوغ؟', a: 'أيوه، التركيبة آمنة على الشعر المصبوغ وبتساعد تحافظ على حيوية اللون مع ترطيب حقيقي.' },
      { q: 'محتاجة أستخدم الاتنين مع بعض ولا يمكن كل واحد لوحده؟', a: 'بيشتغلوا أحسن مع بعض كروتين متكامل، بس تقدري تستخدمي أي واحد فيهم لوحده حسب احتياج شعرك في اليوم.' },
      { q: 'هيفرق مع الشعر الدقيق أو الخفيف؟', a: 'التركيبة خفيفة ومش بتثقّل الشعر، فمناسبة للشعر الدقيق كمان بدون ما تخليه يبان لازق.' },
      { q: 'هفضل أشوف نتيجة بعد كام استخدام؟', a: 'كتير من العميلات بيلاحظوا فرق في الملمس واللمعان من أول استخدام، والنتيجة بتتحسن مع الاستمرار لمدة 2-4 أسابيع.' },
      { q: 'هل آمنين للاستخدام أثناء الحمل؟', a: 'الشامبو والبلسم للاستخدام الخارجي على الشعر فقط. يُنصح بتجنب ملامسة المنتج المباشرة لفروة الرأس بكميات كبيرة أثناء الحمل، واستشارة الطبيب لو عندك أي حساسية أو قلق.' },
      { q: 'هل يصلحوا للأطفال؟', a: 'المنتجات مش مخصصة للأطفال تحديدًا. لو حابة تستخدميهم لطفلك، يُفضّل استشارة طبيب أطفال الأول، وتجنب ملامستهم للعين.' }
    ],
    beforeAfter: ['assets/duo-before-after.webp'],
    video: 'assets/duo-video.webm',
    noNasties: ['بدون بارابين', 'بدون كبريتات', 'بدون فثالات', 'بدون إضافات صناعية', 'بدون قسوة على الحيوانات'],
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
    images: ['assets/bundle.webp'],
    steps: [
      { title: 'الشامبو', text: 'اغسلي شعرك بشامبو Karseell ودلكي فروة الرأس برفق' },
      { title: 'البلسم', text: 'وزّعي البلسم من النص للأطراف واتركيه 2-3 دقائق قبل الشطف' },
      { title: 'الماسك', text: 'حطي الماسك على الشعر المبلل واتركيه 5-15 دقيقة حسب حالة شعرك' },
      { title: 'الشطف النهائي', text: 'اشطفي شعرك كويس بالمية الفاترة واستمتعي بالنتيجة' }
    ],
    howtoTip: 'استخدمي الشامبو والبلسم يوميًا، والماسك مرة أو مرتين أسبوعيًا',
    ingredients: [
      { name: 'كولاجين', desc: 'يدعم بنية الشعرة وقوتها' },
      { name: 'خلاصة الماكا', desc: 'تغذي الشعر الجاف والمجهد' },
      { name: 'زيت الأرجان', desc: 'يحبس الرطوبة ويزود اللمعان' },
      { name: 'كيراتين محلل', desc: 'يساعد على تنعيم الشعر المسامي والتالف' }
    ],
    faq: [
      { q: 'إزاي أستخدم الباقة الكاملة كروتين واحد؟', a: 'الشامبو والبلسم للاستخدام اليومي أو يوم بعد يوم، والماسك مرة أو مرتين أسبوعيًا كعلاج مكثف إضافي.' },
      { q: 'ليه أشتري الباقة بدل ما أجرب منتج واحد؟', a: 'المنتجات الثلاثة مصممة تكمّل بعض: تنظيف وترطيب يومي بالشامبو والبلسم، وترميم عميق أسبوعي بالماسك، فبتاخدي روتين متكامل بدل ما تجمعي منتجات من ماركات مختلفة.' },
      { q: 'هل الباقة مناسبة للشعر المصبوغ؟', a: 'أيوه، الثلاث منتجات آمنة على الشعر المصبوغ والمعالج كيميائيًا.' },
      { q: 'هفضل أشوف فرق بعد قد إيه؟', a: 'غالبًا بتلاحظي فرق في الملمس من أول أسبوعين، والنتيجة الكاملة بتظهر مع الاستمرار لشهر تقريبًا.' },
      { q: 'تصلح لكل أنواع الشعر؟', a: 'أيوه، الباقة مصممة لتناسب كل أنواع الشعر، من الجاف والتالف لحد الخفيف والمموّج.' },
      { q: 'هل الباقة آمنة أثناء الحمل؟', a: 'المنتجات الثلاثة للاستخدام الخارجي على الشعر فقط. يُنصح بالتركيز على أطراف الشعر مع الماسك وتجنب ملامسة فروة الرأس بكميات كبيرة أثناء الحمل، واستشارة الطبيب لو عندك أي حساسية أو قلق.' },
      { q: 'هل تصلح للأطفال؟', a: 'المنتجات مش مخصصة للأطفال تحديدًا. لو حابة تستخدميها لطفلك، يُفضّل استشارة طبيب أطفال الأول، وتجنب ملامستها للعين.' }
    ],
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
    images: ['assets/serum-main.webp', 'assets/serum-hero-text.webp', 'assets/serum-lightweight.webp', 'assets/serum-revitalize.webp'],
    steps: [
      { title: 'كعلاج مكثف', text: 'حطي كام قطرة على شعر مبلل بالمنشفة، وسيبيه من غير شطف' },
      { title: 'كمنعّم يومي', text: 'وزّعي كمية بسيطة على الأطراف لتهدئة الهيشان وزيادة اللمعان' },
      { title: 'كمنتج تصفيف', text: 'استخدميه على شعر جاف لتنعيمه والتحكم في الشعر الطائر' }
    ],
    howtoTip: 'قليل منه بيكفي — ابدئي بكمية بسيطة وزوّدي حسب طول شعرك',
    ingredients: [
      { name: 'زيت الأرجان المغربي', desc: 'يغذي بعمق ويدعم إصلاح الشعر ويزود اللمعان' },
      { name: 'فيتامين E', desc: 'عناية مضادة للأكسدة تساعد في حماية الشعر من الجفاف' },
      { name: 'أحماض دهنية أساسية', desc: 'تساعد على تقوية سطح الشعرة وتحسين المرونة' },
      { name: 'خلاصة نباتية طبيعية', desc: 'عناية إضافية ومرطبة للشعر' },
      { name: 'زيت جوز الهند', desc: 'يرطب ويحمي من الجفاف' }
    ],
    faq: [
      { q: 'إزاي أستخدم السيروم؟', a: 'حطي كام قطرة على شعر مبلل بالمنشفة أو جاف، ركزي على الأطراف، ومفيش داعي تشطفيه. ممكن تستخدميه كعلاج ليلي أو كلمسة أخيرة بعد التصفيف.' },
      { q: 'أستخدمه كام مرة؟', a: 'يوميًا أو حسب احتياجك. لو شعرك جاف أو تالف استخدميه بانتظام، ولو شعرك عادي يكفي 2-3 مرات أسبوعيًا.' },
      { q: 'يناسب أنهي نوع شعر؟', a: 'مناسب لكل أنواع الشعر، وبالذات الجاف والمموّج والهايش والمصبوغ والتالف.' },
      { q: 'هيثقّل شعري؟', a: 'لأ، التركيبة خفيفة جدًا وبتتشرب بسرعة، بتدي ترطيب ولمعان من غير ما تخلي الشعر لازق أو تقيل.' },
      { q: 'ريحته قوية؟', a: 'ريحته خفيفة وطبيعية ومش طاغية، وبتخف بسرعة وتسيب شعرك منتعش.' },
      { q: 'يصلح للشعر المصبوغ أو المفرود؟', a: 'أيوه، مناسب تمامًا للشعر المصبوغ والمعالج كيميائيًا، وبيساعد يحمي اللون ويقلل من التلف الإضافي.' },
      { q: 'هل السيروم آمن أثناء الحمل؟', a: 'المنتج للاستخدام الخارجي على الشعر فقط. يُنصح باستشارة الطبيب لو عندك أي حساسية أو قلق أثناء الحمل قبل الاستخدام.' },
      { q: 'هل يصلح للأطفال؟', a: 'المنتج مش مخصص للأطفال تحديدًا. لو حابة تستخدميه لطفلك، يُفضّل استشارة طبيب أطفال الأول، وتجنب ملامسته للعين.' }
    ],
    beforeAfter: ['assets/serum-before-after1.webp', 'assets/serum-before-after2.webp'],
    video: 'assets/serum-video.webm',
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
logJourney('زيارة: صفحة ' + product.name);

let quantity = 1;
let couponApplied = false;

// ---- Abandoned checkout tracking ----
let checkoutStarted = false;
let orderSubmitted = false;
let abandonedSent = false;

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

// Stock note (moved here from the homepage offer cards to keep those shorter)
if (product.inStock && STOCK[productId] !== undefined) {
  const stockNote = document.getElementById('productStockNote');
  stockNote.hidden = false;
  stockNote.innerHTML = '⚡ متبقي <span class="stock-count">' + STOCK[productId] + '</span> قطع بس من الكمية الحالية';
}

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

// Ingredients (detailed: name + role)
const ingredientsGrid = document.getElementById('ingredientsGrid');
product.ingredients.forEach(function (ing) {
  const div = document.createElement('div');
  div.className = 'ingredient-card';
  div.innerHTML = '<h3>' + ing.name + '</h3><p>' + ing.desc + '</p>';
  ingredientsGrid.appendChild(div);
});

// FAQ
const faqList = document.getElementById('faqList');
(product.faq || []).forEach(function (item) {
  const details = document.createElement('details');
  details.className = 'faq-item';
  details.innerHTML = '<summary>' + item.q + '</summary><p>' + item.a + '</p>';
  faqList.appendChild(details);
});

// Hair types (mask only)
if (product.hairTypes && product.hairTypes.length) {
  const hairTypesSection = document.getElementById('hairTypesSection');
  const hairTypesGrid = document.getElementById('hairTypesGrid');
  hairTypesSection.hidden = false;
  product.hairTypes.forEach(function (type) {
    const div = document.createElement('div');
    div.className = 'hairtype-chip';
    div.textContent = type;
    hairTypesGrid.appendChild(div);
  });
}

// No nasties checklist (duo only)
if (product.noNasties && product.noNasties.length) {
  const noNastiesSection = document.getElementById('noNastiesSection');
  const noNastiesGrid = document.getElementById('noNastiesGrid');
  noNastiesSection.hidden = false;
  product.noNasties.forEach(function (item) {
    const div = document.createElement('div');
    div.className = 'no-nasty-item';
    div.textContent = '✕ ' + item;
    noNastiesGrid.appendChild(div);
  });
}

// Before/after
const beforeAfterSection = document.getElementById('beforeAfterSection');
const beforeAfterGrid = document.getElementById('beforeAfterGrid');
if (product.beforeAfter && product.beforeAfter.length) {
  product.beforeAfter.forEach(function (src) {
    const item = document.createElement('div');
    item.className = 'before-after-item';
    item.innerHTML =
      '<span class="before-after-tag">قبل → بعد</span>' +
      '<img src="' + src + '" alt="نتيجة قبل وبعد استخدام ' + product.name + '" loading="lazy">' +
      '<p class="before-after-caption">نتيجة حقيقية بعد استخدام ' + product.name + '</p>';
    beforeAfterGrid.appendChild(item);
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

// ---- Live viewer widget (cosmetic urgency element, same behavior as the homepage) ----
if (product.inStock) {
  const liveCountEl = document.getElementById('liveViewerCount');
  if (liveCountEl) {
    function randomViewerCount() { return Math.floor(Math.random() * (100 - 7 + 1)) + 7; }
    liveCountEl.textContent = randomViewerCount();
    setInterval(function () {
      liveCountEl.textContent = randomViewerCount();
    }, 2000);
  }
} else {
  const widget = document.getElementById('liveViewerWidget');
  if (widget) widget.hidden = true;
}

// Reviews for this specific product
const reviewGrid = document.getElementById('productReviewGrid');
(REVIEWS[productId] || []).forEach(function (r) {
  const card = document.createElement('div');
  card.className = 'review-card';
  const starsStr = '★'.repeat(r.stars) + '☆'.repeat(5 - r.stars);
  card.innerHTML =
    '<p class="review-stars">' + starsStr + '</p>' +
    '<p class="review-text">' + r.text + '</p>' +
    '<p class="review-name">' + r.name + '، ' + r.city + '</p>' +
    '<p class="review-verified">رسالة عميلة حقيقية ✓</p>';
  reviewGrid.appendChild(card);
});

// Out of stock handling
if (!product.inStock) {
  document.getElementById('outOfStockBadge').hidden = false;
  document.getElementById('productCtaGroup').hidden = true;
  document.getElementById('outOfStockMsg').hidden = false;
  document.getElementById('order').hidden = true;
  document.querySelector('.mobile-sticky-cta').hidden = true;

  const headerOrderBtn = document.getElementById('headerOrderBtn');
  if (headerOrderBtn) headerOrderBtn.setAttribute('href', '#outOfStockMsg');
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
// Customer review submission — sent to the sheet for manual moderation,
// never published on the page automatically.
// =====================================================================
(function () {
  const reviewForm = document.getElementById('reviewForm');
  if (!reviewForm) return;

  const starBtns = document.querySelectorAll('#starRating .star-btn');
  const reviewFormMessage = document.getElementById('reviewFormMessage');
  let selectedStars = 0;

  function paintStars(count) {
    starBtns.forEach(function (btn) {
      const n = parseInt(btn.getAttribute('data-star'), 10);
      btn.classList.toggle('is-active', n <= count);
    });
  }

  starBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      selectedStars = parseInt(btn.getAttribute('data-star'), 10);
      paintStars(selectedStars);
    });
  });

  reviewForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (selectedStars === 0) {
      reviewFormMessage.textContent = 'من فضلك اختاري تقييمك بالنجوم الأول.';
      reviewFormMessage.className = 'form-message error';
      return;
    }
    if (!reviewForm.checkValidity()) {
      reviewForm.reportValidity();
      return;
    }

    const data = {
      type: 'review',
      product: productId,
      productName: product.name,
      name: reviewForm.reviewerName.value.trim(),
      email: reviewForm.reviewerEmail.value.trim(),
      stars: selectedStars,
      text: reviewForm.reviewText.value.trim(),
      timestamp: new Date().toISOString()
    };

    const payload = JSON.stringify(data);
    let sent = false;
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'text/plain;charset=UTF-8' });
      sent = navigator.sendBeacon(GOOGLE_SCRIPT_URL, blob);
    }
    if (!sent) {
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: payload
      }).catch(function (err) { console.error('Failed to send review:', err); });
    }

    reviewForm.reset();
    selectedStars = 0;
    paintStars(0);
    reviewFormMessage.textContent = 'شكرًا ليكِ! وصلنا تقييمك وهنراجعه قريب.';
    reviewFormMessage.className = 'form-message success';
  });
})();

// =====================================================================
// Sticky mobile CTA — always reflects THIS product's real discount,
// and switches to "+ free shipping" the moment the cart qualifies.
// =====================================================================
const stickyCtaBtn = document.getElementById('stickyCtaBtn');
function updateStickyCta(isFreeShipping) {
  if (!stickyCtaBtn) return;
  stickyCtaBtn.textContent = 'اطلبي دلوقتي بخصم ' + product.discountPercent + '%' + (isFreeShipping ? ' وشحن مجاني' : '');
}
if (product.inStock) updateStickyCta(product.price >= FREE_SHIPPING_THRESHOLD);

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

    updateStickyCta(totals.shipping === 0);
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

  document.querySelectorAll('a[href="#order"]').forEach(function (link) {
    link.addEventListener('click', function () {
      checkoutStarted = true;
      logJourney('دوست: اطلبي الآن (' + product.name + ')');
    });
  });

  let pixelInitiateFired = false;
  const form = document.getElementById('orderForm');
  form.addEventListener('input', function () {
    checkoutStarted = true;
    if (pixelInitiateFired) return;
    pixelInitiateFired = true;
    if (typeof fbq === 'function') {
      fbq('track', 'InitiateCheckout', { content_name: product.name, value: product.price, currency: 'EGP' });
    }
  });

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
    orderSubmitted = true;
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

  // ---- Abandoned checkout: fires only if the customer started (clicked an "order now"
  // button or typed anything) and left without completing the order ----
  function sendAbandonedCheckout() {
    if (!checkoutStarted || orderSubmitted || abandonedSent) return;

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const governorate = form.governorate.value;
    const address = form.address.value.trim();

    abandonedSent = true;

    const data = {
      type: 'abandoned',
      offer: product.name,
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
}
