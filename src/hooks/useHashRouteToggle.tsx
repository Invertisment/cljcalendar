import { Dispatch, SetStateAction, useEffect, useState } from "react";

function urlMatches(modalId: string) {
  const results = window.location.href.match("#" + modalId + "")
  return results !== null && results.length > 0
}

// Source: https://stackoverflow.com/a/60879586
export default function useHashRouteToggle<T>(
  modalId: string,
  convertHistoryState: (visible: boolean) => T,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [isOpen, setOpen] = useState<T>(defaultValue);

  useEffect(() => {
    const currentHref = window.location.href
    const match = urlMatches(modalId)
    if (isOpen === match) {
      return
    }
    if (isOpen) {
      history.pushState({ prevUrl: currentHref }, '', currentHref + "#" + modalId)
    } else {
      // https://stackoverflow.com/a/56184390
      if (history.state?.prevUrl) {
        history.back()
      }
    }
  }, [isOpen])

  useEffect(() => {
    // function for handling hash change in browser, toggling modal open
    const handleOnHashChange = () => setOpen(convertHistoryState(urlMatches(modalId)))

    // event listener for hashchange event
    window.addEventListener('hashchange', handleOnHashChange);

    return () => window.removeEventListener('hashchange', handleOnHashChange);
  }, []);

  return [isOpen, setOpen];
}
