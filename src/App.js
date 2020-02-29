import React from 'react'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from './ExpansionPanel'

function App() {
  return (
    <main className="antialiased text-gray-900 font-body flex flex-col items-center">
      <h1 className="m-4 text-3xl font-medium self-start">
        Messing with tailwind
      </h1>
      <div className="max-w-3xl w-full">
        <ExpansionPanel>
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
        </ExpansionPanel>
      </div>
    </main>
  )
}

export default App
