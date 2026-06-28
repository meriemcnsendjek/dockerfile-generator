import { LANGUAGE_OPTIONS } from '../utils/languageData'
import type { Language } from '../types/docker.types'

interface Props {
  selected: Language
  onChange: (lang: Language) => void
}

export default function LanguageSelector({ selected, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Language / Framework
      </label>
      <div className="grid grid-cols-2 gap-3">
        {LANGUAGE_OPTIONS.map(lang => (
          <button
            key={lang.id}
            onClick={() => onChange(lang.id)}
            className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all
              ${selected === lang.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
              }`}
          >
            <span className="text-2xl">{lang.icon}</span>
            <span className="font-medium text-sm text-gray-800 dark:text-gray-200">
              {lang.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}