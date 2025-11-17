// == A-Frame 控制台截图脚本 ==

let Capturing = false;
let Interval;

// 创建控制按钮
function createControlButtons() {
    // 样式
    const style = document.createElement('style');
    style.textContent = `
        #aframe-screenshot-controls {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 999999; /* 确保在最上层 */
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        #aframe-screenshot-controls button {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            border: none;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            transition: transform 0.2s;
        }
        #aframe-screenshot-controls button:hover {
            transform: scale(1.05);
        }
        #start-capture {
            background-color: #4CAF50; /* 绿色 */
        }
        #stop-capture {
            background-color: #f44336; /* 红色 */
            display: none; /* 初始隐藏 */
        }
    `;
    document.head.appendChild(style);

    // 按钮容器
    const container = document.createElement('div');
    container.id = 'aframe-screenshot-controls';

    // 开始按钮
    const startBtn = document.createElement('button');
    startBtn.id = 'start-capture';
    startBtn.textContent = '开始截图 (1s/张)';
    
    // 停止按钮
    const stopBtn = document.createElement('button');
    stopBtn.id = 'stop-capture';
    stopBtn.textContent = '停止截图';

    container.appendChild(startBtn);
    container.appendChild(stopBtn);
    document.body.appendChild(container);

    // 添加点击事件
    startBtn.addEventListener('click', startCapture);
    stopBtn.addEventListener('click', stopCapture);
}

// 开始截图
function startCapture() {
    if (Capturing) return;

    const scene = document.querySelector('a-scene');
    if (!scene || !scene.canvas) {
        alert('未找到有效的 A-Frame 场景或 canvas！');
        return;
    }

    Capturing = true;
    document.getElementById('start-capture').style.display = 'none';
    document.getElementById('stop-capture').style.display = 'block';

    console.log('%cA-Frame 截图开始...', 'color: green; font-size: 16px;');

    // 立即截取第一张
    captureAndDownloadFrame();
    
    // 设置定时器，每秒截取一次
    Interval = setInterval(captureAndDownloadFrame, 1000);
}

// 停止截图
function stopCapture() {
    if (!Capturing) return;

    Capturing = false;
    clearInterval(Interval);
    document.getElementById('start-capture').style.display = 'block';
    document.getElementById('stop-capture').style.display = 'none';

    console.log('%cA-Frame 截图已停止。', 'color: red; font-size: 16px;');
}

// 核心：捕获并下载当前帧
function captureAndDownloadFrame() {
    const scene = document.querySelector('a-scene');
    if (!scene || !scene.canvas) return;

    scene.canvas.toBlob((blob) => {
        const timestamp = new Date().toISOString().replace(/[-:\.T]/g, '');
        const filename = `aframe-screenshot-${timestamp}.png`;
        
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blob);

        console.log(`截图已保存: ${filename}`);
    });
}

// 初始化
createControlButtons();
console.log('%cA-Frame 截图脚本已加载！请点击页面右上角的绿色按钮开始。', 'color: blue; font-size: 16px;');
