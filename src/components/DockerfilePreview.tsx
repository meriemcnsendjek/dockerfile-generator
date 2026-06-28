import { useState } from 'react'
import { Copy, Download, Check } from 'lucide-react'

interface Props {
  content: string
}

export default function DockerfilePreview({ content }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Dockerfile'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200">
          📄 Dockerfile Preview
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-sm font-medium transition-all"
          >
            {copied
              ? <><Check size={14} className="text-green-500" /> Copied!</>
              : <><Copy size={14} /> Copy</>
            }
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-all"
          >
            <Download size={14} /> Download
          </button>
        </div>
      </div>

      <pre className="flex-1 bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-auto font-mono leading-relaxed">
        {content || '# Your Dockerfile will appear here...'}
      </pre>
    </div>
  )
}