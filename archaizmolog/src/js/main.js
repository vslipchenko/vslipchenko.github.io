'use strict';

		const VScroll = (() => {
			let content,
				dragStartY,
				lastScrollHeight,
				scrollArea,
				scrollbar,
				scrollStep,
				slider,
				scrolling,
				touchStartY,
				touchStep,
				watcher,
				wheelStep;

			const sliderDrag = (e) => {
				if (scrolling) {
					const shiftY = Math.ceil((e.pageY - content.getBoundingClientRect().top - dragStartY) * 100 / content.clientHeight);
					const sliderHeight = slider.clientHeight * 100 / content.clientHeight;
					const totalShiftY = shiftY + parseInt(sliderHeight);

 					if (shiftY > 0 && totalShiftY < 100) {
 						slider.style.top = shiftY + '%';
 						content.scrollTop = shiftY * content.scrollHeight / 100;
 					}
 					else if (totalShiftY >= 100) {
 						slider.style.top = 100 - Math.round(sliderHeight) + '%';
 						content.scrollTop = content.scrollHeight - content.clientHeight;
 					}
 					else if (shiftY <= 0) {
 						slider.style.top = '0%';
 						content.scrollTop = 0;
 					}
				}
			};

			const sliderDragStart = (e) => {
				scrolling = 1;
				slider.classList.add('active');
				dragStartY = e.pageY - slider.getBoundingClientRect().top;
			};

			const sliderDragEnd = (e) => {
				scrolling = 0;
				slider.classList.remove('active');
			};

			const touchMove = (e) => {
				e = touchStartY - e.touches[0].clientY;
				content.scrollTop = e > 5 ? content.scrollTop + touchStep 
 										  : e < -5 ? content.scrollTop - touchStep 
 												   : content.scrollTop;
				updateSliderPosition();
			};

			const touchStart = (e) => {
				slider.classList.add('active');
				touchStartY = e.touches[0].clientY;
			};

			const touchEnd = (e) => {
				slider.classList.remove('active');
			};

			const updateSliderPosition = () => {
				slider.style.top = parseInt(100 * content.scrollTop / content.scrollHeight) + '%';
			};

			const watch = () => {
				cancelAnimationFrame(watcher);
  				if (lastScrollHeight !== content.scrollHeight) {
    				slider.style.height = Math.ceil(100 * content.clientHeight / content.scrollHeight) + '%';
    				if (scrollbar.classList.contains('active')) {
    					if (content.scrollHeight <= content.clientHeight) {
    						scrollbar.classList.remove('active');
    					}
    				}
    				else {
    					if (content.scrollHeight > content.clientHeight) {
    						scrollbar.classList.add('active');
    					}
    				}
  				}

  				lastScrollHeight = content.scrollHeight;
  				watcher = requestAnimationFrame(watch);
			};

			const wheel = (e) => {
 				content.scrollTop = (e = Math.sign(e.deltaY)) > 0 ? content.scrollTop + wheelStep 
 															      : e < 0 ? content.scrollTop - wheelStep 
 																		  : content.scrollTop;
 				updateSliderPosition();
			};

			const C = function (o) {
				content = document.querySelector(o.content);
				scrollArea = o.scrollArea ? document.querySelector(o.scrollArea) : content;
				scrollArea.onmousemove = sliderDrag;
				scrollArea.onmouseup = sliderDragEnd;
				scrollArea.onwheel = wheel;
				scrollArea.ontouchmove = touchMove;
				scrollArea.ontouchend = touchEnd;
				scrollArea.ontouchstart = touchStart;
				scrollArea.style.overscrollBehavior = o.overscrollBehavior ? o.overscrollBehavior : 'none';
				scrollbar = document.querySelector(o.scrollbar);
				scrollbar.style.marginTop = '0px';
				if (scrollbar.offsetTop !== content.offsetTop) scrollbar.style.marginTop = content.offsetTop + 'px';
				scrollStep = o.scrollStep || 8;
				slider = document.querySelector(o.slider);
				slider.onmousedown = sliderDragStart;
				touchStep = o.touchStep || 6;
				watcher = requestAnimationFrame(watch);
				wheelStep = o.wheelStep || 8;
				o.scrollRestoration && 'scrollRestoration' in history && (history.scrollRestoration = o.scrollRestoration);
				updateSliderPosition();
			};

			return C;
		})();

		const previewScrollOptions = {
			content: '.content',
			scrollArea: '.body',
			scrollbar: '.vscrollbar',
			scrollRestoration: 'manual',
			slider: '.vscrollbar__slider'
		};

		const articleScrollOptions = {
            content: '.article.show .article-body',
            scrollArea: '.body',
            scrollbar: '.vscrollbar',
            scrollRestoration: 'manual',
            slider: '.vscrollbar__slider'
        };

		new VScroll(previewScrollOptions);

		const eventBindAll = (s, e, f) => {
			const element = document.querySelectorAll(s);
			for (s = 0; s < element.length; s++) {
				element[s].addEventListener(e, f);
			}
		};

		const getChildElement = (nodes, className) => {
			for (let i = 0; i < nodes.length; i++) {
				if (nodes[i].classList && nodes[i].classList.contains(className)) return nodes[i];
			}
		};

		eventBindAll('.card', 'click', (e) => {
			e = e.target;
			if (e.dataset.backgroundImage) document.querySelector('.background__image_default').style.backgroundImage = 'url(src/image/background/' + e.dataset.backgroundImage + ')';
			document.querySelector('.content').classList.add('show_article_' + e.dataset.articleId);
			document.querySelector('#' + e.dataset.articleId).classList.add('show');
			document.querySelector('#' + e.dataset.articleId + ' .article-header__title').textContent = '— ' + getChildElement(e.childNodes, 'card__title').textContent + ' —';

			new VScroll(articleScrollOptions);
		});

		eventBindAll('.article-header__button_type_back', 'click', (e) => {
			document.querySelector('.background__image_default').style = '';
			document.querySelector('.article.show').classList.remove('show');
			const content = document.querySelector('.content');
			content.className = content.className.replace(/\s+show[^\s]*/, ''); 

			new VScroll(previewScrollOptions);
		});