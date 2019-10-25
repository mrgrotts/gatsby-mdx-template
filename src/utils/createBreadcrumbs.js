const formatCrumbs = crumb =>
  `${crumb
    .replace('-', ' ')
    .replace(/(^|\s)\S/g, letter => letter.toUpperCase())}`

function createBreadcrumbs(name, pathname) {
  return `${name}${pathname
    .split('/')
    .map(formatCrumbs)
    .join(' > ')}`
}

export default createBreadcrumbs
