import { defineStore } from "pinia"
import { KEYOFSTRING } from "@/types"
import axios from "@/plugins/axios"
import links from "@/utils/links"
import { capitalizeWords } from '@/store/composables/common'

export const useProductStore = defineStore('product', {
    state: () => ({
        product: {
            id: '',
            name: '',
            description: '',
            is_variable: false,
            track_quantity: true,
            continue_out_of_stock: false,
            type: 1,
            category: null,
            sub_category: null,
            brand: null,
            tags: [],
            attributes: [],
            status: 0,
            options: [],
            variable_options: []
        },
        products: [],
        variables: [],
        options: [],
        attributes: [],
        categories: [],
        subCategories: [],
        tags: [],
        brands: []
    }),
    getters: {
        getVariables(state) {
            return state.variables.map((x: KEYOFSTRING) => {
                return {
                    value: x._id,
                    title: capitalizeWords(<string> x.name)
                }
            })
        },
        generateVariables(state) {
            const variables = state.product.options.map(opt => {
                return opt.variable_option_id.map(var_opt => {
                    return {
                        variation_id: opt.variable_id,
                        variation_option_id: var_opt,
                        variation_name: opt.variables.find(x => x.value === opt.variable_id).title,
                        variation_option_name: opt.options.find(x => x.value === var_opt).title
                    }
                })
            })

            const options = generateVariable(variables.length, variables, state.product.id)

            this.options = options
            return options
        }
    },
    actions: {
        async getProducts(link: string, payload: KEYOFSTRING) {
            try {
                const response = await axios().get(link, {
                    params: payload
                })
                this.products = response.data.data

                return response
            } catch (error) {
                return error
            }
        },

        async saveProduct(payload: KEYOFSTRING) {
            try {
                let response = {} as any

                if(payload.id) response = await axios().patch(links.product, payload)

                response = await axios().post(links.product, payload)

                const product = response.data.data
                product.id = product._id
                delete product._id

                this.product = product
                return product
            } catch (error) {
                return error
            }
        },

        async getProduct(link: string) {

            const response: any = await axios().get(link)
            const data = await response.data.data
            const id = data._id
            delete data.deleted_at
            delete data._id

            this.product = { ...data, id}
            return response
        },

        async getVaribales() {
            const response:any = await axios().get(links.variables, {
                params: {
                    show_all: true
                }
            })
            this.variables = response.data.data
        },

        async getVariableOptionByVariableId(variable: string) {
            const response:any = await axios().get(links.variableOptions, {
                params: {
                    show_all: true,
                    variable
                }
            })

            return response.data.data.map((x: KEYOFSTRING) => {
                return {
                    value: x._id,
                    title: capitalizeWords(<string> x.name)
                }
            })
        },

        async getAllAttributes() {
            const payload = {
                params: {
                    show_all: true
                }
            }

            const attributes = await axios().get(links.attributes, payload)
            const categories = await axios().get(links.categories, payload)
            const brands = await axios().get(links.brands, payload)
            const tags = await axios().get(links.tags, payload)

            this.attributes = attributes.data.data.map((x: KEYOFSTRING) => {
                return {
                    value: x._id,
                    title: capitalizeWords(<string> x.name)
                }
            })
            this.categories = categories.data.data.map((x: KEYOFSTRING) => {
                return {
                    value: x._id,
                    title: capitalizeWords(<string> x.name)
                }
            })
            this.brands = brands.data.data.map((x: KEYOFSTRING) => {
                return {
                    value: x._id,
                    title: capitalizeWords(<string> x.name)
                }
            })
            this.tags = tags.data.data.map((x: KEYOFSTRING) => {
                return {
                    value: x._id,
                    title: capitalizeWords(<string> x.name)
                }
            })
        },

        async getAllSubCategories({ category }) {
            const payload = {
                params: {
                    category,
                    show_all: true
                }
            }

            const subcategories = await axios().get(links.subcategories, payload)
            this.subCategories = subcategories.data.data.map((x: KEYOFSTRING) => {
                return {
                    value: x._id,
                    title: capitalizeWords(<string> x.name)
                }
            })
        }
    }
})

function generateVariable(count, sections, product_id) {
    const results = []
    switch (count) {
        case 1:
          for (var i = 0; i < sections[0].length; i++) {
            results.push({
              name: sections[0][i]["variation_option_name"],
              skus: [sections[0][i]],
              product_id,
              price: 0,
              quantity: 0,
              images: [],
              description: null
            })
          }
          break
        case 2:
          for (var i = 0; i < sections[0].length; i++) {
            for (var j = 0; j < sections[1].length; j++) {
              results.push({
                name:
                  sections[0][i]["variation_option_name"] +
                  " / " +
                  sections[1][j]["variation_option_name"],
                  skus: [sections[0][i], sections[1][j]],
                  product_id,
                  price: 0,
                  quantity: 0,
                  images: [],
                  description: null
              })
            }
          }
          break
    }

    return results
}