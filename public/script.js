
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const fileType = file.type;
        const previewContainer = document.getElementById('previewContainer');
        const reader = new FileReader();

        reader.onload = function(event) {
            previewContainer.innerHTML = '';

            if (fileType.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = event.target.result;
                img.style.maxWidth = '100%';
                previewContainer.appendChild(img);
            } else if (fileType.startsWith('audio/')) {
                const audio = document.createElement('audio');
                audio.controls = true;
                audio.src = event.target.result;
                previewContainer.appendChild(audio);
            } else if (fileType.startsWith('video/')) {
                const video = document.createElement('video');
                video.controls = true;
                video.src = event.target.result;
                previewContainer.appendChild(video);
            } else if (fileType === 'application/pdf') {
                const pdfFrame = document.createElement('iframe');
                pdfFrame.src = event.target.result;
                pdfFrame.style.width = '100%';
                pdfFrame.style.height = '500px';
                previewContainer.appendChild(pdfFrame);
            }
        };

        reader.readAsDataURL(file);
        const formData = new FormData();
        formData.append('file', file);
        // Send the file to the backend (image manipulation API)
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        console.log(result); // Log API response
    }
});
