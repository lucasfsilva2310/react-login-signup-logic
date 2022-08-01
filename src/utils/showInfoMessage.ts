export const showInfoMessage = (setFunction: Function, time: number) => {
  setFunction(true)
  return setTimeout(() => setFunction(false), time)
}
