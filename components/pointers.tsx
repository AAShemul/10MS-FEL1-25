import type { JSX } from 'react'
import { Pointer, Section } from '@/types/interface'

export default function PointersComp({ data }: { data: Section }): JSX.Element {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{data.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(data.values as Pointer[])?.map((pointer: Pointer, idx: number) => (
          <div 
            key={idx}
            className="flex items-start space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {pointer.icon && (
              <div 
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: pointer.color || '#3b82f6' }}
              >
                <i className={pointer.icon} />
              </div>
            )}
            <p className="text-gray-700 dark:text-gray-300">
              {pointer.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
