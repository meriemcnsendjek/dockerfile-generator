export type Language = 'php' | 'node' | 'python' | 'java'

export type Framework = 'laravel' | 'symfony' | 'express' | 'nestjs' | 'django' | 'flask' | 'fastapi' | 'vanilla'

export interface EnvVariable {
  key: string
  value: string
}

export interface DockerConfig {
  language: Language
  framework: Framework
  version: string
  port: string
  workdir: string
  envVariables: EnvVariable[]
  startCommand: string
}

export interface FrameworkOption {
  id: Framework
  label: string
}

export interface LanguageOption {
  id: Language
  label: string
  icon: string
  versions: string[]
  defaultPort: string
  defaultStartCommand: string
  defaultWorkdir: string
  frameworks: FrameworkOption[]
}