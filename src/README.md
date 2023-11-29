# TuiCalendarProject
Use TUI Calendar to display GWS group member calendar event.

/TUI Calendar practise
├── /my-application-infrasturcture
│  ├── /deployments
│  │   ├── backend-deployment.yaml
│  │   └──  frontend-deployment.yaml
│  ├── /services
│  │   ├── backend-service.yaml
│  │   └──  frontend-service.yaml
│  ├── /secrets
│  └── /ingress
├── /src
│  ├── /backend
│  │   ├── /models
│  │   │   ├── datamodel.js
│  │   │   └── ...
│  │   ├── /node_modules
│  │   │   └── ...
│  │   ├── /routes
│  │   │   └── event.js
│  │   ├── server.js
│  │   ├── package.json
│  │   ├── package-lock.json
│  │   └── Dockerfile
│  ├── /frontend
│  │   ├── /dist
│  │   │   └──  ...
│  │   ├── /node_modules
│  │   │   └── ...
│  │   ├── /public
│  │   │   ├── /styles
│  │   │   │   └── ...
│  │   │   └── index.html
│  │   ├── /src
│  │   │   └──  index.js
│  │   ├── .babelrc
│  │   ├── package.json
│  │   ├── package-lock.json
│  │   ├── webpack.config.cjs
│  │   └── Dockerfile
│  ├── .env
│  ├── docker-composes.yaml
│  └── README.md(current file)

1. Not to commit the .env file to your source control (add .env to your .gitignore file). <- only for local test
2. use Kubernetes manifests instead of docker-compose.yml
