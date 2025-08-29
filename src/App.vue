<template>
	<div class="container-fluid ">
		<div class="row min-vh-100 justify-content-center">
			<aside v-if="isAuthenticated" class="col-12 col-md-3 col-lg-2 border-end bg-light">
				<div class="p-3 border-bottom d-flex align-items-center gap-2">
					<div class="rounded-circle bg-success-subtle text-success d-flex align-items-center justify-content-center" style="width:36px;height:36px;">👤</div>
					<div class="overflow-hidden">
						<strong class="d-block text-truncate">{{ currentUser?.fullName || 'Профиль' }}</strong>
						<small class="text-secondary d-block text-truncate">{{ currentUser?.role }}</small>
					</div>
				</div>
				<nav class="list-group list-group-flush">
					<RouterLink v-if="!isHR" class="list-group-item list-group-item-action" to="/dashboard">Панель сотрудника</RouterLink>
					<RouterLink class="list-group-item list-group-item-action" v-if="isHR" to="/hr">Панель руководителя</RouterLink>
					<RouterLink  v-if = "!isHR" class="list-group-item list-group-item-action" to="/">Главная</RouterLink>
					<RouterLink class="list-group-item list-group-item-action" v-if="!isAuthenticated" to="/login">Вход</RouterLink>
					<RouterLink class="list-group-item list-group-item-action" v-else to="/logout">Выход</RouterLink>
				</nav>
			</aside>
			<main class="col-12 col-md-9 col-lg-10 p-0 m-0 w-100">
				<RouterView />
			</main>
		</div>
	</div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from './stores/auth'

const auth = useAuthStore()
const { isAuthenticated, isHR, currentUser } = storeToRefs(auth)
</script>

<style scoped>
.list-group-item.router-link-active { background-color: #e9f5ff; font-weight: 600; }
</style>
