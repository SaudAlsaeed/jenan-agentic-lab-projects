import type { Locale, PortfolioCategory, ServiceType } from '@/config/site';
import { SITE } from '@/config/site';

export type Messages = {
  skipToContent: string;
  brand: string;
  seoTitle: string;
  seoDescription: string;
  nav: {
    home: string;
    portfolio: string;
    services: string;
    packages: string;
    how: string;
    contact: string;
    book: string;
    openMenu: string;
    closeMenu: string;
    langToggle: string;
  };
  hero: {
    headline: string;
    support: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  trust: {
    title: string;
    items: { title: string; body: string }[];
  };
  portfolio: {
    title: string;
    intro: string;
    tabs: Record<PortfolioCategory, string>;
    empty: string;
    openImage: string;
    closeLightbox: string;
    prev: string;
    next: string;
  };
  services: {
    title: string;
    inquire: string;
    items: { id: ServiceType | 'extra'; title: string; body: string }[];
  };
  packages: {
    title: string;
    cta: string;
    disclaimer: string;
    items: {
      id: string;
      name: string;
      price: string;
      includes: string[];
      servicePrefill: ServiceType;
    }[];
  };
  how: {
    title: string;
    steps: { title: string; body: string }[];
  };
  contact: {
    title: string;
    intro: string;
    fields: {
      name: string;
      phone: string;
      email: string;
      service: string;
      date: string;
      time: string;
      city: string;
      details: string;
    };
    serviceOptions: Record<ServiceType, string>;
    selectService: string;
    submit: string;
    submitting: string;
    required: string;
    phoneInvalid: string;
    success: string;
    error: string;
    successTitle: string;
  };
  stickyCta: string;
  whatsappLabel: string;
  footer: {
    rights: string;
    city: string;
    contact: string;
    socials: string;
  };
};

const ar: Messages = {
  skipToContent: 'تخطي إلى المحتوى',
  brand: SITE.nameAr,
  seoTitle: `${SITE.nameAr} | تصوير فوتوغرافي وفيديو احترافي في ${SITE.cityAr}`,
  seoDescription: `تصوير فوتوغرافي وفيديو احترافي للمناسبات والأعراس والبورتريه في ${SITE.cityAr}. احجز جلستك مع ${SITE.nameAr}.`,
  nav: {
    home: 'الرئيسية',
    portfolio: 'الأعمال',
    services: 'الخدمات',
    packages: 'الباقات',
    how: 'كيف نعمل',
    contact: 'تواصل معنا',
    book: 'احجز الآن',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    langToggle: 'English',
  },
  hero: {
    headline: 'نصنع من لحظاتك صورًا لا تُنسى',
    support:
      'تصوير فوتوغرافي وفيديو احترافي للمناسبات والأعراس والبورتريه في الرياض — بجودة عالية وتجربة سلسة من أول تواصل حتى التسليم.',
    ctaPrimary: 'احجز موعدك',
    ctaSecondary: 'شاهد الأعمال',
  },
  trust: {
    title: 'لماذا تختارنا',
    items: [
      {
        title: 'جودة احترافية',
        body: 'معدات تصوير وإضاءة عالية الجودة، مع معالجة دقيقة للصور قبل التسليم.',
      },
      {
        title: 'تجربة سهلة',
        body: 'نهتم بالتفاصيل من لحظة الحجز وحتى استلام الملفات النهائية.',
      },
      {
        title: 'تسليم منظم',
        body: 'استلام الصور والفيديوهات عبر رابط خاص، بطريقة سهلة وآمنة.',
      },
    ],
  },
  portfolio: {
    title: 'من أعمالنا',
    intro:
      'مجموعة مختارة من جلسات ومناسبات تم توثيقها بعناية، بأسلوب يحافظ على جمال اللحظة وتفاصيلها.',
    tabs: {
      events: 'مناسبات',
      portrait: 'بورتريه',
      products: 'منتجات',
      video: 'فيديو',
    },
    empty: 'لا توجد صور في هذا التصنيف بعد.',
    openImage: 'عرض الصورة',
    closeLightbox: 'إغلاق',
    prev: 'السابق',
    next: 'التالي',
  },
  services: {
    title: 'خدماتنا',
    inquire: 'استفسر',
    items: [
      {
        id: 'events',
        title: 'تصوير المناسبات والأعراس',
        body: 'توثيق احترافي للحفلات والأعراس والمناسبات العائلية مع اهتمام بالتفاصيل واللحظات العفوية.',
      },
      {
        id: 'video',
        title: 'تصوير الفيديو',
        body: 'فيديوهات قصيرة أو تغطيات كاملة للمناسبات بأسلوب سينمائي واضح وجذاب.',
      },
      {
        id: 'portrait',
        title: 'جلسات البورتريه',
        body: 'جلسات شخصية أو عائلية بإضاءة وتوجيه احترافي لإظهار أفضل صورة ممكنة.',
      },
      {
        id: 'products',
        title: 'تصوير المنتجات والعلامات',
        body: 'صور احترافية للمتاجر والمنتجات والحملات التسويقية لعرض علامتك بصورة أقوى.',
      },
      {
        id: 'extra',
        title: 'خدمات إضافية',
        body: 'مونتاج، ريلز قصيرة، ألبومات مطبوعة، جلسات خارجية، أو تسليم سريع حسب الطلب.',
      },
    ],
  },
  packages: {
    title: 'الباقات',
    cta: 'اطلب عرض سعر',
    disclaimer:
      'تختلف الأسعار حسب المدة والموقع وعدد المخرجات — الأسعار قابلة للتعديل.',
    items: [
      {
        id: 'event',
        name: 'باقة المناسبة',
        price: 'يبدأ من ٢,٥٠٠ ريال',
        includes: [
          'تغطية تصوير للمناسبة',
          'صور معالجة باحترافية',
          'لقطات تفصيلية ولحظات عفوية',
          'تسليم منظم عبر رابط خاص',
        ],
        servicePrefill: 'events',
      },
      {
        id: 'video',
        name: 'باقة الفيديو',
        price: 'يبدأ من ١,٥٠٠ ريال',
        includes: [
          'تغطية فيديو قصيرة أو كاملة',
          'مونتاج أساسي',
          'أسلوب سينمائي',
          'تسليم عبر رابط خاص',
        ],
        servicePrefill: 'video',
      },
      {
        id: 'portrait',
        name: 'باقة البورتريه',
        price: 'يبدأ من ٨٠٠ ريال',
        includes: [
          'جلسة شخصية أو عائلية',
          'عدد محدد من الصور المعالجة',
          'توجيه وإضاءة احترافية',
          'تسليم عبر رابط خاص',
        ],
        servicePrefill: 'portrait',
      },
      {
        id: 'quick',
        name: 'باقة الجلسة السريعة',
        price: 'يبدأ من ٥٠٠ ريال',
        includes: [
          'مدة تصوير قصيرة',
          'عدد محدد من الصور المعالجة',
          'تسليم عبر رابط خاص',
          'خيار إضافة فيديو قصير',
        ],
        servicePrefill: 'portrait',
      },
    ],
  },
  how: {
    title: 'كيف نعمل؟',
    steps: [
      {
        title: 'أرسل طلبك',
        body: 'املأ النموذج وحدد نوع التصوير والتاريخ المتوقع.',
      },
      {
        title: 'نراجع التفاصيل',
        body: 'نتواصل معك لتأكيد المتطلبات والموقع والمدة المناسبة.',
      },
      {
        title: 'يتم التصوير',
        body: 'نجهز المعدات والخطة المناسبة لتوثيق العمل بأفضل جودة.',
      },
      {
        title: 'تستلم الملفات',
        body: 'يتم تسليم الصور أو الفيديوهات عبر رابط خاص بعد المعالجة.',
      },
    ],
  },
  contact: {
    title: 'احجز أو استفسر الآن',
    intro: 'املأ النموذج وسنرد عليك في أقرب وقت.',
    fields: {
      name: 'الاسم الكامل',
      phone: 'رقم الجوال',
      email: 'البريد الإلكتروني',
      service: 'نوع الخدمة',
      date: 'تاريخ التصوير المتوقع',
      time: 'الوقت المفضل',
      city: 'المدينة / الموقع',
      details: 'تفاصيل إضافية',
    },
    serviceOptions: {
      events: 'تصوير مناسبة / عرس',
      portrait: 'جلسة بورتريه',
      products: 'تصوير منتجات / أعمال',
      video: 'تصوير فيديو',
      other: 'أخرى',
    },
    selectService: 'اختر نوع الخدمة',
    submit: 'إرسال الطلب',
    submitting: 'جاري الإرسال…',
    required: 'هذا الحقل مطلوب',
    phoneInvalid: 'أدخل رقم جوال صحيح',
    success: 'تم استلام طلبك بنجاح، وسنتواصل معك قريبًا.',
    error:
      'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.',
    successTitle: 'شكرًا لك',
  },
  stickyCta: 'احجز الآن',
  whatsappLabel: 'تواصل عبر واتساب',
  footer: {
    rights: `© ${new Date().getFullYear()} ${SITE.nameAr}`,
    city: SITE.cityAr,
    contact: 'تواصل',
    socials: 'وسائل التواصل',
  },
};

const en: Messages = {
  skipToContent: 'Skip to content',
  brand: SITE.nameEn,
  seoTitle: `${SITE.nameEn} | Professional Photography & Video in ${SITE.cityEn}`,
  seoDescription: `Professional photography and video for weddings, events, and portraits in ${SITE.cityEn}. Book with ${SITE.nameEn}.`,
  nav: {
    home: 'Home',
    portfolio: 'Work',
    services: 'Services',
    packages: 'Packages',
    how: 'How it works',
    contact: 'Contact',
    book: 'Book now',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    langToggle: 'العربية',
  },
  hero: {
    headline: 'We turn your moments into unforgettable images',
    support:
      'Professional photography and video for weddings, events, and portraits in Riyadh — refined quality from first contact to final delivery.',
    ctaPrimary: 'Book a session',
    ctaSecondary: 'View work',
  },
  trust: {
    title: 'Why choose us',
    items: [
      {
        title: 'Professional quality',
        body: 'High-end cameras and lighting, with careful retouching before delivery.',
      },
      {
        title: 'Effortless experience',
        body: 'We mind the details from booking through to your final files.',
      },
      {
        title: 'Organized delivery',
        body: 'Photos and videos arrive via a private link — simple and secure.',
      },
    ],
  },
  portfolio: {
    title: 'Selected work',
    intro:
      'A curated set of sessions and events documented with care for beauty and detail.',
    tabs: {
      events: 'Events',
      portrait: 'Portrait',
      products: 'Products',
      video: 'Video',
    },
    empty: 'No images in this category yet.',
    openImage: 'View image',
    closeLightbox: 'Close',
    prev: 'Previous',
    next: 'Next',
  },
  services: {
    title: 'Services',
    inquire: 'Inquire',
    items: [
      {
        id: 'events',
        title: 'Weddings & events',
        body: 'Professional coverage for weddings, family occasions, and private events with an eye for candid moments.',
      },
      {
        id: 'video',
        title: 'Video',
        body: 'Short films or full event coverage with a clear cinematic style.',
      },
      {
        id: 'portrait',
        title: 'Portrait sessions',
        body: 'Personal or family sessions with professional lighting and direction.',
      },
      {
        id: 'products',
        title: 'Product & brand',
        body: 'Clean product and campaign imagery for stores, restaurants, and marketing.',
      },
      {
        id: 'extra',
        title: 'Add-ons',
        body: 'Editing, short reels, printed albums, outdoor sessions, or rush delivery on request.',
      },
    ],
  },
  packages: {
    title: 'Packages',
    cta: 'Request a quote',
    disclaimer:
      'Pricing varies by duration, location, and deliverables — figures are editable placeholders.',
    items: [
      {
        id: 'event',
        name: 'Event / Wedding Package',
        price: 'From SAR 2,500',
        includes: [
          'Event photography coverage',
          'Professionally edited images',
          'Detail and candid shots',
          'Private-link delivery',
        ],
        servicePrefill: 'events',
      },
      {
        id: 'video',
        name: 'Video Package',
        price: 'From SAR 1,500',
        includes: [
          'Short or full video coverage',
          'Basic edit',
          'Cinematic style',
          'Private-link delivery',
        ],
        servicePrefill: 'video',
      },
      {
        id: 'portrait',
        name: 'Portrait Session',
        price: 'From SAR 800',
        includes: [
          'Personal or family session',
          'Set number of edited images',
          'Professional lighting & direction',
          'Private-link delivery',
        ],
        servicePrefill: 'portrait',
      },
      {
        id: 'quick',
        name: 'Quick Session',
        price: 'From SAR 500',
        includes: [
          'Short shoot duration',
          'Set number of edited images',
          'Private-link delivery',
          'Optional short video add-on',
        ],
        servicePrefill: 'portrait',
      },
    ],
  },
  how: {
    title: 'How it works',
    steps: [
      {
        title: 'Send your request',
        body: 'Fill the form with service type and preferred date.',
      },
      {
        title: 'We review details',
        body: 'We follow up to confirm requirements, location, and timing.',
      },
      {
        title: 'We shoot',
        body: 'We bring the right gear and plan for the best coverage.',
      },
      {
        title: 'You receive files',
        body: 'Photos or video arrive via a private link after editing.',
      },
    ],
  },
  contact: {
    title: 'Book or inquire',
    intro: 'Fill the form and we will get back to you soon.',
    fields: {
      name: 'Full name',
      phone: 'Phone number',
      email: 'Email',
      service: 'Service type',
      date: 'Preferred shoot date',
      time: 'Preferred time',
      city: 'City / location',
      details: 'Additional details',
    },
    serviceOptions: {
      events: 'Wedding / event',
      portrait: 'Portrait session',
      products: 'Product / commercial',
      video: 'Video',
      other: 'Other',
    },
    selectService: 'Select a service',
    submit: 'Submit request',
    submitting: 'Sending…',
    required: 'This field is required',
    phoneInvalid: 'Enter a valid phone number',
    success: 'Your request was received successfully. We will contact you soon.',
    error:
      'Something went wrong while sending. Please try again or contact us directly.',
    successTitle: 'Thank you',
  },
  stickyCta: 'Book now',
  whatsappLabel: 'Chat on WhatsApp',
  footer: {
    rights: `© ${new Date().getFullYear()} ${SITE.nameEn}`,
    city: SITE.cityEn,
    contact: 'Contact',
    socials: 'Social',
  },
};

export const messages: Record<Locale, Messages> = { ar, en };
