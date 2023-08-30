# essentials

## Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install
```

### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev
```

### Compiles and minifies for production

```
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build
```

### Lints and fixes files

```
# yarn
yarn lint

# npm
npm run lint

# pnpm
pnpm lint
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).

# let datas = []
# for(const menu in menus) {
#   datas.push(menus[menu])
#   datas.forEach((x) => {
#     if(x.children) {
#       x.children.map((y) => {
#         if(y.children) {
#           y.children.map(z => x.children.push(z))
#         }
#       })
#     }
#   })
# }

# let menuViews:any = reactive([])
# datas.map((item) => {
#   if(item.children) {
#     const datasVIew = item.children.filter(child => !child.children)
#     if(datasVIew) {
#       item.children = datasVIew
#     }
    
#   }
#   menuViews.push(item)
# })