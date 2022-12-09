import { Dispatch, SetStateAction, useEffect, useState } from "react";

function urlMatches(modalId: string) {
  const results = window.location.href.match("#" + modalId + "")
  return results !== null && results.length > 0
}

// Source: https://stackoverflow.com/a/60879586
export default function useHashRouteToggle<T>(
  modalId: string,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] {
  const [isOpen, setOpen] = useState<T | undefined>(undefined);

  useEffect(() => {
    const currentHref = window.location.href
    const match = urlMatches(modalId)
    if (isOpen === match) {
      return
    }
    if (isOpen) {
      history.pushState({}, '', currentHref + "#" + modalId)
    } else {
      history.back()
    }
  }, [isOpen])

  useEffect(() => {
    // function for handling hash change in browser, toggling modal open
    const handleOnHashChange = () => setOpen(undefined)

    // event listener for hashchange event
    window.addEventListener('hashchange', handleOnHashChange);

    return () => window.removeEventListener('hashchange', handleOnHashChange);
  }, []);

  return [isOpen, setOpen];
}
