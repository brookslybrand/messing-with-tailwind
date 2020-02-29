import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  createContext
} from 'react'

import { MdExpandMore as ExpandMoreIcon } from 'react-icons/md'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel
} from '@reach/accordion'
import '@reach/accordion/styles.css'

const ExpansionContext = createContext()

export { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails }

function ExpansionPanel({ children }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="w-full p-4">
      <Accordion
        className="border-0 rounded-t shadow-md"
        index={expanded ? 0 : null}
        onChange={e => setExpanded(prev => !prev)}
      >
        <ExpansionContext.Provider value={expanded}>
          {children}
        </ExpansionContext.Provider>
      </Accordion>
    </div>
  )
}

function ExpansionPanelSummary({ children }) {
  const expanded = useExpanded()
  return (
    <AccordionItem>
      <AccordionButton className="flex w-full items-center justify-between px-6 focus:bg-gray-300 focus:outline-none">
        {children}

        <div aria-disabled="false" aria-hidden="true">
          <ExpandMoreIcon
            className={`w-6 h-6 fill-current text-gray-600 transition duration-150 ease-in-out transform ${
              expanded ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </div>
      </AccordionButton>
      <hr />
    </AccordionItem>
  )
}

function ExpansionPanelDetails({ children }) {
  const [ref, height] = useHeight()
  const expanded = useExpanded()
  return (
    <AccordionPanel
      className={`block min-h-0 overflow-hidden transition-height duration-200 ease-in-out ${
        expanded ? 'visible' : 'invisible'
      }`}
      // have to manually add the style here
      style={{ height: expanded ? height : 0 }}
    >
      <div ref={ref} className="visible p-6">
        {children}
      </div>
    </AccordionPanel>
  )
}

// hooks!

const useExpanded = () => {
  const expanded = useContext(ExpansionContext)
  if (expanded === undefined)
    throw new Error(
      `useExpanded must be used in a component rendered as a decendent of ExpansionPanel`
    )
  return expanded
}

const useHeight = () => {
  const ref = useRef()
  const [height, setHeight] = useState()

  useEffect(() => {
    // create the resize callback and call it initially
    const handleSetHeight = () => setHeight(ref.current.offsetHeight)
    handleSetHeight()
    // setup the event listener and tear it down when the component dismounts
    window.addEventListener('resize', handleSetHeight)
    return () => window.removeEventListener('resize', handleSetHeight)
  }, [])

  return [ref, height]
}
