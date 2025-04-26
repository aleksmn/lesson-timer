function padNumber(num) {
    return num.toString().padStart(2, '0');
}

function startHourlyTimer() {
    const now = new Date();
    const firstSignalTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 45, 0, 0);

    // Если текущее время уже после 45 минут, устанавливаем время на следующий час
    if (now > firstSignalTime) {
        firstSignalTime.setHours(firstSignalTime.getHours() + 1);
    }

    // Обновляем таймер каждую секунду
    setInterval(() => {
        updateTimer(firstSignalTime);
    }, 1000);

    // Устанавливаем таймер на первое срабатывание
    setTimeout(() => {
        signal();
        // Устанавливаем интервал на последующие сигналы каждый час
        setInterval(signal, 60 * 60 * 1000); // 1 час
    }, firstSignalTime - now);
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
    // const messageDiv = document.getElementById('message');
    // const currentTime = new Date().toLocaleTimeString();
    // messageDiv.innerHTML = `Сигнал в 45 минут! Текущее время: ${currentTime}`;

    // Воспроизведение звукового сигнала
    const alertSound = document.getElementById('alertSound');
    alertSound.play();

    // Смена иконки
    document.getElementById('favicon').href = "images/success-icon.png"
}

// Запускаем таймер
startHourlyTimer();