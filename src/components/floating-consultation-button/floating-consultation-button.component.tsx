import React from 'react'
import styles from './floating-consultation-button.scss'
import {Button} from '@carbon/react'
import {Headset} from '@carbon/icons-react'

export const FloatingConsultationButton = ({setShowConsultationPad}) => {
  const launchConsultationPad = () => {
    setShowConsultationPad(true)
  }

  return (
    <>
      <Button
        kind="secondary"
        className={styles.floating}
        renderIcon={Headset}
        onClick={launchConsultationPad}
      >
        Consultation Notes
      </Button>
    </>
  )
}
