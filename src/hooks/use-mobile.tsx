
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(true) // Default to true for mobile-first design

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT || 
                  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    mql.addEventListener("change", checkMobile)
    checkMobile()
    return () => mql.removeEventListener("change", checkMobile)
  }, [])

  return isMobile
}
