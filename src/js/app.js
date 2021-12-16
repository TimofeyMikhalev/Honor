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

    //Меню

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
    // function removeAction(i = 0) {
    //   tabs[i].classList.remove('action');
    // }
    function addAction(i = 0) {
      tabs[i].classList.add('action');
    }

    //будет показывать содержимое меню
    function showTabContent(i = 0) {
      tabsContent[i].classList.add('fade', 'show');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('action');

      zenscroll.to(tabsContent[i]);
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

    //Попапы

    let popapBtn = [...document.querySelectorAll('.content__button_popap')], //кнопки раскрыть
      popapContent = document.querySelectorAll('.content__popap'), // попапы
      btnClose = document.querySelectorAll('.popap__menu_close'), //Крестик
      popapNextBtnOne = document.querySelector('.content__button_next1'),
      popapNextBtn2 = document.querySelector('.content__button_next2'),
      popapNextBtn3 = document.querySelector('.content__button_next3'),
      popapNextBtn4 = document.querySelector('.content__button_next4'),
      popapNextBtn5 = document.querySelector('.content__button_next5'),
      popapNextBtn6 = document.querySelector('.content__button_next6'),
      popapBtnClose = document.querySelectorAll('.content__button_close');

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

      zenscroll.to(popapContent[i]);
    }

    // клик по кнопкам

    function trackClickPopap(event) {
      let target = event.currentTarget;
      let target__index_popap = popapBtn.indexOf(target);

      hideTabPopap(target__index_popap);
      showTabPopap(target__index_popap);
    }
    function closePopap() {
      for (let i = 0; i < popapContent.length; i++) {
        popapContent[i].classList.remove('anim', 'show');
        popapContent[i].classList.add('hide');
      }
    }

    popapBtn.forEach((popap) => {
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

    popapBtnClose.forEach((close) => {
      configOfEventListeners(false, {
        target: close,
        type: 'click',
        func: closePopap,
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
    function popapOne() {
      popapContent[0].classList.remove('show');
      popapContent[0].classList.add('hide');

      popapContent[1].classList.remove('hide');
      popapContent[1].classList.add('show', 'anim');

      zenscroll.to(popapContent[1]);
    }
    popapNextBtnOne.addEventListener('click', popapOne);

    function popap2() {
      popapContent[2].classList.remove('show');
      popapContent[2].classList.add('hide');

      popapContent[3].classList.remove('hide');
      popapContent[3].classList.add('show', 'anim');

      zenscroll.to(popapContent[3]);
    }
    popapNextBtn2.addEventListener('click', popap2);

    function popap3() {
      popapContent[3].classList.remove('show');
      popapContent[3].classList.add('hide');

      popapContent[4].classList.remove('hide');
      popapContent[4].classList.add('show', 'anim');

      zenscroll.to(popapContent[4]);
    }
    popapNextBtn3.addEventListener('click', popap3);

    function popap4() {
      popapContent[5].classList.remove('show');
      popapContent[5].classList.add('hide');

      popapContent[6].classList.remove('hide');
      popapContent[6].classList.add('show', 'anim');

      zenscroll.to(popapContent[6]);
    }
    popapNextBtn4.addEventListener('click', popap4);

    function popap5() {
      popapContent[6].classList.remove('show');
      popapContent[6].classList.add('hide');

      popapContent[7].classList.remove('hide');
      popapContent[7].classList.add('show', 'anim');

      zenscroll.to(popapContent[7]);
    }
    popapNextBtn5.addEventListener('click', popap5);

    function popap6() {
      popapContent[7].classList.remove('show');
      popapContent[7].classList.add('hide');

      popapContent[8].classList.remove('hide');
      popapContent[8].classList.add('show', 'anim');

      zenscroll.to(popapContent[8]);
    }
    popapNextBtn6.addEventListener('click', popap6);

    // console.log(popapNextBtnOne)

    //Работа кнопак далее и завершить
    // function nextPopapOne(event) {
    //   let target = event.currentTarget;
    //   let target__index_next = popapNextBtn.indexOf(target);
    //     hideNextPopap(target__index_next)

    // }
    // function hideNextPopap() {
    //   popapContent.forEach(item => {
    //     item.classList.remove('action');

    //   });
    //   popapContent.forEach(item => {
    //     item.classList.remove('action');
    //     item.classList.add('action');

    //   });
    // }

    // popapNextBtnOne.forEach(close  => {
    //   configOfEventListeners(false, {target: close, type: 'click', func: nextPopapOne})
    // })

    //End
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
