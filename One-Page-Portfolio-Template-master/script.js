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

    const quotes = [
        "Believe you can and you're halfway there",
        // Other quotes...
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    quoteBox.innerHTML = `<h4>Inspirational Quotes</h4><p>${randomQuote}</p>`;
    quoteBox.classList.add("loaded");
});
