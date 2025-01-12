# mxcro-frontend

Frontend for [mxcro](https://github.com/jan146/mxcro), made with Vue.js, TypeScript and Bun.

## Installation & configuration

```sh
bun install
```

### Set backend url using environment variable

```sh
export VITE_BACKEND_URL="http://localhost:5000"
```

### Compile and Hot-Reload for Development

```sh
bun dev
```

### Type-Check, Compile and Minify for Production

```sh
bun run build
```

### Run production build

```sh
bun run vite preview [--host] [--port portNumber]
```

## Run in Kubernetes cluster
You can also run the application in a k8s cluster.
For that, we provided a Helm chart.

```sh
# Install dependencies
helm dependency build k8s/helm-mxcro-frontend
# Install the chart
helm upgrade --install mxcro-frontend k8s/helm-mxcro-frontend
```
This will install a NodePort service, which you can either expose using an Ingress or by changing it to a LoadBalancer.
