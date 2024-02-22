document.addEventListener("DOMContentLoaded", function() {
    try {
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

        const emojiLayer = document.querySelector(".emoji-layer");
        const dateCells = document.querySelectorAll(".date");

        dateCells.forEach(cell => {
            cell.addEventListener("click", function(event) {
                // Clear previous emojis
                emojiLayer.innerHTML = "";

                // Create buttons for each emoji
                emojis.forEach(emoji => {
                    const emojiButton = document.createElement("button");
                    emojiButton.innerHTML = emoji;
                    emojiButton.classList.add("emoji-btn"); // Add class to style emoji buttons
                    emojiButton.addEventListener("click", function() {
                        try {
                            const userInput = prompt("Enter your note:");
                            if (userInput !== null && userInput.trim() !== "") {
                                const notepadList = document.querySelector(".notepad ul");
                                const listItem = document.createElement("li");
                                const day = cell.textContent.trim();
                                const month = document.querySelector(".month").textContent.trim();
                                listItem.innerHTML = `<span class="emoji">${emoji}</span> ${month} ${formatDay(day)}: ${userInput}`;
                                notepadList.appendChild(listItem);
                                emojiLayer.style.display = "none"; // Hide the emoji layer
                            }
                        } catch (error) {
                            console.error("An error occurred while processing user input:", error);
                        }
                    });
                    emojiLayer.appendChild(emojiButton);
                });

                // Calculate the position of the emoji layer relative to the clicked cell
                const containerRect = document.querySelector(".container").getBoundingClientRect();
                const tableRect = cell.closest("table").getBoundingClientRect();
                const offsetX = tableRect.left - containerRect.left + cell.offsetLeft + cell.offsetWidth / 2;
                const offsetY = tableRect.top - containerRect.top + cell.offsetTop + cell.offsetHeight / 2;

                // Position the emoji layer relative to the clicked cell
                emojiLayer.style.top = `${offsetY}px`;
                emojiLayer.style.left = `${offsetX}px`;
                emojiLayer.style.display = "block"; // Show the emoji layer
            });
        });

        // Close the emoji layer when clicking elsewhere on the page
        document.addEventListener("click", function(event) {
            if (!emojiLayer.contains(event.target) && !isDateCell(event.target)) {
                emojiLayer.style.display = "none"; // Hide the emoji layer
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
    } catch (error) {
        console.error("An error occurred:", error);
    }
});
