import { useState } from 'react'
import type { DockerConfig, Language } from './types/docker.types'
import { LANGUAGE_OPTIONS } from './utils/languageData'
import { generateDockerfile } from './utils/generateDockerfile'
import LanguageSelector from './components/LanguageSelector'
import ConfigForm from './components/ConfigForm'
import DockerfilePreview from './components/DockerfilePreview'

const defaultConfig = (lang: Language): DockerConfig => {
  const option = LANGUAGE_OPTIONS.find(l => l.id === lang)!
  return {
    language: lang,
    framework: option.frameworks[0].id,
    version: option.versions[0],
    port: option.defaultPort,
    workdir: option.defaultWorkdir,
    envVariables: [],
    startCommand: option.defaultStartCommand,
  }
}

export default function App() {
  const [config, setConfig] = useState<DockerConfig>(defaultConfig('php'))
  const [darkMode, setDarkMode] = useState(false)

  const handleLanguageChange = (lang: Language) => {
    setConfig(defaultConfig(lang))
  }

  const handleReset = () => {
    setConfig(defaultConfig(config.language))
  }

  const dockerfile = generateDockerfile(config)

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">

        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              🐳 Dockerfile Generator
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Generate production-ready Dockerfiles in seconds
            </p>
          </div>

          {/* Buttons Header */}
          <div className="flex items-center gap-3">
            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-all"
            >
              🔄 Reset
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-all"
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6">
            <LanguageSelector
              selected={config.language}
              onChange={handleLanguageChange}
            />
            <hr className="border-gray-100 dark:border-gray-700" />
            <ConfigForm
              config={config}
              onChange={setConfig}
            />
          </div>

          {/* Right Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <DockerfilePreview content={dockerfile} />
          </div>

        </div>

        {/* Footer */}
        <div className="max-w-6xl mx-auto mt-8 text-center text-sm text-gray-400 dark:text-gray-600">
          Built with ❤️ by Meriem Sendjak Eddine — Open Source
        </div>

      </div>
    </div>
  )
}