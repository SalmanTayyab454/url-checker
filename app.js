/**
 * Check if a given URL is valid.
 *
 * @param {string} url - The URL to validate.
 * @returns {boolean} Returns true if the URL is valid, otherwise false.
 */

function validUrl(url) {
    // Regular expression pattern to validate URLs
    const urlPattern = new RegExp(
        // protocol
        '^([a-zA-Z]+:\\/\\/)?' +
        // domain name
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        // OR IP (v4) address
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        // port and path
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        // query string
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        // fragment locator
        '(\\#[-a-z\\d_]*)?$',
        'i'
    );
    // Test if the given URL matches the pattern
    return urlPattern.test(url)
}

/**
 * Check if a given URL represents a file.
 *
 * @param {string} url - The URL to check.
 * @returns {boolean} Returns true if the URL represents a file, otherwise false.
 */

const checkIfFile = (url) => {
    // Create a URL object from the given URL string
    // Extract the pathname from the URL, split it by '/', and get the last part
    // And also check if the fileName contains a '.' (indicating a file extension)
    return new URL(url).pathname.split('/').pop().indexOf('.') > 0;
}

const urlInput = document.getElementById('input');
let timer;

urlInput.addEventListener('input', (event) => {
    // Clear the previous timer
    clearTimeout(timer);
    const enteredUrl = event.target.value;
    const messageElement = document.getElementById('message');
    if (validUrl(enteredUrl)) {
        messageElement.textContent = 'Please wait checking for URL existence';
        // existence check Throttle
        timer = setTimeout(async() => {
            try {
                await checkURLExistence(enteredUrl);
            } catch (error) {
                console.error('Error:', error);
            }
        }, 1000);
    } else {
        messageElement.textContent = 'URL format is invalid';
    }
});


/**
 * Check the existence of a URL and display the result message.
 *
 * @param {string} url - The URL to check for existence.
 */

function checkURLExistence(url) {
    // Get the DOM element where the result message will be displayed
    const messageElement = document.getElementById('message');
    // Simulate a server call to check the existence of the URL
    if (Math.random() < 0.5) {
        // If the URL exists, determine if it represents a file or folder
        if (checkIfFile(url)) {
            messageElement.textContent = `${url} exists and is a file.`;
        } else {
            messageElement.textContent = `${url} exists and is a folder.`;
        }
    } else {
        // If the URL doesn't exist or is invalid, display an appropriate message
        messageElement.textContent = `${url} doesn't exist or is invalid.`;
    }
}