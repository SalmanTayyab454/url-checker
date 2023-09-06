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

const urlInput = document.getElementById('input');
urlInput.addEventListener('input', throttle((event) => {
    const enteredUrl = event.target.value;
    console.log('Entered Url', enteredUrl);
    const finalElement = document.getElementById('message');
    if (validUrl(enteredUrl)) {
        finalElement.textContent = 'Please wait checking for URL existence';
        checkURLExistence(enteredUrl);
    } else {
        finalElement.textContent = 'URL format is invalid';
    }
}, 1000));

function checkURLExistence(url) {
    setTimeout(() => {
        const isUrlExists = Math.random() < 0.5;
        const finalElement = document.getElementById('message');
        if (isUrlExists) {
            finalElement.textContent = `${url} exists and is also valid.`;
        } else {
            finalElement.textContent = `${url} doesn't exists and is also invalid.`;
        }
    }, 1000);
}

function throttle(func, delay) {
    let timer;
    return function() {
        const context = this;
        const args = arguments;
        if (!timer) {
            func.apply(context, args);
            timer = setTimeout(() => {
                timer = null;
            }, delay);
        }
    }
}