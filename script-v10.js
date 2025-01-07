window.testAd = function (options) {
    // 기본 옵션 설정
    const defaultOptions = {
        inventoryElementId: "",
        publisher: "",
        message: "",
        closeBtn: false,
        closeBtnLocation: 0,
        callbacks: {
            success: function () {},
            fail: function () {},
            event: function () {},
        },
    };

    // 옵션 병합
    const settings = Object.assign({}, defaultOptions, options);

    // 광고 로드 시뮬레이션
    setTimeout(function () {
        // 성공적으로 광고가 로드된 경우
        if (settings.inventoryElementId) {
            settings.callbacks.success("ad", "loaded", { message: "Ad loaded successfully!" });
        } else {
            // 광고 로드 실패 시
            settings.callbacks.fail("ad", "failed", { message: "Ad failed to load." });
        }
    }, 1000); // 1초 후에 광고 로드 시뮬레이션

    const videoContainer = document.getElementById("video-container");
    const videoUrl = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"; // 하드코딩된 동영상 링크

    // 비디오 요소 생성
    const videoElement = document.createElement("video");
    videoElement.src = videoUrl;
    videoElement.controls = true; // 컨트롤러 표시
    videoElement.autoplay = true; // 자동 재생
    videoElement.loop = false; // 반복 재생을 false로 설정
    videoElement.muted = false; // 음소거 해제

    // 비디오 요소를 컨테이너에 추가
    videoContainer.appendChild(videoElement);

    // 비디오 메타데이터가 로드되면 비율 계산
    videoElement.addEventListener("loadedmetadata", function () {
        const width = window.innerWidth;
        const height = (width * videoElement.videoHeight) / videoElement.videoWidth;

        // 비디오 크기 설정
        videoElement.width = width;
        videoElement.height = height;

        // 동영상 멈춤 버튼 클릭 이벤트
        videoElement.addEventListener("pause", function () {
            console.log("동영상이 멈췄습니다.");
        });

        // 동영상 재생 버튼 클릭 이벤트
        videoElement.addEventListener("play", function () {
            console.log("동영상이 재생되었습니다.");
        });

        // 동영상 끝까지 재생 시 이벤트
        videoElement.addEventListener("ended", function () {
            console.log("동영상이 끝났습니다.");
        });
    });

    // 닫기 버튼 생성
    if (closeBtn) {
        const closeButton = document.createElement("button");
        closeButton.textContent = "닫기";
        closeButton.style.marginTop = "10px"; // 버튼과 비디오 사이의 간격
        videoContainer.appendChild(closeButton);

        // 닫기 버튼 클릭 이벤트
        closeButton.addEventListener("click", function () {
            videoContainer.innerHTML = ""; // 비디오 요소 제거
            console.log("비디오 플레이어가 닫혔습니다.");
        });
    }
};
