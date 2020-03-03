import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  createContext,
  Children,
  Fragment
} from 'react'

import { MdExpandMore as ExpandMoreIcon } from 'react-icons/md'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel
} from '@reach/accordion'
import '@reach/accordion/styles.css'

const ExpandedIndicesContext = createContext()
const ExpansionContext = createContext()

export {
  ExpansionPanel,
  ExpansionPanelItem,
  ExpansionPanelSummary,
  ExpansionPanelDetails
}

function ExpansionPanel({ children }) {
  const [expandedIndices, setExpandedIndices] = useState([])

  const handleChange = changedIdx => {
    setExpandedIndices(prev => {
      // remove the changed index if it is already in expandedIndices, otherwise add it
      const idxOfChangedIdx = prev.indexOf(changedIdx)
      if (idxOfChangedIdx !== -1) {
        const copy = [...prev]
        copy.splice(idxOfChangedIdx, 1)
        return copy
      } else return prev.concat(changedIdx)
    })
  }

  return (
    <Accordion
      className="border-0 rounded-t overflow-hidden shadow-md"
      index={expandedIndices}
      onChange={handleChange}
    >
      <ExpandedIndicesContext.Provider value={expandedIndices}>
        {Children.map(children, (child, index) => (
          <ExpansionContext.Provider value={index}>
            {child}
          </ExpansionContext.Provider>
        ))}
      </ExpandedIndicesContext.Provider>
    </Accordion>
  )
}

function ExpansionPanelItem({ children }) {
  return <AccordionItem>{children}</AccordionItem>
}

function ExpansionPanelSummary({ children }) {
  const { prevExpanded, expanded } = useExpanded()
  return (
    <Fragment>
      {prevExpanded ? <hr /> : null}
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
    </Fragment>
  )
}

function ExpansionPanelDetails({ children }) {
  const [ref, height] = useHeight()
  const { expanded } = useExpanded()
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
  const expandedIndices = useContext(ExpandedIndicesContext)
  const index = useContext(ExpansionContext)
  if (index === undefined)
    throw new Error(
      `useExpanded must be used in a component rendered as a decendent of ExpansionPanel`
    )
  // need to get whether or not the previous is expanded to add an <hr />
  return {
    prevExpanded: index > 0 ? expandedIndices.includes(index - 1) : false,
    expanded: expandedIndices.includes(index)
  }
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
