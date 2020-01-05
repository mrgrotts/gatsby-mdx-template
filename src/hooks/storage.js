import { useEffect, useState } from 'react'

const STORAGE =
  typeof window !== 'undefined'
    ? window && window.localStorage
      ? window.localStorage
      : false
    : false

export const StorageState = (key, initialValue) => {
  const [state, setState] = useState(() => {
    let value

    try {
      value = JSON.parse(STORAGE.getItem(key) || String(initialValue))
    } catch (error) {
      value = initialValue
    }

    return value
  })

  useEffect(() => STORAGE.setItem(key, JSON.stringify(state)), [key, state])

  const reset = () => STORAGE.setItem(key, initialValue)

  return [state, setState, reset]
}
