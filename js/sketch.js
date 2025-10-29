let video;
let pixelSize = 10;

function setup() {
  // Create canvas that fills the video container
  const videoContainer = select('#video-container');
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('video-container');
  
  // Create video element
  video = createVideo('assets/vids/meta-demo-vid-2.mp4');
  video.hide(); // Hide the HTML video element
  video.loop();
  
  // Set canvas style to match video container
  canvas.style('display', 'block');
  canvas.style('position', 'absolute');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '1');
  
  // Set drawing properties
  noStroke();
  rectMode(CENTER);
}

function draw() {
  // Clear the background
  clear();
  
  // Only proceed if video is loaded
  if (video.loadedmetadata) {
    // Calculate pixel size based on mouse position
    pixelSize = map(mouseX, 0, width, 5, 30, true);
    
    // Get the video's display dimensions
    const videoRatio = video.width / video.height;
    let displayWidth, displayHeight;
    
    if (width / height > videoRatio) {
      displayWidth = width;
      displayHeight = width / videoRatio;
    } else {
      displayHeight = height;
      displayWidth = height * videoRatio;
    }
    
    // Calculate the offset to center the video
    const xOffset = (width - displayWidth) / 2;
    const yOffset = (height - displayHeight) / 2;
    
    // Draw the pixelated video
    video.loadPixels();
    const stepSize = pixelSize;
    
    for (let y = 0; y < displayHeight; y += stepSize) {
      for (let x = 0; x < displayWidth; x += stepSize) {
        // Calculate the position in the video
        const videoX = floor(map(x, 0, displayWidth, 0, video.width));
        const videoY = floor(map(y, 0, displayHeight, 0, video.height));
        
        // Get the color at this position
        const index = (videoX + videoY * video.width) * 4;
        const r = video.pixels[index];
        const g = video.pixels[index + 1];
        const b = video.pixels[index + 2];
        
        // Calculate brightness (for optional grayscale effect)
        const brightness = (r + g + b) / 3;
        
        // Draw the pixel
        fill(r, g, b);
        
        // Add interactive effect based on mouse distance
        const distance = dist(mouseX, mouseY, x + xOffset, y + yOffset);
        const size = map(distance, 0, 200, stepSize * 1.5, stepSize * 0.5, true);
        
        // Draw different shapes for variety
        if (distance < 100) {
          // Draw circles when mouse is close
          ellipse(x + xOffset, y + yOffset, size, size);
        } else {
          // Draw squares when mouse is far
          rect(x + xOffset, y + yOffset, size, size);
        }
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Add mousemove effect
function mouseMoved() {
  // You can add additional interactive effects here
  return false; // Prevent default
}
