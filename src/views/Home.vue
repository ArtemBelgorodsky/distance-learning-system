<template>
	<div>
		<!-- Navbar (fixed-style mock within page for concept visual) -->
		<nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
			<div class="container">
				<a class="navbar-brand fw-semibold" href="#">EduNext</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"><span class="navbar-toggler-icon"></span></button>
				<div class="collapse navbar-collapse" id="mainNav">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<li class="nav-item"><a class="nav-link" href="#courses">Курсы</a></li>
						<li class="nav-item"><a class="nav-link" href="#mentors">Преподаватели</a></li>
						<li class="nav-item"><a class="nav-link" href="#pricing">Цены</a></li>
						<li class="nav-item"><a class="nav-link" href="#about">О нас</a></li>
					</ul>
					<div class="d-flex align-items-center gap-2">
						<RouterLink class="btn btn-outline-primary" to="/login">Войти</RouterLink>
						<a class="btn btn-primary" href="#cta">Регистрация</a>
						<button class="btn btn-light d-none d-lg-inline-flex align-items-center justify-content-center p-2 rounded-circle"><span>👤</span></button>
					</div>
				</div>
			</div>
		</nav>

		<!-- Hero -->
		<section class="hero position-relative overflow-hidden">
			<div class="container position-relative">
				<div class="row align-items-center py-5 py-lg-6">
					<div class="col-lg-7">
						<h1 class="display-5 fw-bold mb-3 text-dark">Образование будущего уже здесь</h1>
						<p class="lead text-secondary mb-4">Интерактивные курсы с персональной поддержкой от лучших экспертов.</p>
						<a href="#courses" class="btn btn-lg btn-primary d-inline-flex align-items-center gap-2">
							<span>Найти свой курс</span>
							<span>→</span>
						</a>
					</div>
					<div class="col-lg-5 d-none d-lg-block">
						<div class="hero-visual glass p-4 ">
							<img src="../../public/1.png" class="img-thumbnail">
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Benefits -->
		<section class="py-5" id="benefits">
			<div class="container">
				<div class="row g-4">
					<div class="col-md-3 col-sm-6" v-for="b in benefits" :key="b.title">
						<div class="glass card h-100 shadow-lg border-0">
							<div class="card-body p-4">
								<div class="display-6 mb-2">{{ b.icon }}</div>
								<h3 class="h6 fw-semibold mb-2">{{ b.title }}</h3>
								<p class="text-secondary mb-0">{{ b.text }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Popular courses -->
		<section class="py-5 bg-light" id="courses">
			<div class="container">
				<h2 class="h4 fw-semibold mb-4">Популярные курсы</h2>
				<div class="row g-4">
					<div class="col-md-4" v-for="c in courses" :key="c.title">
						<div class="card h-100 shadow-sm border-0 position-relative">
							
								<div class="badge bg-primary position-absolute bottom-0 end-0 m-3">Популярный</div>
							
							<div class="card-body">
								<div class="d-flex align-items-center gap-2 mb-2">
									<img :alt="c.author" class="rounded-circle" width="28" height="28" :src="c.avatar" />
									<strong class="small">{{ c.author }}</strong>
									<span class="text-warning">★★★★★</span>
								</div>
								<h3 class="h6 mb-2">{{ c.title }}</h3>
								<p class="text-secondary mb-3">{{ c.desc }}</p>
								<a href="#" class="btn btn-sm btn-outline-primary">Подробнее</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Testimonials -->
		<section class="py-5" id="testimonials">
			<div class="container">
				<h2 class="h4 fw-semibold mb-4">Отзывы студентов</h2>
				<div class="row g-4">
					<div class="col-md-4" v-for="t in testimonials" :key="t.name">
						<div class="card shadow-sm border-0 h-100 glass">
							<div class="card-body">
								<div class="display-6 mb-2">“</div>
								<p class="mb-3">{{ t.text }}</p>
								<div class="d-flex align-items-center gap-2">
									<img :alt="t.name" class="rounded-circle" width="32" height="32" :src="t.avatar" />
									<div>
										<strong class="small">{{ t.name }}</strong>
										<div class="text-secondary small">{{ t.role }}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Final CTA -->
		<section class="py-5 text-white cta" id="cta">
			<div class="container">
				<div class="row justify-content-center text-center">
					<div class="col-lg-8">
						<h3 class="h3 fw-bold mb-2">Начни свой путь к знаниям сегодня!</h3>
						<p class="mb-3 text-white-50">Присоединяйся к тысячам довольных студентов.</p>
						<a class="btn btn-lg btn-success" href="#">Зарегистрироваться бесплатно</a>
					</div>
				</div>
			</div>
		</section>

		<!-- Footer -->
		<footer class="bg-white border-top py-4">
			<div class="container">
				<div class="row g-4">
					<div class="col-6 col-md-3">
						<h5 class="h6">О компании</h5>
						<ul class="list-unstyled text-secondary small mb-0">
							<li><a class="link-secondary" href="#about">О нас</a></li>
							<li><a class="link-secondary" href="#">Вакансии</a></li>
							<li><a class="link-secondary" href="#">Пресса</a></li>
						</ul>
					</div>
					<div class="col-6 col-md-3">
						<h5 class="h6">Продукт</h5>
						<ul class="list-unstyled text-secondary small mb-0">
							<li><a class="link-secondary" href="#courses">Курсы</a></li>
							<li><a class="link-secondary" href="#mentors">Преподаватели</a></li>
							<li><a class="link-secondary" href="#pricing">Цены</a></li>
						</ul>
					</div>
					<div class="col-12 col-md-6">
						<h5 class="h6">Контакты</h5>
						<p class="text-secondary small mb-2">support@edunext.example</p>
						<div class="d-flex gap-2">
							<a class="btn btn-sm btn-outline-secondary" href="#">VK</a>
							<a class="btn btn-sm btn-outline-secondary" href="#">TG</a>
							<a class="btn btn-sm btn-outline-secondary" href="#">YT</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const benefits = ref([
	{ icon: '🎥', title: 'Живые вебинары', text: 'Онлайн‑сессии с экспертами и запись в архив.' },
	{ icon: '♾️', title: 'Пожизненный доступ', text: 'Учитесь в удобное время и возвращайтесь к материалам.' },
	{ icon: '🎓', title: 'Сертификаты', text: 'Подтверждайте компетенции и копите достижения.' },
	{ icon: '👥', title: 'Сообщество', text: 'Общайтесь с однокурсниками и наставниками.' },
])

const courses = ref([
	{ title: 'Проектирование онлайн‑курсов', desc: 'Практики ADDIE, SAM и дизайн заданий.', author: 'Алексей П.', avatar: 'https://avatars.githubusercontent.com/u/1?v=4' },
	{ title: 'Видеопродакшн для EdTech', desc: 'Съемка, звук, монтаж и контроль качества.', author: 'Ольга Р.', avatar: 'https://avatars.githubusercontent.com/u/2?v=4' },
	{ title: 'Клиентский сервис в образовании', desc: 'SLA, скрипты, работа с возражениями.', author: 'Петр С.', avatar: 'https://avatars.githubusercontent.com/u/3?v=4' },
])

const testimonials = ref([
	{ name: 'Мария', role: 'PM в EdTech', text: 'Очень практичные задания и сильная экспертиза преподавателей.', avatar: 'https://avatars.githubusercontent.com/u/4?v=4' },
	{ name: 'Игорь', role: 'Инструкциональный дизайнер', text: 'Понравилась глубина материалов и поддержка менторов.', avatar: 'https://avatars.githubusercontent.com/u/5?v=4' },
	{ name: 'Светлана', role: 'Автор курсов', text: 'Быстро применила инструменты в своем проекте, рекомендации топ!', avatar: 'https://avatars.githubusercontent.com/u/6?v=4' },
])
</script>

<style scoped>
.hero { background: radial-gradient(1200px 600px at 10% 10%, #e3f2fd 0, transparent 60%),
			linear-gradient(135deg, #e3f2fd, #f3e5f5); }
.glass { background: rgba(255,255,255,0.7); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.5); border-radius: 12px; }
.hero-visual { border-radius: 16px; min-height: 260px; position: relative; }
.hero-visual .dots::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(#6f42c1 1px, transparent 1px); background-size: 18px 18px; opacity: .15; border-radius: 16px; }
.hero-visual .rockets::before { content: '🚀 🚀 🚀'; position: absolute; right: 16px; bottom: 16px; font-size: 32px; filter: drop-shadow(0 6px 12px rgba(0,0,0,.08)); }
.cta { background: linear-gradient(135deg, #0d6efd, #6f42c1); }
</style>

