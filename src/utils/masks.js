export const dateMask = (value) => {
  value = new Date(value)
  let month; let day; let year = value.getFullYear()

  if (Array.from(String(value.getMonth())).length === 1) month = '0' + (value.getMonth() + 1)
  if (value.getMonth() === 9) month = 10
  // else month = value.getMonth() + 1

  if (Array.from(String(value.getDate())).length === 1) day = '0' + value.getDate()
  else day = value.getDate()

  return day + '/' + month + '/' + year
}

export const hourMask = (value) => {
  const date = new Date(value)
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}