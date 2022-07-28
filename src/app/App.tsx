import {ConsultationPad} from '../components/consultation-pad/consultation-pad'
import {FloatingConsultationButton} from '../components/floating-consultation-button/floating-consultation-button.component'
import React, {useState} from 'react'

const App = () => {
  const [showConsultationPad, setShowConsultationPad] = useState(false)

  return (
    <>
      {showConsultationPad ? (
        <ConsultationPad setShowConsultationPad={setShowConsultationPad} />
      ) : (
        <FloatingConsultationButton
          setShowConsultationPad={setShowConsultationPad}
        ></FloatingConsultationButton>
      )}
    </>
  )
}

export default App
