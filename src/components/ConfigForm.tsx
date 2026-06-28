import type { DockerConfig } from '../types/docker.types'
import { LANGUAGE_OPTIONS } from '../utils/languageData'
interface Props {
  config: DockerConfig
  onChange: (config: DockerConfig) => void
}

export default function ConfigForm({ config, onChange }: Props) {
  const langOption = LANGUAGE_OPTIONS.find(l => l.id === config.language)!

  const update = (field: keyof DockerConfig, value: string) => {
    onChange({ ...config, [field]: value })
  }

  const addEnvVar = () => {
    onChange({
      ...config,
      envVariables: [...config.envVariables, { key: '', value: '' }]
    })
  }

  const removeEnvVar = (index: number) => {
    onChange({
      ...config,
      envVariables: config.envVariables.filter((_, i) => i !== index)
    })
  }

  const updateEnvVar = (index: number, field: 'key' | 'value', value: string) => {
    const updated = config.envVariables.map((env, i) =>
      i === index ? { ...env, [field]: value } : env
    )
    onChange({ ...config, envVariables: updated })
  }

  const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

  return (
    <div className="space-y-4">

      {/* Framework */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Framework
        </label>
        <select
          value={config.framework}
          onChange={e => update('framework', e.target.value)}
          className={inputClass}
        >
          {langOption.frameworks.map(f => (
            <option key={f.id} value={f.id}>{f.label}</option>
          ))}
        </select>
      </div>

      {/* Version */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Version
        </label>
        <select
          value={config.version}
          onChange={e => update('version', e.target.value)}
          className={inputClass}
        >
          {langOption.versions.map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      {/* Port */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Port
        </label>
        <input
          type="text"
          value={config.port}
          onChange={e => update('port', e.target.value)}
          className={inputClass}
          placeholder="8000"
        />
      </div>

      {/* Workdir */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Work Directory
        </label>
        <input
          type="text"
          value={config.workdir}
          onChange={e => update('workdir', e.target.value)}
          className={inputClass}
          placeholder="/var/www"
        />
      </div>

      {/* Start Command */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Start Command
        </label>
        <input
          type="text"
          value={config.startCommand}
          onChange={e => update('startCommand', e.target.value)}
          className={inputClass}
        />
      </div>

      {/* ENV Variables */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Environment Variables
          </label>
          <button
            onClick={addEnvVar}
            className="text-xs text-blue-500 hover:text-blue-600 font-medium"
          >
            + Add
          </button>
        </div>
        {config.envVariables.map((env, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="KEY"
              value={env.key}
              onChange={e => updateEnvVar(i, 'key', e.target.value)}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="value"
              value={env.value}
              onChange={e => updateEnvVar(i, 'value', e.target.value)}
              className={inputClass}
            />
            <button
              onClick={() => removeEnvVar(i)}
              className="text-red-400 hover:text-red-600 px-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

    </div>
  )
}