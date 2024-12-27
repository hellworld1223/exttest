// 즉시 실행 함수
const videoPlayer = (function () {
    // Hedera SDK 임포트
    const { Client, TopicCreateTransaction, TopicMessageSubmitTransaction } = require("@hashgraph/sdk");

    // Hedera 클라이언트 설정
    const client = Client.forTestnet(); // 테스트넷 사용
    // client.setOperator(YOUR_ACCOUNT_ID, YOUR_PRIVATE_KEY); // 계정 ID와 개인 키 설정

    // 가로와 세로 비율을 파라미터로 받아서 동영상 플레이어를 생성하는 함수
    function createVideoPlayer(widthRatio, heightRatio, account_id, private_key) {
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

        // 일시정지 이벤트 리스너 추가
        videoElement.addEventListener('pause', async () => {
            const message = "비디오가 일시정지되었습니다."; // 기록할 문자열
            await recordToHCS(message, account_id, private_key); // HCS에 기록하는 함수 호출
        });
    }

    // Hedera HCS에 문자열을 기록하는 함수
    async function recordToHCS(message, account_id, private_key) {
        client.setOperator(account_id, private_key); // 계정 ID와 개인 키 설정
        // 새로운 토픽 생성
        const topicCreateTx = await new TopicCreateTransaction().execute(client);
        const receipt = await topicCreateTx.getReceipt(client);
        const topicId = receipt.topicId;

        // 메시지 제출
        const messageSubmitTx = await new TopicMessageSubmitTransaction({
            topicId: topicId,
            message: message
        }).execute(client);
      
        console.log("Submit Tx: ", messageSubmitTx);
        console.log("HCS에 기록된 메시지:", message); // HCS에 메시지를 기록한 후 로그
    }

    // createVideoPlayer 함수를 반환
    return {
        createVideoPlayer: createVideoPlayer
    };
})();
