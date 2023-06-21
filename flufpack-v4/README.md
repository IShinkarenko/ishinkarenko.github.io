<p align="center">
  <img src="img/logo.svg" alt="Flufpack - An ecosystem for pets electronic records">
</p>

# Welcome to Flufpack Website repo!

To install a website in a container running **Node.js** and **NGINX**, you can follow these steps:

1. Set up your project files:

- Create the necessary files for your website, including your Node.js application files and any static assets such as HTML, CSS, and JavaScript files.

- Ensure that your Node.js application is configured properly and can serve your website.

2. Create a Dockerfile:

- Create a new file named **`Dockerfile`** (without any file extension) in the root of your project directory.

- Open the `Dockerfile` and add the following content:

```
- Use the official Node.js base image`enter code here`

  FROM node:16 AS build

- Set the working directory in the container

  WORKDIR /app

- Copy package.json and package-lock.json to the container

  COPY package*.json ./

- Install dependencies==

  RUN npm ci

- Copy the rest of the project files to the container

  COPY . .

- Build the Node.js application

  RUN npm run build

- Use the official NGINX base image

  FROM nginx:alpine

- Copy the built files from the previous stage to the NGINX document root

  COPY --from=build /app/dist /usr/share/nginx/html

- Expose port 80 for HTTP traffic

  EXPOSE 80

- Start NGINX when the Docker container starts

  CMD ["nginx", "-g", "daemon off;"]
  ```

3. This Dockerfile utilizes a multi-stage build. It first builds your Node.js application using the `node:14` base image, and then copies the built files to an NGINX container based on the `nginx:alpine` image. It installs dependencies, builds the Node.js application, copies the built files to the NGINX document root, exposes port 80 for HTTP traffic, and starts NGINX when the container starts.

4. Build the Docker image:

- Open a terminal or command prompt and navigate to the root of your project directory.

- Run the following command to build the Docker image:

```
docker build -t website .
```

5. This command builds the Docker image using the `Dockerfile` in the current directory and tags it as `my-website` (you can choose a different name if desired).

6. Run the Docker container:

- Once the image is built, run the following command to start the Docker container:

```
docker run -d -p 80:80 website
```

7. This command starts the Docker container in detached mode (`-d` flag), maps port 80 of the container to port 80 of the host ==(`-p 80:80`)== , and uses the `my-website`== image.

8. Access your website:

- Open a web browser and visit **`http://localhost`** or **`http://<your-host-ip>`** to access your website running inside the Docker container.

By following these steps, you can package your Node.js application and static files into a containerized environment with NGINX as the web server. This allows for easy deployment and scalability of your website.
