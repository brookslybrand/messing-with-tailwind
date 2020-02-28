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
      {/* displaly: hidden is messing up the transition */}
      {/* <div
        className={`w-full bg-blue-600 ${
          expanded ? 'block h-16' : 'hidden h-4'
        } transition-height duration-1000 ease-in`}
      /> */}

      <Accordion
        className="border-0 rounded-t shadow-md"
        index={expanded ? 0 : null}
        onChange={e => setExpanded(prev => !prev)}
      >
        <AccordionItem>
          <AccordionButton className="flex w-full items-center justify-between px-6 focus:bg-gray-300 focus:outline-none">
            <p className="my-3 text-lg">Expansion Panel 1</p>

            <div aria-disabled="false" aria-hidden="true">
              {/* <IconButton> */}
              <ExpandMoreIcon
                // className="transition-transform ease-in-out"
                className={`w-6 h-6 fill-current text-gray-600 transition duration-150 ease-in-out transform ${
                  expanded ? 'rotate-180' : 'rotate-0'
                }`}
              />
              {/* </IconButton> */}
            </div>
          </AccordionButton>
          <hr />
          <AccordionPanel
            className={`p-6 min-h-0 transition-height duration-1000 ease-in ${
              expanded ? 'h-16' : 'h-0'
            }`}
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </p>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
