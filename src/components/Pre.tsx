'use client'

import { Children, ReactNode, isValidElement, cloneElement } from 'react'
import CopyButton from './CopyButton'

interface PreProps {
  children: ReactNode
}

export default function Pre({ children, ...props }: PreProps) {
  // Extract the code content from the child element
  let code = ''
  
  // Find the code element and extract its content
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === 'code') {
      code = child.props.children
      if (typeof code !== 'string') {
        // If code is not a string (e.g., it contains elements like spans for syntax highlighting)
        // Try to extract the text content from it
        code = ''
        const extractText = (node: ReactNode): void => {
          if (typeof node === 'string') {
            code += node
          } else if (Array.isArray(node)) {
            node.forEach(extractText)
          } else if (isValidElement(node)) {
            extractText(node.props.children)
          }
        }
        
        extractText(child.props.children)
      }
    }
  })

  return (
    <div className="group relative">
      <pre {...props} className="relative overflow-auto rounded-lg p-4 !bg-gray-50 dark:!bg-gray-900">
        {children}
      </pre>
      <CopyButton text={code} />
    </div>
  )
}