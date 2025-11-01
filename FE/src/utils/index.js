/**
 * Create page URL helper function
 * @param {string} pageName - The name of the page
 * @returns {string} - The formatted URL path
 */
export function createPageUrl(pageName) {
  return `/${pageName.toLowerCase()}`;
}

/**
 * Format date to Korean locale
 * @param {Date} date - The date to format
 * @returns {string} - Formatted date string
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
