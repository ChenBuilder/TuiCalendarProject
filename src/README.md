# TuiCalendarProject
Use TUI Calendar to display GWS group member calendar event.

/TUI Calendar practise</br>
├── /my-application-infrasturcture</br>
│  ├── /deployments</br>
│  │   ├── backend-deployment.yaml</br>
│  │   └──  frontend-deployment.yaml</br>
│  ├── /services</br>
│  │   ├── backend-service.yaml</br>
│  │   └──  frontend-service.yaml</br>
│  ├── /secrets</br>
│  └── /ingress</br>
├── /src</br>
│  ├── /backend</br>
│  │   ├── /models</br>
│  │   │   ├── datamodel.js</br>
│  │   │   └── ...</br>
│  │   ├── /node_modules</br>
│  │   │   └── ...</br>
│  │   ├── /routes</br>
│  │   │   └── event.js</br>
│  │   ├── server.js</br>
│  │   ├── package.json</br>
│  │   ├── package-lock.json</br>
│  │   └── Dockerfile</br>
│  ├── /frontend</br>
│  │   ├── /dist</br>
│  │   │   └──  ...</br>
│  │   ├── /node_modules</br>
│  │   │   └── ...</br>
│  │   ├── /public</br>
│  │   │   ├── /styles</br>
│  │   │   │   └── ...</br>
│  │   │   └── index.html</br>
│  │   ├── /src</br>
│  │   │   └──  index.js</br>
│  │   ├── .babelrc</br>
│  │   ├── package.json</br>
│  │   ├── package-lock.json</br>
│  │   ├── webpack.config.cjs</br>
│  │   └── Dockerfile</br>
│  ├── .env</br>
│  ├── docker-composes.yaml</br>
│  └── README.md(current file)</br>

1. Not to commit the .env file to your source control (add .env to your .gitignore file). <- only for local test</br>
2. use Kubernetes manifests instead of docker-compose.yml</br>
