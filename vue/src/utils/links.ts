const links = {
    // post request
    signin: '/auth',
    register: '/auth/register',

    // get request
    refresh: '/auth/refresh',
    logout: '/auth/logout',
    categories: '/misc/categories',
    variables: '/variable',
    variableOptions: '/variable/option',
    subcategories: '/misc/categories/sub',
    brands: '/misc/brands',
    tags: '/misc/tags',
    attributes: '/misc/attributes',
    categoryById: '/misc/category/ID',
    variableById: '/variable/ID',
    variableOptionById: '/variable/option/ID',
    subcategoryById: '/misc/category/sub/ID',
    brandById: '/misc/brand/ID',
    attributeById: '/misc/attribute/ID',
    tagsById: '/misc/tag/ID',
    categoryPost: '/misc/category',
    variablePost: '/variable',
    variableOptionPost: '/variable/option',
    subcategoryPost: '/misc/category/sub',
    brandPost: '/misc/brand',
    attributePost: '/misc/attribute',
    tagsPost: '/misc/tag',
}

export default links