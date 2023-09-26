"use client"; // Bu bir import bildirimi gibi görünüyor, ancak standart bir JavaScript ifadesi olmadığı için işlevi belirsizdir.

import React, { useState, useEffect } from 'react'; // React ve gerekli useState ve useEffect kütüphaneleri içe aktarılır.

const gridSize = 50; // Oyun tahtasının hücre boyutu (piksel cinsinden).

export default function Snake() { // Snake bileşeni fonksiyonu başlatılır.

    // Oyunda kullanılacak başlangıç durumları tanımlanır.
    const [snake, setSnake] = useState([{ x: 5, y: 5 }]); // Yılanın başlangıç pozisyonu.
    const [food, setFood] = useState({ x: 10, y: 10 }); // Yem başlangıç pozisyonu.
    const [direction, setDirection] = useState('right'); // Yılanın hareket yönü.
    const [gameOver, setGameOver] = useState(false); // Oyunun bitip bitmediğini belirleyen bir durum.

    // Klavye tuşlarına basıldığında yılanın yönünü değiştiren useEffect kullanılır.
    useEffect(() => {
        const handleKeyPress = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (direction !== 'down') setDirection('up');
                    break;
                case 'ArrowDown':
                    if (direction !== 'up') setDirection('down');
                    break;
                case 'ArrowLeft':
                    if (direction !== 'right') setDirection('left');
                    break;
                case 'ArrowRight':
                    if (direction !== 'left') setDirection('right');
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [direction]); // useEffect, 'direction' değiştiğinde çalışır.

    // Yılanın hareketini kontrol eden useEffect kullanılır.
    useEffect(() => {
        const moveSnake = () => {
            if (gameOver) return; // Oyun bittiğinde yılanın hareketini durdur.

            const headX = snake[0].x;
            const headY = snake[0].y;

            let newSnake = [...snake];

            switch (direction) {
                case 'up':
                    newSnake.unshift({ x: headX, y: headY - 1 });
                    break;
                case 'down':
                    newSnake.unshift({ x: headX, y: headY + 1 });
                    break;
                case 'left':
                    newSnake.unshift({ x: headX - 1, y: headY });
                    break;
                case 'right':
                    newSnake.unshift({ x: headX + 1, y: headY });
                    break;
                default:
                    break;
            }

            if (headX === food.x && headY === food.y) { // Yılan yemi yediğinde
                let newFood = {
                    x: Math.floor(Math.random() * (window.innerWidth / gridSize)),
                    y: Math.floor(Math.random() * (window.innerHeight / gridSize)),
                };

                while (newSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)) {
                    newFood = {
                        x: Math.floor(Math.random() * (window.innerWidth / gridSize)),
                        y: Math.floor(Math.random() * (window.innerHeight / gridSize)),
                    };
                }

                setFood(newFood); // Yeni yemi ayarla.

                // Yemi yiyince yılanın büyümesi için yeni bir segment ekle.
                newSnake.push({});
            } else {
                newSnake.pop(); // Yemi yemediyse yılanın son segmentini kaldır.
            }

            // Oyunun ekranın köşelerine çarpınca sona ermesi için kontrol ekle.
            if (
                headX < 0 ||
                headX >= window.innerWidth / gridSize ||
                headY < 0 ||
                headY >= window.innerHeight / gridSize
            ) {
                setGameOver(true);
            }

            setSnake(newSnake); // Yılanın yeni pozisyonunu ayarla.
        };

        const gameInterval = setInterval(moveSnake, 100); // Oyun döngüsünü başlatan zamanlayıcı.

        return () => {
            clearInterval(gameInterval); // Bileşen kaldırıldığında zamanlayıcıyı temizle.
        };
    }, [snake, direction, food, gameOver]); // useEffect, 'snake', 'direction', 'food', veya 'gameOver' değiştiğinde çalışır.

    // Yeniden başlatma işlemini gerçekleştiren işlev.
    const handleRestartClick = () => {
        // Oyunu başlatmak için durumu sıfırla.
        setSnake([{ x: 5, y: 5 }]);
        setFood({ x: 10, y: 10 });
        setDirection('right');
        setGameOver(false);
    };

    return (
        <div >
            {gameOver && (
                <div className="text-3xl font-bold">
                    Game Over! <button onClick={handleRestartClick}>Yeniden Başla</button>
                </div>
            )}
            <div>
                {snake.map((segment, index) => (
                    <div
                        key={index}
                        className="w-16 h-16 bg-green-500 absolute"
                        style={{
                            left: segment.x * gridSize,
                            top: segment.y * gridSize,
                        }}
                    ></div>
                ))}
                <div
                    className="w-16 h-16 bg-red-500 absolute"
                    style={{
                        left: food.x * gridSize,
                        top: food.y * gridSize,
                    }}
                ></div>
            </div>
        </div>
    );
}
