<template>
	<section v-if="user">
		<div class="page-hero rounded-3 p-3 mb-3 d-flex align-items-center justify-content-between shadow-soft">
			<h2 class="h5 mb-0">{{ user.fullName }}</h2>
			<span class="text-muted">{{ user.role }}</span>
		</div>
		<ul class="nav nav-tabs mb-3">
			<li class="nav-item"><button class="nav-link" :class="{ active: activeTab==='current' }" @click="activeTab='current'">Текущее обучение</button></li>
			<li class="nav-item"><button class="nav-link" :class="{ active: activeTab==='completed' }" @click="activeTab='completed'">Завершенное обучение</button></li>
		</ul>
		<div class="glass card shadow-soft">
			<div class="table-responsive">
				<table class="table align-middle mb-0">
					<thead class="table-light">
						<tr>
							<th>Блок</th>
							<th>Статус</th>
							<th>Дедлайн</th>
							<th>Действия</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="b in filteredBlocks" :key="b.id">
							<td class="fw-medium">{{ b.title }}</td>
							<td><span class="badge" :class="badgeClass(status(b.id))">{{ status(b.id) }}</span></td>
							<td style="max-width:160px"><input type="date" class="form-control" :value="deadline(b.id)" @change="onDeadline(b.id, $event.target.value)" /></td>
							<td class="actions">
								<div class="d-flex gap-2">
									<select class="form-select form-select-sm" style="max-width:180px" :value="status(b.id)" @change="onStatus(b.id, $event.target.value)">
										<option value="не пройдено">не пройдено</option>
										<option value="пройдено">пройдено</option>
										<option value="проверено">проверено</option>
									</select>
									<RouterLink class="btn btn-sm btn-outline-success" :to="{ name: 'dashboard' }">Открыть</RouterLink>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useTrainingStore, BLOCKS } from '../../stores/training'

const route = useRoute()
const auth = useAuthStore()
const training = useTrainingStore()
const userId = String(route.params.userId)
const user = computed(() => auth.users.find(u => u.id === userId))
const blocks = BLOCKS

function status(blockId) {
	return training.getBlockStatus(userId, blockId)
}
const activeTab = ref('current')
const filteredBlocks = computed(() => {
	if (activeTab.value === 'completed') {
		return blocks.filter(b => status(b.id) === 'проверено')
	}
	return blocks.filter(b => status(b.id) !== 'проверено')
})
function badgeClass(s) {
	switch (s) {
		case 'не пройдено': return 'text-bg-danger'
		case 'пройдено': return 'text-bg-warning'
		case 'проверено': return 'text-bg-success'
		default: return 'text-bg-secondary'
	}
}
function deadline(blockId) {
	return training.getUserDeadlines(userId)[blockId] || ''
}
function onDeadline(blockId, val) {
	training.setDeadline(userId, blockId, val)
}
function onStatus(blockId, val) {
	training.setBlockStatus(userId, blockId, val)
}
</script>

<style scoped>
.actions { white-space: nowrap; }
</style>

