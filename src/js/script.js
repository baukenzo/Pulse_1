// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         speed: 1200,
//         // adaptiveHeight: true,
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
//         responsive: [
//             {
//                 breakpoint: 992,
//                 settings: {
//                     dots: true,
//                     arrows: false
//                 }
//             }
//         ]
//     });
//   });

const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: true,
    navPosition: "bottom",
    responsive: {		 
		320: {
			edgePadding: 20,
			gutter: 20,
			nav: true
		},
		576: {
            edgePadding: 20,
			gutter: 20,
			nav: true
		},

		768: {
			nav: true,
		},

		992: {
			nav: false
		},
		
		1200: {
			nav: false
		}
	}
});

document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
});


$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
	$(this)
		.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
});

function togglleSlide(item) {
	$(item).each(function(i) {
		$(this).on('click', function(e) {
			e.preventDefault();
			$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
			$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
		})
	});
};

togglleSlide('.catalog-item__link');
togglleSlide('.catalog-item__back');

// MODAL

$('[data-modal=consultation]').on('click', function() {
	$('.overlay, #consultation').fadeIn('slow');
});
$('.modal__close').on('click', function() {
	$('.overlay, #consultation, #thanks, #order').fadeOut('slow');
})

$('.button_mini').each(function(i) {
	$(this).on('click', function() {
		$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
		$('.overlay, #order').fadeIn('slow');
	})
});

document.addEventListener('keydown', (e) => {
	if (e.code === "Escape") { // К условию можно добавить что окно уже открыто, проверить style.display
	  $('#consultation, #order, .overlay').fadeOut(); // Действие по закрытию окна
	}
  })

  const overlay = document.querySelector('.overlay');
  overlay.addEventListener('click', (e) => {
	  if (e.target === overlay) {
		  $('#consultation, #order, .overlay').fadeOut();
		 // Закрываем модальное окно
	  }
  })


// Validation

function valideForms(form) {
	$(form).validate({
		rules: {
			name: {
				required: true,
				minlength: 5
			},	  
			phone: "required",
			email: {
				required: true,
				email: true
			}
		},
		messages: {
			name: {
				required: "Өтінемін, атыңызды енгізіңіз",
				minlength: jQuery.validator.format("Кем дегенде {0} әріп қажет!")
			},
			phone: "Сізге хабарласу үшін номеріңізді енгізіңіз",
			email: {
			  required: "Сізге хабарласу үшін почтаңызды енгізіңіз",
			  email: "Топас, почтаның адресін дұрыс жазыңыз name@example.com"
			}
		}
	});	
};

valideForms('#consultation-form')
valideForms('#consultation form')
valideForms('#order form')

$('input[name=phone]').mask("+7 (999) 999-9999");

// pochta

$('form').submit(function(e) {
	e.preventDefault();

	if (!$(this).valid()) {
		return;
	}

	$.ajax({
		type: "POST",
		url: "mailer/smart.php",
		data: $(this).serialize()
	}).done(function() {
		$(this).find("input").val("");
		$('#consultation, #order').fadeOut();
		$('.overlay, #thanks').fadeIn('slow');

		$('form').trigger('reset');
	});
	return false;
});

// Scroll smoothy

$(window).scroll(function() {
	if ($(this).scrollTop() > 1600) {
		$('.pageup').fadeIn();
	} else {
		$('.pageup').fadeOut();
	}
});

$("a[href=#up]").click(function(){
	var _href = $(this).attr("href");
	$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
	return false;
});


