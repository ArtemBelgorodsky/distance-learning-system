<template>
	<section>
		<div class="page-hero rounded-3 p-3 mb-3 d-flex align-items-center justify-content-between shadow-soft flex-wrap gap-2">
			<h2 class="h5 mb-0">Мои сотрудники</h2>
			<div class="input-group" style="max-width:320px">
				<span class="input-group-text">Поиск</span>
				<input class="form-control" v-model="q" placeholder="Найти в списке" />
			</div>
		</div>
		<ul class="nav nav-tabs mb-3">
			<li class="nav-item"><button class="nav-link" :class="{ active: activeTab==='current' }" @click="activeTab='current'">Текущее обучение</button></li>
			<li class="nav-item"><button class="nav-link" :class="{ active: activeTab==='completed' }" @click="activeTab='completed'">Завершенное обучение</button></li>
		</ul>
		<div class="glass card shadow-soft">
			<div class="table-responsive">
				<table class="table table-hover align-middle mb-0">
					<thead class="table-light">
						<tr>
							<th style="width:56px">№</th>
							<th>ФИО</th>
							<th>Должность</th>
							<th>Следующий дедлайн</th>
							<th class="text-end" style="width:140px">Операции</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(u, idx) in filteredByTab" :key="u.id">
							<td>{{ idx + 1 }}</td>
							<td><RouterLink class="link-primary" :to="{ name: 'hr-user', params: { userId: u.id } }">{{ u.fullName }}</RouterLink></td>
							<td>{{ u.role }}</td>
							<td>{{ nextDeadline(u.id) || '—' }}</td>
							<td class="text-end"><RouterLink class="btn btn-sm btn-outline-success" :to="{ name: 'hr-user', params: { userId: u.id } }">Подробно</RouterLink></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore, ROLES } from '../../stores/auth'
import { useTrainingStore, BLOCKS } from '../../stores/training'

const auth = useAuthStore()
const training = useTrainingStore()

const employees = computed(() => auth.users.filter(u => u.role !== ROLES.HR))
const q = ref('')
const filtered = computed(() => {
	const term = q.value.trim().toLowerCase()
	if (!term) return employees.value
	return employees.value.filter(u => `${u.fullName} ${u.role}`.toLowerCase().includes(term))
})
const activeTab = ref('current')
const filteredByTab = computed(() => {
	// For dashboard list we can just reuse filtered; tab may affect future aggregations.
	return filtered.value
})

function nextDeadline(userId) {
	const deadlines = training.getUserDeadlines(userId)
	const ordered = BLOCKS.map(b => deadlines[b.id]).filter(Boolean).sort()
	return ordered[0]
}
</script>

<style scoped>
</style>

