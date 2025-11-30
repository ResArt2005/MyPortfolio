assets = []; i_lang = -1
// Current languages
lang_list = ['ru', 'en']

assets.ru = {
	page_title: 'АльВиРити Студия',
	buttons: {
		amt: 5,
		proj: 'ОТКРЫТЬ',
	},
	topbar: {
		menu: 'Меню',
		1: 'Главная',
		2: 'Проекты',
		3: 'Оставить заявку',
		4: 'О нас',
		5: 'Контакты',
	},
	userform: {
		userName: 'Имя*',
		userMail: 'Адрес электронной почты*',
		userPhone: 'Номер телефона*',
		userAgreementText: 'Согласие на обработку персональных данных',
		userSubmitText: 'Отправить',
	},
	team: {
		teamTitle: 'Наша команда',
		1: 'Воробьев Алексей<br>(Руководитель Компании)',
		2: 'Бутрим Иван<br>(Дизайнер)',
		3: 'Родионов Данила<br>(Дизайнер)',
		4: 'Акчурин Тимур<br>(Дизайнер)',
		5: 'Карчаганов Алексей<br>(Дизайнер)',
		6: 'Панарин Даниил<br>(Программист)',
		7: 'Антоненко Андрей<br>(Программист)',
		8: 'Попов Алексей<br>(Программист)',
		9: 'Лунис Александр<br>(Программист)',
		10: 'Воробьев Антон<br>(Дизайнер)',
	},
	partners: { partnersTitle: 'Наши партнеры' },
	contacts: {
		1: 'Резидент технопарка <span style="white-space: nowrap;">"Жигулевская Долина"</span>',
		2: `Телефон:<br>
			<a href="tel:+79277888882" class='text' style='color:#85c'><x class='ref'>+7 (927) 788-88-82</x></a><br>
			E-mail:<br>
			<a href="mailto: AVorobyovS@ya.ru" class='text' style='color:#85c'><x class='ref'>AVorobyovS@ya.ru<x></a><br>
			Адрес:<br>
			Тольятти, ул. Южное Шоссе, д.163А  к2/4, А316`,
		3: 'Связаться с нами'
	},
	projects: {
		projects_title: 'Наши проекты',
		1: {
			1: 'АИС Контрактная биржа инноваций',
			2: `Это наш основной целевой проект, который в настоящее время находится в процессе разработки.`
		},
		2: {
			1: 'Основной сайт АльВиРити',
			2: `Это наш основной сайт, который ориентирован на услуги виртуальной и дополненной реальности.`
		},
		3: {
			1: 'Алексей Воробьев',
			2: `Персональная страница основателя компании АльВиРити.`
		},
	},
	sector: {
		0: {
			1: 'ИНТЕРНЕТ-ПРОЕКТЫ',
			2: 'От идеи до реализации',
			3: 'Разрабатываем и реализовываем для Вас самые смелые решения программного обеспечения IT индустрии',
		},
		1: {
			1: 'ЧТО<br>МЫ<br>ДЕЛАЕМ',
			2: 'ЛУЧШЕ<br>ВСЕГО',
			3: '',
			4: 'Создание сайта',
			5: `・Лэндинги<br>
				・Интернет-магазины<br>
				・Корпоративные сайты<br>
				・Порталы<br>
				・Поддержка сайтов`,
			6: 'Мобильная разработка',
			7: `・Адаптивные сайты<br>
				・Разработка мобильных приложений под Android`,
			8: 'Портреты в стиле Pop-Art',
			9: 'В нашей студии имеется уникальная возможность заказать для себя или своих близких арт-зарисовку портрета!',
			10: 'Интернет маркетинг',
			11: `・Реклама в VK<br>
				・Контекстная реклама<br>
				・Комплексный интернет-маркетинг<br>
				・Внедрение аналитики и отслеживания звонков`,
		},
		2: {
			1: 'Реализованные',
			2: 'Проекты',
			3: '',
			4: 'Разработка автоматизированной информационной системы контрактной биржи инноваций',
			5: 'Разработка основного сайта АльВиРиТи',
			6: 'Все проекты',
		},
		3: {
			1: 'Оставьте заявку',
			2: 'На бесплатную консультацию',
			3: `Хотите оформить заказ на услугу/проект, узнать готов ли ваш сайт, либо вступить с нами в партнерство?
				<br>Оставляйте заявку на нашем сайте и мы свяжемся с вами в ближайшее время!`,
		},
		4: {
			1: 'О КОМПАНИИ',
			2: 'Расскажем немного о себе',
			3: '',
			4: 'Добрый день, уважаемый читатель!',
			5: `Мы - молодая, активно развивающаяся компания.<br>
				Наша команда состоит из дипломированных и удостоенных профессиональных наград квалифицированных специалистов различных предметных областей современной IT-индустрии.
				<br><br>
				Также мы реализуем собственные продукты в виде приложений для виртуальной и дополненной реальности. Мы видим их не только как индустрию развлечений, 
				но и как помощь в обучении специалистов на различных производственных предприятиях с помощью симуляции производственных процессов в виртуальной реальности.
				<br>Рады клиентам, партнерам и инвесторам.
				<br><br>
				Спасибо за внимание.
				<br><br>
				<div class='bgFill' id='s4b2img'></div>
				<div style=" display: flex; justify-content: center;">
					<a href="https://vk.com/alvirity.studio" target="_blank" id="" class="button" style=" text-align: center; text-decoration: none;">Наш паблик в VK.COM</a>
				</div>`,
		},
	}
}

assets.en = {
	page_title: 'Alvirity Studio',
	buttons: {
		amt: 2,
		proj: 'VIEW',
	},
	topbar: {
		menu: 'Menu',
		1: 'Main Page',
		2: 'Projects',
		3: 'Submit application',
		4: 'About Us',
		5: 'Contacts',
	},
	userform: {
		userName: 'Name*',
		userMail: 'E-mail address*',
		userPhone: 'Phone number*',
		userAgreementText: 'Consent to personal data processing',
		userSubmitText: 'Submit',
	},
	team : {
		teamTitle: 'Our Team',
		1: 'Alexey Vorobyov<br>(Company Founder)',
		2: 'Ivan Butrim<br>(Designer)',
		3: 'Danila Rodionov<br>(Designer)',
		4: 'Timur Akchurin<br>(Designer)',
		5: 'Alexey Karchaganov<br>(Designer)',
		6: 'Daniil Panarin<br>(Programmer)',
		7: 'Andrey Antonenko<br>(Programmer)',
		8: 'Alexey Popov<br>(Programmer)',
		9: 'Alexander Lunis<br>(Programmer)',
		10: 'Anton Vorobyov<br>(Designer)',
	},
	partners: { partnersTitle: 'Our partners' },
	contacts: {
		1: 'Resident of the "Zhigulevskaya Dolina" technopark',
		2: `Phone number:<br>
			<a href="tel:+79277888882" class='text' style='color:#85c'><x class='ref'>+7 (927) 788-88-82</x></a><br>
			E-mail:<br>
			<a href="mailto:info@alvirity.com" class='text' style='color:#85c'><x class='ref'>info@alvirity.com<x></a><br>
			Address:<br>
			Togliatti, st. Yuzhnoe Shosse, 163A  b2/4, A316`,
		3: 'Contact us'
	},
	projects: {
		projects_title: 'Our Projects',
		1: {
			1: 'AIS Innovation Contract Exchange',
			2: `This is our main target project, which is currently under development.`
		},
		2: {
			1: 'AlViRity main website',
			2: `This is our main site, which is focused on Virtual and Augmented Reality services.`
		},
		3: {
			1: 'Alexey Vorobyov',
			2: `Personal page of the founder of "AlViRity" company.`
		},
	},
	sector: {
		0: {
			1: 'INTERNET-PROJECTS',
			2: 'From an idea to realization',
			3: 'We develop and implement the boldest software solutions in the IT industry for you',
		},
		1: {
			1: 'WHAT<br>DO WE<br>DO',
			2: 'THE<br>BEST',
			3: '',
			4: 'Website Creation',
			5: `・The Landings<br>
				・Online Stores<br>
				・Corporate Websites<br>
				・Web Portals<br>
				・Website Support Service`,
			6: 'Mobile Development',
			7: `・Adaptive Websites<br>
				・Android App Development`,
			8: 'Pop-Art Style Portrait',
			9: 'In our studio you have a unique opportunity to order an art sketch of a portrait for yourself or your loved ones!',
			10: 'Internet Marketing',
			11: `・VK Advertising<br>
				・Contextual Advertising<br>
				・Complex Internet Marketing<br>
				・Implementation of analytics and call tracking`,
		},
		2: {
			1: 'Implemented',
			2: 'Projects',
			3: '',
			4: 'Development of an automated information system for the Contract Innovation Exchange',
			5: 'Development of the primary AlViRity website',
			6: 'Full list',
		},
		3: {
			1: 'Submit an application',
			2: 'For a free consultation',
			3: `Would like to place an order for a service/project, verify if your site is ready, or apply for a partnership with us?
				<br>Leave a request on our website and we will contact you as soon as possible!`,
		},
		4: {
			1: 'Our Company',
			2: 'A little about us',
			3: '',
			4: 'Good afternoon, dear reader!',
			5: `Our team consists of qualified specialists in various fields of modern IT industry. 
				Our team consists of certified and professional award-winning qualified specialists in various subject areas of modern IT-industry.
				<br><br>
				We also sell our own products in the form of virtual and augmented reality applications. We see them not only as an entertainment industry, 
				but also as an aid to the training of specialists at various production enterprises using simulation of production processes in virtual reality.
				<br>We welcome customers, partners and investors.
				<br><br>
				Thank you for your attention.
				<br><br>`,
		},
	}
}

// Assemble data for the language and construct the corresponding components
function assemble(L) {
	document.getElementById('title').innerHTML = assets[lang].page_title
	
	for (let i in assets[L].topbar) {
		if (document.getElementById('top'+i)) { document.getElementById('top'+i).innerHTML = assets[L].topbar[i] }
	}
	document.getElementById('topMenu').innerHTML = assets[lang].topbar.menu
	
	for (let id in assets[L].userform) {
		if (document.getElementById(id)) { document.getElementById(id).placeholder = assets[L].userform[id] }
	}
	document.getElementById('userAgreement').innerHTML = assets[lang].userform.userAgreementText
	document.getElementById('userSubmit').value = assets[lang].userform.userSubmitText
	
	for (let i in assets[L].team) {
		if (document.getElementById('member'+i)) { document.getElementById('member'+i).innerHTML = assets[L].team[i] }
	}
	document.getElementById('teamTitle').innerHTML = assets[lang].team.teamTitle
	document.getElementById('partnersTitle').innerHTML = assets[lang].partners.partnersTitle
	
	for (let i in assets[L].contacts) {
		if (document.getElementById('contactsText'+i)) { document.getElementById('contactsText'+i).innerHTML = assets[L].contacts[i] }
	}
	
	for (let s in assets[L].sector) {
		for (let t in assets[L].sector[s]) {
			if (document.getElementById('s'+s+'t'+t)) { document.getElementById('s'+s+'t'+t).innerHTML = assets[L].sector[s][t] }
		}
	}
	
	for (let i in assets[L].projects) {
		if (document.getElementById('post'+i+'a')) { document.getElementById('post'+i+'a').innerHTML = assets[L].projects[i][1] }
		if (document.getElementById('post'+i+'b')) { document.getElementById('post'+i+'b').innerHTML = assets[L].projects[i][2] }
	}
	document.getElementById('projectsTitle').innerHTML = assets[L].projects.projects_title
	
	for (let i = 1; i < (assets[L].buttons.amt+1); i++) {
		if (document.getElementById('postRef'+i)) { document.getElementById('postRef'+i).innerHTML = assets[L].buttons.proj }
	}
}
// Change the language tag and call assemble()
function langs() {
	if (i_lang < lang_list.length-1) { i_lang++ } else { i_lang = 0 }
	lang = lang_list[i_lang];  assemble(lang);
	document.getElementById('language').innerHTML = lang.toUpperCase()
	document.getElementById('html').lang = lang
	print('@root :: Language is set to ['+lang.toUpperCase()+']')
}
