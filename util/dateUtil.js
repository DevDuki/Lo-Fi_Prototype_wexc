const getDatesBetweenDates = (startDate, endDate) => {
  let dates = []
  //to avoid modifying the original date
  const startDateObj = new Date(startDate)
  const endDateObj = new Date(endDate)
  while (startDateObj <= endDateObj) {
    const date = new Date(startDateObj)
    const dateString = date.toISOString().substring(0, 10)
    dates = [...dates, dateString]
    startDateObj.setDate(startDateObj.getDate() + 1)
  }
  return dates
}

export default getDatesBetweenDates