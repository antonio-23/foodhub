export function convertDateToSupabaseFormat(date: Date): string {
  // Format the date to DD.MM.YYYY format
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const dateStr = `${day}.${month}.${year}`;

  // Regular expression to match the DD.MM.YYYY format
  const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/;

  // Validate the input
  if (!regex.test(dateStr)) {
    throw new Error("Invalid date format. Expected format: DD.MM.YYYY");
  }

  // Extract date parts
  const match = dateStr.match(regex);
  const dayMatch = match ? match[1] : null;
  const monthMatch = match ? match[2] : null;
  const yearMatch = match ? match[3] : null;

  return `${yearMatch}-${monthMatch}-${dayMatch}`;
}
