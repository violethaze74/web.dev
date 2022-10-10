---
layout: post
title: Отложенная загрузка изображений для веб-сайтов на уровне браузера
subhead: Наконец-то появилась встроенная отложенная загрузка!
authors:
  - houssein
  - addyosmani
  - mathiasbynens
date: 2019-08-06
updated: 2020-07-16
hero: image/admin/F6VE4QkpCsomiJilTFNG.png
alt: Схематическое изображение телефона, на котором идет загрузка рисунка и ресурсов
description: В этой статье рассказывается об атрибуте загрузки и о том, как его можно использовать, чтобы управлять загрузкой изображений.
tags:
  - blog
  - performance
feedback:
  - api
---

Наконец-то появилась поддержка отложенной загрузки изображений для веб-сайтов на уровне браузера! В этом видео показана [демонстрация](https://mathiasbynens.be/demo/img-loading-lazy) функции:

<figure data-size="full">
  <video controls autoplay loop muted>
    <source src="https://storage.googleapis.com/web-dev-assets/native-lazy-loading/lazyload.webm" type="video/webm">
    <source src="https://storage.googleapis.com/web-dev-assets/native-lazy-loading/lazyload.mp4" type="video/mp4">
  </source></source></video></figure>

Начиная с Chrome 76, можно использовать атрибут `loading` для отложенной загрузки изображений без необходимости писать собственный код отложенной загрузки или использовать отдельную библиотеку JavaScript. Давайте разберем подробнее.

## Совместимость с браузером

`<img loading=lazy>` поддерживается большинством популярных браузеров на базе Chromium (Chrome, Edge, Opera) и [Firefox](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/75#HTML). Реализация для WebKit (Safari) [находится на стадии разработки](https://bugs.webkit.org/show_bug.cgi?id=200764). На сайте [caniuse.com](https://caniuse.com/#feat=loading-lazy-attr) есть подробная информация о кросс-браузерной поддержке. Браузеры, не поддерживающие атрибут `loading`, просто игнорируют его без каких-либо побочных эффектов.

## Зачем нужна отложенная загрузка на уровне браузера?

По данным [Интернет-архива](https://httparchive.org/reports/page-weight), изображения являются наиболее востребованным типом ресурсов для большинства веб-сайтов и обычно занимают большую часть полосы пропускания. В 90-м процентиле сайты отправляют около 4,7 МБ изображений на настольные и мобильные устройства. Это очень много [картинок с котиками](https://en.wikipedia.org/wiki/Cats_and_the_Internet).

В настоящее время есть два способа отложить загрузку скрытых изображений:

- использование [API Intersection Observer](https://developer.chrome.com/blog/intersectionobserver/);
- использование [обработчиков событий](https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/#using_event_handlers_the_most_compatible_way) `scroll`, `resize` или `orientationchange`.

Любой из этих вариантов позволяет разработчикам добавить функциональность отложенной загрузки. Кроме того, многие разработчики создали сторонние библиотеки, предоставляющие слои абстракций, которые еще проще использовать. Однако если отложенная загрузка поддерживается непосредственно браузером, то необходимость во внешней библиотеке отпадает. Отложенная загрузка изображений на уровне браузера гарантирует, что эта функция будет работать, даже если JavaScript отключен на клиенте.

## Атрибут `loading`

Chrome уже умеет загружать изображения с разными приоритетами в зависимости от их расположения относительно области просмотра устройства. Изображения, расположенные ниже области просмотра, имеют более низкий приоритет загрузки, но всё равно загружаются как можно быстрее.

В Chrome 76+ можно использовать атрибут `loading` чтобы полностью отложить загрузку скрытых изображений, которые можно получить с помощью прокрутки:

```html
<img src="image.png" loading="lazy" alt="…" width="200" height="200">
```

Атрибут `loading` поддерживает следующие значения:

- `auto`: поведение браузера при отложенной загрузке по умолчанию, равносильно отсутствию атрибута;
- `lazy`: загрузку ресурса отлаживается до тех пор, пока он не достигнет [расчетного расстояния](#distance-from-viewport-thresholds) от области просмотра;
- `eager` : ресурс загружается немедленно, независимо от его расположения на странице.

{% Aside 'caution' %} Хотя значение `auto` доступно в Chromium, оно не упоминается в [спецификации](https://html.spec.whatwg.org/multipage/urls-and-fetching.html#lazy-loading-attributes) и может быть изменено. Мы рекомендуем не использовать его, пока оно не будет включено в спецификацию.{% endAside %}

### Пороговые значения расстояния от области просмотра

Все изображения, которые находятся в верхней части страницы, то есть доступны для немедленного просмотра без прокрутки, загружаются в обычном режиме. Изображения ниже области просмотра устройства подгружаются только тогда, когда пользователь прокручивает страницу почти до них.

Реализация механизма отложенной загрузки в Chromium направлена на то, чтобы скрытые изображения загружались  до того, как пользователь докрутит страницу до них. Подгружая соседние изображения заранее, мы увеличиваем вероятность того, что они уже будут загружены до момента попадания в область просмотра.

Пороговые значения в Chromium заданы более строго, чем в JavaScript-библиотеках  для отложенной загрузки изображений, чтобы соответствовать ожиданиям разработчиков.

{% Aside %} Эксперименты, проведенные с использованием Chrome на Android, показали, что в сетях 4G 97,5% незагруженных изображений, расположенных под областью просмотра, были полностью загружены в течение 10 мс после попадания в область просмотра. Даже в медленных сетях 2G 92,6% изображений, расположенных под областью просмотра, были полностью загружены в течение 10 мс. Это означает, что отложенная загрузка на уровне браузера обеспечивает стабильную видимость элементов, которые попадают в область просмотра в результате прокрутки страницы. {% endAside %}

Пороговое значение расстояния не является фиксированным и зависит от ряда факторов:

- тип получаемого ресурса изображения;
- использование [упрощенного режима](https://blog.chromium.org/2019/04/data-saver-is-now-lite-mode.html) в Chrome для Android;
- [эффективный тип подключения](https://googlechrome.github.io/samples/network-information/).

Значения по умолчанию для различных типов эффективных соединений можно найти в [исходном коде Chromium](https://cs.chromium.org/chromium/src/third_party/blink/renderer/core/frame/settings.json5?l=971-1003&rcl=e8f3cf0bbe085fee0d1b468e84395aad3ebb2cad). Эти цифры и даже подход, при котором выборка выполняется только при достижении определенного расстояния от области просмотра, могут измениться в ближайшем будущем, поскольку команда Chrome совершенствует эвристику для определения момента начала загрузки.

{% Aside %} В Chrome 77+ вы можете поэкспериментировать с различными пороговыми значениями, [изменяя тип сети](https://developer.chrome.com/docs/devtools/network/#throttle) в DevTools. Переопределите также эффективный тип подключения браузера с помощью флага `about://flags/#force-effective-connection-type`. {% endAside %}

## Улучшенная экономия данных и пороговые значения расстояния от области просмотра

По состоянию на июль 2020 года Chrome внес значительные улучшения в выравнивание пороговых значений расстояния до области просмотра при отложенной загрузке изображений, чтобы больше соответствовать ожиданиям разработчиков.

При быстром подключении (например, 4G) мы уменьшили пороговое значение расстояния от области просмотра с `3000 пикселей` до `1250 пикселей`, а при более медленном подключении (например, 3G) изменили пороговое значение с `4000 пикселей` до `2500 пикселей`. Эти изменения позволяют добиться следующих двух улучшений:

- `<img loading=lazy>` больше соответствует тому, что предлагают библиотеки отложенной загрузки JavaScript;
- новые пороговые значения расстояния от области просмотра по-прежнему обеспечивают загрузку изображений к тому моменту, когда они попадают в область просмотра в результате прокрутки.

Ниже приведено сравнение между старыми и новыми пороговыми значениями расстояния от области просмотра для одной из наших демонстраций при быстром соединении (4G):

Сравнение старых и новых пороговых значений:

<figure>{% Img src="image/admin/xSZMqpbioBRwRTnenK8f.png", alt="Новые улучшенные пороговые значения для отложенной загрузки изображений; пороговое расстояние от области просмотра для быстрых подключений снижено с 3000 пикселей до 1250 пикселей", width="800", height="460" %}</figure>

Сравнение новых пороговых значений с LazySizes (популярной JavaScript-библиотекой для отложенной загрузки):

<figure>{% Img src="image/admin/oHMFvflk9aesT7r0iJbx.png", alt="Загрузка изображений с новыми пороговыми значениями расстояния от области просмотра в Chrome занимает 90 КБ против 70 КБ с библиотекой  LazySizes  при одинаковых сетевых условиях", width="800", height="355" %}</figure>

{% Aside %} Чтобы пользователи последних версий Chrome также получили преимущества от новых пороговых значений, мы бэкпортировали эти изменения для версий Chrome с 79 по  85 включительно. Учитывайте это, если решите сравнить экономию данных в старых и новых версиях Chrome. {% endAside %}

Мы сотрудничаем с сообществом веб-стандартов, чтобы лучше согласовать подходы к пороговым значениям расстояния от области просмотра в разных браузерах.

### Изображения должны включать атрибуты размеров

Когда браузер загружает изображение, он не сразу узнает его размеры, если они не указаны явно. Чтобы браузер мог зарезервировать достаточно места на странице для изображений, рекомендуется, чтобы все теги `<img>` включали атрибуты `width` и `height`. Без указания размеров могут произойти [смещения макета](/cls), более заметные на страницах, которые загружаются дольше.

```html
<img src="image.png" loading="lazy" alt="…" width="200" height="200">
```

В качестве альтернативы укажите значения размеров непосредственно во встроенном стиле:

```html
<img src="image.png" loading="lazy" alt="…" style="height:200px; width:200px;">
```

Метод установки размеров применяется к тегам `<img>` независимо от того, используется ли отложенная загрузка, но в этом случае полезность данного метода возрастает. Установка `width` и `height` также позволяет современным браузерам определять внутренний размер изображений.

В большинстве сценариев отложенная загрузка изображений применяется, даже если размеры изображений не указаны, но есть несколько нестандартных ситуаций, о которых следует знать. Без задания `width` и `height` размеры изображения сначала равны 0×0 пикселей. Если у вас есть галерея таких изображений, браузер может решить, что все они изначально помещаются в область просмотра, так как практически не занимают места и не вытесняются за пределы экрана. В этом случае браузер определяет, что все они видны пользователю, и решает загрузить эти изображения.

Кроме того, [задание размеров изображения снижает вероятность смещения макета](https://www.youtube.com/watch?v=4-d_SoCHeWE). Если у вас нет возможности указать размеры изображений, их отложенная загрузка может стать компромиссом между экономией сетевых ресурсов и потенциально большим риском смещения макета.

Хотя отложенная загрузка в Chromium реализована таким образом, что изображения, вероятно, будут загружены, как только они станут видимыми, всё же существует небольшая вероятность того, что этого не произойдет. В этом случае отсутствие `width` и `height` на таких изображениях увеличивает их влияние на совокупное смещение макета.

{% Aside %} Посмотрите эту [демонстрацию](https://mathiasbynens.be/demo/img-loading-lazy), чтобы увидеть, как атрибут `loading` работает со 100 изображениями. {% endAside %}

Для изображений, определенных с помощью `<picture>`, также можно применять отложенную загрузку:

```html
<picture>
  <source media="(min-width: 800px)" srcset="large.jpg 1x, larger.jpg 2x">
  <img src="photo.jpg" loading="lazy">
</picture>
```

Хотя браузер решает, какое изображение загружать из любого из элементов `<source>`, атрибут `loading` должен быть включен только в резервный элемент `<img>`.

## Избегайте отложенной загрузки изображений, которые находятся в первой видимой области просмотра

Вам следует избегать установки `loading=lazy` для любых изображений, которые находятся в первой видимой области просмотра.

Рекомендуется добавлять `loading=lazy` только к изображениям, расположенным под областью просмотра, если это возможно. При безотложной загрузке изображения могут быть получены сразу, в то время как при отложенной загрузке браузеру необходимо узнать, где именно на странице расположено изображение, что зависит от наличия IntersectionObserver.

{% Aside %} В Chromium влияние изображений в начальной области просмотра с атрибутом `loading=lazy` на метрику LCP (Скорость загрузки основного контента) довольно мало, с регрессией &lt;1% на 75-м и 99-м процентилях по сравнению с изображениями с безотложной загрузкой. {% endAside %}

Как правило, любые изображения в области просмотра должны загружаться безотлагательно, используя настройки браузера по умолчанию. Вам не нужно указывать `loading=eager` для изображений из области просмотра.

```html
<!-- visible in the viewport -->
<img src="product-1.jpg" alt="..." width="200" height="200">
<img src="product-2.jpg" alt="..." width="200" height="200">
<img src="product-3.jpg" alt="..." width="200" height="200">

<!-- offscreen images -->
<img src="product-4.jpg" loading="lazy" alt="..." width="200" height="200">
<img src="product-5.jpg" loading="lazy" alt="..." width="200" height="200">
<img src="product-6.jpg" loading="lazy" alt="..." width="200" height="200">
```

## Отказоустойчивость

Браузеры без поддержки атрибута `loading` будут игнорировать его наличие. Хотя эти браузеры не получат преимуществ отложенной загрузки, включение атрибута не окажет на них негативного влияния.

## Часто задаваемые вопросы

### Планируется ли автоматическая отложенная загрузка изображений в Chrome?

Если в Chrome для Android включен [упрощенный режим](https://blog.chromium.org/2019/04/data-saver-is-now-lite-mode.html), то Chromium уже автоматически выполняет отложенную загрузку любых изображений, подпадающих под эту категорию. Это в первую очередь предназначено для пользователей, которые заботятся об экономии данных.

### Можно ли изменить расстояния до изображения, при которых запускается загрузка?

Эти значения жестко запрограммированы и не могут быть изменены через API. Однако они могут измениться в будущем, поскольку браузеры экспериментируют с разными пороговыми расстояниями и переменными.

### Можно ли атрибут `loading` использовать для изображений, заданных через CSS-свойство background?

Нет, в настоящее время его можно использовать только с тегами `<img>`.

### Есть ли негативные аспекты отложенной загрузки изображений, которые находятся в пределах области просмотра устройства?

Безопаснее избегать добавления `loading=lazy` в верхней части страницы, поскольку сканер предварительной загрузки в Chrome не будет предварительно загружать изображения с `loading=lazy`.

### Как атрибут `loading` работает с изображениями, которые находятся в области просмотра, но не видны сразу (например, находятся за каруселью или скрыты для определенных размеров экрана с помощью CSS)?

В отложенном режиме загружаются только изображения, которые находятся на [определенном расстоянии](#distance-from-viewport-thresholds) от нижней границы области просмотра устройства. Все изображения над областью просмотра, независимо от того, видны ли они в данный момент, загружаются в обычном режиме.

### Что делать, если я уже использую стороннюю библиотеку или скрипт для отложенной загрузки изображений?

Атрибут `loading` не должен влиять на код, который в отложенном режиме загружает данные, но важно учитывать некоторые важные моменты:

1. Если сторонний загрузчик пытается загрузить изображения или фреймы раньше, чем их будет загружать Chrome в обычном режиме, то есть, на расстоянии, превышающем [пороговые значения расстояния от области просмотра](#distance-from-viewport-thresholds), их загрузка всё равно будет отсрочена и они загрузятся согласно стандартным правилам браузера.
2. Если сторонний загрузчик использует меньшее расстояние для определения времени загрузки определенного изображения, чем браузер, то браузер будет загружать изображения в отложенном режиме согласно настройкам загрузчика.

Одна из важных причин продолжить использовать стороннюю библиотеку параллельно с `loading="lazy"`заключается в предоставлении полизаполнения для браузеров, не поддерживающих данный атрибут.

### Как работать с браузерами, которые еще не поддерживают отложенную загрузку?

Создайте полизаполнение или используйте стороннюю библиотеку для отложенной загрузки изображений на сайт. Свойство `loading` можно использовать, чтобы определить, поддерживается ли эта функция в браузере:

```js
if ('loading' in HTMLImageElement.prototype) {
  // supported in browser
} else {
  // fetch polyfill/third-party library
}
```

Например, [lazysizes](https://github.com/aFarkas/lazysizes) — это популярная JavaScript-библиотека отложенной загрузки. Вы можете определить поддержку атрибута `loading`, чтобы загружать lazysizes в качестве резервной библиотеки только тогда, когда `loading` не поддерживается. Это работает следующим образом:

- Замените `<img src>` на `<img data-src>`, чтобы избежать безотложной загрузки в неподдерживаемых браузерах. Если `loading` поддерживается, замените `data-src` на `src`.
- Если `loading` не поддерживается, загрузите запасной вариант (lazysizes) и инициируйте его. Согласно документации по lazysizes, класс `lazyload` используется как способ указать lazysizes, какие изображения требуют отложенной загрузки.

```html
<!-- Let's load this in-viewport image normally -->
<img src="hero.jpg" alt="…">

<!-- Let's lazy-load the rest of these images -->
<img data-src="unicorn.jpg" alt="…" loading="lazy" class="lazyload">
<img data-src="cats.jpg" alt="…" loading="lazy" class="lazyload">
<img data-src="dogs.jpg" alt="…" loading="lazy" class="lazyload">

<script>
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Dynamically import the LazySizes library
    const script = document.createElement('script');
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.1.2/lazysizes.min.js';
    document.body.appendChild(script);
  }
</script>
```

Вот [демонстрация](https://lazy-loading.firebaseapp.com/lazy_loading_lib.html) этого паттерна. Запустите его в Firefox или Safari, чтобы увидеть резервный вариант в действии.

{% Aside %} Библиотека lazysizes также предоставляет [плагин загрузки](https://github.com/aFarkas/lazysizes/tree/gh-pages/plugins/native-loading), который использует отложенную загрузку на уровне браузера, когда она доступна, но при необходимости задействует функционал библиотеки. {% endAside %}

### Поддерживается ли отложенная загрузка для тега iframe в Chrome?

Значение `<iframe loading=lazy>` недавно стандартизировано и уже реализовано в Chromium. Это позволяет настроить отложенную загрузку iframe с помощью атрибута `loading`. Отдельная статья об отложенной загрузке iframe будет вскоре опубликована на web.dev.

Атрибут `loading` работает для встроенных фреймов иначе, чем для изображений, так как в учет берется то, является ли iframe скрытым. (Скрытые iframe часто используются для аналитических или коммуникационных целей.) Chrome использует следующие критерии для определения того, является ли iframe скрытым:

- ширина и высота iframe не более 4 пикселей;
- применяются `display: none` или `visibility: hidden`;
- iframe помещается за пределы экрана с использованием отрицательного позиционирования по оси X или Y.

Если iframe соответствует любому из этих условий, Chrome считает его скрытым и в большинстве случаев не загружает его в отложенном режиме. *Не* скрытые iframe загружаются только тогда, когда они находятся в пределах [порогового расстояния от области просмотра](#distance-from-viewport-thresholds). Для встроенных фреймов, которые всё еще загружаются в режиме отложенной загрузки, отображается плейсхолдер.

### Как отложенная загрузка на уровне браузера влияет на рекламу на веб-странице?

Вся реклама, представленная в виде изображений или встроенных фреймов, также загружается в отложенном режиме.

### Как обрабатываются изображения при печати веб-страницы?

Существует [нерешенная проблема](https://bugs.chromium.org/p/chromium/issues/detail?id=875403), связанная с тем, что при печати страницы Chrome должен незамедлительно загрузить все изображения и встроенные фреймы.

### Распознает ли Lighthouse отложенную загрузку на уровне браузера?

В более ранних версиях Lighthouse по-прежнему подчеркивалось, что для страниц, использующих `loading=lazy` для изображений, требуется стратегия загрузки закадровых изображений. [Lighthouse 6.0](/lighthouse-whats-new-6.0/) и более новые версии лучше учитывают подходы к отложенной загрузке закадровых изображений, которые могут использовать разные пороговые значения, что позволяет пройти проверку [Defer offscreen images (Отложите загрузку закадровых изображений)](/offscreen-images/).

## Заключение

Включение поддержки отложенной загрузки изображений может значительно облегчить задачу повышения производительности веб-страниц.

Заметили необычное поведение при включении этой функции в Chrome? [Сообщите об ошибке](https://bugs.chromium.org/p/chromium/issues/entry?summary=%5BLazyLoad%5D:&comment=Application%20Version%20%28from%20%22Chrome%20Settings%20%3E%20About%20Chrome%22%29:%20%0DAndroid%20Build%20Number%20%28from%20%22Android%20Settings%20%3E%20About%20Phone/Tablet%22%29:%20%0DDevice:%20%0D%0DSteps%20to%20reproduce:%20%0D%0DObserved%20behavior:%20%0D%0DExpected%20behavior:%20%0D%0DFrequency:%20%0D%3Cnumber%20of%20times%20you%20were%20able%20to%20reproduce%3E%20%0D%0DAdditional%20comments:%20%0D&labels=Pri-2&components=Blink%3ELoader%3ELazyLoad%2C)!