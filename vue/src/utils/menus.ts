const menus = [
    {
        path: 'dashboard',
        name: 'Dashboard',
        label: 'Dashboard',
        component: () => import('@/views/Home.vue'),
        icon: 'mdi-view-dashboard',
        show: true
    },
    {
        path: 'product',
        name: 'Product',
        label: 'Product',
        component: () => import('@/views/Product/index.vue'),
        icon: 'mdi-gift-open-outline',
        redirect: 'product/all-products',
        children: [
            {
                path: 'all-products',
                name: 'AllProducts',
                label: 'All Products',
                component: () => import('@/views/Product/AllProducts.vue'),
                icon: '',
                show: true
            },
            {
                path: 'product-new',
                name: 'NewProduct',
                label: 'Add New',
                component: () => import('@/views/Product/Add.vue'),
                icon: '',
                show: true
            },
            {
                path: 'product-edit/:id',
                name: 'EditAllProducts',
                label: 'Edit Product',
                component: () => import('@/views/Product/Edit.vue'),
                props: true,
                icon: '',
                show: false
            },
            {
                path: 'variables',
                name: 'Variables',
                label: 'Variables',
                component: () => import('@/views/Product/Misc/index.vue'),
                icon: '',
                show: true,
                meta: {
                    withSub: true
                }
            },
            {
                path: 'variables/option/:id',
                name: 'SubVariables',
                label: '',
                component: () => import('@/views/Product/Misc/index.vue'),
                props: true,
                icon: '',
                show: false,
                meta: {
                    withBack: true,
                    withPayload: true,
                    to: 'Variables'
                }
            },
            {
                path: 'categories',
                name: 'Categories',
                label: 'Categories',
                component: () => import('@/views/Product/Misc/index.vue'),
                icon: '',
                show: true,
                meta: {
                    withSub: true
                }
            },
            {
                path: 'categories/sub/:id',
                name: 'SubCategories',
                label: '',
                component: () => import('@/views/Product/Misc/index.vue'),
                props: true,
                icon: '',
                show: false,
                meta: {
                    withBack: true,
                    withPayload: true,
                    to: 'Categories'
                }
            },
            {
                path: 'tags',
                name: 'Tags',
                label: 'Tags',
                component: () => import('@/views/Product/Misc/index.vue'),
                icon: '',
                show: true
            },
            {
                path: 'brands',
                name: 'Brands',
                label: 'Brands',
                component: () => import('@/views/Product/Misc/index.vue'),
                icon: '',
                show: true
            },
            {
                path: 'attributes',
                name: 'Attributes',
                label: 'Attributes',
                component: () => import('@/views/Product/Misc/index.vue'),
                icon: '',
                show: true
            },
            {
                path: 'variables',
                name: 'ProductVariables',
                label: '',
                component: () => import('@/views/Home.vue'),
                icon: '',
                show: false
            },
            {
                path: 'variable-options',
                name: 'ProductVariableOptions',
                label: '',
                component: () => import('@/views/Home.vue'),
                icon: '',
                show: false
            },
            {
                path: 'categories/:id',
                name: 'EditCategories',
                label: '',
                component: () => import('@/views/Product/Misc/Add.vue'),
                props: true,
                icon: '',
                show: false
            },
            {
                path: 'variables/:id',
                name: 'EditVariables',
                label: '',
                component: () => import('@/views/Product/Misc/Add.vue'),
                props: true,
                icon: '',
                show: false
            },
            {
                path: 'categories/sub/edit/:id',
                name: 'EditSubCategories',
                label: '',
                component: () => import('@/views/Product/Misc/Add.vue'),
                props: true,
                icon: '',
                show: false
            },
            {
                path: 'variables/option/edit/:id',
                name: 'EditSubVariables',
                label: '',
                component: () => import('@/views/Product/Misc/Add.vue'),
                props: true,
                icon: '',
                show: false
            },
            {
                path: 'tags/:id',
                name: 'EditTags',
                label: '',
                component: () => import('@/views/Product/Misc/Add.vue'),
                props: true,
                icon: '',
                show: false
            },
            {
                path: 'brands/:id',
                name: 'EditBrands',
                label: '',
                component: () => import('@/views/Product/Misc/Add.vue'),
                props: true,
                icon: '',
                show: false
            },
            {
                path: 'attributes/:id',
                name: 'EditAttributes',
                label: '',
                component: () => import('@/views/Product/Misc/Add.vue'),
                props: true,
                icon: '',
                show: false
            },
            {
                path: 'variables/add',
                name: 'AddVariables',
                label: '',
                component: () => import('@/views/Product/Misc/Add.vue'),
                props: true,
                icon: '',
                show: false
            },
            {
                path: 'categories/add',
                name: 'AddCategories',
                label: '',
                component: () => import('@/views/Product/Misc/Add.vue'),
                props: true,
                icon: '',
                show: false
            },
            {
                path: 'categories/sub/add/:id',
                name: 'AddSubCategories',
                label: '',
                component: () => import('@/views/Product/Misc/Add.vue'),
                props: true,
                icon: '',
                show: false,
                meta: {
                    withId: true
                }
            },
            {
                path: 'variables/option/add/:id',
                name: 'AddSubVariables',
                label: '',
                component: () => import('@/views/Product/Misc/Add.vue'),
                props: true,
                icon: '',
                show: false,
                meta: {
                    withId: true
                }
            },
            {
                path: 'tags/add',
                name: 'AddTags',
                label: '',
                component: () => import('@/views/Product/Misc/Add.vue'),
                props: true,
                icon: '',
                show: false
            },
            {
                path: 'brands/add',
                name: 'AddBrands',
                label: '',
                component: () => import('@/views/Product/Misc/Add.vue'),
                props: true,
                icon: '',
                show: false
            },
            {
                path: 'attributes/add',
                name: 'AddAttributes',
                label: '',
                component: () => import('@/views/Product/Misc/Add.vue'),
                props: true,
                icon: '',
                show: false
            },
        ],
        show: true
    },
    
    {
        path: 'service',
        name: 'Service',
        label: 'Service',
        component: () => import('@/views/Service/index.vue'),
        icon: 'mdi-wrench-cog',
        redirect: 'service/all-services',
        children: [
            {
                path: 'all-services',
                name: 'AllServices',
                label: 'All Services',
                component: () => import('@/views/Service/AllServices.vue'),
                icon: '',
                show: true
            },
            {
                path: 'service-new',
                name: 'NewService',
                label: 'Add New',
                component: () => import('@/views/Service/Add.vue'),
                icon: '',
                show: true
            },
            {
                path: 'service-edit/:id',
                name: 'EditAllServices',
                label: '',
                component: () => import('@/views/Service/Edit.vue'),
                icon: '',
                show: false
            },
        ],
        show: true
    },
    { 
        path: '/:pathMatch(.*)*', 
        name: 'NotFound', 
        component: () => import('@/views/Error/404.vue'),
        show: false
    },

]

export default menus