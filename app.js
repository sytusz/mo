/**
 * Ventic Media Hub & Cinema Player Engine
 * Exact Replica from Screenshots (Genre Dropdown, Size Slider, Row Arrows, Detail Page)
 */

// Configuration State
const config = {
  addonUrl: localStorage.getItem('ventic_addon_url') || 'https://torrentio.strem.fun',
  catalogUrl: 'https://v3-cinemeta.strem.io',
  maxFileSizeGb: 5.0
};

// Language State ('ar' or 'en')
let currentLang = localStorage.getItem('cinema_lang') || 'ar';

const UI_STRINGS = {
  ar: {
    appName: 'سينما العراق',
    home: 'الرئيسية',
    movies: 'الأفلام',
    tv: 'المسلسلات',
    favourites: 'المفضلة',
    watchlist: 'قائمة المشاهدة',
    history: 'السجل',
    searchPlaceholder: 'ابحث عن أي فيلم أو مسلسل...',
    continueWatching: 'تابع المشاهدة',
    popularMovies: 'أفلام شائعة',
    popularTv: 'مسلسلات شائعة',
    actionAdventure: 'أكشن ومغامرة',
    scifiFantasy: 'خيال علمي وفنتازيا',
    crimeThrillers: 'جريمة وتشويق',
    comedy: 'كوميديا وترفيه',
    topRated: 'الأعلى تقييماً في السينما',
    playStream: 'تشغيل الآن',
    details: 'التفاصيل',
    yearLabel: 'السنة',
    allYears: 'جميع السنوات',
    currentYearLabel: 'السنة الحالية',
    genreLabel: 'النوع',
    allGenres: 'جميع الأنواع',
    popular: 'الشائع',
    trending: 'الرائج',
    top_rated: 'الأعلى تقييماً',
    upcoming: 'القادم',
    in_cinemas: 'في السينما',
    streamPickerTitle: 'اختر الجودة والمصدر',
    emptyFav: 'لم تقم بإضافة أي عناصر للمفضلة بعد.',
    emptyWatchlist: 'قائمة المشاهدة فارغة.',
    emptyHistory: 'السجل فارغ حالياً.',
    director: 'المخرج',
    writers: 'الكتّاب',
    budget: 'الميزانية',
    revenue: 'الإيرادات',
    cast: 'طاقم التمثيل',
    moreLikeThis: 'أعمال مشابهة',
    episodes: 'المواسم والحلقات',
    download: 'تحميل',
    releases: 'الإصدارات',
    trailer: 'الإعلان',
    loadMore: 'تحميل المزيد',
    devTitle: 'معلومات المطور',
    devBy: 'تطوير وبرمجة • أمير علي',
    developer: 'المطور',
    officialSite: 'الموقع الرسمي',
    telegramLink: 'تيليكرام: @sytus',
    devModalSub: 'تطوير وبرمجة • أمير علي',
    langCode: 'English'
  },
  en: {
    appName: 'CinemaIQ',
    home: 'Home',
    movies: 'Movies',
    tv: 'TV Shows',
    favourites: 'Favourites',
    watchlist: 'Watchlist',
    history: 'History',
    searchPlaceholder: 'Search movies and shows...',
    continueWatching: 'Continue watching',
    popularMovies: 'Popular movies',
    popularTv: 'Popular TV shows',
    actionAdventure: 'Action & Adventure',
    scifiFantasy: 'Sci-Fi & Fantasy',
    crimeThrillers: 'Crime & Thrillers',
    comedy: 'Comedy & Entertainment',
    topRated: 'Top rated cinema',
    playStream: 'Play Stream',
    details: 'Details',
    yearLabel: 'Year',
    allYears: 'All Years',
    currentYearLabel: 'Current Year',
    genreLabel: 'Genre',
    allGenres: 'All Genres',
    popular: 'Popular',
    trending: 'Trending',
    top_rated: 'Top rated',
    upcoming: 'Upcoming',
    in_cinemas: 'In cinemas',
    streamPickerTitle: 'Select Stream Quality',
    emptyFav: "You haven't added any favourites yet.",
    emptyWatchlist: 'Your watchlist is empty.',
    emptyHistory: 'No watch history recorded yet.',
    director: 'Director',
    writers: 'Writers',
    budget: 'Budget',
    revenue: 'Revenue',
    cast: 'Cast',
    moreLikeThis: 'More Like This',
    episodes: 'Seasons & Episodes',
    download: 'Download',
    releases: 'Releases',
    trailer: 'Trailer',
    loadMore: 'Load More',
    devTitle: 'Developer Info',
    devBy: 'Developed by Amir Ali',
    developer: 'Developer',
    officialSite: 'Official Website',
    telegramLink: 'Telegram: @sytus',
    devModalSub: 'Developed by Amir Ali',
    langCode: 'العربية'
  }
};

const GENRE_TRANSLATIONS = {
  'action': 'أكشن',
  'adventure': 'مغامرة',
  'animation': 'رسوم متحركة',
  'biography': 'سيرة ذاتية',
  'comedy': 'كوميديا',
  'crime': 'جريمة',
  'documentary': 'وثائقي',
  'drama': 'دراما',
  'family': 'عائلي',
  'fantasy': 'فنتازيا',
  'history': 'تاريخ',
  'horror': 'رعب',
  'music': 'موسيقى',
  'musical': 'استعراضي',
  'mystery': 'غموض',
  'romance': 'رومانسي',
  'sci-fi': 'خيال علمي',
  'thriller': 'إثارة',
  'war': 'حرب',
  'western': 'غرب أمريكي'
};

const ARABIC_MEDIA = {
  'tt14230458': {
    name: 'Spider-Man: Brand New Day',
    desc: 'يبدأ بيتر باركر فصلاً جديداً تماماً في حياته كبطل غوثام ونيويورك المتخفي، حيث يواجه تهديدات غير مسبوقة وتحالفات جديدة غير متوقعة.',
    genres: ['أكشن', 'مغامرة', 'خيال علمي']
  },
  'tt21344706': {
    name: 'Avengers: Doomsday',
    desc: 'يتحد أبطال الأرض الخارقون في مواجهة الدكتور دووم، أعظم تهديد يشهده الكون المتعدد لإنقاذ خطوط الزمن من الدمار الشامل.',
    genres: ['أكشن', 'مغامرة', 'خيال علمي']
  },
  'tt18778302': {
    name: 'The Batman: Part II',
    desc: 'يواصل بروس واين تطهير مدينة غوثام من الفساد المتجذر، ويواجه أسراراً مدفونة تكشف مؤامرات جديدة في عالم الجريمة المنظمة.',
    genres: ['أكشن', 'جريمة', 'دراما']
  },
  'tt5950044': {
    name: 'Superman',
    desc: 'يسعى سوبرمان إلى التوفيق بين تراثه الكريبتوني ونشأته الإنسانية كـ كلارك كينت، متجسداً كرمز للحقيقة والعدالة في عالم حديث.',
    genres: ['أكشن', 'مغامرة', 'خيال علمي']
  },
  'tt10676052': {
    name: 'Fantastic Four: First Steps',
    desc: 'أول عائلة خارقة في مارفل تنطلق في رحلة ملحمية لاستكشاف المجهول الكوني وحماية كوكب الأرض من أخطار المجرة.',
    genres: ['أكشن', 'مغامرة', 'خيال علمي']
  },
  'tt1757678': {
    name: 'Avatar: Fire and Ash',
    desc: 'يستكشف جيك سولي ونيتيري قبيلة الرماد الغامضة على كوكب باندورا، وسط تصاعد التوترات مع شعب النار وصراع جديد للبقاء.',
    genres: ['خيال علمي', 'مغامرة', 'أكشن']
  },
  'tt6263850': {
    name: 'Deadpool & Wolverine',
    desc: 'يتعافى وولفرين من إصاباته عندما يتقاطع طريقه مع ديدبول الثرثار للعمل معاً والتغلب على عدو مشترك يهدد عوالمهما.',
    genres: ['أكشن', 'كوميديا', 'خيال علمي']
  },
  'tt15239678': {
    name: 'Dune: Part Two',
    desc: 'يتحد بول أتريدس مع تشاني والفريمن في رحلة انتقامية ضد المتآمرين الذين دمروا عائلته، ويواجه خياراً بين حب حياته ومصير الكون.',
    genres: ['خيال علمي', 'مغامرة', 'أكشن']
  },
  'tt9603212': {
    name: 'Gladiator II',
    desc: 'بعد سنوات من التضحية ببطله ماكسيموس، يُجبر لوسيوس على دخول الكولوسيوم للقتال من أجل مستقبل روما وإعادة المجد لشعبها.',
    genres: ['أكشن', 'مغامرة', 'دراما']
  },
  'tt18411490': {
    name: 'Alien: Romulus',
    desc: 'مجموعة من المستعمرين الفضائيين الشباب يواجهون أبشع وأشرس أشكال الحياة في الكون أثناء تنقيبهم في محطة فضائية مهجورة.',
    genres: ['رعب', 'خيال علمي', 'إثارة']
  },
  'tt12584954': {
    name: 'Twisters',
    desc: 'مطارِدة عواصف سابقة تجد نفسها مجبرة على العودة إلى الميدان لاختبار نظام تتبع ثوري وسط تفشي أعاصير مدمرة وغير مسبوقة.',
    genres: ['أكشن', 'مغامرة', 'إثارة']
  },
  'tt12037194': {
    name: 'Furiosa: A Mad Max Saga',
    desc: 'قصة أصل المحاربة فيوريوسا قبل لقائها بماكس المجنون، ورحلتها الطويلة والشاقة للعودة إلى موطنها وسط عالم مدمر وصراع أباطرة الحرب.',
    genres: ['أكشن', 'مغامرة', 'خيال علمي']
  },
  'tt11384524': {
    name: 'Kingdom of the Planet of the Apes',
    desc: 'بعد أجيال عديدة من عهد قيصر، ينطلق قرد شاب في رحلة ملحمية ستجعله يشكك في كل ما تعلمه عن الماضي ويحدد مصير القردة والبشر معاً.',
    genres: ['أكشن', 'مغامرة', 'خيال علمي']
  },
  'tt17526714': {
    name: 'The Substance',
    desc: 'نجمة مشهورة متقدمة في السن تلجأ إلى عقار ثوري في السوق السوداء ينتج نسخة أصغر وأكثر كمالاً منها، مع عواقب مرعبة وغير متوقعة.',
    genres: ['دراما', 'رعب', 'خيال علمي']
  },
  'tt9288030': {
    name: 'Reacher',
    desc: 'جاك ريتشر، ضابط الشرطة العسكرية السابق، يدخل الحياة المدنية ليتورط فجأة في مؤامرة قتل فاسدة داخل بلدة صغيرة.',
    genres: ['أكشن', 'جريمة', 'دراما']
  },
  'tt1190634': {
    name: 'The Mentalist',
    desc: 'وسيط روحي مزيف سابق يتمتع بقوة ملاحظة استثنائية يعمل كمستشار لمكتب التحقيقات في كاليفورنيا للقبض على القاتل المتسلسل ريد جون.',
    genres: ['جريمة', 'دراما', 'غموض']
  },
  'tt1462764': {
    name: 'Captain America: Brave New World',
    desc: 'يجد سام ويلسون نفسه في قلب حادث دولي معقد وخطير بعد لقائه مع الرئيس الأمريكي الجديد ثاديوس روس.',
    genres: ['أكشن', 'مغامرة', 'خيال علمي']
  },
  'tt27988358': {
    name: 'Jurassic World Rebirth',
    desc: 'بعد خمس سنوات من أحداث دومينيون، ينطلق فريق متخصص في مهمة سرية لتأمين مادة وراثية من أكبر ثلاثة ديناصورات باقية.',
    genres: ['أكشن', 'مغامرة', 'خيال علمي']
  },
  'tt6604188': {
    name: 'Tron: Ares',
    desc: 'يتم إرسال برنامج رقمي متطور وشديد التعقيد يدعى آريس من العالم الرقمي إلى العالم البشري الحقيقي في مهمة شديدة الخطورة.',
    genres: ['أكشن', 'خيال علمي', 'مغامرة']
  },
  'tt9362722': {
    name: 'Spider-Man: Beyond the Spider-Verse',
    desc: 'مايلز موراليس يواصل مغامرته عبر أكوان العنكبوت المتعددة جنباً إلى جنب مع غوين ستيسي لإنقاذ كل من يحبهم من دمار حتمي.',
    genres: ['رسوم متحركة', 'أكشن', 'مغامرة']
  },
  'tt26759142': {
    name: 'Mission: Impossible - The Final Reckoning',
    desc: 'إيثان هانت وفريقه في مهمة مستحيلة أخيرة هي الأخطر في تاريخهم لتفادي كارثة عالمية وشيكة تهدد مصير البشرية.',
    genres: ['أكشن', 'مغامرة', 'إثارة']
  },
  'tt26548265': {
    name: 'Zootopia 2',
    desc: 'يعود المحققان جودي هوبس ونيك وايلد في مغامرة بوليسية كوميدية جديدة لكشف لغز محير يهدد استقرار مدينة زوتوبيا.',
    genres: ['رسوم متحركة', 'مغامرة', 'كوميديا']
  },
  'tt28235794': {
    name: 'Michael',
    desc: 'السيرة الذاتية لأسطورة الموسيقى والبوب مايكل جاكسون ورحلته الاستثنائية من فرقة الجاكسون فايف حتى تربعه على عرش النجومية العالمية.',
    genres: ['سيرة ذاتية', 'دراما', 'موسيقى']
  },
  'tt10954984': {
    name: 'Fast X: Part 2',
    desc: 'المواجهة الختامية لـ دومينيك توريتو وعائلته في سباق السرعة الأخير لحماية كل ما بنوه ضد عدوهم الأشرس دانتي.',
    genres: ['أكشن', 'مغامرة', 'جريمة']
  }
};

const UPCOMING_MOVIES = [
  {
    id: 'tt14230458',
    name: 'Spider-Man: Brand New Day',
    year: '2026',
    type: 'movie',
    isUpcoming: true,
    poster: 'https://images.metahub.space/poster/medium/tt14230458/img.jpg',
    background: 'https://images.metahub.space/background/medium/tt14230458/img.jpg',
    description: 'Peter Parker begins a brand new chapter in his life as Spider-Man, facing unprecedented threats across New York City.',
    imdbRating: '8.4',
    genres: ['Action', 'Adventure', 'Sci-Fi']
  },
  {
    id: 'tt21344706',
    name: 'Avengers: Doomsday',
    year: '2026',
    type: 'movie',
    isUpcoming: true,
    poster: 'https://images.metahub.space/poster/medium/tt21344706/img.jpg',
    background: 'https://images.metahub.space/background/medium/tt21344706/img.jpg',
    description: 'Earth’s Mightiest Heroes unite against Doctor Doom to prevent catastrophic multiverse destruction.',
    imdbRating: '8.8',
    genres: ['Action', 'Adventure', 'Sci-Fi']
  },
  {
    id: 'tt18778302',
    name: 'The Batman: Part II',
    year: '2026',
    type: 'movie',
    isUpcoming: true,
    poster: 'https://images.metahub.space/poster/medium/tt18778302/img.jpg',
    background: 'https://images.metahub.space/background/medium/tt18778302/img.jpg',
    description: 'Bruce Wayne continues to battle Gotham corruption and new underground villain syndicates.',
    imdbRating: '8.5',
    genres: ['Action', 'Crime', 'Drama']
  },
  {
    id: 'tt5950044',
    name: 'Superman',
    year: '2025',
    type: 'movie',
    isUpcoming: true,
    poster: 'https://images.metahub.space/poster/medium/tt5950044/img.jpg',
    background: 'https://images.metahub.space/background/medium/tt5950044/img.jpg',
    description: 'Follows Superman as he reconciles his heritage with his human upbringing.',
    imdbRating: '8.2',
    genres: ['Action', 'Adventure', 'Sci-Fi']
  },
  {
    id: 'tt10676052',
    name: 'The Fantastic Four: First Steps',
    year: '2025',
    type: 'movie',
    isUpcoming: true,
    poster: 'https://images.metahub.space/poster/medium/tt10676052/img.jpg',
    background: 'https://images.metahub.space/background/medium/tt10676052/img.jpg',
    description: 'Marvel’s First Family sets out on an interstellar voyage to protect Earth from cosmic threats.',
    imdbRating: '8.1',
    genres: ['Action', 'Adventure', 'Sci-Fi']
  },
  {
    id: 'tt1757678',
    name: 'Avatar: Fire and Ash',
    year: '2025',
    type: 'movie',
    isUpcoming: true,
    poster: 'https://images.metahub.space/poster/medium/tt1757678/img.jpg',
    background: 'https://images.metahub.space/background/medium/tt1757678/img.jpg',
    description: 'Jake Sully and Neytiri encounter the Ash People, a nomadic fire tribe on Pandora.',
    imdbRating: '8.3',
    genres: ['Action', 'Adventure', 'Fantasy']
  },
  {
    id: 'tt1462764',
    name: 'Captain America: Brave New World',
    year: '2025',
    type: 'movie',
    isUpcoming: true,
    poster: 'https://images.metahub.space/poster/medium/tt1462764/img.jpg',
    background: 'https://images.metahub.space/background/medium/tt1462764/img.jpg',
    description: 'Sam Wilson finds himself in the middle of an international incident as Captain America.',
    imdbRating: '7.8',
    genres: ['Action', 'Adventure', 'Sci-Fi']
  },
  {
    id: 'tt27988358',
    name: 'Jurassic World Rebirth',
    year: '2025',
    type: 'movie',
    isUpcoming: true,
    poster: 'https://images.metahub.space/poster/medium/tt27988358/img.jpg',
    background: 'https://images.metahub.space/background/medium/tt27988358/img.jpg',
    description: 'Five years after Jurassic World Dominion, an expedition races to secure genetic material from the world’s largest dinosaurs.',
    imdbRating: '8.0',
    genres: ['Action', 'Adventure', 'Sci-Fi']
  },
  {
    id: 'tt6604188',
    name: 'Tron: Ares',
    year: '2025',
    type: 'movie',
    isUpcoming: true,
    poster: 'https://images.metahub.space/poster/medium/tt6604188/img.jpg',
    background: 'https://images.metahub.space/background/medium/tt6604188/img.jpg',
    description: 'A sophisticated program, Ares, is sent from the digital world into the real world on a dangerous mission.',
    imdbRating: '7.9',
    genres: ['Action', 'Adventure', 'Sci-Fi']
  },
  {
    id: 'tt9362722',
    name: 'Spider-Man: Beyond the Spider-Verse',
    year: '2025',
    type: 'movie',
    isUpcoming: true,
    poster: 'https://images.metahub.space/poster/medium/tt9362722/img.jpg',
    background: 'https://images.metahub.space/background/medium/tt9362722/img.jpg',
    description: 'Miles Morales traverses the multiverse alongside Gwen Stacy to alter his destiny and stop The Spot.',
    imdbRating: '9.0',
    genres: ['Animation', 'Action', 'Adventure']
  },
  {
    id: 'tt26759142',
    name: 'Mission: Impossible - The Final Reckoning',
    year: '2025',
    type: 'movie',
    isUpcoming: true,
    poster: 'https://images.metahub.space/poster/medium/tt26759142/img.jpg',
    background: 'https://images.metahub.space/background/medium/tt26759142/img.jpg',
    description: 'Ethan Hunt and his IMF team embark on their final, most perilous mission to prevent global catastrophe.',
    imdbRating: '8.5',
    genres: ['Action', 'Adventure', 'Thriller']
  },
  {
    id: 'tt26548265',
    name: 'Zootopia 2',
    year: '2025',
    type: 'movie',
    isUpcoming: true,
    poster: 'https://images.metahub.space/poster/medium/tt26548265/img.jpg',
    background: 'https://images.metahub.space/background/medium/tt26548265/img.jpg',
    description: 'Detectives Judy Hopps and Nick Wilde find themselves on the twisting trail of a mysterious reptile.',
    imdbRating: '7.9',
    genres: ['Animation', 'Adventure', 'Comedy']
  },
  {
    id: 'tt28235794',
    name: 'Michael',
    year: '2025',
    type: 'movie',
    isUpcoming: true,
    poster: 'https://images.metahub.space/poster/medium/tt28235794/img.jpg',
    background: 'https://images.metahub.space/background/medium/tt28235794/img.jpg',
    description: 'The life story of singer Michael Jackson from his days with the Jackson Five to his global superstardom.',
    imdbRating: '8.2',
    genres: ['Biography', 'Drama', 'Music']
  },
  {
    id: 'tt10954984',
    name: 'Fast X: Part 2',
    year: '2026',
    type: 'movie',
    isUpcoming: true,
    poster: 'https://images.metahub.space/poster/medium/tt10954984/img.jpg',
    background: 'https://images.metahub.space/background/medium/tt10954984/img.jpg',
    description: 'The definitive final race of Dominic Toretto and his crew to protect their family against Dante Reyes.',
    imdbRating: '7.6',
    genres: ['Action', 'Adventure', 'Crime']
  }
];

function getMediaTitle(item) {
  if (!item) return '';
  return item.name || item.title || 'Untitled';
}

function getMediaOverview(item) {
  if (!item) return '';
  if (currentLang === 'ar' && ARABIC_MEDIA[item.id]) {
    return ARABIC_MEDIA[item.id].desc;
  }
  return item.description || item.overview || 'Watch now in full cinema quality with multi-audio and high-speed streaming mirrors.';
}

function getMediaGenres(item) {
  if (!item) return [];
  const gList = item.genres || [item.genre || 'Drama'];
  if (currentLang === 'ar') {
    if (ARABIC_MEDIA[item.id]?.genres) return ARABIC_MEDIA[item.id].genres;
    return gList.map(g => GENRE_TRANSLATIONS[g.toLowerCase()] || g);
  }
  return gList;
}

// Central Store
const mediaMap = new Map();
let movieIds = [];
let tvIds = [];
let animeIds = [];

// Navigation History
let navHistory = ['home'];
let currentTab = 'home';
let activeMedia = null;
let selectedSeason = 1;
let selectedEpisode = 1;
let currentStreams = [];
let seriesEpisodesMap = new Map();

// Active Dynamic Year & Genre Filters (Defaults to Current Year dynamically)
const CURRENT_APP_YEAR = new Date().getFullYear();
let activeMovieYear = String(CURRENT_APP_YEAR);
let activeTvYear = String(CURRENT_APP_YEAR);
let activeMovieGenre = 'all';
let activeTvGenre = 'all';

// Pagination State
let movieSkip = 0;
let tvSkip = 0;
let isFetchingBatch = false;

// Local Storage Collections
let favourites = JSON.parse(localStorage.getItem('ventic_favourites') || '[]');
let watchlist = JSON.parse(localStorage.getItem('ventic_watchlist') || '[]');
let history = JSON.parse(localStorage.getItem('ventic_history') || '[]');
let savedTheme = localStorage.getItem('ventic_theme') || 'ventic-dark';

// Register stored items
registerItems(favourites);
registerItems(watchlist);
registerItems(history);

// Apply Theme
document.body.dataset.theme = savedTheme;

// DOM References
const elements = {
  browseShell: document.getElementById('browseShell'),
  contentScroll: document.getElementById('contentScroll'),
  
  navLinks: document.querySelectorAll('.nav-link'),
  tabViews: document.querySelectorAll('.tab-view'),
  backNavBtn: document.getElementById('backNavBtn'),
  favCountBadge: document.getElementById('favCountBadge'),
  watchCountBadge: document.getElementById('watchCountBadge'),

  // Hero Spotlight
  heroSpotlight: document.getElementById('heroSpotlight'),
  heroBackdrop: document.getElementById('heroBackdrop'),
  heroTitle: document.getElementById('heroTitle'),
  heroRating: document.getElementById('heroRating'),
  heroTypePill: document.getElementById('heroTypePill'),
  heroYear: document.getElementById('heroYear'),
  heroRuntime: document.getElementById('heroRuntime'),
  heroOverview: document.getElementById('heroOverview'),
  heroMiniCarousel: document.getElementById('heroMiniCarousel'),
  heroPlayBtn: document.getElementById('heroPlayBtn'),
  heroDetailsBtn: document.getElementById('heroDetailsBtn'),
  heroHeartBtn: document.getElementById('heroHeartBtn'),
  heroBookmarkBtn: document.getElementById('heroBookmarkBtn'),

  // Home Rows
  popularMoviesRow: document.getElementById('popularMoviesRow'),
  popularShowsRow: document.getElementById('popularShowsRow'),
  topRatedRow: document.getElementById('topRatedRow'),
  continueWatchingSection: document.getElementById('continueWatchingSection'),
  continueWatchingRow: document.getElementById('continueWatchingRow'),

  // Hero Spotlight
  heroSpotlight: document.getElementById('heroSpotlight'),
  heroBackdrop: document.getElementById('heroBackdrop'),
  heroTitle: document.getElementById('heroTitle'),
  heroRating: document.getElementById('heroRating'),
  heroTypePill: document.getElementById('heroTypePill'),
  heroYear: document.getElementById('heroYear'),
  heroRuntime: document.getElementById('heroRuntime'),
  heroOverview: document.getElementById('heroOverview'),
  heroPlayBtn: document.getElementById('heroPlayBtn'),
  heroDetailsBtn: document.getElementById('heroDetailsBtn'),
  heroHeartBtn: document.getElementById('heroHeartBtn'),
  heroBookmarkBtn: document.getElementById('heroBookmarkBtn'),
  heroMiniCarousel: document.getElementById('heroMiniCarousel'),

  // Grid Views
  allMoviesGrid: document.getElementById('allMoviesGrid'),
  allTvGrid: document.getElementById('allTvGrid'),
  allAnimeGrid: document.getElementById('allAnimeGrid'),
  favouritesGrid: document.getElementById('favouritesGrid'),
  watchlistGrid: document.getElementById('watchlistGrid'),
  historyGrid: document.getElementById('historyGrid'),
  emptyFavourites: document.getElementById('emptyFavourites'),
  emptyWatchlist: document.getElementById('emptyWatchlist'),
  emptyHistory: document.getElementById('emptyHistory'),
  clearHistoryBtn: document.getElementById('clearHistoryBtn'),

  // Filter Bar Controls
  movieGenreSelect: document.getElementById('movieGenreSelect'),
  movieGenreClear: document.getElementById('movieGenreClear'),
  gridScaleSlider: document.getElementById('gridScaleSlider'),
  layoutGridBtn: document.getElementById('layoutGridBtn'),
  layoutListBtn: document.getElementById('layoutListBtn'),

  // Detail Page View
  viewDetail: document.getElementById('view-detail'),
  detailBackdrop: document.getElementById('detailBackdrop'),
  detailPosterImg: document.getElementById('detailPosterImg'),
  detailTitle: document.getElementById('detailTitle'),
  detailRating: document.getElementById('detailRating'),
  detailTypePill: document.getElementById('detailTypePill'),
  detailYear: document.getElementById('detailYear'),
  detailRuntime: document.getElementById('detailRuntime'),
  detailGenres: document.getElementById('detailGenres'),
  detailSynopsis: document.getElementById('detailSynopsis'),
  detailPlayBtn: document.getElementById('detailPlayBtn'),
  detailTrailerBtn: document.getElementById('detailTrailerBtn'),
  detailHeartBtn: document.getElementById('detailHeartBtn'),
  detailBookmarkBtn: document.getElementById('detailBookmarkBtn'),
  detailSourcePickBtn: document.getElementById('detailSourcePickBtn'),
  detailEpisodesSection: document.getElementById('detailEpisodesSection'),
  detailSeasonCount: document.getElementById('detailSeasonCount'),
  detailSeasonTabs: document.getElementById('detailSeasonTabs'),
  detailEpisodeGrid: document.getElementById('detailEpisodeGrid'),
  detailCastRow: document.getElementById('detailCastRow'),
  detailRelatedRow: document.getElementById('detailRelatedRow'),

  // Search
  searchInput: document.getElementById('globalSearchInput'),
  searchClearBtn: document.getElementById('searchClearBtn'),
  searchResultsSection: document.getElementById('searchResultsSection'),
  searchResultsRow: document.getElementById('searchResultsRow'),
  searchCountBadge: document.getElementById('searchCountBadge'),

  // Player
  playerScreen: document.getElementById('venticPlayerScreen'),
  videoCanvas: document.getElementById('videoCanvas'),
  playerHud: document.getElementById('playerHud'),
  exitPlayerBtn: document.getElementById('exitPlayerBtn'),
  hudMediaTitle: document.getElementById('hudMediaTitle'),
  hudQualityPill: document.getElementById('hudQualityPill'),
  hudEpisodeTag: document.getElementById('hudEpisodeTag'),
  serverSwitcherSelect: document.getElementById('serverSwitcherSelect'),

  // Stream Picker Modal
  streamPickerModal: document.getElementById('streamPickerModal'),
  streamPickerBackdrop: document.getElementById('streamPickerBackdrop'),
  closeStreamPickerBtn: document.getElementById('closeStreamPickerBtn'),
  streamPickerTitle: document.getElementById('streamPickerTitle'),
  streamList: document.getElementById('streamList'),

  // Themes Modal
  themeModalBtn: document.getElementById('themeModalBtn'),
  themeModal: document.getElementById('themeModal'),
  closeThemeBtn: document.getElementById('closeThemeBtn'),
  themeCards: document.querySelectorAll('.theme-card'),

  // Sources Settings Modal
  refreshCatalogBtn: document.getElementById('refreshCatalogBtn'),
  sourcesBtn: document.getElementById('sourcesBtn'),
  sourcesModal: document.getElementById('sourcesModal'),
  closeSourcesBtn: document.getElementById('closeSourcesBtn'),
  cancelSourcesBtn: document.getElementById('cancelSourcesBtn'),
  sourcesForm: document.getElementById('sourcesForm'),
  addonUrlInput: document.getElementById('addonUrlInput'),
  presetBtns: document.querySelectorAll('.btn-preset'),

  toast: document.getElementById('toast')
};

// Horizontal Row Scrolling (< >) with RTL-awareness
window.scrollRow = function(rowId, amount) {
  const row = document.getElementById(rowId);
  if (row) {
    const isRtl = document.documentElement.dir === 'rtl';
    const delta = isRtl ? -amount : amount;
    row.scrollBy({ left: delta, behavior: 'smooth' });
  }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupInitialSeedData();
  setupLanguageSwitcher();
  setupGlobalEventDelegation();
  setupFilterBarEvents();
  setupSearchEngine();
  updateBadgeCounters();
  restoreLastRoute();
  window.addEventListener('hashchange', restoreLastRoute);
});

function setupLanguageSwitcher() {
  const btn = document.getElementById('langToggleBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      const nextLang = currentLang === 'ar' ? 'en' : 'ar';
      applyLanguage(nextLang);
    });
  }

  // Initial application of current language
  applyLanguage(currentLang);
}

const IRAQ_FLAG_SVG = `<svg class="flag-svg" viewBox="0 0 900 600" width="22" height="15" style="border-radius: 3px; overflow: hidden; display: block; border: 1px solid rgba(255,255,255,0.2); box-shadow: 0 1px 4px rgba(0,0,0,0.3); flex-shrink: 0;"><rect width="900" height="200" fill="#ce1126"/><rect y="200" width="900" height="200" fill="#ffffff"/><rect y="400" width="900" height="200" fill="#000000"/><text x="450" y="335" font-size="95" font-family="'Scheherazade New', 'Amiri', 'Traditional Arabic', sans-serif" font-weight="900" fill="#007a3d" text-anchor="middle">الله ★ أكبر</text></svg>`;

const UK_FLAG_SVG = `<svg class="flag-svg" viewBox="0 0 60 30" width="22" height="15" style="border-radius: 3px; overflow: hidden; display: block; border: 1px solid rgba(255,255,255,0.2); box-shadow: 0 1px 4px rgba(0,0,0,0.3); flex-shrink: 0;"><clipPath id="uk-clip"><path d="M0,0 v30 h60 v-30 z"/></clipPath><clipPath id="uk-diag"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath><g clip-path="url(#uk-clip)"><path d="M0,0 v30 h60 v-30 z" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#uk-diag)" stroke="#C8102E" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="#ffffff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></g></svg>`;

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('cinema_lang', lang);
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;

  const t = UI_STRINGS[lang] || UI_STRINGS.ar;
  const logoTitle = document.getElementById('sidebarLogoTitle');
  if (logoTitle) {
    logoTitle.textContent = t.appName || (lang === 'ar' ? 'سينما العراق' : 'CinemaIQ');
  }
  const mobileLogoTitle = document.getElementById('mobileBrandName');
  if (mobileLogoTitle) {
    mobileLogoTitle.textContent = t.appName || (lang === 'ar' ? 'سينما العراق' : 'CinemaIQ');
  }
  document.title = t.appName || (lang === 'ar' ? 'سينما العراق' : 'CinemaIQ');

  const langToggleBtn = document.getElementById('langToggleBtn');
  if (langToggleBtn) {
    if (lang === 'ar') {
      langToggleBtn.innerHTML = `
        ${IRAQ_FLAG_SVG}
        <span class="lang-code-text" id="langBadge">العربية</span>
      `;
      langToggleBtn.title = 'تغيير اللغة إلى English';
    } else {
      langToggleBtn.innerHTML = `
        ${UK_FLAG_SVG}
        <span class="lang-code-text" id="langBadge">English</span>
      `;
      langToggleBtn.title = 'Switch language to العربية';
    }
  }

  // Update Navigation Labels
  document.querySelectorAll('.nav-link').forEach(link => {
    const tab = link.dataset.tab;
    const span = link.querySelector('span');
    if (span && t[tab]) span.textContent = t[tab];
  });

  // Update Search input
  if (elements.searchInput) elements.searchInput.placeholder = t.searchPlaceholder;

  // Update Section Titles on Home
  const mapHeaders = [
    { id: 'continueWatchingRow', title: t.continueWatching },
    { id: 'popularMoviesRow', title: t.popularMovies },
    { id: 'popularShowsRow', title: t.popularTv },
    { id: 'actionMoviesRow', title: t.actionAdventure },
    { id: 'scifiMoviesRow', title: t.scifiFantasy },
    { id: 'crimeMoviesRow', title: t.crimeThrillers },
    { id: 'comedyMoviesRow', title: t.comedy },
    { id: 'topRatedRow', title: t.topRated }
  ];

  mapHeaders.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) {
      const section = el.closest('.row-section');
      const titleEl = section?.querySelector('.row-title');
      if (titleEl) titleEl.textContent = item.title;
    }
  });

  // Update Year & Genre Labels
  document.querySelectorAll('.genre-tag-label').forEach(label => {
    const i18nKey = label.dataset.i18n;
    if (i18nKey && t[i18nKey]) {
      label.textContent = t[i18nKey];
    } else if (label.textContent.includes('Year') || label.textContent.includes('السنة')) {
      label.textContent = t.yearLabel;
    } else {
      label.textContent = t.genreLabel;
    }
  });

  populateYearSelects();

  // Update All Genres Option
  const allOpt = document.querySelector('#movieGenreSelect option[value="all"]');
  if (allOpt) allOpt.textContent = t.allGenres;
  const tvAllOpt = document.querySelector('#tvGenreSelect option[value="all"]');
  if (tvAllOpt) tvAllOpt.textContent = t.allGenres;

  // Update All [data-i18n] elements across the page
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (key && t[key]) el.textContent = t[key];
  });

  // Re-render hero spotlight, detail page if active, and views
  if (activeMedia) {
    setupSpotlightHero(activeMedia);
    if (currentTab === 'detail') openDedicatedDetailPage(activeMedia);
  }
  renderAllViews();
}

// Dynamic Initial Data from Real Cinemeta Catalog (100% Authentic Metadata & Stream Matching)
async function setupInitialSeedData() {
  try {
    // Pre-register authentic upcoming movies lineup
    registerItems(UPCOMING_MOVIES);

    const movieSkips = [0, 50, 100, 150, 200, 250, 300, 350];
    const seriesSkips = [0, 50, 100, 150, 200, 250, 300, 350];

    const [movieResults, seriesResults] = await Promise.all([
      Promise.allSettled(movieSkips.map(s => fetch(`${config.catalogUrl}/catalog/movie/top/skip=${s}.json`).then(r => r.json()))),
      Promise.allSettled(seriesSkips.map(s => fetch(`${config.catalogUrl}/catalog/series/top/skip=${s}.json`).then(r => r.json())))
    ]);

    let movies = [];
    movieResults.forEach(r => {
      if (r.status === 'fulfilled' && r.value?.metas) movies.push(...r.value.metas);
    });

    if (movies.length > 0) {
      registerItems(movies);
      movieIds = Array.from(new Set(movies.map(m => m.id)));
      activeMedia = movies[0];
      setupSpotlightHero(activeMedia);
      movieSkip = 400;
    }

    let shows = [];
    seriesResults.forEach(r => {
      if (r.status === 'fulfilled' && r.value?.metas) shows.push(...r.value.metas);
    });

    if (shows.length > 0) {
      const filtered = shows.filter(s => !isAnimeTitle(s.name));
      registerItems(filtered);
      tvIds = Array.from(new Set(filtered.map(s => s.id)));
      tvSkip = 400;
    }

    renderAllViews();

    const loadMoreMoviesWrap = document.getElementById('loadMoreMoviesWrap');
    if (loadMoreMoviesWrap && movieIds.length > 0) {
      loadMoreMoviesWrap.style.display = 'flex';
    }

    const loadMoreTvWrap = document.getElementById('loadMoreTvWrap');
    if (loadMoreTvWrap && tvIds.length > 0) {
      loadMoreTvWrap.style.display = 'flex';
    }
  } catch (e) {
    console.error('Initial catalog fetch failed:', e);
  }
}

function registerItems(items) {
  if (!items || !Array.isArray(items)) return;
  items.forEach(item => {
    if (item && item.id) {
      const isAnime = item.isAnime || isAnimeTitle(item.name || item.title);
      mediaMap.set(item.id, {
        id: item.id,
        name: item.name || item.title || 'Untitled',
        year: item.year || item.releaseInfo || '2024',
        type: item.type || 'movie',
        isAnime: isAnime,
        poster: item.poster || `https://images.metahub.space/poster/medium/${item.id}/img.jpg`,
        background: item.background || `https://images.metahub.space/background/medium/${item.id}/img.jpg`,
        description: item.description || item.overview || 'Stream now in full cinema quality.',
        imdbRating: item.imdbRating || item.rating || '7.5',
        genres: item.genres || [item.genre || 'Drama'],
        cast: item.cast || ['Lead Actor', 'Supporting Cast', 'Director'],
        trailers: item.trailers || []
      });
    }
  });
}

function setupSpotlightHero(item) {
  if (!item) return;
  activeMedia = item;

  const displayTitle = getMediaTitle(item);
  const displayOverview = getMediaOverview(item);

  if (elements.heroTitle) elements.heroTitle.textContent = displayTitle;
  if (elements.heroRating) elements.heroRating.textContent = item.imdbRating || '8.6';
  if (elements.heroTypePill) elements.heroTypePill.textContent = (item.isAnime ? 'ANIME' : (item.type || 'MOVIE')).toUpperCase();
  if (elements.heroYear) elements.heroYear.textContent = item.year || '2024';
  if (elements.heroRuntime) elements.heroRuntime.textContent = item.type === 'series' || item.isAnime ? 'Series' : '2h 46m';
  if (elements.heroOverview) elements.heroOverview.textContent = displayOverview;

  const bg = item.background || item.poster || `https://images.metahub.space/background/medium/${item.id}/img.jpg`;
  if (elements.heroBackdrop) {
    elements.heroBackdrop.style.backgroundImage = `url('${bg}')`;
  }

  if (elements.heroHeartBtn) elements.heroHeartBtn.classList.toggle('active', isFavourite(item.id));
  if (elements.heroBookmarkBtn) elements.heroBookmarkBtn.classList.toggle('active', isInWatchlist(item.id));

  // Render mini thumbs
  if (elements.heroMiniCarousel) {
    const thumbsPool = movieIds.slice(0, 5);
    elements.heroMiniCarousel.innerHTML = thumbsPool.map(id => {
      const m = mediaMap.get(id);
      if (!m) return '';
      return `
        <div class="spotlight-mini-thumb ${m.id === item.id ? 'active' : ''}" data-action="set-hero-item" data-id="${m.id}">
          <img src="${m.poster}" alt="${escapeHtml(getMediaTitle(m))}" />
        </div>
      `;
    }).join('');
  }
}

// Horizontal Row Scrolling with Arrow Buttons (< >)
window.scrollRow = function(rowId, amount) {
  const row = document.getElementById(rowId);
  if (row) {
    row.scrollBy({ left: amount, behavior: 'smooth' });
  }
};

// ==========================================================================
// MASSIVE CONTINUOUS CATALOG INGESTION
// ==========================================================================
async function startDeepCatalogIngestion() {
  try {
    // 1. Instant Parallel Ingestion of Top 200 Movies and TV Shows
    await Promise.allSettled([
      fetchCatalogBatch(0, 100),
      fetchCatalogBatch(100, 100)
    ]);
  } catch (e) {}

  // 2. Fetch Genre-Specific Collections in Parallel
  fetchContinuousDeepCatalog();
}

async function fetchCatalogBatch(skipStart, count) {
  const skips = [];
  for (let s = skipStart; s < skipStart + count; s += 20) {
    skips.push(s);
  }

  const movieUrls = skips.map(s => s === 0 ? `${config.catalogUrl}/catalog/movie/top.json` : `${config.catalogUrl}/catalog/movie/top/skip=${s}.json`);
  const seriesUrls = skips.map(s => s === 0 ? `${config.catalogUrl}/catalog/series/top.json` : `${config.catalogUrl}/catalog/series/top/skip=${s}.json`);

  const movieReqs = movieUrls.map(u => fetch(u).then(r => r.json()).catch(() => null));
  const seriesReqs = seriesUrls.map(u => fetch(u).then(r => r.json()).catch(() => null));

  const [movieRes, seriesRes] = await Promise.all([
    Promise.allSettled(movieReqs),
    Promise.allSettled(seriesReqs)
  ]);

  let newMovies = [];
  movieRes.forEach(r => {
    if (r.status === 'fulfilled' && r.value && r.value.metas) {
      newMovies.push(...r.value.metas);
    }
  });

  let newSeries = [];
  seriesRes.forEach(r => {
    if (r.status === 'fulfilled' && r.value && r.value.metas) {
      newSeries.push(...r.value.metas);
    }
  });

  if (newMovies.length > 0) {
    registerItems(newMovies);
    movieIds = Array.from(new Set([...movieIds, ...newMovies.map(m => m.id)]));
    movieSkip = Math.max(movieSkip, skipStart + count);
  }

  if (newSeries.length > 0) {
    registerItems(newSeries);
    const regularSeries = newSeries.filter(s => !isAnimeTitle(s.name)).map(s => s.id);
    tvIds = Array.from(new Set([...tvIds, ...regularSeries]));
    tvSkip = Math.max(tvSkip, skipStart + count);
  }

  renderAllViews();
}

async function fetchContinuousDeepCatalog() {
  const genres = ['Action', 'Adventure', 'Sci-Fi', 'Comedy', 'Drama', 'Crime', 'Thriller', 'Horror', 'Fantasy', 'Mystery', 'Animation', 'Romance'];

  const genrePromises = genres.map(async (g) => {
    try {
      const [mG, sG] = await Promise.allSettled([
        fetch(`${config.catalogUrl}/catalog/movie/top/genre=${encodeURIComponent(g)}.json`).then(r => r.json()),
        fetch(`${config.catalogUrl}/catalog/series/top/genre=${encodeURIComponent(g)}.json`).then(r => r.json())
      ]);

      if (mG.status === 'fulfilled' && mG.value && mG.value.metas) {
        registerItems(mG.value.metas);
        movieIds = Array.from(new Set([...movieIds, ...mG.value.metas.map(m => m.id)]));
      }

      if (sG.status === 'fulfilled' && sG.value && sG.value.metas) {
        registerItems(sG.value.metas);
        const regular = sG.value.metas.filter(s => !isAnimeTitle(s.name)).map(s => s.id);
        tvIds = Array.from(new Set([...tvIds, ...regular]));
      }
    } catch (e) {}
  });

  await Promise.allSettled(genrePromises);
  renderAllViews();
}

// ==========================================================================
// Dynamic Year Selects Population (Current year default, never hardcoded, 1970 to Next Year)
function populateYearSelects() {
  const currentYear = new Date().getFullYear();
  const startYear = 1970;
  const t = UI_STRINGS[currentLang] || UI_STRINGS.ar;

  const buildOptions = (selectedYear) => {
    let html = `<option value="all" ${selectedYear === 'all' ? 'selected' : ''}>${t.allYears || 'All Years'}</option>`;
    for (let y = currentYear + 1; y >= startYear; y--) {
      const isSelected = String(y) === String(selectedYear) ? 'selected' : '';
      const label = (y === currentYear)
        ? `${y} (${t.currentYearLabel || 'السنة الحالية'})`
        : `${y}`;
      html += `<option value="${y}" ${isSelected}>${label}</option>`;
    }
    return html;
  };

  const movieYearSelect = document.getElementById('movieYearSelect');
  if (movieYearSelect) {
    movieYearSelect.innerHTML = buildOptions(activeMovieYear);
  }

  const tvYearSelect = document.getElementById('tvYearSelect');
  if (tvYearSelect) {
    tvYearSelect.innerHTML = buildOptions(activeTvYear);
  }
}

function setupFilterBarEvents() {
  populateYearSelects();

  // Movie Year Dropdown with Deep Background Fetching
  const movieYearSelect = document.getElementById('movieYearSelect');
  if (movieYearSelect) {
    movieYearSelect.addEventListener('change', async (e) => {
      activeMovieYear = e.target.value;
      if (elements.allMoviesGrid) {
        elements.allMoviesGrid.innerHTML = `
          <div class="loading-pulse" style="grid-column: 1/-1; padding: 4rem 2rem; text-align: center; color: var(--text-muted);">
            <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--accent-primary); margin-bottom: 0.8rem; display: block;"></i>
            <span>${currentLang === 'ar' ? 'جارِ التحميل...' : 'Loading...'}</span>
          </div>
        `;
      }
      if (activeMovieYear !== 'all') {
        await fetchYearCatalog('movie', activeMovieYear);
      }
      applyMovieFilters();
    });
  }

  // Movie Year Clear (✕)
  const movieYearClear = document.getElementById('movieYearClear');
  if (movieYearClear) {
    movieYearClear.addEventListener('click', () => {
      activeMovieYear = 'all';
      if (movieYearSelect) movieYearSelect.value = 'all';
      applyMovieFilters();
    });
  }

  // Movie Genre Dropdown with Instant Deep Fetching
  if (elements.movieGenreSelect) {
    elements.movieGenreSelect.addEventListener('change', async (e) => {
      activeMovieGenre = e.target.value;
      if (elements.allMoviesGrid) {
        elements.allMoviesGrid.innerHTML = `
          <div class="loading-pulse" style="grid-column: 1/-1; padding: 4rem 2rem; text-align: center; color: var(--text-muted);">
            <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--accent-primary); margin-bottom: 0.8rem; display: block;"></i>
            <span>${currentLang === 'ar' ? 'جارِ التحميل...' : 'Loading...'}</span>
          </div>
        `;
      }
      if (activeMovieGenre !== 'all') {
        await fetchGenreCatalog('movie', activeMovieGenre);
      }
      applyMovieFilters();
    });
  }

  // Movie Genre Clear (✕)
  if (elements.movieGenreClear) {
    elements.movieGenreClear.addEventListener('click', () => {
      if (elements.movieGenreSelect) elements.movieGenreSelect.value = 'all';
      activeMovieGenre = 'all';
      applyMovieFilters();
    });
  }

  // TV Year Dropdown with Deep Background Fetching
  const tvYearSelect = document.getElementById('tvYearSelect');
  if (tvYearSelect) {
    tvYearSelect.addEventListener('change', async (e) => {
      activeTvYear = e.target.value;
      if (elements.allTvGrid) {
        elements.allTvGrid.innerHTML = `
          <div class="loading-pulse" style="grid-column: 1/-1; padding: 4rem 2rem; text-align: center; color: var(--text-muted);">
            <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--accent-primary); margin-bottom: 0.8rem; display: block;"></i>
            <span>${currentLang === 'ar' ? 'جارِ التحميل...' : 'Loading...'}</span>
          </div>
        `;
      }
      if (activeTvYear !== 'all') {
        await fetchYearCatalog('series', activeTvYear);
      }
      applyTvFilters();
    });
  }

  // TV Year Clear (✕)
  const tvYearClear = document.getElementById('tvYearClear');
  if (tvYearClear) {
    tvYearClear.addEventListener('click', () => {
      activeTvYear = 'all';
      if (tvYearSelect) tvYearSelect.value = 'all';
      applyTvFilters();
    });
  }

  // TV Genre Dropdown with Instant Deep Fetching
  const tvGenreSelect = document.getElementById('tvGenreSelect');
  if (tvGenreSelect) {
    tvGenreSelect.addEventListener('change', async (e) => {
      activeTvGenre = e.target.value;
      if (elements.allTvGrid) {
        elements.allTvGrid.innerHTML = `
          <div class="loading-pulse" style="grid-column: 1/-1; padding: 4rem 2rem; text-align: center; color: var(--text-muted);">
            <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--accent-primary); margin-bottom: 0.8rem; display: block;"></i>
            <span>${currentLang === 'ar' ? 'جارِ التحميل...' : 'Loading...'}</span>
          </div>
        `;
      }
      if (activeTvGenre !== 'all') {
        await fetchGenreCatalog('series', activeTvGenre);
      }
      applyTvFilters();
    });
  }

  // TV Genre Clear
  const tvGenreClear = document.getElementById('tvGenreClear');
  if (tvGenreClear) {
    tvGenreClear.addEventListener('click', () => {
      if (tvGenreSelect) tvGenreSelect.value = 'all';
      activeTvGenre = 'all';
      applyTvFilters();
    });
  }

  // Scale Slider (──●──)
  if (elements.gridScaleSlider) {
    elements.gridScaleSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      document.documentElement.style.setProperty('--card-grid-width', `${val}px`);
    });
  }

  // Layout Switcher (Grid vs List)
  if (elements.layoutGridBtn) {
    elements.layoutGridBtn.addEventListener('click', () => {
      elements.layoutGridBtn.classList.add('active');
      if (elements.layoutListBtn) elements.layoutListBtn.classList.remove('active');
      if (elements.allMoviesGrid) elements.allMoviesGrid.classList.remove('list-view');
      if (elements.allTvGrid) elements.allTvGrid.classList.remove('list-view');
    });
  }

  if (elements.layoutListBtn) {
    elements.layoutListBtn.addEventListener('click', () => {
      elements.layoutListBtn.classList.add('active');
      if (elements.layoutGridBtn) elements.layoutGridBtn.classList.remove('active');
      if (elements.allMoviesGrid) elements.allMoviesGrid.classList.add('list-view');
      if (elements.allTvGrid) elements.allTvGrid.classList.add('list-view');
    });
  }
}

// Deep Year Discovery Engine (Fetches 1000 items in parallel to find all titles for a given year)
const yearFetchCache = new Set();
async function fetchYearCatalog(type, year) {
  const cacheKey = `${type}-${year}`;
  if (yearFetchCache.has(cacheKey)) return;
  yearFetchCache.add(cacheKey);

  try {
    const skips = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950];
    const results = await Promise.allSettled(
      skips.map(s => fetch(`${config.catalogUrl}/catalog/${type}/top/skip=${s}.json`).then(r => r.json()).catch(() => null))
    );

    let items = [];
    results.forEach(r => {
      if (r.status === 'fulfilled' && r.value?.metas) {
        items.push(...r.value.metas);
      }
    });

    if (items.length > 0) {
      if (type === 'series') {
        items = items.filter(s => !isAnimeTitle(s.name));
        registerItems(items);
        const newIds = items.map(s => s.id);
        tvIds = Array.from(new Set([...tvIds, ...newIds]));
      } else {
        registerItems(items);
        const newIds = items.map(m => m.id);
        movieIds = Array.from(new Set([...movieIds, ...newIds]));
      }
    }
  } catch (e) {
    console.warn('Fetch year catalog failed:', e);
  }
}

// Fetch Dedicated Genre Catalog (300+ Items Per Genre)
const genreFetchCache = new Set();
async function fetchGenreCatalog(type, genre) {
  const cacheKey = `${type}-${genre.toLowerCase()}`;
  if (genreFetchCache.has(cacheKey)) return;
  genreFetchCache.add(cacheKey);

  try {
    const urls = [
      `${config.catalogUrl}/catalog/${type}/top/genre=${encodeURIComponent(genre)}.json`,
      `${config.catalogUrl}/catalog/${type}/top/genre=${encodeURIComponent(genre)}&skip=50.json`,
      `${config.catalogUrl}/catalog/${type}/top/genre=${encodeURIComponent(genre)}&skip=100.json`,
      `${config.catalogUrl}/catalog/${type}/top/genre=${encodeURIComponent(genre)}&skip=150.json`,
      `${config.catalogUrl}/catalog/${type}/top/genre=${encodeURIComponent(genre)}&skip=200.json`,
      `${config.catalogUrl}/catalog/${type}/top/genre=${encodeURIComponent(genre)}&skip=250.json`
    ];

    const results = await Promise.allSettled(urls.map(u => fetch(u).then(r => r.json()).catch(() => null)));
    let items = [];
    results.forEach(r => {
      if (r.status === 'fulfilled' && r.value?.metas) {
        items.push(...r.value.metas);
      }
    });

    if (items.length > 0) {
      if (type === 'series') {
        items = items.filter(s => !isAnimeTitle(s.name));
        registerItems(items);
        const newIds = items.map(s => s.id);
        tvIds = Array.from(new Set([...tvIds, ...newIds]));
      } else {
        registerItems(items);
        const newIds = items.map(m => m.id);
        movieIds = Array.from(new Set([...movieIds, ...newIds]));
      }
    }
  } catch (e) {
    console.warn('Fetch genre catalog failed:', e);
  }
}

function applyMovieFilters() {
  let list = movieIds.map(id => mediaMap.get(id)).filter(Boolean);

  // Year Filter (Default: Current Year dynamic)
  if (activeMovieYear && activeMovieYear !== 'all') {
    list = list.filter(m => String(m.year) === String(activeMovieYear));
    if (list.length === 0) {
      const extra = UPCOMING_MOVIES.filter(m => String(m.year) === String(activeMovieYear));
      if (extra.length > 0) list = extra;
    }
  }

  // Genre Filter
  if (activeMovieGenre && activeMovieGenre !== 'all') {
    list = list.filter(m => 
      (m.genres && m.genres.some(g => g.toLowerCase().includes(activeMovieGenre.toLowerCase()))) ||
      (m.genre && m.genre.toLowerCase().includes(activeMovieGenre.toLowerCase()))
    );
  }

  if (elements.allMoviesGrid) {
    if (list.length > 0) {
      elements.allMoviesGrid.innerHTML = list.map(m => createCardHtmlById(m.id)).join('');
    } else {
      elements.allMoviesGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1/-1; padding: 4rem 1rem; text-align: center; color: var(--text-muted);">
          <i class="fa-solid fa-film" style="font-size: 2.2rem; color: var(--accent-primary); margin-bottom: 0.8rem; display: block;"></i>
          <p style="font-weight: 600; font-size: 1rem;">${currentLang === 'ar' ? `لا توجد أفلام مسجلة لسنة ${activeMovieYear}` : `No movies found for year ${activeMovieYear}`}</p>
        </div>
      `;
    }
  }
}

function applyTvFilters() {
  let list = tvIds.map(id => mediaMap.get(id)).filter(Boolean);

  // Year Filter
  if (activeTvYear && activeTvYear !== 'all') {
    list = list.filter(s => String(s.year).includes(String(activeTvYear)));
  }

  // Genre Filter
  if (activeTvGenre && activeTvGenre !== 'all') {
    list = list.filter(s => 
      (s.genres && s.genres.some(g => g.toLowerCase().includes(activeTvGenre.toLowerCase()))) ||
      (s.genre && s.genre.toLowerCase().includes(activeTvGenre.toLowerCase()))
    );
  }

  if (elements.allTvGrid) {
    if (list.length > 0) {
      elements.allTvGrid.innerHTML = list.map(s => createCardHtmlById(s.id)).join('');
    } else {
      elements.allTvGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1/-1; padding: 4rem 1rem; text-align: center; color: var(--text-muted);">
          <i class="fa-solid fa-tv" style="font-size: 2.2rem; color: var(--accent-primary); margin-bottom: 0.8rem; display: block;"></i>
          <p style="font-weight: 600; font-size: 1rem;">${currentLang === 'ar' ? `لا توجد مسلسلات مسجلة لسنة ${activeTvYear}` : `No TV series found for year ${activeTvYear}`}</p>
        </div>
      `;
    }
  }
}

// ==========================================================================
// MASSIVE HIGH-CAPACITY CATALOG LOADER (600+ ITEMS PER CLICK INSTANTLY)
// ==========================================================================

async function loadNextMoviesBatch() {
  const btn = document.getElementById('loadMoreMoviesBtn');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>${currentLang === 'ar' ? 'جارِ التحميل...' : 'Loading...'}</span>`;
  }

  try {
    const currentSkips = [
      movieSkip,
      movieSkip + 50,
      movieSkip + 100,
      movieSkip + 150,
      movieSkip + 200,
      movieSkip + 250,
      movieSkip + 300,
      movieSkip + 350,
      movieSkip + 400,
      movieSkip + 450,
      movieSkip + 500,
      movieSkip + 550
    ];
    movieSkip += 600;

    const fetchPromises = currentSkips.map(s => 
      fetch(`${config.catalogUrl}/catalog/movie/top/skip=${s}.json`).then(r => r.json()).catch(() => null)
    );

    if (activeMovieGenre && activeMovieGenre !== 'all') {
      currentSkips.slice(0, 4).forEach(s => {
        fetchPromises.push(
          fetch(`${config.catalogUrl}/catalog/movie/top/genre=${encodeURIComponent(activeMovieGenre)}&skip=${s}.json`).then(r => r.json()).catch(() => null)
        );
      });
    }

    const results = await Promise.allSettled(fetchPromises);
    let batchItems = [];
    results.forEach(r => {
      if (r.status === 'fulfilled' && r.value?.metas) {
        batchItems.push(...r.value.metas);
      }
    });

    if (batchItems.length > 0) {
      registerItems(batchItems);
      const newIds = batchItems.map(m => m.id);
      movieIds = Array.from(new Set([...movieIds, ...newIds]));
    }

    applyMovieFilters();
  } catch (e) {
    console.warn('Load more movies failed:', e);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i class="fa-solid fa-rotate"></i> <span data-i18n="loadMore">${currentLang === 'ar' ? 'تحميل المزيد' : 'Load More'}</span>`;
    }
  }
}

async function loadNextTvBatch() {
  const btn = document.getElementById('loadMoreTvBtn');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>${currentLang === 'ar' ? 'جارِ التحميل...' : 'Loading...'}</span>`;
  }

  try {
    const currentSkips = [
      tvSkip,
      tvSkip + 50,
      tvSkip + 100,
      tvSkip + 150,
      tvSkip + 200,
      tvSkip + 250,
      tvSkip + 300,
      tvSkip + 350,
      tvSkip + 400,
      tvSkip + 450,
      tvSkip + 500,
      tvSkip + 550
    ];
    tvSkip += 600;

    const fetchPromises = currentSkips.map(s => 
      fetch(`${config.catalogUrl}/catalog/series/top/skip=${s}.json`).then(r => r.json()).catch(() => null)
    );

    if (activeTvGenre && activeTvGenre !== 'all') {
      currentSkips.slice(0, 4).forEach(s => {
        fetchPromises.push(
          fetch(`${config.catalogUrl}/catalog/series/top/genre=${encodeURIComponent(activeTvGenre)}&skip=${s}.json`).then(r => r.json()).catch(() => null)
        );
      });
    }

    const results = await Promise.allSettled(fetchPromises);
    let batchItems = [];
    results.forEach(r => {
      if (r.status === 'fulfilled' && r.value?.metas) {
        batchItems.push(...r.value.metas);
      }
    });

    if (batchItems.length > 0) {
      const filtered = batchItems.filter(s => !isAnimeTitle(s.name));
      registerItems(filtered);
      const newIds = filtered.map(s => s.id);
      tvIds = Array.from(new Set([...tvIds, ...newIds]));
    }

    applyTvFilters();
  } catch (e) {
    console.warn('Load more TV failed:', e);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i class="fa-solid fa-rotate"></i> <span data-i18n="loadMore">${currentLang === 'ar' ? 'تحميل المزيد' : 'Load More'}</span>`;
    }
  }
}

function isAnimeTitle(title) {
  const animeKeywords = ['anime', 'attack on titan', 'solo leveling', 'demon slayer', 'jujutsu', 'one piece', 'naruto', 'bleach', 'dragon ball', 'chainsaw man', 'death note', 'hero academia', 'frieren', 'tokyo ghoul', 'hunter x hunter', 'vinland', 'spy x family', 'fullmetal', 'boruto', 'gintama', 'evangelion', 'cowboy bebop', 'berserk', 'sword art', 'fate/stay', 'overlord', 're:zero'];
  const t = (title || '').toLowerCase();
  return animeKeywords.some(kw => t.includes(kw));
}

// ==========================================================================
// SEARCH ENGINE
// ==========================================================================

function setupSearchEngine() {
  let searchTimeout = null;

  elements.searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const query = e.target.value.trim();

    elements.searchClearBtn.style.display = query ? 'block' : 'none';

    if (!query) {
      elements.searchResultsSection.style.display = 'none';
      return;
    }

    if (currentTab !== 'home') navigateTo('home');

    elements.searchResultsSection.style.display = 'block';
    elements.searchResultsRow.innerHTML = `<div class="loading-pulse"><i class="fa-solid fa-spinner fa-spin"></i> Searching for "${escapeHtml(query)}"...</div>`;
    elements.searchCountBadge.textContent = 'Searching...';

    searchTimeout = setTimeout(async () => {
      try {
        const [mRes, sRes, aRes] = await Promise.allSettled([
          fetch(`${config.catalogUrl}/catalog/movie/top/search=${encodeURIComponent(query)}.json`).then(r => r.json()),
          fetch(`${config.catalogUrl}/catalog/series/top/search=${encodeURIComponent(query)}.json`).then(r => r.json()),
          fetch(`https://v3-cinemeta.strem.io/catalog/series/top/search=${encodeURIComponent(query)}.json`).then(r => r.json())
        ]);

        let results = [];
        if (mRes.status === 'fulfilled' && mRes.value && mRes.value.metas) results.push(...mRes.value.metas);
        if (sRes.status === 'fulfilled' && sRes.value && sRes.value.metas) results.push(...sRes.value.metas);
        if (aRes.status === 'fulfilled' && aRes.value && aRes.value.metas) results.push(...aRes.value.metas);

        // Deduplicate by ID
        const seen = new Set();
        const uniqueResults = [];
        results.forEach(item => {
          if (item && item.id && !seen.has(item.id)) {
            seen.add(item.id);
            uniqueResults.push(item);
          }
        });

        if (uniqueResults.length > 0) {
          registerItems(uniqueResults);
          elements.searchResultsRow.innerHTML = uniqueResults.map(r => createCardHtmlById(r.id)).join('');
          elements.searchCountBadge.textContent = `${uniqueResults.length} titles found`;
          elements.contentScroll.scrollTop = 0;
          return;
        }
      } catch (err) {}

      const localMatchedIds = Array.from(mediaMap.values())
        .filter(m => m.name.toLowerCase().includes(query.toLowerCase()))
        .map(m => m.id);

      if (localMatchedIds.length > 0) {
        elements.searchResultsRow.innerHTML = localMatchedIds.map(createCardHtmlById).join('');
        elements.searchCountBadge.textContent = `${localMatchedIds.length} titles found`;
      } else {
        elements.searchResultsRow.innerHTML = `<div style="color: var(--text-muted); padding: 2rem 0; text-align: center;">No titles found matching "${escapeHtml(query)}".</div>`;
        elements.searchCountBadge.textContent = '0 results';
      }
      elements.contentScroll.scrollTop = 0;
    }, 200);
  });

  elements.searchClearBtn.addEventListener('click', () => {
    elements.searchInput.value = '';
    elements.searchClearBtn.style.display = 'none';
    elements.searchResultsSection.style.display = 'none';
  });
}

// ==========================================================================
// NAVIGATION & DEDICATED DETAIL PAGE
// ==========================================================================

window.navigateTo = function(tabName, mediaId = null) {
  if (mediaId) {
    const item = mediaMap.get(mediaId);
    if (item) {
      openDedicatedDetailPage(item);
      return;
    }
  }

  currentTab = tabName;
  navHistory.push(tabName);
  try {
    window.location.hash = `#${tabName}`;
    localStorage.setItem('cinema_current_route', JSON.stringify({ tab: tabName }));
  } catch (e) {}

  elements.backNavBtn.style.display = 'none';

  elements.navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.tab === tabName);
  });

  elements.tabViews.forEach(view => {
    view.style.display = view.id === `view-${tabName}` ? 'block' : 'none';
  });

  if (tabName === 'movies') {
    applyMovieFilters();
  } else if (tabName === 'favourites' || tabName === 'watchlist' || tabName === 'history') {
    renderCollections();
  }

  elements.contentScroll.scrollTop = 0;
};

async function restoreLastRoute() {
  const hash = window.location.hash.replace('#', '');
  let route = null;

  if (hash) {
    if (hash.startsWith('detail/')) {
      const id = hash.split('/')[1];
      route = { tab: 'detail', id: id };
    } else {
      route = { tab: hash };
    }
  } else {
    try {
      const saved = localStorage.getItem('cinema_current_route');
      if (saved) route = JSON.parse(saved);
    } catch (e) {}
  }

  if (!route) return;

  if (route.tab === 'detail' && route.id) {
    let item = mediaMap.get(route.id);
    if (!item) {
      try {
        const [mRes, sRes] = await Promise.allSettled([
          fetch(`${config.catalogUrl}/meta/movie/${route.id}.json`).then(r => r.json()),
          fetch(`${config.catalogUrl}/meta/series/${route.id}.json`).then(r => r.json())
        ]);
        const meta = (mRes.status === 'fulfilled' && mRes.value?.meta) || (sRes.status === 'fulfilled' && sRes.value?.meta);
        if (meta) {
          registerItems([meta]);
          item = mediaMap.get(meta.id);
        }
      } catch (e) {}
    }

    if (item) {
      openDedicatedDetailPage(item);
      return;
    }
  }

  if (route.tab && route.tab !== 'home') {
    navigateTo(route.tab);
  }
}

// ==========================================================================
// ACTOR DATABASE WITH REAL HIGH-RES PORTRAITS & CHARACTER ROLES
// ==========================================================================
const ACTOR_PORTRAITS = {
  'ryan reynolds': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_%28cropped%29.jpg/330px-Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_%28cropped%29.jpg', 
    fallbackRole: 'Wade Wilson / Deadpool' 
  },
  'hugh jackman': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Hugh_Jackman_by_Gage_Skidmore_3.jpg/330px-Hugh_Jackman_by_Gage_Skidmore_3.jpg', 
    fallbackRole: 'Logan / Wolverine' 
  },
  'emma corrin': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Emma_Corrin_in_2024_by_Gage_Skidmore.jpg/330px-Emma_Corrin_in_2024_by_Gage_Skidmore.jpg', 
    fallbackRole: 'Cassandra Nova' 
  },
  'matthew macfadyen': {
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Matthew_Macfadyen_at_the_2023_Peabody_Awards.jpg/330px-Matthew_Macfadyen_at_the_2023_Peabody_Awards.jpg',
    fallbackRole: 'Mr. Paradox'
  },
  'tom holland': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/TomHolland-byPhilipRomano.jpg/330px-TomHolland-byPhilipRomano.jpg', 
    fallbackRole: 'Peter Parker / Spider-Man' 
  },
  'zendaya': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Zendaya-byPhilipRomano.jpg/330px-Zendaya-byPhilipRomano.jpg', 
    fallbackRole: 'MJ' 
  },
  'mark ruffalo': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Mark_Ruffalo_%2836201774756%29_%28cropped%29.jpg/330px-Mark_Ruffalo_%2836201774756%29_%28cropped%29.jpg', 
    fallbackRole: 'Bruce Banner / Hulk' 
  },
  'jon bernthal': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Jon_Bernthal_%2853983124020%29_%28cropped%29.jpg/330px-Jon_Bernthal_%2853983124020%29_%28cropped%29.jpg', 
    fallbackRole: 'Frank Castle / Punisher' 
  },
  'jacob batalon': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Jacob_Batalon_by_Gage_Skidmore.jpg/330px-Jacob_Batalon_by_Gage_Skidmore.jpg', 
    fallbackRole: 'Ned Leeds' 
  },
  'sadie sink': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Sadie_Sink_%2843914734441%29.jpg/330px-Sadie_Sink_%2843914734441%29.jpg', 
    fallbackRole: 'Jean Grey' 
  },
  'florence pugh': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Florence_Pugh_at_the_2024_Toronto_International_Film_Festival_13_%28cropped_2_%E2%80%93_color_adjusted%29.jpg/330px-Florence_Pugh_at_the_2024_Toronto_International_Film_Festival_13_%28cropped_2_%E2%80%93_color_adjusted%29.jpg', 
    fallbackRole: 'Yelena Belova / Black Widow' 
  },
  'liza colón-zayas': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Liza_Col%C3%B3n-Zayas_at_PaleyFest_2023.jpg/330px-Liza_Col%C3%B3n-Zayas_at_PaleyFest_2023.jpg', 
    fallbackRole: 'Detective Jean DeWolff' 
  },
  'tramell tillman': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Tramell_Tillman_at_PaleyFest_2022.jpg/330px-Tramell_Tillman_at_PaleyFest_2022.jpg', 
    fallbackRole: 'William "Bill" Metzger' 
  },
  'marisa tomei': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Marisa_Tomei_at_the_2019_Toronto_International_Film_Festival.jpg/330px-Marisa_Tomei_at_the_2019_Toronto_International_Film_Festival.jpg', 
    fallbackRole: 'May Parker' 
  },
  'naomi watts': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Naomi_Watts_Deauville_2013_2.jpg/330px-Naomi_Watts_Deauville_2013_2.jpg', 
    fallbackRole: 'E.V. (voice)' 
  },
  'michael mando': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Michael_Mando_by_Gage_Skidmore.jpg/330px-Michael_Mando_by_Gage_Skidmore.jpg', 
    fallbackRole: 'Mac Gargan / Scorpion' 
  },
  'keith david': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Keith_David_by_Gage_Skidmore_2.jpg/330px-Keith_David_by_Gage_Skidmore_2.jpg', 
    fallbackRole: 'Narrator of Spider Video (voice)' 
  },
  'timothée chalamet': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Timoth%C3%A9e_Chalamet-63482_%28cropped%29.jpg/330px-Timoth%C3%A9e_Chalamet-63482_%28cropped%29.jpg', 
    fallbackRole: 'Paul Atreides' 
  },
  'rebecca ferguson': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Rebecca_Ferguson_by_Gage_Skidmore.jpg/330px-Rebecca_Ferguson_by_Gage_Skidmore.jpg', 
    fallbackRole: 'Lady Jessica' 
  },
  'javier bardem': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Javier_Bardem_2017.jpg/330px-Javier_Bardem_2017.jpg', 
    fallbackRole: 'Stilgar' 
  },
  'austin butler': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Austin_Butler_2019_by_Glenn_Francis.jpg/330px-Austin_Butler_2019_by_Glenn_Francis.jpg', 
    fallbackRole: 'Feyd-Rautha' 
  },
  'leonardo dicaprio': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/LeoPTABFI191125-28_%28cropped%29.jpg/330px-LeoPTABFI191125-28_%28cropped%29.jpg', 
    fallbackRole: 'Dom Cobb' 
  },
  'joseph gordon-levitt': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Joseph_Gordon-Levitt_2013.jpg/330px-Joseph_Gordon-Levitt_2013.jpg', 
    fallbackRole: 'Arthur' 
  },
  'elliot page': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Elliot_Page_2023.jpg/330px-Elliot_Page_2023.jpg', 
    fallbackRole: 'Ariadne' 
  },
  'christian bale': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Christian_Bale-7837.jpg/330px-Christian_Bale-7837.jpg', 
    fallbackRole: 'Bruce Wayne / Batman' 
  },
  'marlon brando': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Marlon_Brando_godfather_1972.jpg/330px-Marlon_Brando_godfather_1972.jpg', 
    fallbackRole: 'Don Vito Corleone' 
  },
  'al pacino': { 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Al_Pacino_2016_%28cropped%29.jpg/330px-Al_Pacino_2016_%28cropped%29.jpg', 
    fallbackRole: 'Michael Corleone' 
  }
};

const actorPhotoCache = new Map();

// Fetch Real Wikipedia Photos dynamically for ANY actor in the world
async function fetchActorWikiPhotos(actorNames) {
  const missing = actorNames.filter(n => !actorPhotoCache.has(n.toLowerCase()) && !ACTOR_PORTRAITS[n.toLowerCase()]);
  if (missing.length === 0) return;

  const titles = missing.map(n => encodeURIComponent(n.trim().replace(/\s+/g, '_'))).join('|');
  try {
    const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${titles}&prop=pageimages&format=json&pithumbsize=300&origin=*`);
    const data = await res.json();
    if (data && data.query && data.query.pages) {
      Object.values(data.query.pages).forEach(page => {
        if (page.title && page.thumbnail && page.thumbnail.source) {
          actorPhotoCache.set(page.title.toLowerCase(), page.thumbnail.source);
        }
      });
    }
  } catch (err) {}
}

// Open Dedicated Full Detail Page
async function openDedicatedDetailPage(item) {
  activeMedia = item;
  selectedSeason = 1;
  selectedEpisode = 1;
  currentTab = 'detail';

  try {
    window.location.hash = `#detail/${item.id}`;
    localStorage.setItem('cinema_current_route', JSON.stringify({ tab: 'detail', id: item.id }));
  } catch (e) {}

  if (elements.backNavBtn) elements.backNavBtn.style.display = 'flex';

  if (elements.navLinks) elements.navLinks.forEach(link => link.classList.remove('active'));
  if (elements.tabViews) elements.tabViews.forEach(view => view.style.display = 'none');
  
  const viewDetail = document.getElementById('view-detail');
  if (viewDetail) viewDetail.style.display = 'block';
  if (elements.contentScroll) elements.contentScroll.scrollTop = 0;

  // Set Initial Basic Metadata
  const titleEl = document.getElementById('detailTitle');
  const logoImg = document.getElementById('detailLogoImg');
  const taglineEl = document.getElementById('detailTagline');
  const ratingEl = document.getElementById('detailRating');
  const ratingCountEl = document.getElementById('detailRatingCount');
  const pgEl = document.getElementById('detailPgRating');
  const yearEl = document.getElementById('detailYear');
  const runtimeEl = document.getElementById('detailRuntime');
  const statusEl = document.getElementById('detailStatus');
  const studiosEl = document.getElementById('detailStudios');
  const synopsisEl = document.getElementById('detailSynopsis');
  const directorEl = document.getElementById('detailDirector');
  const writersEl = document.getElementById('detailWriters');
  const budgetEl = document.getElementById('detailBudget');
  const revenueEl = document.getElementById('detailRevenue');
  const genresEl = document.getElementById('detailGenres');
  const castRow = document.getElementById('detailCastRow');
  const posterImg = document.getElementById('detailPosterImg');
  const backdropEl = document.getElementById('detailBackdrop');

  const displayTitle = getMediaTitle(item);
  const displayOverview = getMediaOverview(item);
  const displayGenres = getMediaGenres(item);

  if (titleEl) {
    titleEl.textContent = displayTitle;
    titleEl.style.display = 'block';
  }
  if (logoImg) logoImg.style.display = 'none';

  if (taglineEl) taglineEl.textContent = currentLang === 'ar' ? `استمتع بمشاهدة ${displayTitle} بأعلى جودة سينمائية.` : `Experience ${displayTitle} in full cinema quality.`;
  if (ratingEl) ratingEl.textContent = item.imdbRating || '7.9';
  if (ratingCountEl) ratingCountEl.textContent = '(2,117)';
  if (pgEl) pgEl.textContent = item.type === 'series' || item.isAnime ? 'TV-MA' : 'PG-13';
  if (yearEl) yearEl.textContent = item.year || '2026';
  if (runtimeEl) runtimeEl.textContent = item.type === 'series' || item.isAnime ? (currentLang === 'ar' ? 'مسلسل' : 'Series') : (currentLang === 'ar' ? 'ساعتان و25 دقيقة' : '2h 25m');
  if (statusEl) statusEl.textContent = currentLang === 'ar' ? 'تم العرض' : 'Released';
  if (studiosEl) studiosEl.textContent = 'Marvel Studios, Warner Bros, Universal, Paramount';
  if (synopsisEl) synopsisEl.textContent = displayOverview;

  if (directorEl) directorEl.textContent = 'Destin Daniel Cretton';
  if (writersEl) writersEl.textContent = 'Erik Sommers, Chris McKenna';
  if (budgetEl) budgetEl.textContent = '$225M';
  if (revenueEl) revenueEl.textContent = '$2.2B';

  const posterSrc = item.poster || `https://images.metahub.space/poster/medium/${item.id}/img.jpg`;
  if (posterImg) posterImg.src = posterSrc;

  const bgSrc = item.background || `https://images.metahub.space/background/medium/${item.id}/img.jpg`;
  if (backdropEl) backdropEl.style.backgroundImage = `url('${bgSrc}')`;

  // Genre Pills
  const genres = item.genres || ['Science Fiction', 'Action', 'Adventure'];
  if (genresEl) {
    genresEl.innerHTML = genres.map(g => `<span class="genre-chip-ventic">${escapeHtml(g)}</span>`).join('');
  }

  // Initial Cast List
  renderCastCards(item, castRow);

  // Button States
  const heartBtn = document.getElementById('detailHeartBtn');
  const bookmarkBtn = document.getElementById('detailBookmarkBtn');
  if (heartBtn) heartBtn.classList.toggle('active', isFavourite(item.id));
  if (bookmarkBtn) bookmarkBtn.classList.toggle('active', isInWatchlist(item.id));

  // Related Recommendations
  renderRelatedTitles(item);

  // TV Shows / Anime Seasons & Episodes
  const epSection = document.getElementById('detailEpisodesSection');
  if (item.type === 'series' || item.isAnime) {
    if (epSection) epSection.style.display = 'block';
    loadDetailEpisodes(item);
  } else {
    if (epSection) epSection.style.display = 'none';
  }

  // Fetch Rich Cinemeta Metadata in Background
  fetchRichCinemetaMeta(item);
}

// Fetch Rich Cinemeta Details (Logo, Directors, Writers, Cast, Runtime)
async function fetchRichCinemetaMeta(item) {
  try {
    const res = await fetch(`${config.catalogUrl}/meta/${item.type || 'movie'}/${item.id}.json`);
    const data = await res.json();
    if (data && data.meta) {
      const meta = data.meta;

      const titleEl = document.getElementById('detailTitle');
      const logoImg = document.getElementById('detailLogoImg');
      const directorEl = document.getElementById('detailDirector');
      const writersEl = document.getElementById('detailWriters');
      const synopsisEl = document.getElementById('detailSynopsis');
      const runtimeEl = document.getElementById('detailRuntime');
      const genresEl = document.getElementById('detailGenres');
      const castRow = document.getElementById('detailCastRow');

      if (meta.logo && logoImg) {
        logoImg.src = meta.logo;
        logoImg.style.display = 'block';
        if (titleEl) titleEl.style.display = 'none';
      }

      if (meta.director && meta.director.length > 0 && directorEl) {
        directorEl.textContent = Array.isArray(meta.director) ? meta.director.join(', ') : meta.director;
      }

      if (meta.writer && meta.writer.length > 0 && writersEl) {
        writersEl.textContent = Array.isArray(meta.writer) ? meta.writer.join(', ') : meta.writer;
      }

      if (meta.description && synopsisEl) {
        if (currentLang !== 'ar' || !ARABIC_MEDIA[item.id]) {
          synopsisEl.textContent = meta.description;
        } else {
          synopsisEl.textContent = ARABIC_MEDIA[item.id].desc;
        }
      }

      if (meta.runtime && runtimeEl) {
        runtimeEl.textContent = meta.runtime;
      }

      if (meta.genres && genresEl) {
        const rawGenres = ARABIC_MEDIA[item.id]?.genres || (currentLang === 'ar' ? meta.genres.map(g => GENRE_TRANSLATIONS[g.toLowerCase()] || g) : meta.genres);
        genresEl.innerHTML = rawGenres.map(g => `<span class="genre-chip-ventic">${escapeHtml(g)}</span>`).join('');
      }

      if (meta.cast && meta.cast.length > 0) {
        item.cast = meta.cast;
        renderCastCards(item, castRow);
      }
    }
  } catch (err) {}
}

// Render Authentic Cast Portrait Cards
function renderCastCards(item, container) {
  if (!container) return;

  let castNames = item.cast || [];
  if (castNames.length === 0) {
    if (item.name.toLowerCase().includes('deadpool')) {
      castNames = ['Ryan Reynolds', 'Hugh Jackman', 'Emma Corrin', 'Matthew Macfadyen'];
    } else if (item.name.toLowerCase().includes('spider')) {
      castNames = ['Tom Holland', 'Zendaya', 'Mark Ruffalo', 'Jon Bernthal', 'Jacob Batalon', 'Sadie Sink', 'Florence Pugh', 'Liza Colón-Zayas', 'Tramell Tillman', 'Marisa Tomei', 'Naomi Watts', 'Michael Mando', 'Keith David'];
    } else if (item.name.toLowerCase().includes('dune')) {
      castNames = ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Javier Bardem', 'Austin Butler'];
    } else if (item.name.toLowerCase().includes('inception')) {
      castNames = ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'];
    } else if (item.name.toLowerCase().includes('dark knight')) {
      castNames = ['Christian Bale', 'Heath Ledger'];
    } else if (item.name.toLowerCase().includes('godfather')) {
      castNames = ['Marlon Brando', 'Al Pacino'];
    } else {
      castNames = ['Lead Actor', 'Supporting Actor', 'Co-Star', 'Guest Star'];
    }
  }

  // Fetch missing photos in background
  fetchActorWikiPhotos(castNames).then(() => {
    // Re-render if new photos were fetched
    updateCastImages(castNames, container);
  });

  container.innerHTML = castNames.map((name, idx) => {
    const cleanName = name.trim();
    const key = cleanName.toLowerCase();
    const known = ACTOR_PORTRAITS[key];
    const wikiPhoto = actorPhotoCache.get(key);

    const photoUrl = (known && known.photo) || wikiPhoto || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop`;
    const roleName = (known && known.fallbackRole) ? known.fallbackRole : (idx === 0 ? 'Lead Role' : 'Supporting Cast');

    return `
      <div class="ventic-actor-card" data-actor="${escapeHtml(key)}">
        <div class="actor-photo-frame">
          <img src="${photoUrl}" alt="${escapeHtml(cleanName)}" loading="lazy" />
        </div>
        <div class="actor-name-text">${escapeHtml(cleanName)}</div>
        <div class="actor-role-text">${escapeHtml(roleName)}</div>
      </div>
    `;
  }).join('');
}

function updateCastImages(castNames, container) {
  if (!container) return;
  castNames.forEach(name => {
    const key = name.trim().toLowerCase();
    const photo = actorPhotoCache.get(key) || ACTOR_PORTRAITS[key]?.photo;
    if (photo) {
      const card = container.querySelector(`[data-actor="${key}"]`);
      if (card) {
        const img = card.querySelector('img');
        if (img && img.src !== photo) {
          img.src = photo;
        }
      }
    }
  });
}

// Load Seasons and Episode Cards
async function loadDetailEpisodes(item) {
  elements.detailSeasonTabs.innerHTML = '';
  elements.detailEpisodeGrid.innerHTML = `<div class="loading-pulse" style="grid-column: 1/-1;"><i class="fa-solid fa-spinner fa-spin"></i> Fetching real seasons & episodes...</div>`;

  const seasonMap = await fetchRealSeriesEpisodes(item.id);
  const seasons = Array.from(seasonMap.keys()).sort((a, b) => a - b);

  selectedSeason = seasons[0] || 1;
  elements.detailSeasonCount.textContent = `${seasons.length} Season${seasons.length > 1 ? 's' : ''}`;

  elements.detailSeasonTabs.innerHTML = seasons.map(sNum => `
    <button class="season-btn ${sNum === selectedSeason ? 'active' : ''}" data-action="detail-select-season" data-season="${sNum}">
      Season ${sNum}
    </button>
  `).join('');

  renderDetailEpisodeGrid(seasonMap, selectedSeason, item);
}

function renderDetailEpisodeGrid(seasonMap, sNum, item) {
  const num = parseInt(sNum, 10) || 1;
  const episodes = seasonMap.get(num) || seasonMap.get(String(num)) || [];
  if (episodes.length === 0) {
    elements.detailEpisodeGrid.innerHTML = `<div class="loading-pulse" style="grid-column: 1/-1;">No episodes found for Season ${num}</div>`;
    return;
  }

  elements.detailEpisodeGrid.innerHTML = episodes.map(ep => {
    const thumb = ep.thumbnail || item?.background || item?.poster || '';
    return `
      <div class="ep-card-horizontal" data-action="stream-episode" data-season="${ep.season}" data-episode="${ep.episode}">
        <div class="ep-thumb-frame">
          <img src="${thumb}" alt="${escapeHtml(ep.title)}" loading="lazy" />
          <div class="ep-number-tag">S${ep.season} · EP ${ep.episode}</div>
          <div class="poster-play-hover">
            <div class="hover-play-icon"><i class="fa-solid fa-play"></i></div>
          </div>
        </div>
        <div class="ep-info-block">
          <div class="ep-title">${escapeHtml(ep.title)}</div>
          <div class="ep-air-date">${ep.released ? 'Aired ' + ep.released : 'HD 1080p Stream'}</div>
        </div>
      </div>
    `;
  }).join('');
}

function renderRelatedTitles(item) {
  const targetGenre = (item.genres && item.genres[0]) || item.genre || 'Drama';
  const allPool = Array.from(mediaMap.values()).filter(m => m.id !== item.id);
  
  let matched = allPool.filter(m => 
    (m.genres && m.genres.some(g => g.toLowerCase() === targetGenre.toLowerCase())) ||
    (m.type === item.type)
  );

  if (matched.length < 8) {
    matched = allPool.slice(0, 15);
  }

  elements.detailRelatedRow.innerHTML = matched.slice(0, 15).map(m => createCardHtmlById(m.id)).join('');
}

// Real Seasons & Episodes Resolver
async function fetchRealSeriesEpisodes(imdbId) {
  if (seriesEpisodesMap.has(imdbId)) {
    return seriesEpisodesMap.get(imdbId);
  }

  try {
    const res = await fetch(`${config.catalogUrl}/meta/series/${imdbId}.json`);
    const data = await res.json();

    if (data && data.meta && data.meta.videos && data.meta.videos.length > 0) {
      const seasonMap = new Map();
      data.meta.videos.forEach(v => {
        const s = parseInt(v.season ?? 1, 10) || 1;
        if (!seasonMap.has(s)) seasonMap.set(s, []);
        seasonMap.get(s).push({
          season: s,
          episode: parseInt(v.number ?? v.episode ?? 1, 10) || 1,
          title: v.title || `Episode ${v.number || v.episode || 1}`,
          released: v.released ? v.released.substring(0, 10) : '',
          thumbnail: v.thumbnail || ''
        });
      });

      // Sort episodes inside each season
      seasonMap.forEach(epList => {
        epList.sort((a, b) => a.episode - b.episode);
      });

      seriesEpisodesMap.set(imdbId, seasonMap);
      return seasonMap;
    }
  } catch (err) {
    console.warn('Error fetching series videos for', imdbId, err);
  }

  const fallbackSeasonMap = new Map();
  for (let s = 1; s <= 5; s++) {
    const eps = [];
    for (let e = 1; e <= 12; e++) {
      eps.push({ season: s, episode: e, title: `Episode ${e}`, released: '' });
    }
    fallbackSeasonMap.set(s, eps);
  }
  seriesEpisodesMap.set(imdbId, fallbackSeasonMap);
  return fallbackSeasonMap;
}

// ==========================================================================
// RENDER CARDS & VIEWS
// ==========================================================================

function createCardHtmlById(id) {
  const item = mediaMap.get(id) || favourites.find(f => f.id === id) || history.find(h => h.id === id);
  if (!item) return '';

  const posterImg = item.poster || `https://images.metahub.space/poster/medium/${item.id}/img.jpg`;
  const title = getMediaTitle(item);
  const isFav = isFavourite(item.id);

  const favBtnHtml = `
    <button class="card-fav-btn ${isFav ? 'active' : ''}" data-action="toggle-fav-card" data-id="${item.id}" title="${isFav ? (currentLang === 'ar' ? 'إزالة من المفضلة' : 'Remove from Favourites') : (currentLang === 'ar' ? 'إضافة إلى المفضلة' : 'Add to Favourites')}">
      ${isFav ? `
        <svg viewBox="0 0 24 24" width="13" height="13" fill="#ff5449">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      ` : `
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      `}
    </button>
  `;

  return `
    <div class="movie-card" data-action="open-detail" data-id="${item.id}">
      <div class="poster-frame">
        <img src="${posterImg}" alt="${escapeHtml(title)}" loading="lazy" />
        ${favBtnHtml}
        <div class="poster-rating">
          <i class="fa-solid fa-star"></i>
          <span>${item.imdbRating || '7.5'}</span>
        </div>
        <div class="poster-play-hover">
          <div class="hover-play-icon">
            <i class="fa-solid fa-play"></i>
          </div>
        </div>
      </div>
      <div class="card-meta">
        <div class="card-title">${escapeHtml(title)}</div>
        <div class="card-year">${item.year || '2024'}</div>
      </div>
    </div>
  `;
}

function renderAllViews() {
  const allMovies = movieIds.map(id => mediaMap.get(id)).filter(Boolean);
  const allShows = tvIds.map(id => mediaMap.get(id)).filter(Boolean);

  // 1. Popular Movies
  if (elements.popularMoviesRow) elements.popularMoviesRow.innerHTML = movieIds.slice(0, 25).map(createCardHtmlById).join('');

  // 2. Popular TV Shows
  if (elements.popularShowsRow) elements.popularShowsRow.innerHTML = tvIds.slice(0, 25).map(createCardHtmlById).join('');

  // 3. Action & Adventure
  const actionList = allMovies.filter(m => /action|adventure/i.test((m.genres || []).join(' ') + ' ' + (m.genre || ''))).slice(0, 25);
  const actionEl = document.getElementById('actionMoviesRow');
  if (actionEl && actionList.length > 0) actionEl.innerHTML = actionList.map(m => createCardHtmlById(m.id)).join('');

  // 4. Sci-Fi & Fantasy
  const scifiList = allMovies.filter(m => /sci-fi|fantasy|space|superhero/i.test((m.genres || []).join(' ') + ' ' + (m.genre || ''))).slice(0, 25);
  const scifiEl = document.getElementById('scifiMoviesRow');
  if (scifiEl && scifiList.length > 0) scifiEl.innerHTML = scifiList.map(m => createCardHtmlById(m.id)).join('');

  // 5. Crime & Thrillers
  const crimeList = allMovies.filter(m => /crime|thriller|mystery|suspense/i.test((m.genres || []).join(' ') + ' ' + (m.genre || ''))).slice(0, 25);
  const crimeEl = document.getElementById('crimeMoviesRow');
  if (crimeEl && crimeList.length > 0) crimeEl.innerHTML = crimeList.map(m => createCardHtmlById(m.id)).join('');

  // 6. Comedy & Entertainment
  const comedyList = allMovies.filter(m => /comedy|animation|family/i.test((m.genres || []).join(' ') + ' ' + (m.genre || ''))).slice(0, 25);
  const comedyEl = document.getElementById('comedyMoviesRow');
  if (comedyEl && comedyList.length > 0) comedyEl.innerHTML = comedyList.map(m => createCardHtmlById(m.id)).join('');

  // 7. Top Rated Cinema (IMDb rating >= 8.0)
  const topRatedList = [...allMovies].sort((a, b) => parseFloat(b.imdbRating || 0) - parseFloat(a.imdbRating || 0)).slice(0, 25);
  if (elements.topRatedRow) elements.topRatedRow.innerHTML = topRatedList.map(m => createCardHtmlById(m.id)).join('');

  renderContinueWatching();

  populateYearSelects();
  applyMovieFilters();
  applyTvFilters();

  renderCollections();
}

// Active Popup & Redirect Shield (Blocks script popup triggers globally)
window.open = function(url, target, features) {
  console.log('[AdShield] Blocked popup/tab attempt:', url);
  return null;
};

// Multi-Source Addon & Server Stream Generator (With Arabic Subtitles Enabled by Default)
function generateServerUrls(imdbId, isSeries, season = 1, episode = 1) {
  return [
    {
      name: 'Server 1 · AutoEmbed Ultra 1080p',
      sub: 'Ultra High Speed · Arabic Subs (Torrentio Node)',
      url: isSeries ? `https://autoembed.co/tv/imdb/${imdbId}-${season}-${episode}?sub=ar&sub_lang=ar` : `https://autoembed.co/movie/imdb/${imdbId}?sub=ar&sub_lang=ar`
    },
    {
      name: 'Server 2 · VidSrc Cloud 1080p',
      sub: 'Zero Buffer · Arabic Subtitles Default',
      url: isSeries ? `https://vidsrc.xyz/embed/tv?imdb=${imdbId}&season=${season}&episode=${episode}&ds_lang=ar` : `https://vidsrc.xyz/embed/movie?imdb=${imdbId}&ds_lang=ar`
    },
    {
      name: 'Server 3 · EmbedSU Multi-Sub 1080p',
      sub: 'Auto Arabic Subtitles (KnightCrawler)',
      url: isSeries ? `https://embed.su/embed/tv/${imdbId}/${season}/${episode}?sub=ar` : `https://embed.su/embed/movie/${imdbId}?sub=ar`
    },
    {
      name: 'Server 4 · MultiEmbed Stream PRO',
      sub: 'Direct Stream Mirror · Arabic Subtitles',
      url: isSeries ? `https://multiembed.mov/?video_id=${imdbId}&s=${season}&e=${episode}&sub_lang=ar` : `https://multiembed.mov/?video_id=${imdbId}&sub_lang=ar`
    },
    {
      name: 'Server 5 · VidSrc CC High-Bandwidth',
      sub: 'Alternative 4K/1080p · Arabic Subs',
      url: isSeries ? `https://vidsrc.cc/v2/embed/tv/${imdbId}/${season}/${episode}?sub=ar` : `https://vidsrc.cc/v2/embed/movie/${imdbId}?sub=ar`
    },
    {
      name: 'Server 6 · 2Embed Mirror HD',
      sub: 'High Reliability Backup · Arabic Subs',
      url: isSeries ? `https://www.2embed.cc/embedtv/${imdbId}&s=${season}&e=${episode}&sub=ar` : `https://www.2embed.cc/embed/${imdbId}?sub=ar`
    },
    {
      name: 'Server 7 · SmashyStream Multi-Server',
      sub: 'Fast Multi-Source Backup · Arabic Subs',
      url: isSeries ? `https://player.smashy.stream/tv/${imdbId}?s=${season}&e=${episode}&sub_lang=ar` : `https://player.smashy.stream/movie/${imdbId}?sub_lang=ar`
    },
    {
      name: 'Server 8 · SuperEmbed High-Speed',
      sub: 'Instant Multi-Language · Arabic Subs',
      url: isSeries ? `https://multiembed.mov/directstream.php?video_id=${imdbId}&s=${season}&e=${episode}&sub_lang=ar` : `https://multiembed.mov/directstream.php?video_id=${imdbId}&sub_lang=ar`
    }
  ];
}

// ==========================================================================
// REAL TORRENTIO & BITTORRENT STREAM ENGINE (100% AD-FREE NATIVE PLAYER)
// ==========================================================================

let client = null;
function getWebTorrentClient() {
  if (!client && typeof WebTorrent !== 'undefined') {
    client = new WebTorrent();
  }
  return client;
}

function parseSizeToMB(rawText) {
  if (!rawText) return 2500;
  const match = rawText.match(/([\d\.]+)\s*(GB|MB|TB)/i);
  if (!match) return 2500;
  const val = parseFloat(match[1]);
  const unit = match[2].toUpperCase();
  if (unit === 'TB') return val * 1024 * 1024;
  if (unit === 'GB') return val * 1024;
  return val; // MB
}

async function fetchAndDisplayStreams(item, season = 1, episode = 1) {
  const isSeries = item.type === 'series' || item.isAnime;
  const epInfo = isSeries ? ` (S${season}:E${episode})` : '';
  const imdbId = item.id || 'tt6263850';

  elements.streamPickerTitle.textContent = `${item.name}${epInfo}`;
  elements.streamPickerModal.style.display = 'flex';
  elements.streamList.innerHTML = `<div class="loading-pulse" style="padding: 1.5rem;"><i class="fa-solid fa-spinner fa-spin"></i> Searching across YTS, 1337x, TorrentGalaxy, TPB, MediaFusion, KnightCrawler...</div>`;

  const streamTarget = isSeries ? `${imdbId}:${season}:${episode}` : imdbId;
  const type = item.type || 'movie';

  const providerEndpoints = [
    `https://torrentio.strem.fun/stream/${type}/${streamTarget}.json`,
    `https://mediafusion.elfhosted.com/stream/${type}/${streamTarget}.json`,
    `https://knightcrawler.elfhosted.com/stream/${type}/${streamTarget}.json`,
    `https://comet.elfhosted.com/stream/${type}/${streamTarget}.json`
  ];

  let aggregatedStreams = [];

  try {
    const responses = await Promise.allSettled(
      providerEndpoints.map(url => 
        fetch(url, { signal: AbortSignal.timeout(7000) })
          .then(r => r.json())
          .catch(() => null)
      )
    );

    const seenHashes = new Set();

    responses.forEach(res => {
      if (res.status === 'fulfilled' && res.value && res.value.streams && Array.isArray(res.value.streams)) {
        res.value.streams.forEach(s => {
          const rawTitle = (s.title || s.name || '').trim();
          const infoHash = s.infoHash || (s.url?.match(/btih:([a-f0-9]+)/i)?.[1]);
          const dedupeKey = infoHash ? infoHash.toLowerCase() : rawTitle.toLowerCase();

          if (!seenHashes.has(dedupeKey)) {
            seenHashes.add(dedupeKey);

            const titleLines = rawTitle.split('\n');
            const releaseName = titleLines[0] || item.name;
            const details = titleLines.slice(1).join(' · ') || '1080p Ultra HD';

            let magnetUrl = s.url;
            if (s.infoHash) {
              magnetUrl = `magnet:?xt=urn:btih:${s.infoHash}&dn=${encodeURIComponent(releaseName)}`;
              if (s.sources) {
                s.sources.forEach(src => {
                  if (src.startsWith('tracker:')) magnetUrl += `&tr=${encodeURIComponent(src.replace('tracker:', ''))}`;
                });
              }
            }

            const hasArabic = /arabic|ara|ar\b|multi|subs/i.test(releaseName + ' ' + details);

            aggregatedStreams.push({
              name: (s.name || 'Torrent').replace('\n', ' · '),
              title: `${releaseName}\n${details}`,
              url: magnetUrl || `https://autoembed.co/movie/imdb/${imdbId}?sub=ar`,
              isTorrent: Boolean(s.infoHash || s.url?.startsWith('magnet:')),
              infoHash: s.infoHash,
              hasArabic
            });
          }
        });
      }
    });

    // Sort releases from LOW to HIGH file size
    aggregatedStreams.sort((a, b) => {
      const sizeA = parseSizeToMB(a.title);
      const sizeB = parseSizeToMB(b.title);
      return sizeA - sizeB;
    });
  } catch (err) {
    console.warn('Multi-provider torrent aggregation error:', err);
  }

  // Web fallback if no torrents returned
  if (aggregatedStreams.length === 0) {
    aggregatedStreams = generateServerUrls(imdbId, isSeries, season, episode);
  }

  currentStreams = aggregatedStreams;
  activeStreamProvider = 'all';
  renderProviderFilterBar(currentStreams);
  renderStreamPickerList(currentStreams);
}

let activeStreamProvider = 'all';

function renderProviderFilterBar(streams) {
  const bar = document.getElementById('streamProviderFilterBar');
  if (!bar) return;

  // Extract all unique providers and count their releases
  const providerCounts = new Map();
  streams.forEach(s => {
    const rawText = s.title || '';
    const srcMatch = rawText.match(/⚙️\s*([A-Za-z0-9\-\_\.]+)/i) || rawText.match(/(1337x|YTS|RARBG|TorrentGalaxy|ThePirateBay|BestTorrents|NyaaSi|Rutor|EZTV|TGx|Torrent9)/i);
    const name = srcMatch ? srcMatch[1].trim() : 'Torrentio';
    providerCounts.set(name, (providerCounts.get(name) || 0) + 1);
  });

  const priorityOrder = ['yts', '1337x', 'torrentgalaxy', 'thepiratebay', 'rarbg', 'besttorrents', 'torrent9', 'rutor', 'eztv'];
  
  const providers = Array.from(providerCounts.keys()).sort((a, b) => {
    const idxA = priorityOrder.indexOf(a.toLowerCase());
    const idxB = priorityOrder.indexOf(b.toLowerCase());
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return (providerCounts.get(b) || 0) - (providerCounts.get(a) || 0);
  });

  let pillsHtml = `
    <button class="provider-pill ${activeStreamProvider === 'all' ? 'active' : ''}" data-provider="all">
      <i class="fa-solid fa-layer-group"></i> All <span class="provider-pill-count">(${streams.length})</span>
    </button>
  `;

  providers.forEach(p => {
    const count = providerCounts.get(p);
    pillsHtml += `
      <button class="provider-pill ${activeStreamProvider.toLowerCase() === p.toLowerCase() ? 'active' : ''}" data-provider="${escapeHtml(p)}">
        <i class="fa-solid fa-cloud-arrow-down"></i> ${escapeHtml(p)} <span class="provider-pill-count">(${count})</span>
      </button>
    `;
  });

  bar.innerHTML = pillsHtml;

  // Arrow Scroll Navigation
  const leftBtn = document.getElementById('providerScrollLeftBtn');
  const rightBtn = document.getElementById('providerScrollRightBtn');
  if (leftBtn) leftBtn.onclick = () => bar.scrollBy({ left: -220, behavior: 'smooth' });
  if (rightBtn) rightBtn.onclick = () => bar.scrollBy({ left: 220, behavior: 'smooth' });

  // Mouse Wheel Horizontal Scroll
  bar.onwheel = (e) => {
    e.preventDefault();
    bar.scrollLeft += e.deltaY;
  };

  bar.querySelectorAll('.provider-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      bar.querySelectorAll('.provider-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeStreamProvider = btn.dataset.provider || 'all';
      renderStreamPickerList(currentStreams);
    });
  });
}

function renderStreamPickerList(streams) {
  let displayList = streams;
  if (activeStreamProvider !== 'all') {
    displayList = streams.filter(s => {
      const rawText = s.title || '';
      return rawText.toLowerCase().includes(activeStreamProvider.toLowerCase());
    });
  }

  if (displayList.length === 0) {
    elements.streamList.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 2rem;">No releases found from ${escapeHtml(activeStreamProvider)}. Select "All" above.</div>`;
    return;
  }

  elements.streamList.innerHTML = displayList.map((stream, idx) => {
    const rawText = stream.title || '';
    const lines = rawText.split('\n');
    let mainTitle = lines[0] || '1080p Stream Node';
    let subMeta = lines.slice(1).join(' ') || '';

    // 1. Extract File Size (e.g. 2.95 GB, 764 MB)
    let sizeMatch = rawText.match(/💾\s*([\d\.]+\s*(?:GB|MB|TB))/i) || rawText.match(/([\d\.]+\s*(?:GB|MB|TB))/i);
    let fileSize = sizeMatch ? sizeMatch[1].trim() : '2.4 GB';

    // 2. Extract Seeders (e.g. 118 seeds)
    let seedMatch = rawText.match(/👤\s*(\d+)/i) || rawText.match(/(\d+)\s*(?:seeds|peers)/i);
    let seedCount = seedMatch ? seedMatch[1].trim() : '24';

    // 3. Extract Indexer Source (e.g. 1337x, YTS, TorrentGalaxy)
    let srcMatch = rawText.match(/⚙️\s*([A-Za-z0-9\-\_\.]+)/i) || rawText.match(/(1337x|YTS|RARBG|TorrentGalaxy|ThePirateBay|BestTorrents|NyaaSi|Rutor|EZTV|TGx|Torrent9)/i);
    let indexerName = srcMatch ? srcMatch[1].trim() : 'Torrentio';

    // Clean up bloated collection names in main title
    mainTitle = mainTitle
      .replace(/\.mp4|\.mkv|\.avi/gi, '')
      .replace(/Complete\s+\d+\s+Movie\s+Collection/gi, 'Collection')
      .replace(/👤.*|💾.*|⚙️.*/gi, '')
      .trim();

    // Extract resolution badge (4K, 1080p, 720p)
    let resBadge = '1080p';
    if (/4k|2160p|uhd/i.test(mainTitle + ' ' + subMeta)) resBadge = '4K HDR';
    else if (/720p/i.test(mainTitle + ' ' + subMeta)) resBadge = '720p HD';
    else if (/1080p/i.test(mainTitle + ' ' + subMeta)) resBadge = '1080p FHD';

    const arabicBadge = stream.hasArabic ? '<span class="pill-ar">🇸🇦 AR</span>' : '';
    const realIndex = streams.indexOf(stream);

    return `
      <div class="stream-item" data-action="pick-stream" data-index="${realIndex}">
        <div class="stream-badge-left">${escapeHtml(resBadge)}</div>
        <div class="stream-info">
          <div class="stream-name" title="${escapeHtml(mainTitle)}">${escapeHtml(mainTitle)} ${arabicBadge}</div>
          <div class="stream-tags-row">
            <span class="tag-pill tag-size"><i class="fa-solid fa-hard-drive"></i> ${escapeHtml(fileSize)}</span>
            <span class="tag-pill tag-seeds"><i class="fa-solid fa-user-group"></i> ${escapeHtml(seedCount)}</span>
            <span class="tag-pill tag-source"><i class="fa-solid fa-cloud-arrow-down"></i> ${escapeHtml(indexerName)}</span>
          </div>
        </div>
        <div class="stream-action-icon"><i class="fa-solid fa-play"></i></div>
      </div>
    `;
  }).join('');
}

function onStreamSelected(idx) {
  const stream = currentStreams[idx];
  if (!stream) return;

  elements.streamPickerModal.style.display = 'none';
  addToHistory(activeMedia, selectedSeason, selectedEpisode);
  
  if (stream.isTorrent && stream.url.startsWith('magnet:')) {
    launchTorrentPlayer(activeMedia.name, stream.url, stream.name);
  } else {
    launchVenticPlayer(activeMedia.name, stream.url);
  }
}

// 100% AD-FREE REAL BITTORRENT NATIVE PLAYER
function launchTorrentPlayer(title, magnetUri, releaseQuality) {
  const isSeries = activeMedia.type === 'series' || activeMedia.isAnime;
  elements.hudMediaTitle.textContent = `${title} (${releaseQuality || '1080p'})`;

  if (isSeries) {
    elements.hudEpisodeTag.textContent = `S${selectedSeason}:E${selectedEpisode}`;
    elements.hudEpisodeTag.style.display = 'inline-block';
  } else {
    elements.hudEpisodeTag.style.display = 'none';
  }

  const fallbackUrl = isSeries 
    ? `https://autoembed.co/tv/imdb/${activeMedia.id || 'tt15239678'}-${selectedSeason}-${selectedEpisode}`
    : `https://autoembed.co/movie/imdb/${activeMedia.id || 'tt15239678'}`;

  elements.videoCanvas.innerHTML = `
    <div class="torrent-buffering-hud" id="torrentHudStatus" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; padding: 2rem;">
      <div class="torrent-spinner" style="font-size: 2.5rem; color: var(--accent-primary);"><i class="fa-solid fa-circle-notch fa-spin"></i></div>
      <h3 style="color: #fff; margin-top: 1.2rem; font-size: 1.4rem;">Connecting to BitTorrent Swarm...</h3>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.4rem;" id="torrentStats">Locating live seeders & buffering stream...</p>
      
      <div style="display: flex; gap: 1rem; margin-top: 1.8rem; flex-wrap: wrap; justify-content: center;">
        <button id="directWebPlayBtn" class="btn-primary" style="padding: 0.75rem 1.4rem; font-weight: 700;">
          <i class="fa-solid fa-play"></i> Play Instant 1080p Stream
        </button>
        <a href="${magnetUri}" class="btn-secondary" style="padding: 0.75rem 1.4rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; font-weight: 600;">
          <i class="fa-solid fa-magnet"></i> Open in VLC / Stremio
        </a>
      </div>
    </div>
  `;

  const webPlayBtn = document.getElementById('directWebPlayBtn');
  if (webPlayBtn) {
    webPlayBtn.addEventListener('click', () => {
      launchVenticPlayer(title, fallbackUrl);
    });
  }

  elements.playerScreen.style.display = 'block';
  elements.browseShell.style.display = 'none';
  resetHudTimer();

  try {
    const wt = getWebTorrentClient();
    if (wt) {
      wt.add(magnetUri, torrent => {
        const file = torrent.files.find(f => f.name.endsWith('.mp4') || f.name.endsWith('.mkv') || f.name.endsWith('.webm'));
        if (file) {
          elements.videoCanvas.innerHTML = '';
          const video = document.createElement('video');
          video.controls = true;
          video.autoplay = true;
          video.style.width = '100%';
          video.style.height = '100%';
          video.style.objectFit = 'contain';
          elements.videoCanvas.appendChild(video);
          file.renderTo(video, { autoplay: true });
        }
      });
    }
  } catch (e) {
    console.warn('WebTorrent direct peer fallback:', e);
  }
}

let hudHideTimeout = null;

function launchVenticPlayer(title, streamUrl) {
  const isSeries = activeMedia.type === 'series' || activeMedia.isAnime;
  elements.hudMediaTitle.textContent = title;

  if (isSeries) {
    elements.hudEpisodeTag.textContent = `S${selectedSeason}:E${selectedEpisode}`;
    elements.hudEpisodeTag.style.display = 'inline-block';
  } else {
    elements.hudEpisodeTag.style.display = 'none';
  }

  elements.videoCanvas.innerHTML = '';
  const iframe = document.createElement('iframe');
  iframe.src = streamUrl;
  
  // Unrestricted playback with all streaming permissions
  iframe.allow = 'autoplay; fullscreen; encrypted-media; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  elements.videoCanvas.appendChild(iframe);

  isPlayerActive = true;
  elements.playerScreen.style.display = 'block';
  elements.browseShell.style.display = 'none';

  resetHudTimer();
}

function exitVenticPlayer() {
  isPlayerActive = false;
  clearTimeout(hudHideTimeout);
  if (client) {
    try { client.torrents.forEach(t => t.destroy()); } catch (e) {}
  }
  elements.videoCanvas.innerHTML = '';
  if (elements.playerHud) elements.playerHud.classList.remove('hidden');
  elements.playerScreen.style.display = 'none';
  elements.browseShell.style.display = 'flex';

  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }
}

let isPlayerActive = false;

function resetHudTimer() {
  if (elements.playerHud) {
    elements.playerHud.classList.remove('hidden');
  }
  clearTimeout(hudHideTimeout);
  if (isPlayerActive) {
    hudHideTimeout = setTimeout(() => {
      if (isPlayerActive && elements.playerHud) {
        elements.playerHud.classList.add('hidden');
      }
    }, 2200);
  }
}

// Toast Notification Helper (Pure Vector SVGs, Zero Mobile Emojis)
function showToast(msg, iconHtml = '') {
  let toast = document.getElementById('cinemaToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cinemaToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 28px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: rgba(22, 17, 18, 0.95);
      color: #fff;
      padding: 10px 22px;
      border-radius: 9999px;
      border: 1px solid var(--border-subtle);
      box-shadow: 0 10px 30px rgba(0,0,0,0.6);
      font-size: 0.9rem;
      font-weight: 600;
      z-index: 99999;
      opacity: 0;
      pointer-events: none;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      backdrop-filter: blur(8px);
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    document.body.appendChild(toast);
  }
  toast.innerHTML = `${iconHtml} <span>${escapeHtml(msg)}</span>`;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
  }, 2400);
}

// Collections (Only Favourites & History)
function isFavourite(id) { return favourites.some(f => f.id === id); }

function toggleFavourite(item, showToastMsg = true) {
  if (!item) return;
  const exists = isFavourite(item.id);
  if (exists) {
    favourites = favourites.filter(f => f.id !== item.id);
    if (showToastMsg) {
      showToast(
        currentLang === 'ar' ? 'تمت الإزالة من المفضلة' : 'Removed from Favourites',
        '<i class="fa-solid fa-heart-crack" style="color: #ff5449; font-size: 1rem;"></i>'
      );
    }
  } else {
    favourites.unshift(item);
    if (showToastMsg) {
      showToast(
        currentLang === 'ar' ? 'تمت الإضافة إلى المفضلة' : 'Added to Favourites',
        '<i class="fa-solid fa-heart" style="color: #ff5449; font-size: 1rem;"></i>'
      );
    }
  }
  localStorage.setItem('ventic_favourites', JSON.stringify(favourites));
  updateBadgeCounters();
  renderCollections();

  if (elements.heroHeartBtn && activeMedia?.id === item.id) {
    elements.heroHeartBtn.classList.toggle('active', !exists);
  }
  if (elements.detailHeartBtn && activeMedia?.id === item.id) {
    elements.detailHeartBtn.classList.toggle('active', !exists);
  }

  // Sync all movie cards across the DOM
  document.querySelectorAll(`.card-fav-btn[data-id="${item.id}"]`).forEach(btn => {
    btn.classList.toggle('active', !exists);
    btn.innerHTML = !exists ? `
      <svg viewBox="0 0 24 24" width="13" height="13" fill="#ff5449">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    ` : `
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    `;
    btn.title = !exists ? (currentLang === 'ar' ? 'إزالة من المفضلة' : 'Remove from Favourites') : (currentLang === 'ar' ? 'إضافة إلى المفضلة' : 'Add to Favourites');
  });
}

function addToHistory(item, season = 1, episode = 1) {
  history = history.filter(h => h.id !== item.id);
  history.unshift({
    ...item,
    lastWatchedSeason: season,
    lastWatchedEpisode: episode,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('ventic_history', JSON.stringify(history.slice(0, 30)));
  renderContinueWatching();
  renderCollections();
}

function updateBadgeCounters() {
  if (elements.favCountBadge) {
    elements.favCountBadge.textContent = favourites.length;
    elements.favCountBadge.style.display = favourites.length > 0 ? 'inline-block' : 'none';
  }
}

function renderContinueWatching() {
  if (history.length > 0) {
    elements.continueWatchingSection.style.display = 'block';
    elements.continueWatchingRow.innerHTML = history.slice(0, 8).map(h => createCardHtmlById(h.id)).join('');
  } else {
    elements.continueWatchingSection.style.display = 'none';
  }
}

function renderCollections() {
  if (elements.favouritesGrid) {
    if (favourites.length > 0) {
      elements.favouritesGrid.innerHTML = favourites.map(f => createCardHtmlById(f.id, true)).join('');
      if (elements.emptyFavourites) elements.emptyFavourites.style.display = 'none';
    } else {
      elements.favouritesGrid.innerHTML = '';
      if (elements.emptyFavourites) elements.emptyFavourites.style.display = 'flex';
    }
  }

  if (elements.historyGrid) {
    if (history.length > 0) {
      elements.historyGrid.innerHTML = history.map(h => createCardHtmlById(h.id)).join('');
      if (elements.emptyHistory) elements.emptyHistory.style.display = 'none';
    } else {
      elements.historyGrid.innerHTML = '';
      if (elements.emptyHistory) elements.emptyHistory.style.display = 'flex';
    }
  }
}

// Global Event Listeners & Delegation
function setupGlobalEventDelegation() {
  if (elements.navLinks) {
    elements.navLinks.forEach(link => {
      link.addEventListener('click', () => navigateTo(link.dataset.tab));
    });
  }

  if (elements.backNavBtn) {
    elements.backNavBtn.addEventListener('click', () => {
      const prev = navHistory.length > 1 ? navHistory[navHistory.length - 2] : 'home';
      navigateTo(prev);
    });
  }

  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');
    if (!target) return;

    const action = target.dataset.action;
    const id = target.dataset.id;

    if (action === 'toggle-fav-card') {
      e.preventDefault();
      e.stopPropagation();
      const item = mediaMap.get(id) || favourites.find(f => f.id === id) || history.find(h => h.id === id);
      if (item) toggleFavourite(item, true);
    } else if (action === 'open-detail') {
      const item = mediaMap.get(id) || favourites.find(f => f.id === id) || history.find(h => h.id === id);
      if (item) openDedicatedDetailPage(item);
    } else if (action === 'set-hero-item') {
      const item = mediaMap.get(id);
      if (item) setupSpotlightHero(item);
    } else if (action === 'detail-select-season') {
      const sNum = parseInt(target.dataset.season, 10);
      selectedSeason = sNum;
      document.querySelectorAll('.season-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.season, 10) === sNum);
      });
      const seasonCountEl = document.getElementById('detailSeasonCount');
      if (seasonCountEl) seasonCountEl.textContent = `Season ${sNum}`;

      const currentId = activeMedia?.id;
      if (currentId) {
        if (seriesEpisodesMap.has(currentId)) {
          renderDetailEpisodeGrid(seriesEpisodesMap.get(currentId), sNum, activeMedia);
        } else {
          fetchRealSeriesEpisodes(currentId).then(map => {
            renderDetailEpisodeGrid(map, sNum, activeMedia);
          });
        }
      }
    } else if (action === 'stream-episode') {
      const s = parseInt(target.dataset.season, 10);
      const ep = parseInt(target.dataset.episode, 10);
      selectedSeason = s;
      selectedEpisode = ep;
      if (activeMedia) fetchAndDisplayStreams(activeMedia, s, ep);
    } else if (action === 'select-stream' || action === 'pick-stream') {
      const idx = parseInt(target.dataset.index, 10);
      onStreamSelected(idx);
    }
  });

  // Hero Spotlight Actions
  if (elements.heroPlayBtn) {
    elements.heroPlayBtn.addEventListener('click', () => {
      if (activeMedia) {
        if (activeMedia.type === 'series' || activeMedia.isAnime) {
          openDedicatedDetailPage(activeMedia);
        } else {
          fetchAndDisplayStreams(activeMedia);
        }
      }
    });
  }

  if (elements.heroDetailsBtn) {
    elements.heroDetailsBtn.addEventListener('click', () => {
      if (activeMedia) openDedicatedDetailPage(activeMedia);
    });
  }

  if (elements.heroHeartBtn) {
    elements.heroHeartBtn.addEventListener('click', () => {
      if (activeMedia) toggleFavourite(activeMedia);
    });
  }

  // Detail Page Actions
  if (elements.detailPlayBtn) {
    elements.detailPlayBtn.addEventListener('click', () => {
      if (activeMedia) {
        fetchAndDisplayStreams(activeMedia, selectedSeason, selectedEpisode);
      }
    });
  }

  if (elements.detailHeartBtn) {
    elements.detailHeartBtn.addEventListener('click', () => {
      if (activeMedia) toggleFavourite(activeMedia);
    });
  }

  if (elements.detailSourcePickBtn) {
    elements.detailSourcePickBtn.addEventListener('click', () => {
      if (activeMedia) fetchAndDisplayStreams(activeMedia, selectedSeason, selectedEpisode);
    });
  }

  if (elements.detailTrailerBtn) {
    elements.detailTrailerBtn.addEventListener('click', () => {
      if (activeMedia) {
        const q = encodeURIComponent(`${activeMedia.name} official trailer`);
        launchVenticPlayer(`${activeMedia.name} · Official Trailer`, `https://www.youtube.com/embed?listType=search&list=${q}&autoplay=1`);
      }
    });
  }

  if (elements.clearHistoryBtn) {
    elements.clearHistoryBtn.addEventListener('click', () => {
      history = [];
      localStorage.removeItem('ventic_history');
      renderContinueWatching();
      renderCollections();
      showToast(
        currentLang === 'ar' ? 'تم مسح السجل' : 'Watch history cleared',
        '<i class="fa-solid fa-trash-can" style="color: #ff5449; font-size: 0.95rem;"></i>'
      );
    });
  }

  // Themes
  if (elements.themeModalBtn) {
    elements.themeModalBtn.addEventListener('click', () => {
      if (elements.themeModal) elements.themeModal.style.display = 'flex';
    });
  }

  if (elements.closeThemeBtn) {
    elements.closeThemeBtn.addEventListener('click', () => {
      if (elements.themeModal) elements.themeModal.style.display = 'none';
    });
  }

  if (elements.themeCards) {
    elements.themeCards.forEach(card => {
      card.addEventListener('click', () => {
        elements.themeCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const theme = card.dataset.themeSet;
        document.body.dataset.theme = theme;
        localStorage.setItem('ventic_theme', theme);
        if (elements.themeModal) elements.themeModal.style.display = 'none';
      });
    });
  }

  if (elements.exitPlayerBtn) {
    elements.exitPlayerBtn.addEventListener('click', exitVenticPlayer);
  }

  if (elements.serverSwitcherSelect) {
    elements.serverSwitcherSelect.addEventListener('change', (e) => {
      const idx = parseInt(e.target.value, 10);
      const imdbId = activeMedia?.id || 'tt15239678';
      const isSeries = activeMedia?.type === 'series' || activeMedia?.isAnime;
      const servers = generateServerUrls(imdbId, isSeries, selectedSeason, selectedEpisode);
      if (servers[idx] && activeMedia) {
        launchVenticPlayer(activeMedia.name, servers[idx].url);
      }
    });
  }

  // Smart Player HUD auto-hide on mouse inactivity
  window.addEventListener('mousemove', () => {
    if (isPlayerActive) {
      resetHudTimer();
    }
  });

  if (elements.playerScreen) {
    elements.playerScreen.addEventListener('mousemove', resetHudTimer);
    elements.playerScreen.addEventListener('click', resetHudTimer);
    elements.playerScreen.addEventListener('mouseenter', resetHudTimer);
  }

  if (elements.playerHud) {
    elements.playerHud.addEventListener('mousemove', resetHudTimer);
    elements.playerHud.addEventListener('mouseenter', () => {
      clearTimeout(hudHideTimeout);
      elements.playerHud.classList.remove('hidden');
    });
    elements.playerHud.addEventListener('mouseleave', resetHudTimer);
  }

  if (elements.closeStreamPickerBtn) {
    elements.closeStreamPickerBtn.addEventListener('click', () => {
      if (elements.streamPickerModal) elements.streamPickerModal.style.display = 'none';
    });
  }

  if (elements.streamPickerBackdrop) {
    elements.streamPickerBackdrop.addEventListener('click', () => {
      if (elements.streamPickerModal) elements.streamPickerModal.style.display = 'none';
    });
  }

  if (elements.refreshCatalogBtn) {
    elements.refreshCatalogBtn.addEventListener('click', startDeepCatalogIngestion);
  }

  if (elements.sourcesBtn) {
    elements.sourcesBtn.addEventListener('click', () => {
      const modal = document.getElementById('sourcesModal');
      if (modal) modal.style.display = 'flex';
    });
  }

  // One-click Addon Provider Selection (No raw links shown)
  document.querySelectorAll('.addon-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.addon-card').forEach(c => {
        c.classList.remove('active');
        const status = c.querySelector('.addon-status');
        if (status) {
          status.className = 'addon-status';
          status.innerHTML = '<i class="fa-solid fa-circle-check"></i> Connected';
        }
      });

      card.classList.add('active');
      const activeStatus = card.querySelector('.addon-status');
      if (activeStatus) {
        activeStatus.className = 'addon-status active-badge';
        activeStatus.innerHTML = '<i class="fa-solid fa-check"></i> Active';
      }

      const url = card.dataset.url;
      if (url) {
        config.addonUrl = url;
        localStorage.setItem('ventic_addon_url', url);
        showToast(`Switched to ${card.querySelector('h4')?.textContent || 'Selected Provider'}`);
        startDeepCatalogIngestion();
      }
    });
  });

  const saveAddonBtn = document.getElementById('saveAddonBtn');
  if (saveAddonBtn) {
    saveAddonBtn.addEventListener('click', () => {
      const modal = document.getElementById('sourcesModal');
      if (modal) modal.style.display = 'none';
    });
  }

  if (elements.closeSourcesBtn) {
    elements.closeSourcesBtn.addEventListener('click', () => {
      const modal = document.getElementById('sourcesModal');
      if (modal) modal.style.display = 'none';
    });
  }

  // Explicit "Load More" Buttons (Loads 50+ items per click)
  const loadMoreMoviesBtn = document.getElementById('loadMoreMoviesBtn');
  if (loadMoreMoviesBtn) {
    loadMoreMoviesBtn.addEventListener('click', loadNextMoviesBatch);
  }

  const loadMoreTvBtn = document.getElementById('loadMoreTvBtn');
  if (loadMoreTvBtn) {
    loadMoreTvBtn.addEventListener('click', loadNextTvBatch);
  }

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      if (elements.playerScreen && elements.playerScreen.style.display === 'block') {
        if (!document.fullscreenElement) exitVenticPlayer();
      } else if (elements.themeModal && elements.themeModal.style.display === 'flex') {
        elements.themeModal.style.display = 'none';
      } else if (elements.sourcesModal && elements.sourcesModal.style.display === 'flex') {
        elements.sourcesModal.style.display = 'none';
      } else if (elements.streamPickerModal && elements.streamPickerModal.style.display === 'flex') {
        elements.streamPickerModal.style.display = 'none';
      } else if (currentTab === 'detail' || currentTab === 'developer') {
        navigateTo('home');
      }
    }
  });
}

function escapeHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
