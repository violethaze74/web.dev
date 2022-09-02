---
layout: post
title: Как сделать хорошее прогрессивное веб-приложение?
authors:
  - samrichard
  - petelepage
date: 2020-01-06
updated: 2022-07-18
description: |2-

  Что нужно, чтобы сделать хорошее, выдающееся прогрессивное веб-приложение?
tags:
  - progressive-web-apps
---

<!-- Disable heading-increment because it mucks with the Details widget -->

<!--lint disable heading-increment-->

Прогрессивные веб-приложения (PWA) созданы и улучшены с помощью современных API-интерфейсов, чтобы обеспечить расширенные возможности, надежность и устанавливаемость, будучи доступными *любым пользователям где угодно и на любых устройствах* благодаря единой базе исходного кода. Чтобы обеспечить наилучшее взаимодействие с пользователем, обратитесь к [основному](#core) и [оптимальному](#optimal) контрольным спискам и рекомендациям.

## Основной контрольный список для прогрессивных веб-приложений {: #core }

Контрольный список для прогрессивных веб-приложений описывает, как обеспечить для приложения возможность установки и эксплуатации всеми пользователями независимо от размера или типа ввода.

{% Details %} {% DetailsSummary 'h3' %}

Быстро запускается, быстро работает

Производительность чрезвычайно важна для успешной работы онлайн, поскольку высокопроизводительные сайты привлекают и удерживают пользователей лучше, чем плохо работающие. Разработчики сайтов должны сосредоточиться на оптимизации показателей производительности, ориентированных на пользователя.

{% endDetailsSummary %}

Производительность чрезвычайно важна для успешной работы онлайн, поскольку высокопроизводительные сайты привлекают и удерживают пользователей лучше, чем плохо работающие. Разработчики сайтов должны сосредоточиться на оптимизации показателей производительности, ориентированных на пользователя.

#### Почему

Скорость имеет решающее значение во *взаимодействии* пользователей с вашим продуктом. Например, если время загрузки страницы увеличивается с одной до десяти секунд, вероятность ухода пользователя возрастает на 123%. Работа не останавливается после события `load`. Пользователи не должны задумываться о том, было ли зарегистрировано их действие — например, нажатие кнопки — или нет. Прокрутка и анимация должны казаться плавными. Производительность влияет на все — и то, как пользователи воспринимают ваше приложение, и то, как оно на самом деле работает.

Хотя у всех приложений разные потребности, аудиты производительности в Lighthouse основаны на [модели производительности RAIL](/rail/), ориентированной на пользователя, и чем выше набранные в рамках этих аудитов баллы, тем вероятнее, что ваши пользователи получат удовольствие от работы. Кроме того, чтобы получить реальные данные о производительности вашего веб-приложения, вы можете использовать аналитику [PageSpeed Insights](https://pagespeed.web.dev/) или отчет [Chrome User Experience Report](https://developer.chrome.com/docs/crux/).

#### Как

Следуйте нашему [руководству по быстрой загрузке](/fast/), чтобы обеспечить быстрый запуск и работу своего PWA.

{% endDetails %}

{% Details %} {% DetailsSummary 'h3' %}

Работает в любом браузере

Пользователи могут использовать любой браузер на выбор для доступа к вашему веб-приложению до его установки.

{% endDetailsSummary%}

Пользователи могут использовать любой браузер на выбор для доступа к вашему веб-приложению до его установки.

#### Почему

Прогрессивные веб-приложения — это в первую очередь веб-приложения, а это значит, что они должны работать в разных браузерах, а не лишь в одном.

По словам Джереми Кейта из [Resilient Web Design](https://resilientwebdesign.com/), эффективно реализовать это можно следующим образом: определить основной функционал, сделать его доступным, используя простейшие из возможных технологий, а затем улучшить взаимодействие с ним, где возможно. Во многих случаях это означает, что основные функции следует описывать на чистом HTML, а затем с помощью CSS и JavaScript улучшать взаимодействие с пользователем, делая его более захватывающим.

Возьмем, к примеру, отправку формы. Самый простой способ ее реализации — HTML-форма, отправляющая запрос `POST`. После ее создания при помощи JavaScript можно улучшить взаимодействие с теми пользователями, чьи браузеры это поддерживают, выполняя проверку формы и отправляя ее через AJAX.

Учтите, что пользователи будут работать с вашим сайтом на разных устройствах и в разных браузерах. Нельзя ориентироваться только на верхнюю часть этого списка. Используя обнаружение функций, вы сможете обеспечить удобство использования для самого широкого круга потенциальных пользователей, в том числе тех, кто будет использовать браузеры и устройства, на данный момент еще не выпущенные.

#### Как

[Resilient Web Design](https://resilientwebdesign.com/) (Гибкий веб-дизайн) Джереми Кейта — отличный ресурс, описывающий принципы веб-дизайна с применением прогрессивной кроссбраузерной методологии.

#### Дополнительное чтение

- Статья [Understanding Progressive Enhancement](https://alistapart.com/article/understandingprogressiveenhancement/) (Основы прогрессивных улучшений) от A List Apart — хорошее введение в тему.
- Статья [Progressive Enhancement: What It Is, And How To Use It?](https://www.smashingmagazine.com/2009/04/progressive-enhancement-what-it-is-and-how-to-use-it/) (Прогрессивные улучшения: что это и как этим пользоваться?) в журнале Smashing Magazine дает практическое введение и ссылки на более сложные темы.
- В MDN есть статья, озаглавленная «[Реализация обнаружения функций](https://developer.mozilla.org/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection)», в которой рассказывается о том, как выявлять функцию, запрашивая ее напрямую.

{% endDetails %}

{% Details %} {% DetailsSummary 'h3' %}

Адаптируется к любым размерам экрана

Пользователи могут работать с PWA на экране любого размера, и контент будет доступен целиком при любом размере области просмотра.

{% endDetailsSummary %}

Пользователи могут работать с PWA на экране любого размера, и контент будет доступен целиком при любом размере области просмотра.

#### Почему

Устройства бывают разных размеров, и пользователи могут работать с вашим приложением в разных масштабах даже на одном устройстве. Следовательно, очень важно убедиться не только в том, что контент умещается в области просмотра, но и что все функции и контент вашего сайта доступны для всех размеров области просмотра.

Запланированные задачи и интересующий пользователя контент не меняются в зависимости от размера области просмотра. Контент может быть перегруппирован для разных размеров области просмотра, но так или иначе он должен быть доступен целиком. Собственно, как утверждает Люк Вроблевски в своей книге «Mobile First», если начинать проектирование с малых размеров и постепенно переходить к большим, а не наоборот, можно улучшить дизайн сайта:

> Мобильные устройства требуют, чтобы команды разработчиков ПО сосредоточились лишь на самых важных данных и действиях в приложении. На экране размером 320 на 480 пикселей просто нет места для посторонних, ненужных элементов. Вы должны расставить приоритеты.

#### Как

Существует множество ресурсов по адаптивному дизайну, в том числе [оригинальная статья Итана Маркотта](https://alistapart.com/article/responsive-web-design/), [сборник важных принципов дизайна](https://snugug.com/musings/principles-responsive-web-design/), а также масса книг и обсуждений. Если ограничиться сугубо контентными аспектами адаптивного дизайна, можете изучить принципы [контентно-ориентированного дизайна](https://uxdesign.cc/why-you-should-design-the-content-first-for-better-experiences-374f4ba1fe3c) и [адаптивные макеты на базе контента (content-out)](https://alistapart.com/article/content-out-layout/). Наконец, хоть и будучи ориентированными на мобильные устройства, уроки из «[Семи смертоносных мобильных мифов](https://www.forbes.com/sites/anthonykosner/2012/05/03/seven-deadly-mobile-myths-josh-clark-debunks-the-desktop-paradigm-and-more/#21ecac977bca)» Джоша Кларка не менее актуальны для небольших представлений адаптивных сайтов.

{% endDetails %}

{% Details %} {% DetailsSummary 'h3' %}

Предоставляет индивидуальную автономную страницу

Удерживая пользователей в своем PWA, когда они не в сети, вы обеспечите более плавную работу, чем при возврате к автономной странице браузера по умолчанию.

{% endDetailsSummary %}

Удерживая пользователей в своем PWA, когда они не в сети, вы обеспечите более плавную работу, чем при возврате к автономной странице браузера по умолчанию.

#### Почему

Пользователи ожидают, что установленные приложения будут работать независимо от статуса их подключения. Платформозависимое приложение не показывает пустую страницу, когда оно находится в автономном режиме, и прогрессивное веб-приложение не должно отображать автономную страницу браузера по умолчанию. Обеспечьте индивидуальное автономное состояние и в тех ситуациях, когда пользователь переходит по URL-адресу, который не был кеширован, и когда он пытается воспользоваться требующей подключения функцией. Это позволит вам организовать взаимодействие так, что ваше веб-приложение будет ощущаться частью устройства, на котором оно работает.

#### Как

Во время события `install` сервис-воркера можно предварительно кешировать индивидуальную автономную страницу для последующего использования. Если пользователь отключится от сети, вы сможете показать ему эту страницу. Чтобы увидеть, как это работает, и научиться самостоятельно это реализовывать, воспользуйтесь нашим [примером настраиваемой автономной страницы](https://googlechrome.github.io/samples/service-worker/custom-offline-page/).

{% endDetails %}

{% Details %} {% DetailsSummary 'h3' %}

Устанавливается

Пользователи, устанавливающие или добавляющие приложения на свое устройство, как правило, больше взаимодействуют с этими приложениями.

{% endDetailsSummary %}

Пользователи, устанавливающие или добавляющие приложения на свое устройство, как правило, больше взаимодействуют с этими приложениями.

#### Почему

Установка прогрессивного веб-приложения позволяет ему выглядеть, работать и вести себя так же, как и все остальные установленные приложения. Оно запускается из того же места, откуда пользователь запускает другие приложения, работает в собственном окне, отдельно от браузера, и, подобно другим приложениям, отображается в списке задач.

Зачем вам нужно, чтобы пользователь установил ваше PWA? По той же причине, по которой вы хотите, чтобы пользователи устанавливали ваше приложение из магазина. Пользователи, которые устанавливают ваши приложения, — это ваша ключевая аудитория. Показатели их вовлеченности выше, чем у обычных посетителей, часто наравне с пользователями приложений на мобильных устройствах. Эти показатели включают большее количество повторных посещений, более длительное пребывание на вашем сайте и более высокие коэффициенты конверсии.

#### Как

Следуйте нашему [руководству по возможностям установки](/customize-install/), чтобы узнать, как сделать свое PWA устанавливаемым, проверить возможность установки и попробовать самостоятельно его установить.

{% endDetails %}

## Оптимальный контрольный список для прогрессивных веб-приложений {: #optimal }

Для создания первоклассного прогрессивного веб-приложения, которое станет лучшим в своей категории, просто пройтись по основному контрольному списку недостаточно. Оптимальный контрольный список для прогрессивных веб-приложений нацелен на то, чтобы сделать ваше приложение своеобразным продолжением устройства, на котором оно работает, и при этом выжать максимум из преимуществ современного Интернета.

{% Details %} {% DetailsSummary 'h3' %}

Работает вне сети

Если подключение не обязательно, ваше приложение работает аналогично как в сети, так и вне сети.

{% endDetailsSummary %}

Если подключение не обязательно, ваше приложение работает аналогично как в сети, так и вне сети.

#### Почему

Кроме индивидуальной автономной страницы пользователи ожидают, что PWA можно будет использовать вне сети. Например, в приложениях для путешествий и авиаперелетов сведения о поездках и посадочные талоны должны быть доступны без подключения к Интернету. Приложения для музыки, видео и подкастинга должны обеспечивать автономное воспроизведение. Социальные и новостные приложения должны кешировать недавний контент, чтобы пользователи могли читать его, не подключаясь к сети. Кроме того, пользователи рассчитывают оставаться авторизованными, находясь не в сети, поэтому необходимо проектировать автономную аутентификацию. Автономное PWA должно давать пользователям полноценные впечатления от работы.

#### Как

Когда вы определите функции, которые должны работать вне сети согласно ожиданиям ваших пользователей, вам будет нужно сделать контент доступным и адаптируемым к контексту автономного режима. К тому же вы можете использовать [IndexedDB](https://developers.google.com/web/ilt/pwa/working-with-indexeddb), внутрибраузерную NoSQL-систему, для хранения и извлечения данных, а также [фоновую синхронизацию](https://developer.chrome.com/blog/background-sync/), чтобы позволить пользователям выполнять действия вне сети и откладывать обмен данными с сервером до тех пор, пока у пользователя снова не установится стабильное соединение. Также вы можете использовать сервис-воркеры для хранения других видов контента, таких как изображения, видео- и аудиофайлы, для использования в автономном режиме. Кроме того, сервис-воркеры можно использовать для реализации [безопасных, долговременных сеансов](https://developer.chrome.com/blog/2-cookie-handoff/), чтобы пользователи оставались авторизованными. С точки зрения взаимодействия с пользователем вы можете использовать [скелетные экраны](https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a), которые дают пользователям представление о скорости и контенте в процессе загрузки, а затем по мере необходимости можно вернуться к кешированному контенту или индикатору «не в сети».

{% endDetails %}

{% Details %} {% DetailsSummary 'h3' %}

Полностью доступно

Все взаимодействия с пользователем соответствуют требованиям доступности [WCAG 2.0](https://www.w3.org/TR/WCAG20/).

{% endDetailsSummary %}

Все взаимодействия с пользователем соответствуют требованиям доступности [WCAG 2.0](https://www.w3.org/TR/WCAG20/).

#### Почему

Большинство людей в какой-то момент захотят задействовать ваше PWA в соответствии с требованиями доступности [WCAG 2.0](https://www.w3.org/TR/WCAG20/). Люди могут очень по-разному понимать ваше PWA и работать с ним, а их потребности могут быть как временными, так и постоянными. Делая свое PWA доступным, вы гарантируете, что его смогут использовать все.

#### Как

Разумно будет начать с [введения W3C в веб-доступность](https://www.w3.org/WAI/fundamentals/accessibility-intro/). Большую часть тестирования доступности необходимо проводить вручную. Такие инструменты, как [аудит доступности](/lighthouse-accessibility/) в Lighthouse, [axe](https://github.com/dequelabs/axe-core) и [Accessibility Insights](https://accessibilityinsights.io/), могут помочь вам частично автоматизировать тестирование доступности. Также важно использовать семантически правильные элементы вместо того, чтобы воссоздавать эти элементы самостоятельно, например, элементы `a` и `button`. Таким образом вы обеспечите соответствие ожиданиям доступности (например, когда использовать стрелки или вкладки), когда вам понадобится реализовать более продвинутую функциональность. В [A11Y Nutrition Cards](https://accessibilityinsights.io/) есть отличные советы по этому поводу для некоторых распространенных компонентов.

{% endDetails %}

{% Details %} {% DetailsSummary 'h3' %}

Можно найти с помощью поиска

Ваше PWA можно легко [найти с помощью поиска](/discoverable/).

{% endDetailsSummary %}

Ваше PWA можно легко [найти с помощью поиска](/discoverable/).

#### Почему

Одно из самых серьезных преимуществ Интернета — это возможность находить сайты и приложения с помощью поиска. По сути, [более половины](https://www.brightedge.com/resources/research-reports/channel_share) всего трафика веб-сайтов поступает из обычного поиска. Убедитесь, что для контента существуют канонические URL-адреса и что поисковые системы могут индексировать ваш сайт — это критически важно для того, чтобы пользователи могли найти ваше PWA. Особенно это касается применения рендеринга на стороне клиента.

#### Как

Для начала убедитесь, что у каждого URL-адреса есть уникальный описательный заголовок и мета-описание. Затем вы можете использовать [Google Search Console](https://search.google.com/search-console/about) и [аудит поисковой оптимизации](/lighthouse-seo/) в Lighthouse, чтобы отладить и исправить проблемы обнаружения своего PWA. Кроме того, вы можете использовать инструменты [Bing](https://www.bing.com/toolbox/webmaster) или [Яндекс](https://webmaster.yandex.com/welcome/) для веб-мастеров. Также рекомендуем вам включить в свое PWA [структурированные данные](https://goo.gle/search-gallery) с помощью схем со [Schema.org](https://schema.org/).

{% endDetails %}

{% Details %} {% DetailsSummary 'h3' %}

Работает с любым типом ввода

Ваше PWA одинаково можно использовать с мышью, клавиатурой, стилусом или сенсорным экраном.

{% endDetailsSummary %}

Ваше PWA одинаково можно использовать с мышью, клавиатурой, стилусом или сенсорным экраном.

#### Почему

Разные устройства предлагают различные методы ввода, и пользователи должны иметь возможность с легкостью переключаться между ними во время работы с вашим приложением. Плюс к тому, методы ввода не должны зависеть от размера экрана, т.е. большие области просмотра должны поддерживать сенсорное управление, а маленькие — клавиатуру и мышь. Обеспечьте для своего приложения и всех его функций поддержку любых методов ввода, которые могут понадобиться пользователю, насколько возможно. Также следует улучшить взаимодействие, где это целесообразно, задействуя элементы управления с привязкой к типу ввода, например, обновление оттягиванием (pull-to-refresh).

#### Как

[Pointer Events API](https://developer.chrome.com/blog/pointer-events/) предоставляет унифицированный интерфейс для работы с различными параметрами ввода и особенно хорош для добавления поддержки стилуса. Для одновременной поддержки сенсорного ввода и клавиатуры убедитесь, что вы используете правильные семантические элементы (якоря, кнопки, элементы управления формы и т. д.) и не перестраиваете их с помощью несемантического HTML (который хорошо подходит для доступности). Добавляя взаимодействия, которые активируются при наведении курсора, убедитесь, что они также могут активироваться при нажатии или касании.

{% endDetails %}

{% Details %} {% DetailsSummary 'h3' %}

Предоставляет контекст для запросов разрешений

При запросе разрешения на использование мощных API-интерфейсов предоставьте контекст и запрашивайте только тогда, когда API-интерфейс необходим.

{% endDetailsSummary %}

При запросе разрешения на использование мощных API-интерфейсов предоставьте контекст и запрашивайте только тогда, когда API-интерфейс необходим.

#### Почему

API-интерфейсы, которые запрашивают разрешения на выдачу уведомлений, определение геолокации и обработку учетных данных, намеренно разработаны так, чтобы мешать пользователю, потому что они, как правило, связаны с мощными функциями, требующими согласия. Если запускать такие запросы без дополнительного контекста, например, при загрузке страницы, пользователи с меньшей вероятностью дадут эти разрешения и скорее перестанут доверять таким запросам в дальнейшем. Вместо этого запускайте эти запросы только после предоставления пользователю контекстного обоснования того, зачем вам это разрешение.

#### Как

Статья о [UX-разрешениях](https://developers.google.com/web/fundamentals/push-notifications/permission-ux) и публикация UX Planet «[Правильные способы запрашивать разрешения у пользователей](https://uxplanet.org/mobile-ux-design-the-right-ways-to-ask-users-for-permissions-6cdd9ab25c27)» хорошо описывают, как создавать запросы разрешений, которые, будучи ориентированными на мобильные устройства, применяются ко всем PWA.

{% endDetails %}

{% Details %} {% DetailsSummary 'h3' %}

Следует устоявшимся стандартам хорошего кода

Соблюдение гигиены кодовой базы облегчает достижение ваших целей и создание новых функций.

{% endDetailsSummary %}

Соблюдение гигиены кодовой базы облегчает достижение ваших целей и создание новых функций.

#### Почему

При создании современного веб-приложения нужно многое учитывать. Пока вы поддерживаете актуальность своего приложения и соблюдаете гигиену кодовой базы, вам будет проще разрабатывать новые функции, которые будут соответствовать другим целям, изложенным в этом контрольном списке.

#### Как

Для обеспечения качества программного кода существует ряд первоочередных проверок: избегайте использования библиотек с известными уязвимостями, не используйте устаревшие API, удаляйте из кода антишаблоны (например, использование `document.write()` или непассивных прослушивателей событий прокрутки), практикуйте защитное программирование, чтобы ваше PWA не выдавало сбой, если не загружается аналитика или другие сторонние библиотеки. Предусмотрите проведение обязательного статического анализа кода, такого как линтинг, а также автоматизированного тестирования в нескольких браузерах и каналах выпуска. Эти методики могут помочь выявить ошибки до того, как они попадут в рабочую версию.

{% endDetails %}