import { useState, useEffect } from 'react'
import useAfterFirstMount from './useAfterFirstMount'

const ONE_MINUTE = 60 * 1000
export const minutes = (x: number) => x * ONE_MINUTE

export default function usePageTimeout ({
  logout,
  activate,
  duration = minutes(60)
}: PageTimeOutProps) {
  const [active, setActive] = useState(activate)

  useEffect(() => {
    if (activate) {
      setActive(true)
    }
  }, [activate])

  useAfterFirstMount(() => {
    if (!active) {
      console.log('Page Timeout: Logging out due to inactivity.')
      logout && logout()
    }
  }, [active, logout])

  useEffect(() => {
    // userTimeout will time out for a given duration and then run
    // and start the systemTimeout which checks for any mouse
    // activity, and if none within the system defined duration, will
    // run the logout function
    let userTimeout: NodeJS.Timeout, systemTimeout: NodeJS.Timeout

    // Initialize the page timeout
    // in the given time, it will check if the user is still active
    // and if not, will log the user out
    function initTimeout () {
      console.log(`Page Timeout: Initialized with ${duration}ms`)
      // in (duration [minus] one_minute), check if there is still activity (checks for a minute)
      userTimeout = setTimeout(checkIfStillActive, duration)
    }

    function checkIfStillActive () {
      console.log('Page Timeout: Checking for activity...')
      // assume user is not active
      let isActive = false
      function isStillActive () {
        // set user to active on mouse movement
        isActive = true
        // remove event listener to clean-up
        window.removeEventListener('mousemove', isStillActive)
      }
      // add event listener to check for activity
      window.addEventListener('mousemove', isStillActive)

      // if in the last minute of the timeout duration there is no activity, set active to false
      systemTimeout = setTimeout(() => {
        if (!isActive) {
          setActive(false)
        } else initTimeout()
      }, ONE_MINUTE)
    }

    if (active) {
      initTimeout()
      return () => {
        // cleanup
        clearTimeout(userTimeout)
        if (systemTimeout) {
          clearTimeout(systemTimeout)
        }
      }
    }
  }, [active, duration])
}

interface PageTimeOutProps {
  logout?: () => void
  activate: boolean
  duration: number
}