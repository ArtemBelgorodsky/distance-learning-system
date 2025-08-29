<template>
	<section v-if="user">
		<div class="page-hero rounded-3 p-3 mb-3 d-flex align-items-center justify-content-between shadow-soft">
			<h2 class="h5 mb-0">{{ blockTitle }}</h2>
			<span class="badge text-bg-secondary">Статус: {{ status }}</span>
		</div>
		<div class="row g-3">
			<div class="col-12">
				<div class="glass card shadow-soft">
					<div class="card-body">
						<h3 class="h5">Материалы</h3>
						<ul class="list-group list-group-flush mb-3">
							<li class="list-group-item" v-for="topic in topics" :key="topic.id">
								<template v-if="topic.type === 'link'">
									<a :href="topic.url" target="_blank" rel="noopener" class="link-primary">{{ topic.title }}</a>
								</template>
								<template v-else>
									<RouterLink class="link-primary" :to="{ name: 'block', params: { blockId }, query: { t: topic.id } }">{{ topic.title }}</RouterLink>
								</template>
							</li>
						</ul>
						<div v-if="currentPageTopic" class="pt-2 border-top">
							<h4 class="h6">{{ currentPageTopic.title }}</h4>
							<div>
								<div v-for="(ln, i) in contentLines" :key="i" class="mb-2">
									<span v-if="ln.before" class="content-text">{{ ln.before }} </span>
									<a v-if="ln.url" :href="ln.url" target="_blank" rel="noopener" class="link-primary">{{ ln.title || ln.url }}</a>
									<span v-if="ln.after && !ln.title" class="content-text"> {{ ln.after }}</span>
									<span v-if="ln.text && !ln.url" class="content-text">{{ ln.text }}</span>
								</div>
							</div>
						</div>
						<div class="d-grid mt-3">
							<RouterLink class="btn btn-primary" :to="{ name: 'block-quiz', params: { blockId } }">Пройти тест</RouterLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useTrainingStore, BLOCKS } from '../stores/training'

const route = useRoute()
const auth = useAuthStore()
const training = useTrainingStore()
const user = computed(() => auth.currentUser)

const blockId = computed(() => String(route.params.blockId))
const role = computed(() => user.value.role)

const topicsByBlock = computed(() => {
	const tp = training.getTopicsForRole(role.value)
	return {
		'intro-company': tp.introCompany,
		'onboarding': tp.onboarding,
		'mandatory': tp.mandatory,
		'development': tp.development,
	}
})

const blockTitle = computed(() => BLOCKS.find(b => b.id === blockId.value)?.title || '')
const topics = computed(() => topicsByBlock.value[blockId.value] || [])
const status = computed(() => training.getBlockStatus(user.value.id, blockId.value))
const currentPageTopic = computed(() => topics.value.find(t => t.type === 'page' && t.id === route.query.t))

const contentLines = computed(() => {
	const value = currentPageTopic.value?.content || ''
	return String(value)
		.split(/\r?\n/)
		.map(raw => {
			const text = raw.trim()
			if (!text) return null
			const m = text.match(/(https?:\/\/\S+)/)
			if (m) {
				let url = m[1].replace(/[).,;]+$/, '')
				const parts = text.split(m[1])
				const before = (parts[0] || '').trim()
				let after = (parts[1] || '').trim()
				let title = ''
				// If after starts with dash or colon, treat following text as title
				const titleMatch = after.match(/^(?:[-–—:]\s*)(.+)$/)
				if (titleMatch) {
					title = titleMatch[1].trim()
					after = ''
				}
				return { before, url, title, after }
			}
			return { text }
		})
		.filter(x => x && (x.text ? x.text.length > 0 : (x.before || x.url || x.title || x.after)))
})
</script>

<style scoped>
.content-text { white-space: pre-line; }
</style>

