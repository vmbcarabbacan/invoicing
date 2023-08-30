const links = {
    // post request
    signin: '/auth',
    register: '/auth/register',

    // get request
    refresh: '/auth/refresh',
    logout: '/auth/logout',
    categories: '/misc/categories',
    subcategories: '/misc/categories/sub',
    brands: '/misc/brands',
    tags: '/misc/tags',
    categoryById: '/misc/category/ID',
    subcategoryById: '/misc/category/sub/ID',
    brandById: '/misc/brand/ID',
    tagsById: '/misc/tag/ID',
    categoryPost: '/misc/category',
    subcategoryPost: '/misc/category/sub',
    brandPost: '/misc/brand',
    tagsPost: '/misc/tag',
}

export default links