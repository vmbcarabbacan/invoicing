const types = [{ value: 1, label: 'Product' }, { value: 2, label: 'Service' }]
const roles = [{ value: 1, label: 'Admin' }, { value: 2, label: 'User' }, { value: 3, label: 'Account' }]
const statuses = [ { value: 1, label: 'Active' }, { value: 0, label: 'Inactive' }]
const productStatuses = [{value: 0, label: 'Draft'}, { value: 1, label: 'Published' }, { value: 2, label: 'Pending' }]
const algorithm = { algorithm: 'RS256' }

export { types, roles, statuses, productStatuses, algorithm }
