# 🐳 Docker Cheat Sheet (MERN Team Project)

## 📁 Project Structure

```txt
omnichannel-pos-system/
```

Used for:

- React/Vite Client
- Node/Express Server
- Docker Compose
- Team Collaboration

---

# 🚀 MOST IMPORTANT COMMANDS

---

# 1️⃣ START CONTAINERS

## Start Project

```bash
docker compose up
```

### What it does

- Starts client container
- Starts server container
- Shows live logs

---

## Start in Background (Recommended)

```bash
docker compose up -d
```

### What it does

- Runs containers in background
- Terminal becomes free

---

# 2️⃣ STOP CONTAINERS

## Stop Running Containers

```bash
docker compose down
```

### What it does

- Stops all containers
- Removes stopped containers

---

# 3️⃣ REBUILD CONTAINERS

## Rebuild + Start

```bash
docker compose up --build
```

### Use When

- package.json changed
- Dockerfile changed
- dependencies changed
- env changed

---

## Rebuild in Background

```bash
docker compose up --build -d
```

---

# 4️⃣ CHECK RUNNING CONTAINERS

```bash
docker ps
```

### Shows

- Running containers
- Ports
- Container names
- Status

---

# 5️⃣ CHECK ALL CONTAINERS

```bash
docker ps -a
```

### Shows

- Running containers
- Stopped containers also

---

# 6️⃣ VIEW LOGS

## All Logs

```bash
docker compose logs
```

---

## Live Logs

```bash
docker compose logs -f
```

### `-f` means

```txt
follow logs live
```

---

## Specific Service Logs

### Server Logs

```bash
docker compose logs server
```

### Client Logs

```bash
docker compose logs client
```

---

# 7️⃣ RESTART CONTAINERS

```bash
docker compose restart
```

### Use When

- app freezes
- env updated
- server not responding

---

# 8️⃣ STOP SINGLE CONTAINER

## Stop Only Server

```bash
docker stop pos-server
```

---

# 9️⃣ START SINGLE CONTAINER

```bash
docker start pos-server
```

---

# 🔟 REMOVE EVERYTHING

## Remove Containers + Volumes

```bash
docker compose down -v
```

### Removes

- containers
- volumes
- cache data

---

# 1️⃣1️⃣ REMOVE UNUSED DATA

```bash
docker system prune
```

### Cleans

- unused images
- unused containers
- cache

---

# 1️⃣2️⃣ ENTER INSIDE CONTAINER

## Open Bash Terminal

### Server Container

```bash
docker exec -it pos-server sh
```

OR

```bash
docker exec -it pos-server bash
```

---

# 1️⃣3️⃣ CHECK IMAGES

```bash
docker images
```

### Shows

- Docker images
- size
- image ids

---

# 1️⃣4️⃣ REMOVE IMAGE

```bash
docker rmi IMAGE_ID
```

---

# 1️⃣5️⃣ REMOVE CONTAINER

```bash
docker rm CONTAINER_ID
```

---

# 🚀 YOUR DAILY WORKFLOW

---

# ✅ MORNING START

```bash
docker compose up -d
```

---

# ✅ AFTER INSTALLING NEW PACKAGE

```bash
docker compose up --build
```

---

# ✅ SEE ERRORS

```bash
docker compose logs server
```

---

# ✅ STOP PROJECT

```bash
docker compose down
```

---

# 🚀 COMMON ERRORS + FIX

---

# ❌ PORT ALREADY IN USE

Example:

```txt
Port 5000 already in use
```

## Fix

Check process:

```bash
sudo lsof -i :5000
```

Kill process:

```bash
kill -9 PID
```

---

# ❌ MODULE NOT FOUND

Example:

```txt
Cannot find package express
```

## Fix

Install package:

```bash
npm install express
```

Then rebuild:

```bash
docker compose up --build
```

---

# ❌ CHANGES NOT REFLECTING

## Fix

```bash
docker compose down
```

Then:

```bash
docker compose up --build
```

---

# ❌ CONTAINER CRASHING

## Fix Logs

```bash
docker compose logs server
```

---

# 🚀 DOCKER FILES YOU SHOULD KNOW

---

# 📄 docker-compose.yml

Controls:

- client
- server
- ports
- volumes

---

# 📄 Dockerfile

Defines:

- node version
- install dependencies
- run app

---

# 🚀 BEST PRACTICES FOR TEAM

---

# ✅ Always Commit

After package install:

```txt
package.json
package-lock.json
```

---

# ✅ Never Commit

```txt
node_modules
dist
.env
```

---

# ✅ Always Rebuild After Dependency Change

```bash
docker compose up --build
```

---

# 🚀 SUPER IMPORTANT

## Docker Commands Run From:

```txt
omnichannel-pos-system/
```

NOT:

- apps/client
- apps/server

---

# 🚀 QUICK MINI CHEAT SHEET

| Command | Purpose |
|---|---|
| `docker compose up` | Start app |
| `docker compose up -d` | Start in background |
| `docker compose down` | Stop app |
| `docker compose up --build` | Rebuild containers |
| `docker ps` | Running containers |
| `docker compose logs` | View logs |
| `docker compose restart` | Restart app |
| `docker compose down -v` | Remove everything |
| `docker system prune` | Clean Docker cache |
