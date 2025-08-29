<template>
	<section v-if="user">
		<h2 class="h4 mb-3">Тест по блоку: {{ blockId }}</h2>
		<form class="card shadow-sm p-3" @submit.prevent="submit">
			<div v-for="(q, idx) in questions" :key="idx" class="mb-3">
				<p class="fw-semibold mb-2">{{ idx + 1 }}. {{ q.text }}</p>
				<div class="ms-2">
					<div class="form-check" v-for="(opt, i) in q.options" :key="i">
						<input class="form-check-input" type="radio" :id="'q' + idx + '-' + i" :name="'q' + idx" :value="i" v-model.number="answers[idx]" />
						<label class="form-check-label" :for="'q' + idx + '-' + i">{{ opt }}</label>
					</div>
				</div>
			</div>
			<button type="submit" class="btn btn-success">Сдать тест</button>
		</form>
		<div v-if="result !== null" class="alert mt-3" :class="result >= 80 ? 'alert-success' : 'alert-warning'">
			Результат: {{ result }}% ({{ result >= 80 ? 'зачет' : 'незачет' }})
		</div>
	</section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useTrainingStore } from '../stores/training'

const route = useRoute()
const router = useRouter()
const blockId = String(route.params.blockId)
const auth = useAuthStore()
const training = useTrainingStore()
const user = computed(() => auth.currentUser)

// Load questions from store per block
const questions = ref(training.getQuizForBlock(blockId))

const answers = ref(Array(questions.value.length).fill(-1))
const result = ref(null)

function submit() {
	const total = questions.value.length
	let correct = 0
	questions.value.forEach((q, idx) => { if (answers.value[idx] === q.correct) correct++ })
	const percent = Math.round((correct / total) * 100)
	result.value = percent
	training.saveQuizResult(user.value.id, blockId, percent)
	router.push({ name: 'block', params: { blockId } })
}
</script>

<style scoped>
</style>

