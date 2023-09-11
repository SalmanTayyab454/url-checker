function validUrl(url) {
    const urlPattern = new RegExp(
        '^([a-zA-Z]+:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i'
    );
    return urlPattern.test(url)
}

const checkIfFile = (url) => {
    url = new URL(url);
    return url.pathname.split('/').pop().indexOf('.') > 0;
}

const urlInput = document.getElementById('input');
let timer;

urlInput.addEventListener('input', (event) => {
    clearTimeout(timer); // Clear the previous timer
    const enteredUrl = event.target.value;
    const finalElement = document.getElementById('message');
    if (validUrl(enteredUrl)) {
        finalElement.textContent = 'Please wait checking for URL existence';
        // existence check Throttle
        timer = setTimeout(() => {
            checkURLExistence(enteredUrl);
        }, 1000);
    } else {
        finalElement.textContent = 'URL format is invalid';
    }
});

function checkURLExistence(url) {
    setTimeout(() => {
        const isUrlExists = Math.random() < 0.5; // Simulating the mock server call
        const finalElement = document.getElementById('message');
        if (isUrlExists) {
            if (checkIfFile(url)) {
                finalElement.textContent = `${url} exists and is a file.`;
            } else {
                finalElement.textContent = `${url} exists and is a folder.`;
            }
        } else {
            finalElement.textContent = `${url} doesn't exist or is invalid.`;
        }
    }, 1000);
}