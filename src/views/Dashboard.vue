<template>
	<section>
		<div class="page-hero rounded-3 p-4 mb-3 shadow-soft">
			<div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
				<h2 class="h5 mb-0">Мои блоки обучения</h2>
				<div class="input-group" style="max-width:320px">
					<span class="input-group-text">Поиск</span>
					<input class="form-control" v-model="q" placeholder="Найти блок" />
				</div>
			</div>
		</div>
		<ul class="nav nav-tabs mb-3">
			<li class="nav-item"><button class="nav-link active" data-bs-toggle="tab">Текущее обучение</button></li>
			<li class="nav-item"><button class="nav-link" data-bs-toggle="tab">Завершенное обучение</button></li>
		</ul>
		<div class="glass card shadow-soft">
			<div class="table-responsive">
				<table class="table table-hover align-middle mb-0">
					<thead class="table-light">
						<tr>
							<th style="width:56px">№</th>
							<th>Название блока</th>
							<th>Статус</th>
							<th>Дедлайн</th>
							<th class="text-end" style="width:160px">Действия</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(block, idx) in filteredBlocks" :key="block.id">
							<td>{{ idx + 1 }}</td>
							<td>{{ block.title }}</td>
							<td><span class="badge text-bg-secondary">{{ getStatus(block.id) }}</span></td>
							<td>{{ deadlineFor(block.id) || '—' }}</td>
							<td class="text-end">
								<RouterLink class="btn btn-sm btn-outline-primary" :to="{ name: 'block', params: { blockId: block.id } }">Открыть</RouterLink>
								<RouterLink class="btn btn-sm btn-success ms-2" :to="{ name: 'block-quiz', params: { blockId: block.id } }">Тест</RouterLink>
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
import { useAuthStore } from '../stores/auth'
import { useTrainingStore, BLOCKS } from '../stores/training'

const auth = useAuthStore()
const training = useTrainingStore()
const user = computed(() => auth.currentUser)
const blocks = BLOCKS

function getStatus(blockId) {
	return training.getBlockStatus(user.value.id, blockId)
}

function deadlineFor(blockId) {
	return training.getUserDeadlines(user.value.id)[blockId]
}

const q = ref('')
const filteredBlocks = computed(() => {
	const term = q.value.trim().toLowerCase()
	if (!term) return blocks
	return blocks.filter(b => b.title.toLowerCase().includes(term))
})
</script>

<style scoped>
</style>

