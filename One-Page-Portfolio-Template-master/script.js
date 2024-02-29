document.addEventListener("DOMContentLoaded", function () {
    try {
        const emojis = [
            "\uD83D\uDE42", // 🙂
            "\uD83D\uDE41", // 🙁
            "\u2757\u2757", // ❗
            "\uD83D\uDE04", // 🙄
            "\uD83D\uDE2D", // 😭
            "\uD83E\uDD73", // 🥳
            "\uD83E\uDD27", // 🤧
            "\uD83D\uDC8F", // 💏
            "\u2764\uFE0F"  // ❤️
        ];

        const emojiLayer = document.querySelector(".emoji-layer");
        const dateCells = document.querySelectorAll(".date");
        const containers = document.querySelectorAll(".container");

        // Hide all containers except the default (January)
        containers.forEach(container => {
            if (container.id !== "container1") {
                container.style.display = "none";
            }
        });

        // Set data-note-id attribute for each date cell
        dateCells.forEach(cell => {
            const cellId = cell.id; // Use the same ID without "note_"
            cell.setAttribute("data-note-id", cellId);
        });

        // Handle menu option click
        const menuOptions = document.querySelectorAll(".menu-option");
        menuOptions.forEach(option => {
            option.addEventListener("click", function (event) {
                event.preventDefault();
                const targetId = option.getAttribute("data-target");
                // Hide all containers
                containers.forEach(container => {
                    container.style.display = "none";
                });
                // Show the selected container
                document.getElementById(targetId).style.display = "block";
            });
        });

        dateCells.forEach(cell => {
            cell.addEventListener("click", function (event) {
                // Clear previous emojis
                emojiLayer.innerHTML = "";
        
                // Get the container corresponding to the clicked cell
                const container = cell.closest(".container");
        
                // Check if a note already exists for the selected date
                const notepadList = container.querySelector(".notepad ul");
                const existingNote = notepadList.querySelector(`li[data-note-id="${cell.getAttribute("data-note-id")}"]`);
                if (existingNote) {
                    alert("A note already exists for this date. You can edit your previous note instead of adding a new one.");
                    return;
                }
        
                // Proceed to add a new note
                emojis.forEach(emoji => {
                    const emojiButton = document.createElement("button");
                    emojiButton.innerHTML = emoji;
                    emojiButton.classList.add("emoji-btn");
                    emojiButton.addEventListener("click", function () {
                        try {
                            const userInput = prompt("Enter your note:");
                            if (userInput !== null && userInput.trim() !== "") {
                                // Find the notepad within the clicked container
                                const notepadList = container.querySelector(".notepad ul");
                                const listItem = document.createElement("li");
                                const uniqueId = "note_" + Date.now(); // Generate a unique ID based on the current timestamp
                                listItem.setAttribute("id", uniqueId);
                                const currentDateCellId = cell.getAttribute("data-note-id");
                                listItem.setAttribute("data-note-id", currentDateCellId); // Set the same ID to the corresponding date cell
                                listItem.innerHTML = `<span class="emoji">${emoji}</span> ${formatDate(cell)}: <span class="note-text">${userInput}</span>`;
        
                                // Dynamically add the selected emoji icon to the clicked cell
                                const emojiIcon = document.createElement("span");
                                emojiIcon.innerHTML = emoji;
                                emojiIcon.classList.add("emoji");
                                cell.appendChild(emojiIcon);
        
                                // Create edit and delete icons
                                const editIcon = createEditIcon(listItem);
                                const deleteIcon = createDeleteIcon(listItem);
        
                                // Append icons to the list item
                                listItem.appendChild(editIcon);
                                listItem.appendChild(deleteIcon);
        
                                notepadList.appendChild(listItem);
                                emojiLayer.style.display = "none"; // Hide the emoji layer
        
                                // Highlight corresponding note in the notepad when clicking on the emoji icon
                                emojiIcon.addEventListener("click", function () {
                                    listItem.scrollIntoView({ behavior: "smooth", block: "center" });
                                    listItem.classList.add("highlight"); // Add highlight class
                                    setTimeout(() => {
                                        listItem.classList.remove("highlight"); // Remove highlight after 2 seconds
                                    }, 2000);
                                });
                            }
                        } catch (error) {
                            console.error("An error occurred while processing user input:", error);
                        }
                    });
        
                    emojiLayer.appendChild(emojiButton);
                });
        
                // Calculate the position of the emoji layer relative to the clicked cell
                const containerRect = container.getBoundingClientRect();
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
            const month = cell.closest(".container").querySelector(".month").textContent.trim();
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
            const saveIcon = createSaveIcon(listItem);

            // Replace edit icon with save icon
            const editIcon = listItem.querySelector(".edit-icon");
            listItem.replaceChild(saveIcon, editIcon);

            // Focus on the edit input
            editInput.focus();

            // Save edited note on pressing Enter key
            editInput.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    saveEditedNote(listItem);
                }
            });

            // Save edited note on clicking outside the edit input
            editInput.addEventListener("focusout", function () {
                saveEditedNote(listItem);
            });
        }

        // Function to save edited note
        function saveEditedNote(listItem) {
            const editInput = listItem.querySelector(".edit-input");
            const editedContent = editInput.value.trim();
            if (editedContent !== "") {
                const noteText = document.createElement("span");
                noteText.classList.add("note-text");
                noteText.textContent = editedContent;
                listItem.replaceChild(noteText, editInput);

                // Replace save icon with edit icon
                const saveIcon = listItem.querySelector(".save-icon");
                const editIcon = createEditIcon(listItem);
                listItem.replaceChild(editIcon, saveIcon);
            } else {
                // If edited content is empty, remove the note and its emoji from the cell
                listItem.remove();
                const emoji = listItem.querySelector(".emoji");
                if (emoji) {
                    emoji.remove();
                }
            }
        }

        // Function to handle Delete button click
        function handleDeleteButtonClick(listItem) {
            console.log("Delete button clicked!");
            
            // Log the ID of the note
            const noteId = listItem.getAttribute("id");
            console.log("Note ID:", noteId);
            
            // Retrieve the corresponding date cell ID from the note
            const dateCellId = listItem.getAttribute("data-note-id");
            console.log("Date cell ID:", dateCellId);
            
            // Check if the date cell ID is valid
            if (!dateCellId) {
                console.error("Date cell ID not found for the note:", noteId);
                return;
            }
            
            // Retrieve the date cell using its ID
            const dateCell = document.getElementById(dateCellId);
            console.log("Date cell:", dateCell);
            
            // Check if the date cell is found
            if (!dateCell) {
                console.error("Date cell not found for ID:", dateCellId);
                return;
            }
            
            // Remove all but one emoji icon from the date cell
            const emojiIcons = dateCell.querySelectorAll("span.emoji");
            emojiIcons.forEach((emojiIcon, index) => {
                if (index === 0) {
                    emojiIcon.innerHTML = ""; // Keep the first emoji span, clear others
                } else {
                    emojiIcon.remove(); // Remove extra emoji spans
                }
            });
            
            // Remove the note's HTML element
            listItem.remove();
        }

        // Function to create Edit icon
        function createEditIcon(listItem) {
            const editIcon = document.createElement("img");
            editIcon.src = "assets/edit.png"; // Replace "path_to_edit_image.png" with the actual path to your edit image
            editIcon.classList.add("edit-icon");
            editIcon.addEventListener("click", function () {
                handleEditButtonClick(listItem);
            });
            return editIcon;
        }

        // Function to create Save icon
        function createSaveIcon(listItem) {
            const saveIcon = document.createElement("img");
            saveIcon.src = "assets/diskette.png"; // Replace "path_to_save_image.png" with the actual path to your save image
            saveIcon.classList.add("save-icon");
            saveIcon.addEventListener("click", function () {
                saveEditedNote(listItem);
            });
            return saveIcon;
        }

        // Function to create Delete icon
        function createDeleteIcon(listItem) {
            const deleteIcon = document.createElement("img");
            deleteIcon.src = "assets/bin.png"; // Replace "path_to_delete_image.png" with the actual path to your delete image
            deleteIcon.classList.add("delete-icon");
            deleteIcon.addEventListener("click", function () {
                handleDeleteButtonClick(listItem);
            });
            return deleteIcon;
        }

    } catch (error) {
        console.error("An error occurred:", error);
    }

    document.addEventListener("DOMContentLoaded", function () {
        try {
            const dropdownButton = document.querySelector('.dropbtn');
            dropdownButton.addEventListener('click', function() {
                this.classList.toggle('active');
                const dropdownContent = document.querySelector('.dropdown-content');
                dropdownContent.classList.toggle('show'); // Toggle visibility of the dropdown content
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    // Set up inspirational quotes
    const quoteBox = document.querySelectorAll(".quote-box");
    const quotes = [
        "Believe you can and you're halfway there",
        "The only way to do great work is to love what you do",
        "Success is not final, failure is not fatal: It is the courage to continue that counts",
        "Hardships often prepare ordinary people for an extraordinary destiny",
        "I can't change the direction of the wind, but I can adjust my sails to always reach my destination",
        "No act of kindness, no matter how small, is ever wasted",
        "What you get by achieving your goals is not as important as what you become by achieving your goals",
        "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle",
        "The future belongs to those who believe in the beauty of their dreams",
        "The only limit to our realization of tomorrow will be our doubts of today",
    ];
    quoteBox.forEach((box, index) => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        box.innerHTML = `<h4>Inspirational Quotes</h4><p>${randomQuote}</p>`;
        box.classList.add("loaded");
    });
});
