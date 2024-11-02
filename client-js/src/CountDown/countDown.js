const countDown = (end) => {
    let now = new Date().getTime()
    let time_start_register = new Date(end).getTime()
    let distance_start_1 = time_start_register - now;
    let days = Math.floor(distance_start_1 / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
        (distance_start_1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance_start_1 % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance_start_1 % (1000 * 60)) / 1000);



    return { distance: distance_start_1, time: `${days} วัน ${hours} ชั่วโมง ${minutes} นาที ${seconds} วินาที` }

}

export { countDown }