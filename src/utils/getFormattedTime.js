export default function getFormattedTime(inputTimeStr) {
    const inputTime = new Date(inputTimeStr);
    const currentTime = new Date();

    const daysDiff = Math.floor(
        (currentTime - inputTime) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff < 7) {
        const dayName = new Intl.DateTimeFormat("en-US", {
            weekday: "long",
        })
            .format(inputTime)
            .substring(0, 3);
        const formattedTime = inputTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
        return `${dayName}, ${formattedTime}`;
    } else {
        return getFormattedDate(inputTimeStr);
    }
}

export function getFormattedDate(inputTimeStr) {
    const inputTime = new Date(inputTimeStr);
    const day = inputTime.getDate();
    const month = new Intl.DateTimeFormat("en-US", {
        month: "long",
    }).format(inputTime);
    const formattedTime = inputTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
    return `${day}-${month}`;
}
