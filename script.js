function padNumber(num) {
    return num.toString().padStart(2, '0');
}

function startHourlyTimer() {
    setInterval(() => {
        const now = new Date();
        const currentMinutes = now.getMinutes();
        const currentSeconds = now.getSeconds();
        const currentHours = now.getHours();

        // Устанавливаем время на 45 минут текущего часа
        const signalTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), currentHours, 45, 0, 0);
        const nextHourSignalTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), currentHours + 1, 0, 0, 0);

        // Проверяем, если текущее время XX:00
        if (currentMinutes === 0 && currentSeconds === 0) {
            signal(false); // Воспроизводим сигнал alarm2.wav
        } else if (now >= signalTime && now < nextHourSignalTime) {
            // Если текущее время между чч:45 и чч:59
            document.getElementById('timer').innerHTML = "Время!";
            document.title = "Время!";
            // Смена иконки
            document.getElementById('favicon').href = "images/success-icon.png"
        } else if (now < signalTime) {
            // Смена иконки
            document.getElementById('favicon').href = "images/icon.png"
            // Если текущее время до чч:45
            const timeDiff = signalTime - now;
            updateTimer(timeDiff);
        }
    }, 1000);
}

function updateTimer(timeDiff) {
    const minutes = padNumber(Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = padNumber(Math.floor((timeDiff % (1000 * 60)) / 1000));

    document.getElementById('timer').innerHTML = `Осталось времени до сигнала: ${minutes}:${seconds}`;
    document.title = `${minutes}:${seconds}`;
}

function signal(isStartOfHour) {
    const alertSound1 = document.getElementById('alertSound1');
    const alertSound2 = document.getElementById('alertSound2');

    if (isStartOfHour) {
        alertSound2.play(); // Воспроизводим сигнал alarm2.wav
    } else {
        alertSound1.play(); // Воспроизводим сигнал alarm1.wav
    }
}

// Запускаем таймер
startHourlyTimer();
