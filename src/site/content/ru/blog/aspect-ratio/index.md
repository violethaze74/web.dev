---
layout: post
title: Новое свойство CSS aspect-ratio, поддерживаемое в Chromium, Safari Technology Preview и Firefox Nightly.
subhead: Новое свойство CSS, которое помогает поддерживать постоянные интервалы в адаптивных макетах.
authors:
  - una
date: 2021-01-28
hero: image/admin/I14dS86oJT2f0uHaDLEM.jpg
alt: Изображение разноцветных телефонов, измененное с сохранением соотношения сторон.
description: |-
  Поддерживать соотношение сторон изображений и элементов теперь
  легче с помощью нового свойства CSS aspect-ratio.
tags:
  - blog
  - css
---

{% Aside %}

Резюме: Поддержание постоянного соотношения ширины и высоты, называемого *соотношением сторон* , имеет решающее значение для адаптивного веб-дизайна и предотвращения [совокупного смещения макета](/cls/). Теперь есть простой способ реализовать это с помощью нового свойства `aspect-ratio`, введенного в [Chromium 88](https://www.chromestatus.com/feature/5738050678161408), [Firefox 87](https://developer.mozilla.org/docs/Mozilla/Firefox/Experimental_features#property_aspect-ratio) и [Safari Technology Preview 118](https://developer.apple.com/safari/technology-preview/release-notes/).

{% endAside %}

## Соотношение сторон

Соотношение сторон чаще всего выражается двумя целыми числами и двоеточием в размерности ширина:высота или x:y. Наиболее распространенные соотношения сторон для фотографии — 4:3 и 3:2, в то время как видео и современные потребительские камеры, как правило, имеют соотношение сторон 16:9.

<figure>{% Img src="image/admin/od54hUUe21UABpbWxSFG.jpg", alt="Два изображения с одинаковым соотношением сторон. Одно размером 634 x 951 пиксель, другое — 200 x 300 пикселей. Оба изображения имеют соотношение сторон 2:3.", width="800", height="526" %} <figcaption> Два изображения с одинаковым соотношением сторон. Одно размером 634 x 951 пиксель, другое — 200 x 300 пикселей. Оба изображения имеют соотношение сторон 2:3.</figcaption></figure>

С развитием адаптивного дизайна поддержание соотношения сторон становится все более важным для веб-разработчиков, тем более, что размеры изображений различаются, а размеры элементов меняются в зависимости от доступного пространства.

Вот некоторые примеры того, когда важно поддерживать соотношение сторон:

- Создание адаптивных окон iframe, где они составляют 100% родительской ширины, а высота должна оставаться в определенном соотношении к области просмотра
- Создание встроенных контейнеров-заполнителей для изображений, [видео](http://fitvidsjs.com/) и встраиваемых материалов для предотвращения повторной компоновки, когда элементы загружаются и занимают место
- Создание единообразного адаптивного пространства для интерактивной визуализации данных или SVG-анимации
- Создание единообразного адаптивного пространства для многоэлементных компонентов, таких как карточки или календарные даты
- Создание единообразного адаптивного пространства для нескольких изображений разного размера (можно использовать вместе с `object-fit`)

## Object-fit

Определение соотношения сторон помогает нам устанавливать размер мультимедиа в адаптивном контексте. Еще один инструмент в этом сегменте — свойство `object-fit`, которое позволяет пользователям описывать, как объект внутри блока (например, изображение) должен заполнять этот блок:

<figure>{% Img src="image/admin/A7uj6u5MULodlw4lVsI2.jpg", alt="Демонстрационная визуализация object-fit", width="800", height="236" %} <figcaption>Примеры различных значений <code>object-fit</code>. См. <a href="https://codepen.io/una/pen/mdrLGjR">демонстрацию на Codepen</a>. </figcaption></figure>

Значения `initial` и `fill` корректируют изображение, чтобы оно заполняло пространство. В нашем примере это приводит к тому, что изображение становится сжатым и размытым из-за повторной калибровки пикселей. Далеко от идеала. `object-fit: cover` использует наименьшее измерение изображения для заполнения пространства и обрезает изображение, чтобы уместить его в блоке на основе этого измерения. Изображение масштабируется по нижней границе. `object-fit: contain` гарантирует, что изображение всегда будет видимым целиком, и, следовательно, является противоположностью `cover`, принимая в качестве значения верхнюю границу размера (в нашем примере выше это ширина) и масштабируя изображение так, что его внутреннее соотношение сторон сохраняется, при этом изображение вписывается в пространство. В случае `object-fit: none` изображение обрезается по центру (положение объекта по умолчанию), сохраняя первичный размер.

`object-fit: cover`, как правило, работает в большинстве ситуаций, обеспечивая аккуратный единообразный интерфейс при работе с изображениями разных размеров, однако при этом вы теряете информацию (изображение обрезается по длинным краям).

Когда эти детали играют роль (например, при работе с плоской укладкой косметических товаров), обрезка важного контента недопустима. Таким образом, идеальным сценарием были бы адаптивные изображения разных размеров, которые соответствовали бы пространству пользовательского интерфейса без обрезки.

## Старый прием: сохранение соотношения сторон с помощью `padding-top`

<figure>{% Img src="image/admin/j3YJicINXjly349uEEUt.jpg", alt="Использование padding-top для установки соотношения сторон 1:1 для изображений предварительного просмотра публикации в карусели.", width="800", height="296 " %} <figcaption> Использование <code>padding-top</code> для установки соотношения сторон 1:1 для изображений предварительного просмотра публикации в карусели.</figcaption></figure>

Для улучшения адаптивности мы можем использовать соотношение сторон. Это позволяет нам устанавливать определенный размер соотношения и брать за основу отдельную ось (высоту или ширину) для остальных медиафайлов.

Широко распространенное на данный момент кроссбраузерное решение для поддержания соотношения сторон на основе ширины изображения известно как «Padding-Top Hack». Для этого решения требуется родительский контейнер и дочерний контейнер с абсолютным позиционированием. Затем вычисляется соотношение сторон в процентах, чтобы установить его в качестве значения `padding-top`. Например:

- Соотношение сторон 1:1 = 1/1 = 1 = `padding-top: 100%`
- Соотношение сторон 4:3 = 3/4 = 0,75 = `padding-top: 75%`
- Соотношение сторон 3:2 = 2/3 = 0,66666 = `padding-top: 66.67%`
- Соотношение сторон 16:9 = 9/16 = 0,5625 = `padding-top: 56.25%`

Теперь, когда мы определили значение соотношения сторон, мы можем применить его к нашему родительскому контейнеру. Рассмотрим следующий пример:

```html
<div class="container">
  <img class="media" src="..." alt="...">
</div>
```

Затем мы можем написать следующий CSS:

```css
.container {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* Соотношение сторон 16:9 */
}

.media {
  position: absolute;
  top: 0;
}
```

## Сохранение соотношения сторон с помощью `aspect-ratio`

<figure>{% Img src="image/admin/XT8PbPiYx1IJq3Pvmanz.jpg", alt="Использование aspect-ratio для установки соотношения сторон 1:1 для изображений предварительного просмотра публикации в карусели.", width="800", height="296 " %} <figcaption> Использование <code>aspect-ratio</code> для установки соотношения сторон 1:1 для изображений предварительного просмотра публикации в карусели.</figcaption></figure>

К сожалению, вычисление значений `padding-top` не слишком интуитивно понятно и требует дополнительных затрат и позиционирования. Благодаря новому встроенному [свойству CSS](https://drafts.csswg.org/css-sizing-4/#aspect-ratio) `aspect-ratio` язык для поддержания соотношения сторон стал намного более понятным.

Используя ту же разметку, мы можем заменить `padding-top: 56.25%` на `aspect-ratio: 16 / 9`, установив `aspect-ratio` на указанное соотношение `width` / `height`.

<div class="switcher">{% Compare 'worse', 'Использование padding-top' %} ```css .container { width: 100%; padding-top: 56,25%; } `` {% endCompare %}</div>
<p data-md-type="paragraph">{% Compare 'better', 'Использование aspect-ratio' %}</p>
<pre data-md-type="block_code" data-md-language="css"><code class="language-css">.container {
  width: 100%;
  aspect-ratio: 16 / 9;
}
</code></pre>
<p data-md-type="paragraph">{% endCompare %}</p>
<div data-md-type="block_html"></div>

Использование `aspect-ratio` вместо `padding-top` гораздо более понятно и не требует пересмотра свойства padding, чтобы реализовать что-то за пределами его обычной области применения.

Это новое свойство также добавляет возможность устанавливать соотношение сторон в `auto`, где «заменяемые элементы с внутренним соотношением сторон используют это соотношение сторон; в противном случае блок не имеет предпочтительного соотношения сторон». Если оба параметра `auto` и `<ratio>` указаны вместе, предпочтительным соотношением сторон является указанное соотношение `width`, деленное на `height`, если только это не [заменяемый элемент](https://developer.mozilla.org/docs/Web/CSS/Replaced_element) с внутренним соотношением сторон, которое и будет использовано в этом случае.

## Пример: постоянство в сетке

Это очень хорошо работает с механизмами компоновки CSS, такими как CSS Grid и Flexbox. Рассмотрим список с дочерними элементами, для которых вы хотите сохранить соотношение сторон 1:1, например сетку со значками спонсоров:

```html
<ul class="sponsor-grid">
  <li class="sponsor">
    <img src="..." alt="..."/>
  </li>
  <li class="sponsor">
    <img src="..." alt="..."/>
  </li>
</ul>
```

```css
.sponsor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
}

.sponsor img {
  aspect-ratio: 1 / 1;
  width: 100%;
  object-fit: contain;
}
```

<figure>
  <video controls autoplay loop muted playsinline>
    <source src="https://storage.googleapis.com/web-dev-assets/aspect-ratio/gridimages2.mp4" type="video/mp4">
  </source></video>
  <figcaption>Изображения в сетке с их родительским элементом при разных соотношением сторон. <a href="https://codepen.io/una/pen/PoGddaw">См. демонстрацию на Codepen</a>.</figcaption></figure>

## Пример: предотвращение смещения макета

Еще одна замечательная особенность `aspect-ratio` заключается в том, что с его помощью можно создавать пространство-заполнитель для предотвращения [совокупного смещения макета](/cls/), обеспечивая лучшие показатели [Web Vitals](/learn-web-vitals/). В первом примере загрузка ресурса из API, такого как [Unsplash](https://source.unsplash.com/), провоцирует смещение макета, когда медиафайл загружен.

<figure>
  <video controls autoplay loop muted playsinline>
    <source src="https://storage.googleapis.com/web-dev-assets/aspect-ratio/aspect-ratio-missing.mp4" type="video/mp4">
  </source></video>
  <figcaption>Видео совокупного смещения макета, которое происходит, когда для загруженного ресурса не задано соотношение сторон. Это видео записано с помощью эмулированной сети 3G.</figcaption></figure>

Применение `aspect-ratio` создает заполнитель для предотвращения этого смещения макета:

```css
img {
  width: 100%;
  aspect-ratio: 8 / 6;
}
```

<figure>
  <video controls autoplay loop muted playsinline>
    <source src="https://storage.googleapis.com/web-dev-assets/aspect-ratio/aspect-ratio-set.mp4" type="video/mp4">
  </source></video>
  <figcaption>Видео с заданным соотношением сторон для загружаемого ресурса. Это видео записано с помощью эмулированной сети 3G. <a href="https://codepen.io/una/pen/GRjLZmG">См. демонстрацию на Codepen</a>.</figcaption></figure>

### Бонусный совет: атрибуты изображения для соотношения сторон

Есть и другой способ установить соотношение сторон изображения — использовать [его атрибуты](https://www.smashingmagazine.com/2020/03/setting-height-width-images-important-again/). Если вы заранее знаете размеры изображения, [рекомендуется](/image-aspect-ratio/#check-the-images-width-and-height-attributes-in-the-html) установить эти размеры в качестве значений `width` и `height`.

В нашем примере выше мы знаем, что размеры составляют 800 на 600 пикселей, и разметка изображения будет выглядеть так: `<img src="image.jpg" alt="..." width="800" height="600">`. Если отправленное изображение имеет такое же соотношение сторон, но не обязательно с аналогичными значениями в пикселях, мы все равно можем использовать значения атрибутов изображения, чтобы задать соотношение, в сочетании со стилем `width: 100%`. Так изображение займет положенное место. Все вместе будет выглядеть так:

```markup
<!-- Разметка -->
<img src="image.jpg" alt="..." width="8" height="6">
```

```css
/* CSS */
img {
  width: 100%;
}
```

В итоге эффект будет аналогичен указанию `aspect-ratio` для изображения с помощью CSS, и совокупного смещения макета не произойдет ([см. демонстрацию на Codepen](https://codepen.io/una/pen/gOwJWoz)).

## Заключение

Благодаря новому свойству `aspect-ratio`, введенному в разных современных браузерах, поддерживать правильные соотношения сторон в контейнерах мультимедиа и макета становится немного проще.

Использованные фотографии [Эми Шамблен](https://unsplash.com/photos/TXg_38oImi0) и [Лайонела Густава](https://unsplash.com/photos/c1rOy44wuts) загружены через Unsplash.