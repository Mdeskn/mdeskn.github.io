document.addEventListener("DOMContentLoaded", function () {
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
            cell.addEventListener("click", function (event) {
                // Clear previous emojis
                emojiLayer.innerHTML = "";

                // Create buttons for each emoji
                emojis.forEach(emoji => {
                    const emojiButton = document.createElement("button");
                    emojiButton.innerHTML = emoji;
                    emojiButton.classList.add("emoji-btn"); // Add class to style emoji buttons
                    emojiButton.addEventListener("click", function () {
                        try {
                            const userInput = prompt("Enter your note:");
                            if (userInput !== null && userInput.trim() !== "") {
                                const notepadList = document.querySelector(".notepad ul");
                                const listItem = document.createElement("li");
                                listItem.innerHTML = `<span class="emoji">${emoji}</span> ${formatDate(cell)}: <span class="note-text">${userInput}</span>`;
                                
                                // Create edit and delete icons
                                const editIcon = createEditIcon(listItem);
                                const deleteIcon = createDeleteIcon(listItem);

                                // Append icons to the list item
                                listItem.appendChild(editIcon);
                                listItem.appendChild(deleteIcon);

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
        document.addEventListener("click", function (event) {
            if (!emojiLayer.contains(event.target) && !isDateCell(event.target)) {
                emojiLayer.style.display = "none"; // Hide the emoji layer
            }
        });

        // Function to check if the clicked element is a date cell
        function isDateCell(element) {
            return element.classList.contains("date");
        }

        // Function to format the day number with the correct suffix
        function formatDate(cell) {
            const day = cell.textContent.trim();
            const month = document.querySelector(".month").textContent.trim();
            return `${month} ${formatDay(day)}`;
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

        // Function to handle Edit button click
        function handleEditButtonClick(listItem) {
            const noteText = listItem.querySelector(".note-text");
            const noteContent = noteText.textContent.trim();
            const editInput = document.createElement("textarea");
            editInput.classList.add("edit-input");
            editInput.value = noteContent;
            listItem.replaceChild(editInput, noteText);

            // Create save icon
            const saveIcon = createSaveIcon(listItem, editInput);

            // Replace edit icon with save icon
            const editIcon = listItem.querySelector(".edit-icon");
            listItem.replaceChild(saveIcon, editIcon);
        }

        // Function to handle Save button click
        function handleSaveButtonClick(listItem, editInput) {
            console.log("Attempting to save edited note...");
            try {
                // Check if .note-text element exists
                let noteText = listItem.querySelector(".note-text");
                if (!noteText) {
                    // If .note-text element does not exist, create it
                    noteText = document.createElement("span");
                    noteText.classList.add("note-text");
                    listItem.appendChild(noteText);
                }
                // Update the content of .note-text
                noteText.textContent = editInput.value;
                
                // Remove existing save icon
                const existingSaveIcon = listItem.querySelector(".save-icon");
                if (existingSaveIcon) {
                    listItem.removeChild(existingSaveIcon);
                }

                // Recreate edit icon
                const editIcon = createEditIcon(listItem);
                
                // Remove existing delete icon if present
                const existingDeleteIcon = listItem.querySelector(".delete-icon");
                if (existingDeleteIcon) {
                    listItem.removeChild(existingDeleteIcon);
                }
                // Create delete icon
                const deleteIcon = createDeleteIcon(listItem);
                
                // Append elements in the desired order
                listItem.appendChild(editIcon);
                listItem.appendChild(deleteIcon);
            } catch (error) {
                console.error("An error occurred while attempting to save the edited note:", error);
            } finally {
                // Remove edit input after saving
                listItem.removeChild(editInput);
            }
        }

        // Function to handle Delete button click
        function handleDeleteButtonClick(listItem) {
            try {
                const notepadList = document.querySelector(".notepad ul");
                notepadList.removeChild(listItem);
            } catch (error) {
                console.error("An error occurred while attempting to delete the note:", error);
            }
        }

        // Function to create edit icon
        function createEditIcon(listItem) {
            const editIcon = document.createElement("img");
            editIcon.src = "https://dl.dropboxusercontent.com/scl/fi/2ohpskxbkpu5i4vuqwfdv/edit.png?rlkey=9bu16i7ywtzaswpbnsh5pgity&dl=0";
            editIcon.alt = "Edit";
            editIcon.classList.add("icon", "edit-icon");
            editIcon.addEventListener("click", function () {
                // Handle edit functionality
                handleEditButtonClick(listItem);
            });
            return editIcon;
        }

        // Function to create save icon
        function createSaveIcon(listItem, editInput) {
            const saveIcon = document.createElement("img");
            saveIcon.src = "https://dl.dropboxusercontent.com/scl/fi/cloereb5qxgqh36yhwtg1/diskette.png?rlkey=otk379fodv3omxik57g72ltsj&dl=0";
            saveIcon.alt = "Save";
            saveIcon.classList.add("icon", "save-icon");
            saveIcon.addEventListener("click", function () {
                // Save edited note
                handleSaveButtonClick(listItem, editInput);
            });
            return saveIcon;
        }

        // Function to create delete icon
        function createDeleteIcon(listItem) {
            const deleteIcon = document.createElement("img");
            deleteIcon.src = "https://dl.dropboxusercontent.com/scl/fi/xeyyqsxw0t80tw5dx9nub/bin.png?rlkey=q1w7v4sd783ufvhb7hn2ezx1e&dl=0";
            deleteIcon.alt = "Delete";
            deleteIcon.classList.add("icon", "delete-icon");
            deleteIcon.addEventListener("click", function () {
                // Handle delete functionality
                handleDeleteButtonClick(listItem);
            });
            return deleteIcon;
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
