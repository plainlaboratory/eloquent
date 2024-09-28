// DOM Elements
const newVocabButton = document.getElementById('newVocabButton');
const openSettingsButton = document.getElementById('openSettingsButton');
const closeSettingsButton = document.getElementById('closeSettingsButton');
const settingsModal = document.getElementById('settingsModal');
const vocabularyActionsModal = document.getElementById('vocabularyActionsModal');
const closeVocabularyActionsButton = document.getElementById('closeVocabularyActionsButton');
const openRenameVocabularyButton = document.getElementById('openRenameVocabularyButton');
const openDeleteVocabularyButton = document.getElementById('openDeleteVocabularyButton');
const renameVocabularyModal = document.getElementById('renameVocabularyModal');
const renameVocabularyButton = document.getElementById('renameVocabularyButton');
const closeRenameVocabularyButton = document.getElementById('closeRenameVocabularyButton');
const deleteVocabularyButton = document.getElementById('deleteVocabularyButton');
const closeDeleteVocabularyButton = document.getElementById('closeDeleteVocabularyButton');
const deleteVocabularyModal = document.getElementById('deleteVocabularyModal');
const vocabModal = document.getElementById('vocabModal');
const vocabNameModal = document.getElementById('vocabularyNameModal');
const addVocabularyModal = document.getElementById('addVocabularyModal');
const discardVocab = document.getElementById('discardVocab');
const vocabButtonsDiv = document.getElementById('vocabButtons');
const vocabPanelModal = document.getElementById('vocabPanelModal');
const wordDisplayModal = document.getElementById('wordDisplayModal');
const addWordButton = document.getElementById('addWordButton');
const wordModal = document.getElementById('wordModal');
const categoryModalInput = document.getElementById('categoryModalInput');
const wordModalInput = document.getElementById('wordModalInput');
const translationModalInput = document.getElementById('translationModalInput');
const sentenceModalInput = document.getElementById('sentenceModalInput');
const addWordModal = document.getElementById('addWordModal');
const discardWord = document.getElementById('discardWord');
const exportData = document.getElementById('exportData');
const importFile = document.getElementById('importFile');
const importData = document.getElementById('importData');

let currentVocabulary = null;
let currentVocabularyToEdit = null;

// Local storage key
const LOCAL_STORAGE_KEY = "vocabularyAppData";

// Initialize app
let vocabularies = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
let selectedVocab = '';

// Default categories
// Constants for default and custom categories
const defaultCategories = [
    "Art", "Communication", "Culture", "Education", "Emotions", 
    "Entertainment", "Family", "Finance", "Food", "Health", 
    "History", "Hobbies", "Nature", "Relationships", "Science", 
    "Shopping", "Sports", "Technology", "Travel", "Work"
];
let customCategories = [];

// DOM Elements
const openCustomCategoriesManagerButton = document.getElementById('openCustomCategoriesManagerButton');
const customCategoryManagerModal = document.getElementById('customCategoryManagerModal');
const closeCustomCategoriesModalButton = document.getElementById('closeCustomCategoriesModalButton');
const openCustomCategoryButton = document.getElementById('openCustomCategoryButton');
const newCustomCategoryInput = document.getElementById('newCustomCategoryInput');
const customCategoryList = document.getElementById('customCategoryList');
const addCustomCategoryModal = document.getElementById('addCustomCategoryModal');
const deleteCustomCategoryModal = document.getElementById('deleteCustomCategoryModal');
const confirmDeleteCustomCategoryModal = document.getElementById('confirmDeleteCustomCategoryModal');
const confirmDeleteCategoryButton = document.getElementById('confirmDeleteCategory');
const openImportModalButton = document.getElementById('openImportModalButton');
const importModal = document.getElementById('importModal');
const closeimportModalButton = document.getElementById('closeimportModalButton');
const backupReminder = document.getElementById('backupReminder');
const closeBackupReminder = document.getElementById('closeBackupReminder');
const renameErrorModal = document.getElementById('renameErrorModal');
const closeRenameErrorButton = document.getElementById('closeRenameErrorButton');
const openWipeModal = document.getElementById('openWipeModal');
const wipeModal = document.getElementById('wipeModal');
const wipeData = document.getElementById('wipeData');
const closeWipeModalButton = document.getElementById('closeWipeModalButton');

// Function to populate categories in all relevant dropdowns
function populateCategories() {
    console.log('Populating categories...');
    const allCategories = [...defaultCategories, ...customCategories];
    console.log('All categories:', allCategories);

    // Clear existing options in all dropdowns
    categoryModalInput.innerHTML = '';
    categoryList.innerHTML = '';
    editCategoryInput.innerHTML = '';

    allCategories.forEach(category => {
        // Populate #categoryModalInput
        let optionModalInput = document.createElement('option');
        optionModalInput.value = category;
        optionModalInput.textContent = category;
        categoryModalInput.appendChild(optionModalInput);

        // Populate #categoryList
        let optionCategoryList = document.createElement('option');
        optionCategoryList.value = category;
        optionCategoryList.textContent = category;
        categoryList.appendChild(optionCategoryList);

        // Populate #editCategoryInput
        let optionEditCategory = document.createElement('option');
        optionEditCategory.value = category;
        optionEditCategory.textContent = category;
        editCategoryInput.appendChild(optionEditCategory);
    });
    applySavedAppearance();
}

function closeWelcome() {
    document.getElementById("welcomeModal").style.opacity="0";
    setTimeout(() => {
        document.getElementById("welcomeModal").style.display = 'none';
      }, 250);
      localStorage.setItem('welcomeState', 'gotten');
}

function showWelcome() {
    if (localStorage.getItem('welcomeState') == 'gotten') {
        document.getElementById("welcomeModal").style.display = "none";
    }
    else {
        document.getElementById("welcomeModal").style.display = "block";
    }
}

showWelcome();

function showBackupReminder() {
    const lastShownDate = localStorage.getItem('backupReminderLastShown');
    
    // Get today's date as YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    // Show the modal only if it hasn't been shown today
    if (lastShownDate == today) {
        // Show the modal
        backupReminder.style.opacity = '0';
        setTimeout(() => {
            backupReminder.style.display = 'none';
        }, 250);
    }
}

// Hide the modal and update localStorage when the close button is clicked
document.getElementById('closeBackupReminder').addEventListener('click', () => {
    backupReminder.style.opacity = '0';
    setTimeout(() => {
        backupReminder.style.display = 'none';
    }, 250);

    // Set today's date in localStorage
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('backupReminderLastShown', today);
});

// Hide the modal and update localStorage when the export button is clicked
document.getElementById('exportFromReminder').addEventListener('click', () => {
    backupReminder.style.opacity = '0';
    setTimeout(() => {
        backupReminder.style.display = 'none';
    }, 250);

    // Set today's date in localStorage
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('backupReminderLastShown', today);
});

window.addEventListener('DOMContentLoaded', () => {
    const storedCustomCategories = JSON.parse(localStorage.getItem('customCategories')) || [];
    customCategories = storedCustomCategories.length ? storedCustomCategories : [];
    populateCategories(); // Populate categories on page load
    showBackupReminder();
});

// Add custom category logic
document.getElementById('applyNewCategory').addEventListener('click', () => {
    const newCategory = newCustomCategoryInput.value.trim();
    if (newCategory && !customCategories.includes(newCategory) && !defaultCategories.includes(newCategory)) {
        customCategories.push(newCategory);
        localStorage.setItem('customCategories', JSON.stringify(customCategories)); // Save to localStorage
        populateCategories(); // Refresh category dropdowns
        addCustomCategoryModal.style.opacity="0";
        setTimeout(() => {
            addCustomCategoryModal.style.display = 'none';
        }, 250);
        newCustomCategoryInput.value = ''; // Clear input
    } else {
        alert('Invalid or duplicate category');
    }
});

openImportModalButton.addEventListener('click', () => {
    importModal.style.display = 'block';
    setTimeout(() => {
        importModal.style.opacity="1";
      }, 250);
  });
  openWipeModal.addEventListener('click', () => {
    wipeModal.style.display = 'block';
    setTimeout(() => {
        wipeModal.style.opacity = "1";
    }, 250);

    // Disable the wipe button for 10 seconds
    const wipeButton = document.getElementById('wipeData');
    let remainingTime = 10;
    
    wipeButton.disabled = true; // Disable the button initially
    wipeButton.textContent = `Wipe data (${remainingTime} s.)`;

    // Create an interval to update the button text every second
    const countdownInterval = setInterval(() => {
        remainingTime -= 1;
        wipeButton.textContent = `Wipe data (${remainingTime} s.)`;

        // After 10 seconds, enable the button and clear the interval
        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            wipeButton.textContent = "Wipe data";
            wipeButton.disabled = false; // Enable the button after 10 seconds
        }
    }, 1000);
});

openCustomCategoriesManagerButton.addEventListener('click', () => {
    customCategoryManagerModal.style.display = 'block';
    setTimeout(() => {
        customCategoryManagerModal.style.opacity="1";
      }, 250);
  });
closeCustomCategoriesModalButton.addEventListener('click', () => {
    customCategoryManagerModal.style.opacity="0";
    setTimeout(() => {
        customCategoryManagerModal.style.display = 'none';
      }, 250);
  });
openCustomCategoryButton.addEventListener('click', () => {
    addCustomCategoryModal.style.display = 'block';
    setTimeout(() => {
        addCustomCategoryModal.style.opacity="1";
      }, 250);
  });
document.getElementById('discardNewCategory').addEventListener('click', () => {
    addCustomCategoryModal.style.opacity="0";
    setTimeout(() => {
        addCustomCategoryModal.style.display = 'none';
      }, 250);
    newCustomCategoryInput.value = ''; // Clear input
});
closeBackupReminder.addEventListener('click', () => {
    backupReminder.style.opacity="0";
    setTimeout(() => {
        backupReminder.style.display = 'none';
      }, 250);
  });
closeWipeModalButton.addEventListener('click', () => {
      wipeModal.style.opacity="0";
      setTimeout(() => {
          wipeModal.style.display = 'none';
        }, 250);
});
wipeData.addEventListener('click', () => {
        localStorage.clear();
        window.location.reload();
});

// Open Delete Custom Category Modal
document.getElementById('deleteCustomCategoryButton').addEventListener('click', () => {
    if (customCategories.length === 0) {
        customCategoryList.innerHTML = 'No custom categories have been added.';
    }
    else {
        customCategoryList.innerHTML = ''; // Clear the list
        customCategories.forEach((category, index) => {
            const categoryItem = document.createElement('div');
            categoryItem.classList.add('category-item', 'selected');
            categoryItem.innerHTML = `
                <span>${category}</span>
                <button class="delete-category-btn" data-index="${index}"></button>
            `;
            customCategoryList.appendChild(categoryItem);

            // Add event listener for delete button
            categoryItem.querySelector('.delete-category-btn').addEventListener('click', () => {
                openConfirmDeleteCategoryModal(index);
            });
        });
    }
    deleteCustomCategoryModal.style.display = 'block';
    setTimeout(() => {
        deleteCustomCategoryModal.style.opacity = '1';
    }, 250);
});

// Close delete modal
document.getElementById('discardDeleteCategory').addEventListener('click', () => {
    deleteCustomCategoryModal.style.opacity = '0';
    setTimeout(() => {
        deleteCustomCategoryModal.style.display = 'none';
    }, 250);
});

// Open confirm delete category modal
let categoryToDeleteIndex = null;
function openConfirmDeleteCategoryModal(index) {
    categoryToDeleteIndex = index;
    confirmDeleteCustomCategoryModal.style.display = 'block';
    setTimeout(() => {
        confirmDeleteCustomCategoryModal.style.opacity = '1';
    }, 250);
}

// Confirm deletion logic
confirmDeleteCategoryButton.addEventListener('click', () => {
    if (categoryToDeleteIndex !== null) {
        const categoryToDelete = customCategories[categoryToDeleteIndex];

        // Step 1: Remove all words associated with the deleted custom category from vocabularies
        Object.keys(vocabularies).forEach(vocabularyName => {
            vocabularies[vocabularyName] = vocabularies[vocabularyName].filter(word => word.category !== categoryToDelete);
        });

        // Step 2: Remove the words from localStorage under LOCAL_STORAGE_KEY
        const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedData) {
            Object.keys(storedData).forEach(vocabularyName => {
                storedData[vocabularyName] = storedData[vocabularyName].filter(word => word.category !== categoryToDelete);

                // If the vocabulary becomes empty, remove it entirely
                if (storedData[vocabularyName].length === 0) {
                    delete storedData[vocabularyName];
                }
            });
            // Update localStorage with the modified data
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedData));
        }

        // Step 3: Remove the custom category from the customCategories array
        customCategories.splice(categoryToDeleteIndex, 1);
        localStorage.setItem('customCategories', JSON.stringify(customCategories)); // Update localStorage

        // Refresh the UI components after deletion
        populateCategories(); // Refresh category dropdowns
        displayWords(currentVocabulary); // Refresh word display modal

        // Close the delete modals
        deleteCustomCategoryModal.style.opacity = "0";
        setTimeout(() => {
            deleteCustomCategoryModal.style.display = 'none';
        }, 250);

        confirmDeleteCustomCategoryModal.style.opacity = "0";
        setTimeout(() => {
            confirmDeleteCustomCategoryModal.style.display = 'none';
        }, 250);
    }
    categoryToDeleteIndex = null; // Reset the index
    applySavedAppearance();
});


// Cancel deletion
document.getElementById('cancelDeleteCategory').addEventListener('click', () => {
    confirmDeleteCustomCategoryModal.style.opacity="0";
    setTimeout(() => {
        confirmDeleteCustomCategoryModal.style.display = 'none';
      }, 250);
});


// Load vocabularies on startup
function loadVocabularies() {
    vocabButtonsDiv.innerHTML = '';
    Object.keys(vocabularies).forEach(vocabulary => {
        createVocabButton(vocabulary);
    });
}
loadVocabularies();

// Create vocabulary div
function createVocabButton(vocabName) {
    let vocabDiv = document.createElement('div');
    vocabDiv.classList.add('vocab-item');
    vocabDiv.setAttribute('data-vocab-name', vocabName); // Set data-vocab-name attribute
    
    // Create main div with the vocabulary name
    let vocabNameDiv = document.createElement('span');
    vocabNameDiv.textContent = vocabName;
    vocabNameDiv.classList.add('vocab-name');
    
    // Add click event to open the vocabulary panel
    vocabNameDiv.addEventListener('click', () => {
        selectedVocab = vocabName;
        openVocabPanel(vocabName);
    });

    // Create the triple dot div
    let actionsDiv = document.createElement('button');
    actionsDiv.textContent = '⋮';
    actionsDiv.classList.add('vocab-actions');
    
    // Add click event to show the vocabulary actions
    actionsDiv.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevents the parent click event from firing
        showVocabularyActions(vocabName);
    });

    // Append the name div and actions div to the main vocab div
    vocabDiv.appendChild(vocabNameDiv);
    vocabDiv.appendChild(actionsDiv);
    
    // Append the vocabulary div to the vocab buttons container
    vocabButtonsDiv.appendChild(vocabDiv);
}

// Open vocabulary panel
function openVocabPanel(vocabName) {
    // Ensure selectedVocab and currentVocabulary are in sync
    selectedVocab = vocabName;
    currentVocabulary = vocabName;

    // Open the vocabulary panel
    vocabPanelModal.style.display = 'block';
    setTimeout(() => {
        vocabPanelModal.style.opacity = "1";
    }, 250);

    // Display words for the selected vocabulary
    displayWords(vocabName);
    applySavedAppearance();
}


// Open vocabulary actions 
function showVocabularyActions(vocabName) {
    currentVocabularyToEdit = vocabName; // Set the vocabulary to be edited
    vocabularyActionsModal.style.display = 'block';
    setTimeout(() => {
        vocabularyActionsModal.style.opacity = '1';
    }, 250);
}

// Close vocabulary actions
closeVocabularyActionsButton.addEventListener('click', () => {
    vocabularyActionsModal.style.opacity="0";
    setTimeout(() => {
        vocabularyActionsModal.style.display = 'none';
      }, 250);
  });

// Open rename vocabulary modal
openRenameVocabularyButton.addEventListener('click', () => {
    renameVocabularyModal.style.display = 'block';
    setTimeout(() => {
        renameVocabularyModal.style.opacity="1";
      }, 250);
  });

  // Close rename vocabulary
  closeRenameVocabularyButton.addEventListener('click', () => {
      renameVocabularyModal.style.opacity="0";
      setTimeout(() => {
        renameVocabularyModal.style.display = 'none';
        }, 250);
    });

// Open delete vocabulary modal
openDeleteVocabularyButton.addEventListener('click', () => {
    deleteVocabularyModal.style.display = 'block';
    setTimeout(() => {
        deleteVocabularyModal.style.opacity="1";
      }, 250);
  });

  // Close delete vocabulary
  closeDeleteVocabularyButton.addEventListener('click', () => {
      deleteVocabularyModal.style.opacity="0";
      setTimeout(() => {
        deleteVocabularyModal.style.display = 'none';
        }, 250);
    });

document.getElementById('renameVocabularyButton').addEventListener('click', () => {
        const newVocabName = document.getElementById('newVocabNameInput').value.trim();
    
        if (!newVocabName) {
            renameErrorModal.style.display = 'block';
            document.getElementById("renameErrorDescription").innerHTML = "The name of vocabulary cannot be empty.";
            setTimeout(() => {
                renameErrorModal.style.opacity="1";
              }, 250);
            return;
        }
    
        // Check if the new name is the same as the current name
        if (newVocabName === currentVocabularyToEdit) {
            renameErrorModal.style.display = 'block';
            document.getElementById("renameErrorDescription").innerHTML = "The new name of vocabulary cannot be the same.";
            setTimeout(() => {
                renameErrorModal.style.opacity="1";
              }, 250);
            return;
        }
    
        if (currentVocabularyToEdit) {
            // Update the name in localStorage
            const vocabData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
            
            // Check if the current vocabulary exists in localStorage
            if (vocabData[currentVocabularyToEdit]) {
                // Rename the vocabulary key
                vocabData[newVocabName] = vocabData[currentVocabularyToEdit];
                delete vocabData[currentVocabularyToEdit]; // Remove the old name
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(vocabData));
            }
    
            // Find the vocab item by data-vocab-name
            const vocabButton = document.querySelector(`#vocabButtons .vocab-item[data-vocab-name="${currentVocabularyToEdit}"]`);
    
            if (vocabButton) {
                // Update the data-vocab-name attribute
                vocabButton.setAttribute('data-vocab-name', newVocabName);
    
                // Update the text content of the span with class 'vocab-name'
                const vocabNameSpan = vocabButton.querySelector('.vocab-name');
                if (vocabNameSpan) {
                    vocabNameSpan.textContent = newVocabName;
                }
            }
    
            // Update both selectedVocab and currentVocabulary to the new name
            selectedVocab = newVocabName;
            currentVocabulary = newVocabName;
    
            // Close the rename modal and update the global variable
            currentVocabularyToEdit = newVocabName;
            vocabularyActionsModal.style.opacity = "0";
            setTimeout(() => {
                vocabularyActionsModal.style.display = 'none';
                window.location.reload();
            }, 250);
        }
    });

closeRenameErrorButton.addEventListener('click', () => {
        renameErrorModal.style.opacity="0";
        setTimeout(() => {
            renameErrorModal.style.display = 'none';
          }, 250);
      });

document.getElementById('deleteVocabularyButton').addEventListener('click', () => {
    if (currentVocabularyToEdit) {
        // Remove from localStorage
        const vocabData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
        delete vocabData[currentVocabularyToEdit];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(vocabData));

        // Find the vocab item by data-vocab-name and remove it
        const vocabButton = document.querySelector(`#vocabButtons .vocab-item[data-vocab-name="${currentVocabularyToEdit}"]`);
        if (vocabButton) {
            vocabButton.remove(); // Remove the button from the DOM
        }

        // Reset global variables
        selectedVocab = null;
        currentVocabulary = null;

        // Close the delete modal
      deleteVocabularyModal.style.opacity="0";
      setTimeout(() => {
        deleteVocabularyModal.style.display = 'none';
        }, 250);
    
      vocabularyActionsModal.style.opacity="0";
      setTimeout(() => {
        vocabularyActionsModal.style.display = 'none';
        }, 250);
    }
});



// Add vocabulary
addVocabularyModal.addEventListener('click', () => {
    const vocabName = vocabNameModal.value.trim();
    if (vocabName && !vocabularies[vocabName]) {
        vocabularies[vocabName] = [];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(vocabularies));
        createVocabButton(vocabName);
        vocabModal.style.opacity="0";
        setTimeout(() => {
            vocabModal.style.display = 'none';
          }, 250);
        vocabNameModal.value = '';
    }
    applySavedAppearance();
});

// Add word
addWordModal.addEventListener('click', () => {
    const word = wordModalInput.value.trim();
    const category = categoryModalInput.value;
    const translation = translationModalInput.value.trim();
    const sentence = sentenceModalInput.value.trim();

    if (word && selectedVocab) {
        // Ensure we have the most up-to-date vocabulary name (in case it was renamed)
        const currentVocabName = selectedVocab;

        // Push the new word into the correct vocabulary
        if (!vocabularies[currentVocabName]) {
            // In case the vocabulary doesn't exist yet, initialize it
            vocabularies[currentVocabName] = [];
        }

        // Add new word entry
        vocabularies[currentVocabName].push({ word, category, translation, sentence });

        // Update localStorage
        updateLocalStorageAndInfo();

        // Re-display words for the updated vocabulary
        displayWords(currentVocabName);

        // Close modal
        wordModal.style.opacity = "0";
        setTimeout(() => {
            wordModal.style.display = 'none';
        }, 250);

        // Clear input fields
        wordModalInput.value = '';
        translationModalInput.value = '';
        sentenceModalInput.value = '';
    }
    applySavedAppearance();
});


// Export Data
function exportVocabularyData() {
    // Gather data to export
    const exportData = {
        vocabularies: vocabularies,
        customCategories: customCategories,
        appearanceTheme: localStorage.getItem('appearanceTheme') || 'light' // Default to 'light' if not set
    };

    // Convert the data to a JSON string
    const dataStr = JSON.stringify(exportData, null, 2);

    // Create a blob and download link
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vocabularyData.json';

    // Programmatically click the download link
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    backupReminder.style.opacity = "0";
    setTimeout(() => {
        backupReminder.style.display = 'none';
    }, 250);
}

// Call the function on export button click or any other source
exportData.addEventListener('click', exportVocabularyData);

// Import Data
importData.addEventListener('click', () => {
    const file = importFile.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const importedData = JSON.parse(event.target.result);

            // Check if the imported data contains vocabularies, custom categories, and theme
            if (importedData.vocabularies) {
                vocabularies = importedData.vocabularies;
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(vocabularies)); // Save vocabularies
                loadVocabularies(); // Load vocabularies into UI
            }
            
            if (importedData.customCategories) {
                customCategories = importedData.customCategories;
                localStorage.setItem('customCategories', JSON.stringify(customCategories)); // Save custom categories
                populateCategories(); // Refresh category dropdowns
            }

            if (importedData.appearanceTheme) {
                localStorage.setItem('appearanceTheme', importedData.appearanceTheme); // Save the theme
                if (importedData.appearanceTheme === 'dark') {
                    darkAppearance(); // Apply dark theme if it was saved in the import
                }
            }
        };
        reader.readAsText(file);
    }

    // Close import modal after operation
    importModal.style.opacity = "0";
    setTimeout(() => {
        importModal.style.display = 'none';
    }, 250);
});


function checkForUploadedFile() {
    const importFileInput = document.getElementById('importFile');
    const uploadedFileNameDiv = document.getElementById('uploadedFileName');

    // Check if the input contains a file
    if (importFileInput.files && importFileInput.files.length > 0) {
        const fileName = importFileInput.files[0].name; // Get the name of the first file
        uploadedFileNameDiv.textContent = fileName; // Display the file name in the div
    } else {
        uploadedFileNameDiv.textContent = "No file uploaded."; // If no file, show a placeholder
    }
}

// You can call this function directly after file input change event or manually when needed
document.getElementById('importFile').addEventListener('change', checkForUploadedFile);


// Open modals
newVocabButton.addEventListener('click', () => {
    vocabModal.style.display = 'block';
    setTimeout(() => {
        vocabModal.style.opacity="1";
      }, 250);
  });
  addWordButton.addEventListener('click', () => {
    wordModal.style.display = 'block';
    setTimeout(() => {
        wordModal.style.opacity="1";
      }, 250);
  });
  openSettingsButton.addEventListener('click', () => {
    settingsModal.style.display = 'block';
      setTimeout(() => {
        settingsModal.style.opacity="1";
        }, 250);
        updateStorageInfo();
    });

// Close modals
discardVocab.addEventListener('click', () => {
    vocabModal.style.opacity="0";
    setTimeout(() => {
        vocabModal.style.display = 'none';
      }, 250);
  });
  discardWord.addEventListener('click', () => {
    wordModal.style.opacity="0";
    setTimeout(() => {
        wordModal.style.display = 'none';
      }, 250);
});
closeSettingsButton.addEventListener('click', () => {
  settingsModal.style.opacity="0";
  setTimeout(() => {
    settingsModal.style.display = 'none';
    }, 250);
});
closeImportModalButton.addEventListener('click', () => {
  importModal.style.opacity="0";
  setTimeout(() => {
    importModal.style.display = 'none';
    }, 250);
});

// Back Button to close vocabulary modal
const backButton = document.getElementById('backButton');
backButton.addEventListener('click', () => {
    vocabPanelModal.style.opacity="0";
    setTimeout(() => {
        vocabPanelModal.style.display = 'none';
      }, 250);
      currentVocabulary = null;
      selectedVocab = null;
});

// Display localStorage usage info
const storageUsage = document.getElementById('storageUsage');

// Calculate and display localStorage usage
function updateStorageInfo() {
    const usedBytes = new Blob(Object.values(localStorage)).size;
    const totalBytes = 5 * 1024 * 1024; // 5MB in bytes (localStorage limit)
    const freeBytes = totalBytes - usedBytes;
    storageUsage.innerHTML = `Used: ${(usedBytes / 1024).toFixed(2)} KB, Free: ${(freeBytes / 1024).toFixed(2)} KB`;
}

// Update storage info whenever words are added, edited, or deleted
function updateLocalStorageAndInfo() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(vocabularies));
    updateStorageInfo();
}

const editWordModal = document.getElementById('editWordModal');
const editWordInput = document.getElementById('editWordInput');
const editTranslationInput = document.getElementById('editTranslationInput');
const editSentenceInput = document.getElementById('editSentenceInput');
const editCategoryInput = document.getElementById('editCategoryInput');
const saveEditButton = document.getElementById('saveEditButton');
const discardEditButton = document.getElementById('discardEditButton');

const deleteConfirmationModal = document.getElementById('deleteConfirmationModal');
const confirmDeleteButton = document.getElementById('confirmDeleteButton');
const discardDeleteButton = document.getElementById('discardDeleteButton');

let currentEditIndex;
let currentDeleteIndex;
let currentEditVocabulary;

// Show and hide mock sentences
function toggleMockSentence(listItem) {
    const sentence = listItem.querySelector('.sentence');
    const allSentences = document.querySelectorAll('.sentence');

    allSentences.forEach(s => {
        if (s !== sentence) s.style.display = 'none';
    });

    sentence.style.display = sentence.style.display === 'none' ? 'block' : 'none';
}

const sortByCategoriesButton = document.getElementById('sortByCategoriesButton');
const categorySelectionModal = document.getElementById('categorySelectionModal');
const closeCategoryModal = document.getElementById('closeCategoryModal');
const categoryList = document.getElementById('categoryList');
const switchAllButton = document.getElementById('switchAllButton');
const applyCategoriesButton = document.getElementById('applyCategoriesButton');
const deleteWordName = document.getElementById('deleteWordName');

// Track selected categories
let selectedCategories = new Set(defaultCategories);

// Open category selection modal
sortByCategoriesButton.addEventListener('click', () => {
    populateCategoryList();
    categorySelectionModal.style.display = 'block';
    setTimeout(() => {
        categorySelectionModal.style.opacity="1";
      }, 250);
});

// Close category selection modal
closeCategoryModal.addEventListener('click', () => {
    categorySelectionModal.style.opacity="0";
    setTimeout(() => {
        categorySelectionModal.style.display = 'none';
      }, 250);
});

// Populate category list in the modal
function populateCategoryList() {
    categoryList.innerHTML = ''; // Clear the category list
    
    // Handle default categories
    const defaultHeading = document.createElement('h3');
    defaultHeading.textContent = "Default Categories";
    categoryList.appendChild(defaultHeading);

    defaultCategories.forEach(category => {
        const div = document.createElement('div');
        div.textContent = category;
        div.classList.add('category-item');

        // Check if the category is selected and apply 'selected' class
        if (selectedCategories.has(category)) {
            div.classList.add('selected');
        }

        // Add click event to toggle category selection
        div.addEventListener('click', () => {
            toggleCategorySelection(category, div);
        });

        // Append the default category div to the category list
        categoryList.appendChild(div);
    });

    // Handle custom categories
    if (customCategories.length > 0) {
        const customHeading = document.createElement('h3');
        customHeading.textContent = "Custom Categories";
        categoryList.appendChild(customHeading);

        customCategories.forEach(category => {
            const div = document.createElement('div');
            div.textContent = category;
            div.classList.add('category-item');

            // Check if the category is selected and apply 'selected' class
            if (selectedCategories.has(category)) {
                div.classList.add('selected');
            }

            // Add click event to toggle category selection
            div.addEventListener('click', () => {
                toggleCategorySelection(category, div);
            });

            // Append the custom category div to the category list
            categoryList.appendChild(div);
        });
    }
    applySavedAppearance();
}



// Toggle category selection
function toggleCategorySelection(category, element) {
    if (selectedCategories.has(category)) {
        selectedCategories.delete(category);
        element.classList.remove('selected');
    } else {
        selectedCategories.add(category);
        element.classList.add('selected');
    }
}

// Switch all categories
switchAllButton.addEventListener('click', () => {
    const allCategories = [...defaultCategories, ...customCategories]; // Combine default and custom categories

    if (selectedCategories.size === allCategories.length) {
        // If all categories are selected, clear the selection
        selectedCategories.clear();
    } else {
        // Otherwise, select all categories (default and custom)
        allCategories.forEach(category => selectedCategories.add(category));
    }
    
    populateCategoryList(); // Refresh the list
    applySavedAppearance();
});


// Apply selected categories
applyCategoriesButton.addEventListener('click', () => {
    categorySelectionModal.style.opacity="0";
    setTimeout(() => {
        categorySelectionModal.style.display = 'none';
      }, 250);
    displayWords(selectedVocab); // Refresh word display based on selected categories
    applySavedAppearance();
});

function displayWords(vocabulary) {
    wordDisplayModal.innerHTML = '';
    let currentCategory = '';

    // Sort by category first, and then alphabetically by word within the category
    vocabularies[vocabulary]
        .sort((a, b) => {
            if (a.category === b.category) {
                return a.word.localeCompare(b.word); // Sort words alphabetically if they are in the same category
            }
            return a.category.localeCompare(b.category); // Otherwise, sort by category
        })
        .forEach(entry => {
            if (selectedCategories.has(entry.category) || !entry.category) { // Show words without category too
                if (entry.category !== currentCategory) {
                    const categoryHeading = document.createElement('h3');
                    categoryHeading.classList.add('category-heading');
                    categoryHeading.textContent = entry.category || 'Uncategorized';
                    wordDisplayModal.appendChild(categoryHeading);
                    currentCategory = entry.category;
                }

                const listItem = document.createElement('div');
                listItem.classList.add('word-item');
                listItem.innerHTML = `<strong>${entry.word}</strong><br>
                                      <span class="translation">${entry.translation}</span>
                                      <p class="sentence">${entry.sentence}</p>
                                      <span class="edit-button"></span>
                                      <span class="delete-button"></span>`;
                wordDisplayModal.appendChild(listItem);

                listItem.addEventListener('click', () => {
                    toggleMockSentence(listItem);
                });

                listItem.querySelector('.edit-button').addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent toggling of mock sentence
                    openEditWordModal(vocabulary, entry);
                });

                listItem.querySelector('.delete-button').addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent toggling of mock sentence
                    openDeleteConfirmationModal(vocabulary, entry);
                });
            }
        });
}

function openEditWordModal(vocabulary, entry) {
    currentEditVocabulary = vocabulary;
    currentEditIndex = vocabularies[vocabulary].indexOf(entry);
    editWordInput.value = entry.word;
    editTranslationInput.value = entry.translation;
    editSentenceInput.value = entry.sentence;

    // Populate categories dropdown with both defaultCategories and customCategories
    editCategoryInput.innerHTML = ''; // Clear existing options
    const allCategories = [...defaultCategories, ...customCategories]; // Merge categories

    allCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        editCategoryInput.appendChild(option);
    });

    editCategoryInput.value = entry.category; // Set the current category
    editWordModal.style.display = 'block';
    setTimeout(() => {
        editWordModal.style.opacity = '1';
    }, 250);
}



// Save edited word
saveEditButton.addEventListener('click', () => {
    vocabularies[currentEditVocabulary][currentEditIndex] = {
        word: editWordInput.value.trim(),
        category: editCategoryInput.value,
        translation: editTranslationInput.value.trim(),
        sentence: editSentenceInput.value.trim()
    };
    updateLocalStorageAndInfo();
    displayWords(currentEditVocabulary);
    editWordModal.style.opacity="0";
    setTimeout(() => {
        editWordModal.style.display = 'none';
      }, 250);
      applySavedAppearance();
});

// Discard edit
discardEditButton.addEventListener('click', () => {
    editWordModal.style.opacity="0";
    setTimeout(() => {
        editWordModal.style.display = 'none';
      }, 250);
});

// Open delete confirmation modal
function openDeleteConfirmationModal(vocabulary, entry) {
    currentDeleteVocabulary = vocabulary;
    currentDeleteIndex = vocabularies[vocabulary].indexOf(entry);

    // Set the word name in the delete confirmation modal
    deleteWordName.textContent = 'Are you sure you want to delete the word "' + entry.word + '"?' || 'Unknown Word'; // Display word name or fallback if not available

    deleteConfirmationModal.style.display = 'block';
    setTimeout(() => {
        deleteConfirmationModal.style.opacity = '1';
    }, 250);
}


// Confirm delete
confirmDeleteButton.addEventListener('click', () => {
    vocabularies[currentDeleteVocabulary].splice(currentDeleteIndex, 1);
    updateLocalStorageAndInfo();
    displayWords(currentDeleteVocabulary);
    deleteConfirmationModal.style.opacity="0";
    setTimeout(() => {
        deleteConfirmationModal.style.display = 'none';
      }, 250);
      applySavedAppearance();
});

// Discard delete
discardDeleteButton.addEventListener('click', () => {
    deleteConfirmationModal.style.opacity="0";
    setTimeout(() => {
        deleteConfirmationModal.style.display = 'none';
      }, 250);
});

// DOM Elements for Flash Card Features
const learnWordsButton = document.getElementById('learnWordsButton');
const flashCardSetupModal = document.getElementById('flashCardSetupModal');
const flashCardLearningModal = document.getElementById('flashCardLearningModal');
const flashCardCategoryModal = document.getElementById('flashCardCategoryModal');
const closeFlashCardLearning = document.getElementById('closeFlashCardLearning');
const startFlashCardLearning = document.getElementById('startFlashCardLearning');
const closeFlashCardSetupButton = document.getElementById('closeFlashCardSetupButton');
const absentNumWords = document.getElementById('absentNumWords');
const closeAbsentNumWordsButton = document.getElementById('closeAbsentNumWordsButton');
const closeFlashCategoriesButton = document.getElementById('closeFlashCategoriesButton');
const flashCard = document.getElementById('flashCard');
const mockSentenceArea = document.getElementById('mockSentenceArea');
const mockSentence = document.getElementById('mockSentence');
const toggleFlashMockSentence = document.getElementById('toggleFlashMockSentence');
const rememberButton = document.getElementById('rememberButton');
const dontRememberButton = document.getElementById('dontRememberButton');
const numWordsInput = document.getElementById('numWordsInput');
const finishedSessionModal = document.getElementById('finishedSessionModal');
const restartFlashSetupButton = document.getElementById('restartFlashSetupButton');
const backHomeButton = document.getElementById('backHomeButton');
const leaveGameModal = document.getElementById('leaveGameModal');
const leaveGameButton = document.getElementById('leaveGameButton');
const discardLeavingButton = document.getElementById('discardLeavingButton');

// Active categories for flash cards
let activeFlashCardCategories = [...defaultCategories, ...customCategories];
let currentFlashCardWords = [];
let currentFlashCardIndex = 0;
let showOriginalFirst = true; // Tracks whether to show the original word first
let isShowingOriginal = true; // Tracks whether the flash card is showing the original word or the translation

// Event listeners
// Define the function that contains the event listener logic
function showFlashCardSetupModal() {
    finishedSessionModal.style.opacity="0";
    setTimeout(() => {
        finishedSessionModal.style.display = 'none';
      }, 250);
      flashCardLearningModal.style.opacity="0";
      setTimeout(() => {
          flashCardLearningModal.style.display = 'none';
        }, 250);
    flashCardSetupModal.style.display = 'block';
    setTimeout(() => {
        flashCardSetupModal.style.opacity = "1";
    }, 250);
}
learnWordsButton.addEventListener('click', showFlashCardSetupModal);
restartFlashSetupButton.addEventListener('click', showFlashCardSetupModal);

startFlashCardLearning.addEventListener('click', () => {
    const numberOfWords = parseInt(numWordsInput.value, 10);

    // Check if the input is empty or not a valid number
    if (isNaN(numberOfWords) || numberOfWords <= 0) {
        // Display modal to notify the user that the number of words is absent or invalid
        absentNumWords.style.display = 'block';
        setTimeout(() => {
            absentNumWords.style.opacity = '1';
        }, 250);
        return; // Stop execution to avoid starting the game
    }

    showOriginalFirst = document.querySelector('input[name="flashcardSide"]:checked').value === 'original';

    // Filter words by selected categories
    let filteredWords = vocabularies[selectedVocab]
        .filter(word => activeFlashCardCategories.includes(word.category));

    // Add randomization before shuffling
    filteredWords = randomizeSelection(filteredWords, numberOfWords);

    // Shuffle the filtered words
    currentFlashCardWords = shuffleArray(filteredWords).slice(0, numberOfWords);

    // Initialize flash card game
    currentFlashCardIndex = 0;
    isShowingOriginal = showOriginalFirst; // Start with the side user chose
    loadFlashCard();

    // Hide setup modal and show flashcard learning modal
    flashCardSetupModal.style.opacity = '0';
    setTimeout(() => {
        flashCardSetupModal.style.display = 'none';
    }, 250);
    flashCardLearningModal.style.display = 'block';
    setTimeout(() => {
        flashCardLearningModal.style.opacity = '1';
    }, 250);
});

// Close flash card game if desired
document.getElementById('closeFlashCardLearning').addEventListener('click', () => {
    leaveGameModal.style.display = 'block';
    setTimeout(() => {
        leaveGameModal.style.opacity = '1';
    }, 250);
});

leaveGameButton.addEventListener('click', () => {
    leaveGameModal.style.opacity="0";
    setTimeout(() => {
        leaveGameModal.style.display = 'none';
      }, 250);
    flashCardLearningModal.style.opacity="0";
    setTimeout(() => {
        flashCardLearningModal.style.display = 'none';
      }, 250);
});


discardLeavingButton.addEventListener('click', () => {
    leaveGameModal.style.opacity="0";
    setTimeout(() => {
        leaveGameModal.style.display = 'none';
      }, 250);
});

function randomizeSelection(array, numberOfWords) {
    // Create a random multiplier based on the current time to vary selection
    const randomFactor = Math.random() * 1000;
    
    // Sort the array based on a randomized key
    return array
        .map(word => ({ word, sortKey: Math.random() * randomFactor })) // Create random sort keys
        .sort((a, b) => a.sortKey - b.sortKey) // Sort by these random keys
        .map(({ word }) => word); // Return the sorted array with only words
}


// Close absent number modal
closeAbsentNumWordsButton.addEventListener('click', () => {
    absentNumWords.style.opacity="0";
    setTimeout(() => {
        absentNumWords.style.display = 'none';
      }, 250);
});

// Close flash category selection modal
closeFlashCategoriesButton.addEventListener('click', () => {
    flashCardCategoryModal.style.opacity="0";
    setTimeout(() => {
        flashCardCategoryModal.style.display = 'none';
      }, 250);
});

// Return home
backHomeButton.addEventListener('click', () => {
    finishedSessionModal.style.opacity="0";
    setTimeout(() => {
        finishedSessionModal.style.display = 'none';
      }, 250);
      flashCardLearningModal.style.opacity="0";
    setTimeout(() => {
        flashCardLearningModal.style.display = 'none';
      }, 250);
      vocabPanelModal.style.opacity="0";
    setTimeout(() => {
        vocabPanelModal.style.display = 'none';
      }, 250);
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Close flash card setup modal
closeFlashCardSetupButton.addEventListener('click', () => {
    flashCardSetupModal.style.opacity="0";
    setTimeout(() => {
        flashCardSetupModal.style.display = 'none';
      }, 250);
});

// Load flash card
function loadFlashCard() {
    const word = currentFlashCardWords[currentFlashCardIndex];

    // Set the content for the flash card based on the current side
    if (isShowingOriginal) {
        flashCard.textContent = word.word; // Display original word
    } else {
        flashCard.textContent = word.translation; // Display translation
    }

    // Hide the mock sentence and reset the "Show Sentence" button
    mockSentence.textContent = word.sentence;
    mockSentence.style.display = 'none';
    toggleFlashMockSentence.textContent = 'Show Sentence';

    // Reset flash card rotation
    flashCard.style.transform = 'rotateY(0deg)';
}

// Flip flash card and change content
function flipFlashCard() {
    const word = currentFlashCardWords[currentFlashCardIndex];

    // Rotate card on the Y-axis for a proper front-back flip
    flashCard.style.transition = 'transform 0.6s';
    flashCard.style.transform = `rotateY(${isShowingOriginal ? 180 : 360}deg) scale(${isShowingOriginal ? -1 : 1}, 1)`;

    // Change content after half of the rotation
    setTimeout(() => {
        if (isShowingOriginal) {
            flashCard.textContent = word.translation;
        } else {
            flashCard.textContent = word.word;
        }

        // Toggle the card side state
        isShowingOriginal = !isShowingOriginal;
    }, 300); // Wait for half of the animation duration (0.6s)
}

// Handle flash card click
flashCard.addEventListener('click', () => {
    flipFlashCard(); // Flip the card and switch between word and translation
});

// Show or hide mock sentence
toggleFlashMockSentence.addEventListener('click', () => {
    if (mockSentence.style.display === 'none') {
        mockSentence.style.display = 'block';
        setTimeout(() => {
            mockSentence.style.opacity = '1';
        }, 250);
        toggleFlashMockSentence.textContent = 'Hide Sentence';
    } else {
        mockSentence.style.opacity="0";
        setTimeout(() => {
            mockSentence.style.display = 'none';
          }, 250);
        toggleFlashMockSentence.textContent = 'Show Sentence';
    }
});

// Handle "I Remember" button
rememberButton.addEventListener('click', () => {
    currentFlashCardIndex++;
    if (currentFlashCardIndex < currentFlashCardWords.length) {
        isShowingOriginal = showOriginalFirst; // Reset to show the first side as per user selection
        loadFlashCard();
    } else {
        finishedSessionModal.style.display = 'block';
        setTimeout(() => {
            finishedSessionModal.style.opacity = '1';
        }, 250);        
    }
});

// Handle "I Don't Remember" button
dontRememberButton.addEventListener('click', () => {
    const word = currentFlashCardWords[currentFlashCardIndex];
    const currentSide = isShowingOriginal ? word.word : word.translation;

    if (showOriginalFirst && currentSide === word.word || 
        !showOriginalFirst && currentSide === word.translation) {
        // If the word type is the same as the user-chosen first side, flip the card
        flipFlashCard();
    }

    // Reveal the mock sentence
    if (mockSentence.style.display === 'none') {
        mockSentence.style.display = 'block';
        setTimeout(() => {
            mockSentence.style.opacity = '1';
        }, 250);
        toggleFlashMockSentence.textContent = 'Hide Sentence';
    }
});

// Category Selection Modal for Flash Cards
document.getElementById('selectFlashCardCategories').addEventListener('click', () => {
    flashCardCategoryModal.style.display = 'block';
    setTimeout(() => {
        flashCardCategoryModal.style.opacity="1";
      }, 250);
    populateFlashCardCategoryList();    
});

function populateFlashCardCategoryList() {
    const flashCardCategoryList = document.getElementById('flashCardCategoryList');
    flashCardCategoryList.innerHTML = ''; // Clear the category list

    // Handle default categories
    const defaultHeading = document.createElement('h3');
    defaultHeading.textContent = "Default Categories";
    flashCardCategoryList.appendChild(defaultHeading);

    defaultCategories.forEach(category => {
        const categoryItem = document.createElement('div');
        categoryItem.classList.add('category-item');
        categoryItem.textContent = category;
        categoryItem.classList.toggle('selected', activeFlashCardCategories.includes(category));

        categoryItem.addEventListener('click', () => {
            categoryItem.classList.toggle('selected');
            if (categoryItem.classList.contains('selected')) {
                activeFlashCardCategories.push(category);
            } else {
                activeFlashCardCategories = activeFlashCardCategories.filter(c => c !== category);
            }
        });

        flashCardCategoryList.appendChild(categoryItem);
    });

    // Handle custom categories
    if (customCategories.length > 0) {
        const customHeading = document.createElement('h3');
        customHeading.textContent = "Custom Categories";
        flashCardCategoryList.appendChild(customHeading);

        customCategories.forEach(category => {
            const categoryItem = document.createElement('div');
            categoryItem.classList.add('category-item');
            categoryItem.textContent = category;
            categoryItem.classList.toggle('selected', activeFlashCardCategories.includes(category));

            categoryItem.addEventListener('click', () => {
                categoryItem.classList.toggle('selected');
                if (categoryItem.classList.contains('selected')) {
                    activeFlashCardCategories.push(category);
                } else {
                    activeFlashCardCategories = activeFlashCardCategories.filter(c => c !== category);
                }
            });

            flashCardCategoryList.appendChild(categoryItem);
        });
    }
}




document.getElementById('switchAllFlashCardCategories').addEventListener('click', () => {
    const allSelected = activeFlashCardCategories.length === defaultCategories.length + customCategories.length;
    activeFlashCardCategories = allSelected ? [] : [...defaultCategories, ...customCategories];
    populateFlashCardCategoryList();
});

document.getElementById('applyFlashCardCategories').addEventListener('click', () => {
    flashCardCategoryModal.style.opacity="0";
    setTimeout(() => {
        flashCardCategoryModal.style.display = 'none';
      }, 250);
});

function darkAppearance() {
    // Set background color of div#home-screen
    const homeScreenDiv = document.getElementById('home-screen');
    homeScreenDiv.style.background = 'linear-gradient(217deg, var(--color5), var(--color4) 70.71%), linear-gradient(127deg, var(--color6), var(--color4) 70.71%), linear-gradient(336deg, var(--color7), var(--color4) 70.71%)';
    homeScreenDiv.style.animation = "dark-bg-animation 20s linear infinite";

    // Set background color of all elements with class .tiny-modal-content
    const modalElements = document.querySelectorAll('.tiny-modal-content, .big-modal-content');
    modalElements.forEach(modal => {
        modal.style.backgroundColor = '#595959';
    });

    const buttons = document.querySelectorAll('button:not(.vocab-actions), .vocab-item');
    buttons.forEach(modal => {
        modal.style.background = '#ffffff80';
    });
    
    const buttonBorders = document.querySelectorAll('.flex-button:not(:last-child)');
    buttonBorders.forEach(modal => {
        modal.style.borderRight = '1px solid #595959';
    });

    const homeScreenButtons = document.querySelectorAll('.vocab-item, .vocab-actions, .main-panel-button');
    homeScreenButtons.forEach(modal => {
        modal.style.color = '#000000ff';
    });

    const lightTexts = document.querySelectorAll('h3, .tiny-modal-main > *, #mockSentence, .app-article');
    lightTexts.forEach(modal => {
        modal.style.color = '#ffffff80';
    });

    const darkTexts = document.querySelectorAll('.category-item, .selected, .modal-input');
    darkTexts.forEach(modal => {
        modal.style.color = '#000000ff';
    });

    const wordItem = document.querySelectorAll('.word-item');
    wordItem.forEach(modal => {
        modal.style.background = '#ffffff80';
    });
    
    const noBg = document.querySelectorAll('.bottom-panel');
    noBg.forEach(modal => {
        modal.style.background = 'none';
    });

    
    const lightTumbler = document.querySelectorAll('.light-theme-tumbler');
    lightTumbler.forEach(modal => {
        modal.style.outline = 'none';
    });
    
    const darkTumbler = document.querySelectorAll('.dark-theme-tumbler');
    darkTumbler.forEach(modal => {
        modal.style.outline = '0.25vh solid #ff8c00cc';
    });

    // Save theme to localStorage
    localStorage.setItem('appearanceTheme', 'dark');
}

function lightAppearance() {
    // Set background color of div#home-screen
    const homeScreenDiv = document.getElementById('home-screen');
    homeScreenDiv.style.background = 'linear-gradient(217deg, var(--color1), var(--color4) 70.71%), linear-gradient(127deg, var(--color2), var(--color4) 70.71%), linear-gradient(336deg, var(--color3), var(--color4) 70.71%)';
    homeScreenDiv.style.animation = "main-bg-animation 20s linear infinite";

    // Set background color of all elements with class .tiny-modal-content
    const modalElements = document.querySelectorAll('.tiny-modal-content, .big-modal-content');
    modalElements.forEach(modal => {
        modal.style.backgroundColor = '#FFD6A5';
    });

    const buttons = document.querySelectorAll('button:not(.vocab-actions), .vocab-item');
    buttons.forEach(modal => {
        modal.style.background = '#ffffff80';
    });
    
    const buttonBorders = document.querySelectorAll('.flex-button:not(:last-child)');
    buttonBorders.forEach(modal => {
        modal.style.borderRight = '1px solid #FFD6A5';
    });

    const homeScreenButtons = document.querySelectorAll('.vocab-item, .main-panel-button');
    homeScreenButtons.forEach(modal => {
        modal.style.color = '#ffffffff';
        modal.style.background = '#ff8c00cc';
    });
    
    const vocabActButton = document.querySelectorAll('.vocab-actions');
    vocabActButton.forEach(modal => {
        modal.style.color = '#ffffffff';
        modal.style.background = 'none';
    });

    const lightTexts = document.querySelectorAll('h3, .tiny-modal-main > *, #mockSentence, .app-article');
    lightTexts.forEach(modal => {
        modal.style.color = '#000000ff';
    });

    const darkTexts = document.querySelectorAll('.category-item, .selected, .modal-input');
    darkTexts.forEach(modal => {
        modal.style.color = '#000000ff';
    });

    const wordItem = document.querySelectorAll('.word-item');
    wordItem.forEach(modal => {
        modal.style.background = '#ffe3c0';
    });
    
    const noBg = document.querySelectorAll('.bottom-panel');
    noBg.forEach(modal => {
        modal.style.background = '#ffffff80';
    });
    
    const lightTumbler = document.querySelectorAll('.light-theme-tumbler');
    lightTumbler.forEach(modal => {
        modal.style.outline = '0.25vh solid #ff8c00cc';
    });
    
    const darkTumbler = document.querySelectorAll('.dark-theme-tumbler');
    darkTumbler.forEach(modal => {
        modal.style.outline = 'none';
    });

    // Save theme to localStorage
    localStorage.setItem('appearanceTheme', 'light');
}

// Optionally, you can also create a function to apply the saved theme when the page is reloaded
function applySavedAppearance() {
    const savedTheme = localStorage.getItem('appearanceTheme');
    if (savedTheme === 'dark') {
        darkAppearance(); // Apply dark appearance if it's saved
    }
    else {
        lightAppearance(); // Apply light appearance if it's saved
    }
}

// Call this function on page load to apply the saved theme
window.onload = applySavedAppearance;
