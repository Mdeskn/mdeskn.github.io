document.addEventListener("DOMContentLoaded", function() {
    const emojis = [
        "\uD83D\uDE42", // 🙂
        "\uD83D\uDE41", // 🙁
        "\uD83D\uDE04", // 🙄
        "\uD83D\uDE2D", // 😭
        "\uD83E\uDD73", // 🥳
        "\uD83E\uDD27", // 🤧
        "\uD83E\uDD70", // 🥰
        "\uD83D\uDC8F", // 💏
        "\uD83E\uDDE1"  // 🧡
    ];

    const emojiLayer = document.createElement("div");
    emojiLayer.classList.add("emoji-layer");
    document.body.appendChild(emojiLayer);

    // Set the emoji layer to a fixed position on the page
    emojiLayer.style.position = "fixed";
    emojiLayer.style.top = "-100px"; // Initially off-screen
    emojiLayer.style.left = "0";

    const dateCells = document.querySelectorAll(".date");
    dateCells.forEach(cell => {
        cell.addEventListener("click", function(event) {
            const emojiContainer = document.createElement("div");
            emojiContainer.classList.add("emoji-container");
            emojis.forEach(emoji => {
                const emojiButton = document.createElement("button");
                emojiButton.innerHTML = emoji;
                emojiButton.addEventListener("click", function() {
                    const userInput = prompt("Enter your note:");
                    if (userInput !== null && userInput.trim() !== "") {
                        const notepadList = document.querySelector(".notepad ul");
                        const listItem = document.createElement("li");
                        const day = cell.textContent.trim();
                        const month = cell.closest('.container').querySelector('.month').textContent.trim();
                        listItem.innerHTML = `<span class="emoji">${emoji}</span> ${month} ${formatDay(day)}: ${userInput}`;
                        notepadList.appendChild(listItem);
                        emojiLayer.style.top = "-100px"; // Hide the emoji layer
                    }
                });
                emojiContainer.appendChild(emojiButton);
            });
            emojiLayer.innerHTML = "";
            emojiLayer.appendChild(emojiContainer);
            emojiLayer.style.top = `${event.clientY}px`; // Position the emoji layer below the cursor
            emojiLayer.style.left = `${event.clientX}px`; // Position the emoji layer below the cursor
        });
    });

    // Close the emoji layer when clicking elsewhere on the page
    document.addEventListener("click", function(event) {
        if (!emojiLayer.contains(event.target) && !isDateCell(event.target)) {
            emojiLayer.style.top = "-100px"; // Hide the emoji layer
        }
    });

    // Function to check if the clicked element is a date cell
    function isDateCell(element) {
        return element.classList.contains("date");
    }

    // Function to format the day number with the correct suffix
    function formatDay(day) {
        const exceptions = [11, 12, 13];
        const lastTwoDigits = day % 100;
        const lastDigit = day % 10;
        const suffix = exceptions.includes(lastTwoDigits) ? "th" : 
                       lastDigit === 1 ? "st" :
                       lastDigit === 2 ? "nd" :
                       lastDigit === 3 ? "rd" : "th";
        return day + suffix;
    }

    const quoteBox = document.querySelector(".quote-box");

    const quotes = ["Believe you can and you're halfway there",
    "The only way to do great work is to love what you do",
    "Success is not final, failure is not fatal: It is the courage to continue that counts",
    "Hardships often prepare ordinary people for an extraordinary destiny",
    "I can't change the direction of the wind, but I can adjust my sails to always reach my destination",
    "No act of kindness, no matter how small, is ever wasted",
    "What you get by achieving your goals is not as important as what you become by achieving your goals",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle",
    "The future belongs to those who believe in the beauty of their dreams",
    "The only limit to our realization of tomorrow will be our doubts of today",
    "Creativity is intelligence having fun",
    "Your limitation—it's only your imagination",
    "Push yourself, because no one else is going to do it for you",
    "Great things never come from comfort zones",
    "Dream it. Wish it. Do it",
    "Success doesn’t just find you. You have to go out and get it",
    "The harder you work for something, the greater you’ll feel when you achieve it",
    "Dream bigger. Do bigger",
    "Don’t stop when you’re tired. Stop when you’re done",
    "Wake up with determination. Go to bed with satisfaction",
    "Do something today that your future self will thank you for",
    "Little things make big days",
    "It’s going to be hard, but hard does not mean impossible",
    "Don’t wait for opportunity. Create it",
    "Sometimes we’re tested not to show our weaknesses, but to discover our strengths",
    "The key to success is to focus on goals, not obstacles",
    "Dream it. Believe it. Build it",
    "Sometimes later becomes never. Do it now",
    "Great things never come from comfort zones",
    "Dream bigger. Do bigger",
    "Don’t stop when you’re tired. Stop when you’re done",
    "Wake up with determination. Go to bed with satisfaction",
    "Do something today that your future self will thank you for",
    "Little things make big days",
    "It’s going to be hard, but hard does not mean impossible",
    "Don’t wait for opportunity. Create it",
    "Sometimes we’re tested not to show our weaknesses, but to discover our strengths",
    "The key to success is to focus on goals, not obstacles",
    "Dream it. Believe it. Build it",
    "Sometimes later becomes never. Do it now",
    "Great things never come from comfort zones",
    "Dream bigger. Do bigger",
    "Don’t stop when you’re tired. Stop when you’re done",
    "Wake up with determination. Go to bed with satisfaction",
    "Do something today that your future self will thank you for",
    "Little things make big days",
    "It’s going to be hard, but hard does not mean impossible",
    "Don’t wait for opportunity. Create it",
    "Sometimes we’re tested not to show our weaknesses, but to discover our strengths",
    "The key to success is to focus on goals, not obstacles",
    "Dream it. Believe it. Build it",
    "Sometimes later becomes never. Do it now",
    "Great things never come from comfort zones",
    "Dream bigger. Do bigger",
    "Don’t stop when you’re tired. Stop when you’re done",
    "Wake up with determination. Go to bed with satisfaction",
    "Do something today that your future self will thank you for",
    "Little things make big days",
    "It’s going to be hard, but hard does not mean impossible",
    "Don’t wait for opportunity. Create it",
    "Sometimes we’re tested not to show our weaknesses, but to discover our strengths",
    "The key to success is to focus on goals, not obstacles",
    "Dream it. Believe it. Build it",
    "Sometimes later becomes never. Do it now",
    "Great things never come from comfort zones",
    "Dream bigger. Do bigger",
    "Don’t stop when you’re tired. Stop when you’re done",
    "Wake up with determination. Go to bed with satisfaction",
    "Do something today that your future self will thank you for",
    "Little things make big days",
    "It’s going to be hard, but hard does not mean impossible",
    "Don’t wait for opportunity. Create it",
    "Sometimes we’re tested not to show our weaknesses, but to discover our strengths",
    "The key to success is to focus on goals, not obstacles",
    "Dream it. Believe it. Build it",
    "Sometimes later becomes never. Do it now",
    "Great things never come from comfort zones",
    "Dream bigger. Do bigger",
    "Don’t stop when you’re tired. Stop when you’re done",
    "Wake up with determination. Go to bed with satisfaction",
    "Do something today that your future self will thank you for",
    "Little things make big days",
    "It’s going to be hard, but hard does not mean impossible",
    "Don’t wait for opportunity. Create it",
    "Sometimes we’re tested not to show our weaknesses, but to discover our strengths",
    "The key to success is to focus on goals, not obstacles",
    "Dream it. Believe it. Build it",
    "Sometimes later becomes never. Do it now",
    "Great things never come from comfort zones",
    "Dream bigger. Do bigger",
    "Don’t stop when you’re tired. Stop when you’re done",
    "Wake up with determination. Go to bed with satisfaction",
    "Do something today that your future self will thank you for",
    "Little things make big days",
    "It’s going to be hard, but hard does not mean impossible",
    "Don’t wait for opportunity. Create it",
    "Sometimes we’re tested not to show our weaknesses, but to discover our strengths",
    "The key to success is to focus on goals, not obstacles",
    "Dream it. Believe it. Build it",
    "Sometimes later becomes never. Do it now"
        // Other quotes...
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    quoteBox.innerHTML = `<h4>Inspirational Quotes</h4><p>${randomQuote}</p>`;
    quoteBox.classList.add("loaded");
});
