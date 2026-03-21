# blockGooglePreviewBubble
Chrome extension that removes the "preview" bubble element from Google Suite pages (Docs, Slides, etc.). Written by a K-12 system admin and their pal Gem(ini).
Google's little preview bubble...thing allows student to access YouTube even if YouTube traffic is at the network level. Since Google refuses to give us adequate controls of Workspace and GSuite, this extension scan *.google.com for the div element that loads the pesky preview bubble. If the extension finds the div element in question, the page's CSS is overwritten to remove said element.
...at least, I think that's what it does. My pal Gem did the heavy lifting on this. 
