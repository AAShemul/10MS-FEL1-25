import type { JSX } from 'react'
import { Feature, Section } from '@/types/interface'

export default function Features({ data }: { data: Section }): JSX.Element {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{data.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(data.values as Feature[])?.map((feature: Feature, idx: number) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col items-center text-center">
              {feature.icon && (
                <div className="w-12 h-12 mb-4 flex items-center justify-center text-2xl">
                  <i className={feature.icon} />
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
