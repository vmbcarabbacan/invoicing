import router from "@/router"
import links from "@/utils/links"

export const toRoute = async (name: string) => {
    router.push({ name })
}

export const capitalizeWords = (value: string) => {
    return value.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

export function setTitle(value: string) {
    switch(value) {
        case 'AllProducts': return 'All Products'
        case 'NewProduct': return 'New Product'
        case 'Categories': return 'Categories'
        case 'SubCategories': return 'Sub Categories'
        case 'Tags': return 'Tags'
        case 'Brands': return 'Brands'
        case 'Attributes': return 'Attributes'
        case 'EditCategories': return 'Edit Category'
        case 'EditSubCategories': return 'Edit Sub Category'
        case 'EditTags': return 'Edit Tag'
        case 'EditBrands': return 'Edit Brand'
        case 'EditAttributes': return 'Edit Attribute'
        case 'AddCategories': return 'Add Category'
        case 'AddSubCategories': return 'Add Sub Category'
        case 'AddTags': return 'Add Tag'
        case 'AddBrands': return 'Add Brand'
        case 'AddAttributes': return 'Add Attribute'
        case 'ProductVariables': return 'Product Variables'
        case 'ProductVariableOptions': return 'Product Variable Options'
        case 'Service': return 'Services'
        default: return 'Not Found!'
    }
}

export function setUrl(value: string) {
    switch(value) {
        case 'Categories': return links.categories
        case 'SubCategories': return links.subcategories
        case 'Tags': return links.tags
        case 'Brands': return links.brands
        case 'EditCategories': return links.categoryById
        case 'EditSubCategories': return links.subcategoryById
        case 'EditTags': return links.tagsById
        case 'EditBrands': return links.brandById
        case 'PostEditCategories': 
        case 'PostAddCategories': return links.categoryPost
        case 'PostEditSubCategories': 
        case 'PostAddSubCategories': return links.subcategoryPost
        case 'PostEditTags': 
        case 'PostAddTags': return links.tagsPost
        case 'PostEditBrands': 
        case 'PostAddBrands': return links.brandPost
        default: return ''
    }
}