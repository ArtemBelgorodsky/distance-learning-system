<template>
	<section>
		<p>Вы вышли из системы.</p>
		<RouterLink to="/login">Войти снова</RouterLink>
	</section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
onMounted(() => auth.logout())
</script>

