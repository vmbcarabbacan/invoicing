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
        case 'Variables': return 'Variables'
        case 'SubVariables': return 'Variable Options'
        case 'SubCategories': return 'Sub Categories'
        case 'Tags': return 'Tags'
        case 'Brands': return 'Brands'
        case 'Attributes': return 'Attributes'
        case 'EditCategories': return 'Edit Category'
        case 'EditVariables': return 'Edit Variable'
        case 'EditSubVariables': return 'Edit Variable Option'
        case 'EditSubCategories': return 'Edit Sub Category'
        case 'EditTags': return 'Edit Tag'
        case 'EditBrands': return 'Edit Brand'
        case 'EditAttributes': return 'Edit Attribute'
        case 'AddCategories': return 'Add Category'
        case 'AddVariables': return 'Add Variable'
        case 'AddSubCategories': return 'Add Sub Category'
        case 'AddSubVariables': return 'Add Variable Option'
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
        case 'AllProducts': return links.product
        case 'Categories': return links.categories
        case 'Variables': return links.variables
        case 'SubCategories': return links.subcategories
        case 'SubVariables': return links.variableOptions
        case 'Tags': return links.tags
        case 'Brands': return links.brands
        case 'Attributes': return links.attributes
        case 'EditCategories': return links.categoryById
        case 'EditVariables': return links.variableById
        case 'EditSubCategories': return links.subcategoryById
        case 'EditSubVariables': return links.variableOptionById
        case 'EditTags': return links.tagsById
        case 'EditBrands': return links.brandById
        case 'EditAttributes': return links.attributeById
        case 'PostEditCategories': 
        case 'PostAddCategories': return links.categoryPost
        case 'PostEditSubCategories': 
        case 'PostAddSubCategories': return links.subcategoryPost
        case 'PostEditTags': 
        case 'PostAddTags': return links.tagsPost
        case 'PostEditBrands': 
        case 'PostAddBrands': return links.brandPost
        case 'PostEditAttributes': 
        case 'PostAddAttributes': return links.attributePost
        case 'PostEditVariables': 
        case 'PostAddVariables': return links.variablePost
        case 'PostEditSubVariables': 
        case 'PostAddSubVariables': return links.variableOptionPost
        default: return ''
    }
}

export function setKey(value: string) {
    switch(value) {
        case 'AddSubCategories':
        case 'SubCategories': return 'category'
        case 'AddSubVariables': 
        case 'SubVariables': return 'variable'
        default: return ''
    }
}