(function () {
    // 가로와 세로 비율을 파라미터로 받아서 동영상 플레이어를 생성하는 함수
    function createVideoPlayer(widthRatio, heightRatio) {
        const videoContainer = document.getElementById("video-container");
        const videoUrl = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"; // 하드코딩된 동영상 링크

        // 비율에 따라 높이와 너비 계산
        const width = window.innerWidth;
        const height = (width * heightRatio) / widthRatio;

        // 비디오 요소 생성
        const videoElement = document.createElement("video");
        videoElement.src = videoUrl;
        videoElement.width = width;
        videoElement.height = height;
        videoElement.controls = true; // 컨트롤러 표시
        videoElement.autoplay = true; // 자동 재생
        videoElement.loop = true; // 반복 재생

        // 비디오 요소를 컨테이너에 추가
        videoContainer.appendChild(videoElement);
    }
})();
