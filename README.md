# Showimg.js

**Showimg.js** is a compact JavaScript plugin for creating interactive image and video viewers. It supports navigation, zooming, and dynamic content for an engaging user experience.



## Features

- **Image and Video Support**: Handles URLs and Blob data seamlessly.
- **Navigation**: Easy next/previous controls and arrow key navigation.
- **Zoom & Pan**: Pinch-to-zoom and drag-to-pan.
- **Customizable**: Supports callbacks for tailored behavior.
- **Autoplay**: Video playback with control options
- **Fullscreen**: Toggle between fullscreen and normal modes.
- **Responsive**: Works flawlessly on desktops and mobiles.



## Installation

To use Showimg.js, include the script in your HTML file:

```html
<script src="https://raw.githubusercontent.com/seezaara/sharpimg/main/showimg.min.js"></script>
```



## Usage

### Example with Custom Title

```javascript
new Showimg({
    inputs: ['media1.png', 'media2.mp4'],
    title: 'Custom Viewer Title',
    option: {
        0: 'Option 1',
        1: 'Option 2'
    },
    onoption: (optionIndex, currentIndex) => {
        console.log(`Option ${optionIndex} selected at index ${currentIndex}`);
    }
});
```

### Full Example with HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Showimg.js Example</title>
    <script src="https://raw.githubusercontent.com/seezaara/sharpimg/main/showimg.min.js"></script>
</head>
<body>
    <button id="openViewer">Open Viewer</button>

    <script>
        document.getElementById('openViewer').addEventListener('click', () => {
            new Showimg({
                inputs: [
                    'https://via.placeholder.com/600x400',
                    'https://via.placeholder.com/800x600',
                    'https://www.w3schools.com/html/mov_bbb.mp4'
                ],
                autoplay: true,
                title: 'Sample Viewer',
                onclose: () => console.log('Viewer closed'),
                onindex: (currentIndex, lastIndex) => console.log(`Moved from ${lastIndex} to ${currentIndex}`),
                onplay: (currentIndex) => console.log(`Playing item at index ${currentIndex}`)
            });
        });
    </script>
</body>
</html>
```

### Real-Time Video Update Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Real-Time Update Example</title>
    <script src="https://raw.githubusercontent.com/seezaara/sharpimg/main/showimg.min.js"></script>
</head>
<body>
    <button id="openViewer">Open Viewer</button>
    <button id="updateVideo">Update Video</button>

    <script>
        let viewer;
        document.getElementById('openViewer').addEventListener('click', () => {
            viewer = new Showimg({
                inputs: [
                    'https://via.placeholder.com/600x400',
                    'https://via.placeholder.com/800x600',
                    'https://www.w3schools.com/html/mov_bbb.mp4'
                ],
                autoplay: true,
                title: 'Real-Time Update Example',
                onclose: () => console.log('Viewer closed'),
                onindex: (currentIndex, lastIndex) => console.log(`Moved from ${lastIndex} to ${currentIndex}`),
                onplay: (currentIndex) => console.log(`Playing item at index ${currentIndex}`)
            });
        });

        document.getElementById('updateVideo').addEventListener('click', () => {
            const videoBlob = new Blob(["Updated video content"], { type: 'video/mp4' }); // Example Blob
            ShowimgUpdate(2, videoBlob); // Updates the third item (index 2)
        });
    </script>
</body>
</html>
```



## Configuration Options

| Option     | Type     | Description                                                            |
| ---------- | -------- | ---------------------------------------------------------------------- |
| `inputs`   | Array    | Array of image/video URLs or Blob objects to display.                  |
| `autoplay` | Boolean  | Enables or disables video autoplay. Defaults to `false`.               |
| `title`    | String   | Sets a custom title for the viewer.                                    |
| `onclose`  | Function | Callback function triggered when the viewer is closed.                 |
| `onindex`  | Function | Callback for index changes. Receives `(currentIndex, lastIndex)`.      |
| `onplay`   | Function | Callback when an item is played. Receives `(currentIndex)`.            |
| `option`   | Object   | Key-value pairs for custom options. Triggered via `onoption`.          |
| `onoption` | Function | Callback for option selection. Receives `(optionIndex, currentIndex)`. |



## Key Features Explained

### Navigation

- Navigate items using the left and right arrow keys.
- Programmatically navigate with `.f_back()` and `.f_go()`.

### Zooming

- Double-click or pinch to zoom in and out.
- Use the mouse scroll wheel for dynamic zoom adjustments.

### Fullscreen

- Toggle fullscreen mode with the `F11` key or the built-in fullscreen button.

### Custom Styling

Customize the viewer's appearance using shadow DOM encapsulation provided by Showimg.js.


## Additional Methods

### ShowimgClose

Closes the current viewer instance, cleans up resources, and triggers the `onclose` callback if defined. Use this method to programmatically close the viewer.

Example:

```javascript
ShowimgClose();
```

### ShowimgUpdate

Updates an item in the viewer at a specific index. You can replace images or videos dynamically by passing new Blob objects or URLs.

Parameters:
- `index` (Number): The index of the item to update.
- `data` (Blob|String): The new Blob object or URL to replace the item.

Example:

```javascript
const videoBlob = new Blob(["New video content"], { type: 'video/mp4' });
ShowimgUpdate(2, videoBlob); // Updates the third item (index 2)
```



## Browser Compatibility

Showimg.js has been tested on the following browsers:

- Chrome
- Firefox
- Edge
- Safari

It supports both desktop and mobile browsers for a versatile user experience.



# licence
 <p>
    <img width="32px" src="https://raw.githubusercontent.com/seezaara/RocketV2ray/main/doc/logo.png"><a href="https://www.youtube.com/@seezaara">seezaara youtube</a>
<br>
    <img width="32px" src="https://raw.githubusercontent.com/seezaara/RocketV2ray/main/doc/logo.png"><a href="https://t.me/seezaara">seezaara telegram</a>
</p>

