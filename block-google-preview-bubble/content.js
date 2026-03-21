const targetSelector = 'div#docs-link-bubble.docs-bubble.docs-linkbubble-bubble.appsElementsLinkPreview';
let isEnabled = true;

// Function to find and delete the element
function destroyBubble() {
    if (!isEnabled) return; // Stop if disabled
    const bubble = document.querySelector(targetSelector);
    if (bubble) bubble.remove(); 
}

// Function to toggle our CSS class and run an immediate check
function toggleFeatures(enabled) {
    isEnabled = enabled;
    if (enabled) {
        document.body.classList.add('blocker-active');
        destroyBubble(); // Destroy it immediately if it's currently on screen
    } else {
        document.body.classList.remove('blocker-active');
    }
}

// Set up the MutationObserver
const observer = new MutationObserver((mutations) => {
    if (!isEnabled) return; // Stop if disabled
    for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
            destroyBubble();
            break;
        }
    }
});

// Kick off the script
function init() {
    if (document.body) {
        // Check storage for the user's preference
        chrome.storage.local.get(['blockerEnabled'], (result) => {
            toggleFeatures(result.blockerEnabled !== false);
            // Start watching the page
            observer.observe(document.body, { childList: true, subtree: true });
        });
    } else {
        requestAnimationFrame(init);
    }
}

init();

// Listen in real-time if the user clicks the popup toggle
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.blockerEnabled !== undefined) {
        toggleFeatures(changes.blockerEnabled.newValue);
    }
});