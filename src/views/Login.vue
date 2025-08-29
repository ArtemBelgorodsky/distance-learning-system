<template>
	<div class="min-vh-100 d-flex align-items-center py-4">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-12 col-xl-10">
					<div class="card shadow-soft overflow-hidden border-0">
						<div class="row g-0">
							<div class="col-md-6 d-none d-md-block" style="background: linear-gradient(135deg,#0d6efd,#6f42c1);">
								<div class="h-100 p-4 d-flex flex-column justify-content-between text-white">
									<div>
										<div class="d-flex align-items-center gap-3 mb-3">
											<div class="rounded-circle bg-white text-primary d-flex align-items-center justify-content-center" style="width:48px;height:48px;">🎓</div>
											<h2 class="h5 mb-0">Система дистанционного обучения</h2>
										</div>
										<p class="mb-3 text-white-50">Интерактивные курсы, персональная поддержка, прогресс и дедлайны — всё в одном месте.</p>
										<ul class="small text-white-50 mb-0 ps-3">
											<li>Роль‑ориентированные программы</li>
											<li>Квизы и статусы прохождения</li>
											<li>Управление сроками HR‑менеджером</li>
										</ul>
									</div>
									<div class="text-end opacity-75">© Цифровое образование</div>
								</div>
							</div>
							<div class="col-md-6">
								<form class="p-4 p-lg-5" @submit.prevent="onSubmit">
									<h1 class="h4 mb-1 text-center">Вход в систему</h1>
									<p class="text-secondary text-center mb-4">Введите логин и пароль, чтобы продолжить</p>
									<div class="mb-3">
										<label class="form-label">Логин</label>
										<div class="input-group">
											<span class="input-group-text">@</span>
											<input v-model="username" class="form-control" placeholder="ivan.m" autocomplete="username" />
										</div>
									</div>
									<div class="mb-2">
										<label class="form-label">Пароль</label>
										<div class="input-group">
											<input :type="showPassword ? 'text' : 'password'" v-model="password" class="form-control" placeholder="••••" autocomplete="current-password" />
											<button type="button" class="btn btn-outline-secondary" @click="showPassword = !showPassword">{{ showPassword ? 'Скрыть' : 'Показать' }}</button>
										</div>
									</div>
									<div class="d-flex justify-content-between align-items-center mb-3">
										<div class="form-check">
											<input class="form-check-input" type="checkbox" id="remember" />
											<label class="form-check-label" for="remember">Запомнить меня</label>
										</div>
										<a href="#" class="small">Забыли пароль?</a>
									</div>
									<button type="submit" class="btn btn-primary w-100">Войти</button>
									<div v-if="error" class="alert alert-danger mt-3 mb-0">Неверный логин или пароль</div>
									<div class="small text-muted mt-3">
										Демо‑учётные записи:
										<ul class="mb-0 ps-3">
											<li>Методист образовательных программ: ivan.m / 1234</li>
											<li>Режиссер онлайн-курсов: olga.r / 1234</li>
											<li>Специалист отдела поддержки клиентов: petr.s / 1234</li>
											<li>HR: hr / hr</li>
										</ul>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const username = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref(false)

function onSubmit() {
	const ok = auth.login(username.value.trim(), password.value)
	if (!ok) {
		error.value = true
		return
	}
	const redirect = route.query.redirect || '/dashboard'
	router.push(String(redirect))
}
</script>

<style scoped>
</style>

