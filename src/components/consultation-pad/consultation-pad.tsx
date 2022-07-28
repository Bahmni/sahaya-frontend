import React from 'react'
import {ConsultationPadContainer} from '../consultation-pad-container/consultation-pad-container'
import {Modal} from '@carbon/react'
export const ConsultationPad = ({setShowConsultationPad}) => {
  return (
    <>
      <Modal
        modalHeading="Consultation Notes"
        open={true}
        onRequestClose={() => setShowConsultationPad(false)}
        passiveModal={true}
      >
        <ConsultationPadContainer />
      </Modal>
    </>
  )
}
