---
title: Как длительные задачи JavaScript повышают время Time to Interactive
subhead: Как обнаружить ресурсоемкие задачи, которые блокируют реакцию на действия пользователя
authors:
  - addyosmani
date: 2019-05-29
hero: image/admin/QvWXvBSXsRKtpGOcakb5.jpg
alt: Песочные часы, внутри которых пересыпается песок
description: |2-

  Длительные задачи могут занимать основной поток, задерживая взаимодействие с пользователем. Инструменты Chrome DevTools теперь могут визуализировать длительные задачи, что упрощает поиск целей для оптимизации.
tags:
  - blog
  - performance
---

**Резюме. Длительные задачи могут занимать основной поток, задерживая взаимодействие с пользователем. Инструменты Chrome DevTools теперь могут визуализировать длительные задачи, что упрощает поиск целей для оптимизации.**

Если вы используете Lighthouse для аудита страниц, возможно, вы уже знакомы с метрикой [Время загрузки для взаимодействия](/tti/) (Time to Interactive, TTI), которая показывает, как скоро пользователи могут начинать взаимодействовать со страницей и получать реакцию. Но знаете ли вы, что длительные задачи (JavaScript) могут серьезно ухудшить TTI?

{% Img src="image/tcFciHGuF3MxnTr1y5ue01OGLBn2/4XCzYI9gaUJDTTJu9JxH.png", alt="Время загрузки для взаимодействия (Time to Interactive) в отчете Lighthouse", width="800", height="169" %}

## Что такое длительные задачи?

[Длительной задачей](https://developer.mozilla.org/docs/Web/API/Long_Tasks_API) называется код на JavaScript, который монополизирует основной поток на продолжительное время, вызывая «зависание» интерфейса.

Во время загрузки страницы длительные задачи могут занять основной поток и сделать страницу невосприимчивой к действиям пользователя, даже если она выглядит готовой к работе: элементы страницы не реагируют на нажатия, потому что прослушиватели событий, обработчики нажатий и т. д. еще не подключены.

Ресурсоемкие длительные задачи — результат сложных действий, занимающих более 50 мс. Почему именно 50 мс? [Модель RAIL](/rail/) рекомендует обрабатывать ввод данных пользователем в течение [50 мс](/rail/#response-process-events-in-under-50ms), чтобы обеспечить скорость визуальной реакции в рамках 100 мс. Если нарушить это правило, связь между действием и реакцией будет разорвана.

## Как понять, есть ли на странице длительные задачи, замедляющие реакцию

До сих пор, чтобы выяснить, какие задачи задерживают реакцию на действия пользователя, приходилось вручную искать в [Chrome DevTools](https://developer.chrome.com/docs/devtools/) «длинные желтые блоки» скриптов длительностью более 50 мс или использовать [Long Tasks API](https://calendar.perfplanet.com/2017/tracking-cpu-with-long-tasks-api/), что не очень удобно.

{% Img src="image/tcFciHGuF3MxnTr1y5ue01OGLBn2/mSKnMWBcEBHWkXzTGCAH.png", alt="Скриншот панели «Производительность» (Performance) в DevTools: показана разница между короткими и длительными задачами", width="800", height="450" %}

Теперь [DevTools визуализирует длительные задачи](https://developers.google.com/web/updates/2019/03/devtools#longtasks), что упрощает аудит производительности. Если задача (показаны серым цветом) является длительной, она получает красный флажок.

{% Img src="image/tcFciHGuF3MxnTr1y5ue01OGLBn2/fyDPyO4XbSINMVpSSY9E.png", alt="Панель «Производительность» (Performance) в DevTools: длительные задачи отображаются в виде серых полос с красным флажком", width="800", height="450" %}

- На [панели «Производительность»](https://developer.chrome.com/docs/devtools/evaluate-performance/) (Performance) запишите трассировку для загрузки веб-страницы.
- Поищите красные флажки в области основного потока. Задачи показаны серым и помечены как «Задача» (Task).
- Наведя указатель мыши на полосу, вы увидите, сколько выполнялась задача и считается ли она «длительной».

## Как определить источник длительных задач

Чтобы узнать источник длительной задачи, выберите серую полоску **Задача** (Task). В выдвигающейся панели внизу выберите **Снизу вверх** (Bottom-Up) и вариант **Группировка по действию** (Group by Activity). Вы увидите, какие действия внесли больший (в целом) вклад во время выполнения задачи. В примере ниже это ресурсоемкий набор DOM-запросов.

{% Img src="image/tcFciHGuF3MxnTr1y5ue01OGLBn2/7irBiePkFJRmzKMlcJUV.png", alt="Выбрав длительную задачу (помечена как «Задача» (Task)) в DevTools, можно посмотреть, какие действия в ней выполнялись", width="800", height="450" %}

## Стандартные способы оптимизации длительных задач

Часто основной источник длительных задач — большие скрипты. Попробуйте их [разделить](/reduce-javascript-payloads-with-code-splitting). Также следите за сторонними скриптами: их длительные задачи могут задерживать переход основного контента в интерактивное состояние.

Разбивайте всё на небольшие фрагменты (которые выполняются быстрее 50 мс) и выполняйте их в нужном месте и в нужное время — пусть даже вне основного потока, в воркере. Хороший материал по этой теме — [Ждать, пока не понадобится](https://philipwalton.com/articles/idle-until-urgent/) (Idle Until Urgent) Фила Уолтона.

Веб-страницы должны быстро откликаться на действия пользователя. Сведите к минимуму длительные задачи, и пользоваться вашим сайтом станет намного приятнее. Подробнее о длительных задачах см. в статье [Метрики производительности, ориентированные на пользователя](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#tracking_long_tasks).