function padNumber(num) {
    return num.toString().padStart(2, '0');
}

function startHourlyTimer() {
    setInterval(() => {
        const now = new Date();
        const currentMinutes = now.getMinutes();
        const currentSeconds = now.getSeconds();

        // Проверяем, если текущее время XX:00
        if (currentMinutes === 0 && currentSeconds === 0) {
            // Устанавливаем время на 45 минут следующего часа
            const nextSignalTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 45, 0, 0);
            signal();
            // Устанавливаем таймер на следующее срабатывание
            setTimeout(() => {
                signal();
                setInterval(signal, 60 * 60 * 1000); // 1 час
            }, nextSignalTime - now);
        } else {
            // Обновляем таймер
            const nextSignalTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 45, 0, 0);
            if (now > nextSignalTime) {
                nextSignalTime.setHours(nextSignalTime.getHours() + 1);
            }
            updateTimer(nextSignalTime);
        }
    }, 1000);
}


function updateTimer(targetTime) {
    const now = new Date();
    const timeDiff = targetTime - now;

    if (timeDiff > 0) {
        const minutes = padNumber(Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)));
        const seconds = padNumber(Math.floor((timeDiff % (1000 * 60)) / 1000));

        document.getElementById('timer').innerHTML = `Осталось времени до следующего сигнала: ${minutes}:${seconds}`;
        // Меняем заголовок окна
        document.title = `${minutes}:${seconds}`
    } else {
        document.getElementById('timer').innerHTML = "Сигнал уже сработал!";
        document.title = "Время!"
    }
}

function signal() {

    // Воспроизведение звукового сигнала
    const alertSound = document.getElementById('alertSound');
    alertSound.play();

    // Смена иконки
    document.getElementById('favicon').href = "images/success-icon.png"
}

// Запускаем таймер
startHourlyTimer();