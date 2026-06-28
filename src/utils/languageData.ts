

import {  type LanguageOption } from '../types/docker.types'

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    id: 'php',
    label: 'PHP / Laravel',
    icon: '🐘',
    versions: ['8.3', '8.2', '8.1', '8.0'],
    defaultPort: '8000',
    defaultWorkdir: '/var/www',
    defaultStartCommand: 'php artisan serve --host=0.0.0.0',
    frameworks: [
      { id: 'laravel', label: 'Laravel' },
      { id: 'symfony', label: 'Symfony' },
      { id: 'vanilla', label: 'PHP Vanilla' },
    ]
  },
  {
    id: 'node',
    label: 'Node.js',
    icon: '🟢',
    versions: ['20', '18', '16'],
    defaultPort: '3000',
    defaultWorkdir: '/app',
    defaultStartCommand: 'node index.js',
    frameworks: [
      { id: 'express', label: 'Express.js' },
      { id: 'nestjs', label: 'NestJS' },
      { id: 'vanilla', label: 'Node Vanilla' },
    ]
  },
  {
    id: 'python',
    label: 'Python',
    icon: '🐍',
    versions: ['3.12', '3.11', '3.10'],
    defaultPort: '8000',
    defaultWorkdir: '/app',
    defaultStartCommand: 'python manage.py runserver 0.0.0.0:8000',
    frameworks: [
      { id: 'django', label: 'Django' },
      { id: 'flask', label: 'Flask' },
      { id: 'fastapi', label: 'FastAPI' },
    ]
  },
  {
    id: 'java',
    label: 'Java / Spring',
    icon: '☕',
    versions: ['21', '17', '11'],
    defaultPort: '8080',
    defaultWorkdir: '/app',
    defaultStartCommand: 'java -jar app.jar',
    frameworks: [
      { id: 'vanilla', label: 'Spring Boot' },
    ]
  },
]