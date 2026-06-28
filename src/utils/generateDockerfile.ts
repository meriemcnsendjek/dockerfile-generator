
import type { DockerConfig } from '../types/docker.types'
export function generateDockerfile(config: DockerConfig): string {
  switch (config.language) {
    case 'php':    return generatePhp(config)
    case 'node':   return generateNode(config)
    case 'python': return generatePython(config)
    case 'java':   return generateJava(config)
    default:       return ''
  }
}

function addEnvVars(config: DockerConfig): string {
  if (config.envVariables.length === 0) return ''
  return config.envVariables
    .map(env => `ENV ${env.key}=${env.value}`)
    .join('\n') + '\n\n'
}

function generatePhp(config: DockerConfig): string {
  const isLaravel = config.framework === 'laravel'
  let d = ''
  d += `FROM php:${config.version}-fpm\n\n`
  d += `WORKDIR ${config.workdir}\n\n`
  d += `RUN apt-get update && apt-get install -y \\\n`
  d += `    git curl zip unzip libpng-dev libonig-dev libxml2-dev\n\n`
  d += `RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd\n\n`
  if (isLaravel) {
    d += `COPY --from=composer:latest /usr/bin/composer /usr/bin/composer\n\n`
  }
  d += `COPY . .\n\n`
  if (isLaravel) {
    d += `RUN composer install --optimize-autoloader --no-dev\n\n`
    d += `RUN chown -R www-data:www-data ${config.workdir}\n\n`
  }
  d += addEnvVars(config)
  d += `EXPOSE ${config.port}\n\n`
  d += `CMD ["${config.startCommand}"]\n`
  return d
}

function generateNode(config: DockerConfig): string {
  let d = ''
  d += `FROM node:${config.version}-alpine\n\n`
  d += `WORKDIR ${config.workdir}\n\n`
  d += `COPY package*.json ./\n\n`
  d += `RUN npm install\n\n`
  d += `COPY . .\n\n`
  d += addEnvVars(config)
  d += `EXPOSE ${config.port}\n\n`
  d += `CMD ["${config.startCommand}"]\n`
  return d
}

function generatePython(config: DockerConfig): string {
  let d = ''
  d += `FROM python:${config.version}-slim\n\n`
  d += `WORKDIR ${config.workdir}\n\n`
  d += `COPY requirements.txt .\n\n`
  d += `RUN pip install --no-cache-dir -r requirements.txt\n\n`
  d += `COPY . .\n\n`
  d += addEnvVars(config)
  d += `EXPOSE ${config.port}\n\n`
  d += `CMD ["${config.startCommand}"]\n`
  return d
}

function generateJava(config: DockerConfig): string {
  let d = ''
  d += `FROM openjdk:${config.version}-jdk-slim\n\n`
  d += `WORKDIR ${config.workdir}\n\n`
  d += `COPY . .\n\n`
  d += `RUN ./mvnw clean package -DskipTests\n\n`
  d += addEnvVars(config)
  d += `EXPOSE ${config.port}\n\n`
  d += `CMD ["${config.startCommand}"]\n`
  return d
}