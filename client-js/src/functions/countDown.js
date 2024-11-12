const countDown = (end) => {
    // Get the current UTC time in milliseconds
    let now = new Date().getTime()

    // Convert the 'end' date string to a Date object and then get the UTC time (milliseconds)
    let localTime = new Date(end);
    localTime.setHours(localTime.getHours() - 7); // Adjust for UTC+7

    let time_start_register = localTime.getTime()
    //console.log(now)
    console.log(time_start_register)
    // Calculate the difference in time (in milliseconds)
    let distance_start_1 = time_start_register - now;
    //console.log(distance_start_1)


    // Calculate the number of days, hours, minutes, and seconds
    let days = Math.floor(distance_start_1 / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance_start_1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance_start_1 % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance_start_1 % (1000 * 60)) / 1000);

    // Return the result as an object with both the time difference in milliseconds and a formatted string
    return {
        distance: distance_start_1,
        time: `${days} วัน ${hours} ชั่วโมง ${minutes} นาที ${seconds} วินาที`
    };
};

export { countDown };
