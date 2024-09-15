export const format12HourTime = (isoString: string): string => {
    const date = new Date(isoString);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12 || 12; // If hour is 0 (midnight), set to 12

    // Pad minutes with leading zero if necessary
    const minutesPadded = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutesPadded} ${ampm}`;
};

export const format12HourDateTime = (isoString: string): string => {
    const date = new Date(isoString);

    // Format date parts
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }); // Short month name
    const year = date.getFullYear();

    // Format time parts
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12 || 12; // If hour is 0 (midnight), set to 12

    // Pad minutes with leading zero if necessary
    const minutesPadded = minutes < 10 ? `0${minutes}` : minutes;

    // Construct the formatted date and time string
    return `${day} ${month} ${year}, ${hours}:${minutesPadded} ${ampm}`;
};

export const formatAmount = (type: string, amount: number): string => {
    // Format the amount as a currency (RM)
    const formattedAmount = `RM ${amount.toFixed(2)}`;
  
    // Add "+" for Debit and "-" for Credit
    if (type === "Debit") {
      return `+${formattedAmount}`;
    } else if (type === "Credit") {
      return `-${formattedAmount}`;
    }
  
    // If type is neither Debit nor Credit, just return the formatted amount
    return formattedAmount;
  }