const video = document.getElementById('cyberPlayer');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const progressContainer = document.getElementById('progressContainer');
        const progressBar = document.getElementById('progressBar');
        const timeDisplay = document.getElementById('timeDisplay');
        const muteBtn = document.getElementById('muteBtn');
        const fullscreenBtn = document.getElementById('fullscreenBtn');

        function togglePlay() {
            if (video.paused) {
                video.play();
                playPauseBtn.textContent = 'PAUSE';
            } else {
                video.pause();
                playPauseBtn.textContent = 'PLAY';
            }
        }

        playPauseBtn.addEventListener('click', togglePlay);
        video.addEventListener('click', togglePlay);

        video.addEventListener('timeupdate', () => {
            if (video.duration) {
                const percent = (video.currentTime / video.duration) * 100;
                progressBar.style.width = `${percent}%`;

                let currentMins = Math.floor(video.currentTime / 60);
                let currentSecs = Math.floor(video.currentTime - currentMins * 60);
                if(currentSecs < 10) currentSecs = '0' + currentSecs;
                if(currentMins < 10) currentMins = '0' + currentMins;
                
                timeDisplay.textContent = `${currentMins}:${currentSecs}`;
            }
        });

        progressContainer.addEventListener('click', (e) => {
            const width = progressContainer.clientWidth;
            const clickX = e.offsetX;
            const duration = video.duration;
            if (duration) {
                video.currentTime = (clickX / width) * duration;
            }
        });

        muteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            muteBtn.textContent = video.muted ? 'UNMUTE' : 'MUTE';
            if (video.muted) {
                muteBtn.style.color = '#777';
                muteBtn.style.borderColor = 'rgba(255,255,255,0.2)';
                muteBtn.style.background = 'transparent';
            } else {
                muteBtn.style.color = 'var(--primary-color)';
                muteBtn.style.borderColor = 'rgba(0, 210, 255, 0.4)';
                muteBtn.style.background = 'rgba(0, 210, 255, 0.1)';
            }
        });

        fullscreenBtn.addEventListener('click', () => {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) { /* Safari */
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) { /* IE11 */
                video.msRequestFullscreen();
            }
        });