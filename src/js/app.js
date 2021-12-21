(() => {
  //= include '_base.js'

  if (document.readyState === 'loading') {
    //Так как события LOCATION/PAGE_READY на обычном локолхосте нет, мы его эмулируем с помощью события load
    !window.location.href.includes('localhost')
      ? configOfEventListeners(false, {
          target: window,
          type: 'LOCATION/PAGE_READY',
          func: initJs,
        })
      : configOfEventListeners(false, {
          target: window,
          type: 'load',
          func: initJs,
        });
    //END
  } else {
    initJs();
  }

  function initJs() {
    // Тут начинается твой js-код
    let contentContainer = document.querySelector('.content');
    //Меню
    let menuContainer = document.querySelector('.menu');

    let tabs = [...document.querySelectorAll('.menu__container_inner')], //пункты меню
      tabsContent = document.querySelectorAll('.content__container'); // содержимое меню

    // //скрыть пункты меню
    function hideTabContent() {
      tabsContent.forEach((item) => {
        item.classList.add('hide');
        item.classList.remove('show');
        item.classList.remove('fade');
      });
      tabs.forEach((item) => {
        item.classList.remove('action');
      });
    }

    function addAction(i = 0) {
      tabs[i].classList.add('action');
    }

    //будет показывать содержимое меню
    function showTabContent(i = 0) {
      tabsContent[i].classList.add('fade', 'show');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('action');

      zenscroll.toY(getCoords(tabsContent[i]).top - 80);
    }

    // клик по кнопкам

    function trackClick(event) {
      let target = event.currentTarget;
      let target__index = tabs.indexOf(target);

      hideTabContent(target__index);
      showTabContent(target__index);
      // removeAction(target__index);
      addAction(target__index);
    }

    tabs.forEach((tab) => {
      configOfEventListeners(false, {
        target: tab,
        type: 'click',
        func: trackClick,
      });
    });

    tabs.forEach((tab) => {
      configOfEventListeners(false, {
        target: tab,
        type: 'click',
        func: addOpacityTwo,
      });
    });

    tabs.forEach((tab) => {
      configOfEventListeners(false, {
        target: tab,
        type: 'click',
        func: closePopap,
      });
    });

    //Попапы

    let popapBtn = [...document.querySelectorAll('.content__button_popap')], //кнопки раскрыть
      popapContent = document.querySelectorAll('.content__popap'), // попапы
      btnClose = document.querySelectorAll('.popap__menu_close'), //Крестик
      popupNextButtons = [
        ...document.querySelectorAll('.content__button_next'),
      ];

    let content2 = document.querySelector('.content__box_items5'),
      contentPopap2 = document.querySelector('.content__popap5'),
      contentBrnPopap = document.querySelector('.content__button_popap3');
    let promoblockContainer = document.querySelector('.promoblock__container');

    let contentBlock = [...document.querySelectorAll('.content__box_items')];

    let pervaiBlock = document.querySelector('.content__box_items6');

    // //скрыть пункты меню
    function hideTabPopap() {
      popapContent.forEach((item) => {
        item.classList.add('hide');
        item.classList.remove('show');
        item.classList.remove('fade');
      });
    }

    //будет показывать содержимое меню
    function showTabPopap(i = 0) {
      popapContent[i].classList.add('anim', 'show');
      popapContent[i].classList.remove('hide');

      content2.classList.add('hide');
      contentPopap2.classList.remove('action');
      pervaiBlock.classList.add('hide');

      zenscroll.toY(getCoords(popapContent[i]).top - 80);

      AOS.refresh();
    }

    // клик по кнопкам

    function trackClickPopap(event) {
      let target = event.currentTarget;
      let target__index_popap = contentBlock.indexOf(target);

      hideTabPopap(target__index_popap);
      showTabPopap(target__index_popap);
    }
    function closePopap() {
      for (let i = 0; i < popapContent.length; i++) {
        popapContent[i].classList.remove('show');
        popapContent[i].classList.add('hide');
        contentPopap2.classList.remove('action');
        content2.classList.add('show');
        content2.classList.remove('hide');
        pervaiBlock.classList.remove('hide');
        pervaiBlock.classList.add('show');
      }

      AOS.refresh();
    }

    contentBlock.forEach((popap) => {
      configOfEventListeners(false, {
        target: popap,
        type: 'click',
        func: trackClickPopap,
      });
    });

    btnClose.forEach((btn) => {
      configOfEventListeners(false, {
        target: btn,
        type: 'click',
        func: closePopap,
      });
    });

    btnClose.forEach((btn) => {
      configOfEventListeners(false, {
        target: btn,
        type: 'click',
        func: addOpacityTwo,
      });
    });

    // function openPopap() {
    //   for(let i = 0; i < popapContent.length; i++){
    //     popapContent[i].classList.remove('anim', 'show');
    //     popapContent[i].classList.add('hide');
    //   }

    // }
    // btnClose.forEach(btn  => {
    //   configOfEventListeners(false, {target: btn, type: 'click', func: openPopap})
    // })

    //Переход с первого на второй попап

    function openNextPopup(e) {
      let target = e.currentTarget,
        target__index = popupNextButtons.indexOf(target); // какой попап по счету

      let fourContent = document.querySelector('.content__box_items_four');

      if (target.classList.contains('content__button_close')) {
        //если это кнопка "ЗАВЕРШИТЬ"
        closePopap();
        addOpacityTwo();

        setTimeout(() => zenscroll.toY(getCoords(menuContainer).top - 80), 100);
        return false;
      }

      popapContent[target__index].classList.remove('show');
      popapContent[target__index].classList.add('hide');

      popapContent[target__index + 1].classList.remove('hide');
      popapContent[target__index + 1].classList.add('show', 'anim');

      zenscroll.toY(getCoords(popapContent[target__index + 1]).top - 80);
    }

    popupNextButtons.forEach((popupNextButton) => {
      configOfEventListeners(false, {
        target: popupNextButton,
        type: 'click',
        func: openNextPopup,
      });
    });

    //навесить opacity на карточки

    function addOpacity() {
      contentBlock.forEach((item) => {
        item.classList.add('two');
        item.classList.remove('one');
      });
    }
    function addOpacityTwo() {
      contentBlock.forEach((item) => {
        item.classList.add('one');
        item.classList.remove('two');
      });
    }

    contentBlock.forEach((contentBlock) => {
      configOfEventListeners(false, {
        target: contentBlock,
        type: 'click',
        func: addOpacity,
      });
    });

    AOS.init();
  }

  configOfEventListeners(false, {
    target: window,
    type: 'LOCATION/PATHNAME_CHANGED',
    func: destroyJs,
  });
  function destroyJs() {
    // Удаляем все ивенты
    configOfEventListeners(true, true);
  }
})();
