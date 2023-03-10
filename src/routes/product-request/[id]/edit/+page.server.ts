import type { Actions } from './$types'
import { editProductRequest, deleteProductRequest } from '$lib/actions'
import { redirect, fail } from '@sveltejs/kit'

// export const csr = false

interface Error {
	missing: string
	minLength: string
	maxLength: string
}

interface ErrorObj {
	[key: string]: Error
}

export const actions: Actions = {
	delete: async ({ params }) => {
		deleteProductRequest(params.id)
		throw redirect(303, '/')
	},
	edit: async ({ request }) => {
		const data = await request.formData()
		const id = data.get('id')
		const title = data.get('title')
		const category = data.get('category')
		const status = data.get('status')
		const description = data.get('description')

		const fieldsToCheck = [{ title }, { description }]
		const errors = {
			title: {},
			description: {}
		} as unknown as ErrorObj

		fieldsToCheck.forEach((field) => {
			for (const [key, val] of Object.entries(field)) {
				if (!val) {
					errors[key].missing = "Can't be empty"
				}
				if (val.length < 10) {
					errors[key].minLength = 'Must be at least 10 characters'
				}
				if (key === 'title' && val.length > 50) {
					errors[key].maxLength = 'Can be at most 50 characters'
				}
				if (key === 'description' && val.length > 200) {
					errors[key].minLength = 'Can be at most 200 characters'
				}
			}
		})

		const hasErrors = (errors: ErrorObj) => {
			let errorsFound = false
			Object.keys(errors).forEach((field) => {
				if (Object.keys(errors[field]).length) {
					errorsFound = true
				}
			})
			return errorsFound
		}

		if (hasErrors(errors)) {
			return fail(400, { data: { title, category, status, description }, errors: errors })
		} else {
			editProductRequest(data)
			throw redirect(303, `/product-request/${id}`)
		}
	}
}
