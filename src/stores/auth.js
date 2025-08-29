import { defineStore } from 'pinia'

export const ROLES = {
	METHODIST: 'Методист образовательных программ',
	DIRECTOR: 'Режиссер онлайн-курсов',
	SUPPORT: 'Специалист отдела поддержки клиентов',
	HR: 'HR-менеджер',
}

const MOCK_USERS = [
	{ id: 'u1', username: 'ivan.m', password: '1234', fullName: 'Иван М.', role: ROLES.METHODIST },
	{ id: 'u2', username: 'olga.r', password: '1234', fullName: 'Ольга Р.', role: ROLES.DIRECTOR },
	{ id: 'u3', username: 'petr.s', password: '1234', fullName: 'Петр С.', role: ROLES.SUPPORT },
	{ id: 'hr1', username: 'hr', password: 'hr', fullName: 'HR Менеджер', role: ROLES.HR },
]

export const useAuthStore = defineStore('auth', {
	state: () => ({
		currentUserId: localStorage.getItem('currentUserId') || null,
		users: JSON.parse(localStorage.getItem('users') || 'null') || MOCK_USERS,
	}),
	getters: {
		currentUser(state) {
			return state.users.find(u => u.id === state.currentUserId) || null
		},
		isAuthenticated() {
			return !!this.currentUserId
		},
		isHR() {
			return this.currentUser?.role === ROLES.HR
		},
	},
	actions: {
		persist() {
			localStorage.setItem('users', JSON.stringify(this.users))
			if (this.currentUserId) localStorage.setItem('currentUserId', this.currentUserId)
			else localStorage.removeItem('currentUserId')
		},
		login(username, password) {
			const found = this.users.find(u => u.username === username && u.password === password)
			if (found) {
				this.currentUserId = found.id
				this.persist()
				return true
			}
			return false
		},
		logout() {
			this.currentUserId = null
			this.persist()
		},
	},
})

