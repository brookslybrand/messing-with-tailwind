import React, { useState } from 'react'
import {
  ExpansionPanel,
  ExpansionPanelItem,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from './ExpansionPanel'

function App() {
  const [isAccordion, setIsAccordion] = useState(false)

  return (
    <main className="antialiased text-gray-900 font-body flex flex-col items-center">
      <h1 className="m-4 text-3xl font-medium self-start">
        Messing with tailwind
      </h1>

      <div className="max-w-3xl w-full">
        <label
          htmlFor="accordion-switch"
          className=" mb-6 flex items-center cursor-pointer"
        >
          <Switch
            id="accordion-switch"
            checked={isAccordion}
            onChange={() => setIsAccordion(prev => !prev)}
          />
          <p className="ml-2">Use accordion</p>
        </label>

        <ExpansionPanel accordion={isAccordion}>
          <ExpansionPanelItem>
            <ExpansionPanelSummary>
              <p className="my-3 text-lg">Expansion Panel 1</p>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </p>
            </ExpansionPanelDetails>
          </ExpansionPanelItem>
          <ExpansionPanelItem>
            <ExpansionPanelSummary>
              <p className="my-3 text-lg">Expansion Panel 2</p>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </p>
            </ExpansionPanelDetails>
          </ExpansionPanelItem>
          <ExpansionPanelItem>
            <ExpansionPanelSummary>
              <p className="my-3 text-lg">Expansion Panel 3</p>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </p>
            </ExpansionPanelDetails>
          </ExpansionPanelItem>
        </ExpansionPanel>
      </div>
    </main>
  )
}

function Switch({ id, checked, onChange }) {
  return (
    <div className="relative w-10 h-4" tabIndex="0">
      <input
        id={id}
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={onChange}
      />
      <div className="h-4 bg-gray-400 rounded-full shadow-inner" />
      <div
        className={`absolute inset-0  w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0 transition duration-150 ease-in-out transform ${
          checked ? 'translate-x-full bg-green-600' : 'translate-x-0'
        }`}
        style={{
          top: '-.25rem',
          left: '-.25rem'
        }}
      />
    </div>
  )
}

export default App
