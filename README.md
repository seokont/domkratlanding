# Лендинг CRM для СТО

Одностраничный лендинг облачной CRM/ERP для СТО, шиномонтажей и детейлинга.
Next.js 16 (App Router) + Tailwind CSS 4, статический экспорт, три языка: `/uk/` (основной), `/ru/`, `/en/`.

## Запуск

Нужен Node.js 20+.

```bash
npm install
cp .env.example .env.local   # заполнить при необходимости
npm run dev                  # http://localhost:3000 → редирект на /uk/ | /ru/ | /en/
```

Сборка статики:

```bash
npm run build                # результат в папке out/
npx serve out                # локальный просмотр готовой сборки (с gzip)
```

Папку `out/` можно залить на любой статический хостинг (Nginx, Cloudflare Pages, Netlify, S3 + CloudFront, GitHub Pages).
Включите на хостинге gzip/brotli: без сжатия Lighthouse Performance на мобильном падает примерно с 96 до 70.

## Структура

```
src/
  app/
    (root)/page.tsx          «/» — редирект на язык по navigator.language (meta refresh как fallback)
    [lang]/layout.tsx        <html lang>, шрифт, метаданные, hreflang, OG, аналитика
    [lang]/page.tsx          сборка секций + JSON-LD (SoftwareApplication, FAQPage)
    [lang]/opengraph-image.tsx  OG-картинка 1200×630 для каждого языка
    api/leads/route.dev.ts   заглушка POST /api/leads (только в npm run dev)
    sitemap.ts, robots.ts
    globals.css              дизайн-токены (цвета, тени, шрифт)
  i18n/
    messages/uk.json         ← ВСЕ ТЕКСТЫ СТРАНИЦЫ
    messages/ru.json
    messages/en.json
    config.ts                список языков, загрузка словарей
  components/
    Header.tsx               sticky-шапка, мобильное меню, переключатель языка
    sections/                секции страницы (Top / Middle / Bottom, Pricing, LeadForm)
    mockups/Mockups.tsx      мокапы интерфейса на div/SVG (без скриншотов)
    ui/primitives.tsx        кнопки, контейнеры, рамки браузера и телефона, логотип
    Analytics.tsx            GA4 + Meta Pixel
    CtaTracker.tsx           события кликов по всем CTA
  lib/
    site.ts                  название, контакты, соцсети, URL-ы (берутся из env)
    analytics.ts             track(), чтение UTM-меток
```

## Где править тексты

Все тексты лежат в `src/i18n/messages/{uk,ru,en}.json`, в коде строк нет.
Ключи во всех трёх файлах одинаковые; TypeScript сверяет структуру с `uk.json`, поэтому пропущенный ключ сломает сборку.

| Что | Где |
|---|---|
| Название продукта | `NEXT_PUBLIC_BRAND_NAME` или `src/lib/site.ts` |
| Телефон, email, соцсети | `src/lib/site.ts` |
| Цены тарифов | `pricing.plans[].priceMonthly / priceYearly` в JSON |
| Отзывы | `testimonials.items` в JSON |
| Ссылки «Детальніше» на подстраницы | `audience.items[].href` в JSON |
| Подписи внутри мокапов | раздел `mock` в JSON |
| Цвета, тени, шрифт | `@theme` в `src/app/globals.css` |

**Плейсхолдеры, которые нужно заменить до запуска** (помечены `[PLACEHOLDER]`, `[000 ₴]`, `[N]`):
цены и лимиты тарифов, отзывы, контакты, ссылки на соцсети, политику конфиденциальности и оферту (`#privacy`, `#offer` в футере), логотипы интеграций.

Новый язык: добавьте `messages/xx.json`, затем код языка в `locales` и в словари в `src/i18n/config.ts`.

## Форма заявки

Форма (`src/components/sections/LeadForm.tsx`) отправляет `POST` с JSON:

```json
{
  "name": "Олександр",
  "phone": "+380671234567",
  "posts": "4–6",
  "city": "Київ",
  "intent": "trial | demo | migration | sales",
  "lang": "uk",
  "page": "https://…/uk/?utm_source=…",
  "utm_source": "…", "utm_medium": "…", "utm_campaign": "…", "utm_term": "…", "utm_content": "…"
}
```

- Телефон валидируется по формату `+380XXXXXXXXX`, маска подставляет `+380` автоматически (`067…` → `+380 67 …`).
- `intent` выставляется в зависимости от кнопки, по которой пришёл пользователь («Попробовать», «Демо», «Перенос», тариф «Сеть»).
- UTM-метки берутся из URL и сохраняются в `sessionStorage` на время сессии; в форме они лежат в скрытых полях.
- Если сервер ответил 2xx, форма показывает «Спасибо», иначе выводит ошибку и ссылку на Telegram.

### Как подключить реальный обработчик

Статический экспорт не умеет выполнять POST-обработчики, поэтому `/api/leads` работает только в `npm run dev`: заглушка проверяет телефон и пишет заявку в консоль.
Для продакшена укажите адрес своего обработчика и пересоберите проект:

```bash
NEXT_PUBLIC_LEADS_ENDPOINT=https://api.example.com/leads
```

Подойдут:
- свой бэкенд или CRM;
- serverless-функция (Cloudflare Workers / Pages Functions, Netlify Functions, Vercel Functions), которая пересылает заявку в Telegram-бот, Google Sheets или CRM;
- вебхук сервиса автоматизации (n8n, Make, Zapier).

Если обработчик на другом домене, он должен разрешать CORS для домена лендинга (`Access-Control-Allow-Origin`, метод `POST`, заголовок `Content-Type`).

## Аналитика

GA4 и Meta Pixel подключаются только когда заданы переменные окружения (значения подставляются при сборке):

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=000000000000000
```

События:
- `cta_click` — клик по любому элементу с атрибутом `data-cta`. Параметры: `cta` (id кнопки), `location` (секция), `intent`, `lang`. В Meta Pixel уходит как `trackCustom`.
- `generate_lead` — успешная отправка формы. В Meta Pixel уходит как стандартное событие `Lead`.

Чтобы отслеживать новую кнопку, добавьте ей `data-cta="id"` и `data-cta-location="секция"` или используйте компонент `CtaLink`.
В режиме разработки события выводятся в консоль браузера (`[analytics] …`).

## SEO

- Уникальные `title` и `description` для каждого языка (`meta` в JSON).
- `hreflang` для uk-UA / ru-UA / en + `x-default`, canonical, Open Graph, Twitter Card.
- Генерируемая OG-картинка для каждого языка.
- JSON-LD: `SoftwareApplication` и `FAQPage` (вопросы из `faq.items`).
- `sitemap.xml` и `robots.txt` (адрес сайта берётся из `NEXT_PUBLIC_SITE_URL`).

OG-картинка лежит по адресу `/{lang}/opengraph-image` без расширения. Если хостинг отдаёт её как `application/octet-stream`, настройте для этого пути `Content-Type: image/png`.

## Производительность

Замеры Lighthouse 12 на собранной статике с gzip:

| Профиль | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Мобильный (uk / ru / en) | 96–97 | 100 | 100 | 100 |
| Десктоп | 100 | 100 | 100 | 100 |

Что для этого сделано:
- одна вариативная гарнитура Manrope (latin + cyrillic) вместо двух — меньше байт до LCP;
- мокапы на HTML/SVG, растровых картинок нет;
- секции ниже первого экрана отрисовываются лениво (`content-visibility: auto`, класс `.cv-auto`);
- клиентский JS только у интерактивных частей: шапки, переключателя цен, формы и трекера CTA. FAQ сделан на нативном `<details>`.

Если появятся реальные изображения, кладите их в формате WebP/AVIF с явными `width`/`height` и `loading="lazy"` для всего, что ниже первого экрана.

## Дизайн-система

Стиль подобран через скил ui-ux-pro-max: «Soft UI Evolution» для B2B SaaS.
- Цвета: тёмно-синий `#0F172A` (ink), синий CTA `#0369A1` (brand), янтарный акцент `#F59E0B`.
- Мягкие тени, скругления 12–20 px, контраст текста не ниже WCAG AA.
- Шрифт Manrope с поддержкой кириллицы.
- Учтены `prefers-reduced-motion`, видимый фокус, skip-link, touch-цели от 44 px.
#   d o m k r a t l a n d i n g  
 