import React, { useState } from 'react'

import { MdExpandMore as ExpandMoreIcon } from 'react-icons/md'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel
} from '@reach/accordion'
import '@reach/accordion/styles.css'

export default function SimpleExpansionPanel() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="w-full p-4">
      <Accordion
        className="border-0 rounded-t shadow-md"
        index={expanded ? 0 : null}
        onChange={e => setExpanded(prev => !prev)}
      >
        <AccordionItem>
          <AccordionButton className="flex w-full items-center justify-between px-6 focus:bg-gray-300 focus:outline-none">
            <p className="my-3 text-lg">Expansion Panel 1</p>

            <div aria-disabled="false" aria-hidden="true">
              <ExpandMoreIcon
                // className="transition-transform ease-in-out"
                className={`w-6 h-6 fill-current text-gray-600 transition duration-150 ease-in-out transform ${
                  expanded ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </div>
          </AccordionButton>
          <hr />
          <AccordionPanel
            className={`block min-h-0 overflow-hidden transition-height duration-200 ease-in-out ${
              expanded ? 'visible h-16' : 'invisible h-0'
            }`}
          >
            <div className="visible p-6">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </p>
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
