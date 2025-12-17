// 逛三园游戏逻辑

// 游戏数据 - 9种园区，每种至少20个名称
const gardenData = {
    zoo: {
        name: "动物园",
        items: ["老虎", "狮子", "大象", "长颈鹿", "斑马", "熊猫", "猴子", "猩猩", "袋鼠", "考拉",
                "河马", "犀牛", "鳄鱼", "蛇", "鸟", "企鹅", "海豚", "鲸鱼", "鲨鱼", "海龟",
                "狐狸", "狼", "熊", "鹿", "兔子", "松鼠", "刺猬", "蝙蝠", "猫头鹰", "鹰"]
    },
    botanical: {
        name: "植物园",
        items: ["玫瑰", "百合", "郁金香", "菊花", "康乃馨", "牡丹", "梅花", "兰花", "荷花", "向日葵",
                "仙人掌", "芦荟", "绿萝", "吊兰", "常春藤", "龟背竹", "文竹", "富贵竹", "发财树", "平安树",
                "橡皮树", "滴水观音", "红掌", "白掌", "非洲菊", "满天星", "薰衣草", "迷迭香", "薄荷", "百里香"]
    },
    fruit: {
        name: "水果园",
        items: ["苹果", "香蕉", "橙子", "橘子", "柠檬", "柚子", "葡萄", "草莓", "蓝莓", "黑莓",
                "覆盆子", "芒果", "菠萝", "西瓜", "哈密瓜", "香瓜", "猕猴桃", "火龙果", "牛油果", "榴莲",
                "山竹", "荔枝", "龙眼", "桃子", "李子", "杏子", "樱桃", "枣", "柿子", "石榴"]
    },
    vegetable: {
        name: "蔬菜园",
        items: ["白菜", "青菜", "菠菜", "芹菜", "韭菜", "香菜", "葱", "姜", "蒜", "洋葱",
                "胡萝卜", "白萝卜", "土豆", "红薯", "山药", "芋头", "南瓜", "冬瓜", "黄瓜", "丝瓜",
                "苦瓜", "茄子", "西红柿", "辣椒", "青椒", "豆角", "豌豆", "毛豆", "玉米", "花菜"]
    },
    appliance: {
        name: "家电园",
        items: ["电视", "冰箱", "洗衣机", "空调", "热水器", "微波炉", "烤箱", "电饭煲", "电磁炉", "电压力锅",
                "豆浆机", "榨汁机", "咖啡机", "饮水机", "电风扇", "空气净化器", "加湿器", "除湿机", "吸尘器", "扫地机器人",
                "洗碗机", "消毒柜", "浴霸", "抽油烟机", "燃气灶", "电暖器", "电热毯", "电热水壶", "电吹风", "卷发棒"]
    },
    brand: {
        name: "品牌园",
        items: ["苹果", "华为", "小米", "OPPO", "vivo", "三星", "联想", "戴尔", "惠普", "华硕",
                "微软", "谷歌", "亚马逊", "阿里巴巴", "腾讯", "百度", "京东", "美团", "滴滴", "字节跳动",
                "耐克", "阿迪达斯", "李宁", "安踏", "特步", "优衣库", "ZARA", "HM", "无印良品", "宜家"]
    },
    country: {
        name: "国家园",
        items: ["中国", "美国", "英国", "法国", "德国", "意大利", "西班牙", "葡萄牙", "俄罗斯", "加拿大",
                "澳大利亚", "日本", "韩国", "印度", "巴西", "阿根廷", "南非", "埃及", "沙特阿拉伯", "伊朗",
                "伊拉克", "土耳其", "希腊", "瑞典", "挪威", "丹麦", "芬兰", "瑞士", "奥地利", "荷兰"]
    },
    star: {
        name: "明星园",
        items: ["周杰伦", "刘德华", "张学友", "郭富城", "黎明", "成龙", "李连杰", "周润发", "周星驰", "张国荣",
                "王菲", "那英", "张惠妹", "孙燕姿", "梁静茹", "五月天", "陈奕迅", "薛之谦", "李荣浩", "邓紫棋",
                "肖战", "王一博", "易烊千玺", "王俊凯", "王源", "鹿晗", "吴亦凡", "黄子韬", "张艺兴", "蔡徐坤"]
    },
    car: {
        name: "汽车园",
        items: ["奔驰", "宝马", "奥迪", "大众", "丰田", "本田", "日产", "福特", "通用", "特斯拉",
                "比亚迪", "蔚来", "小鹏", "理想", "长城", "吉利", "奇瑞", "长安", "广汽", "上汽",
                "现代", "起亚", "标致", "雪铁龙", "雷诺", "菲亚特", "阿尔法·罗密欧", "玛莎拉蒂", "兰博基尼", "法拉利"]
    }
};

// 游戏状态管理
class GameManager {
    constructor() {
        this.currentGarden = null;
        this.remainingItems = [];
        this.score = 0;
        this.audioContext = null;
        this.init();
    }
    
    // 初始化音频上下文
    initAudio() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }
    
    // 播放点击音效
    playClickSound() {
        this.initAudio();
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
    
    // 播放切换音效
    playSwitchSound() {
        this.initAudio();
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.15);
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.15);
    }
    
    // 播放喝酒音效
    playDrinkSound() {
        this.initAudio();
        // 创建多个振荡器产生更丰富的音效
        for (let i = 0; i < 3; i++) {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            // 不同频率的声音叠加
            const baseFreq = 200 + i * 100;
            oscillator.frequency.setValueAtTime(baseFreq, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, this.audioContext.currentTime + 0.5);
            
            gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
            
            oscillator.start(this.audioContext.currentTime + i * 0.1);
            oscillator.stop(this.audioContext.currentTime + 0.5 + i * 0.1);
        }
    }
    
    // 显示喝酒提示
    showDrinkAlert() {
        // 创建提示元素
        const alert = document.createElement('div');
        alert.className = 'drink-alert';
        alert.innerHTML = '<span class="alert-icon">🍻</span><span class="alert-text">有人该喝酒了！</span>';
        
        // 添加到页面
        document.body.appendChild(alert);
        
        // 添加动画类
        setTimeout(() => {
            alert.classList.add('show');
        }, 10);
        
        // 3秒后移除
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(alert);
            }, 500);
        }, 3000);
    }
    
    init() {
        this.bindEvents();
        this.showPage('homePage');
    }
    
    bindEvents() {
        // 园区选择事件
        document.querySelectorAll('.garden-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.playClickSound();
                const gardenType = e.currentTarget.dataset.garden;
                this.startGame(gardenType);
            });
        });
        
        // 返回按钮事件
        document.getElementById('backBtn').addEventListener('click', () => {
            this.playClickSound();
            this.returnToHome();
        });
        

        
        // 规则按钮事件
        document.getElementById('rulesBtn').addEventListener('click', () => {
            this.playClickSound();
            this.showRules();
        });
        
        // 关闭规则弹窗
        document.querySelector('.close').addEventListener('click', () => {
            this.playClickSound();
            this.hideRules();
        });
        
        // 点击弹窗外部关闭
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('rulesModal');
            if (e.target === modal) {
                this.playClickSound();
                this.hideRules();
            }
        });
        
        // 喝酒按钮事件
        document.getElementById('drinkBtn').addEventListener('click', () => {
            this.playDrinkSound();
            this.showDrinkAlert();
        });
        
        // 留言板按钮事件
        document.getElementById('messageBoardBtn').addEventListener('click', () => {
            this.playClickSound();
            window.location.href = 'messageboard.html';
        });
    }
    
    startGame(gardenType) {
        this.currentGarden = gardenData[gardenType];
        this.remainingItems = [...this.currentGarden.items];
        this.currentWords = [];
        this.score = 0;
        
        // 打乱数组顺序
        this.shuffleArray(this.remainingItems);
        
        // 更新游戏页面
        this.updateGamePage();
        this.showPage('gamePage');
        
        // 初始化3个单词
        this.initWords();
        
        // 绑定单词点击事件
        this.bindWordEvents();
    }
    
    updateGamePage() {
        const gamePage = document.getElementById('gamePage');
        const gardenTitle = document.getElementById('currentGarden');
        const scoreElement = document.getElementById('score');
        
        // 设置主题
        gamePage.dataset.theme = Object.keys(gardenData).find(key => gardenData[key] === this.currentGarden);
        
        // 更新标题
        gardenTitle.textContent = this.currentGarden.name;
        
        // 更新分数
        scoreElement.textContent = this.score;
    }
    
    initWords() {
        // 初始化6个单词
        for (let i = 0; i < 6; i++) {
            this.currentWords[i] = this.getNextWord();
        }
        
        // 显示初始单词
        this.displayWords();
    }
    
    getNextWord() {
        // 如果没有剩余项目，重新填充并打乱
        if (this.remainingItems.length === 0) {
            this.remainingItems = [...this.currentGarden.items];
            this.shuffleArray(this.remainingItems);
        }
        
        // 获取下一个单词
        return this.remainingItems.shift();
    }
    
    displayWords() {
        // 显示所有单词
        const wordOptions = document.querySelectorAll('.word-option');
        wordOptions.forEach((option, index) => {
            const wordContent = option.querySelector('.word-content');
            wordContent.textContent = this.currentWords[index];
            wordContent.classList.add('word-fade-in');
            
            setTimeout(() => {
                wordContent.classList.remove('word-fade-in');
            }, 500);
        });
    }
    
    replaceWord(index) {
        // 播放消失动画
        const wordOption = document.querySelectorAll('.word-option')[index];
        const wordContent = wordOption.querySelector('.word-content');
        wordContent.classList.add('word-fade-out');
        
        // 动画结束后更新单词
        setTimeout(() => {
            // 获取新单词
            const newWord = this.getNextWord();
            this.currentWords[index] = newWord;
            
            // 更新单词
            wordContent.textContent = newWord;
            
            // 重置动画类
            wordContent.classList.remove('word-fade-out');
            wordContent.classList.add('word-fade-in');
            
            // 增加分数
            this.score++;
            document.getElementById('score').textContent = this.score;
            
            // 重置动画类
            setTimeout(() => {
                wordContent.classList.remove('word-fade-in');
            }, 500);
        }, 500);
    }
    
    bindWordEvents() {
        // 移除旧的事件监听
        const wordOptions = document.querySelectorAll('.word-option');
        wordOptions.forEach(option => {
            option.removeEventListener('click', this.handleWordClick.bind(this));
        });
        
        // 添加新的事件监听
        wordOptions.forEach(option => {
            option.addEventListener('click', this.handleWordClick.bind(this));
        });
    }
    
    handleWordClick(e) {
        this.playSwitchSound();
        const index = parseInt(e.currentTarget.dataset.index);
        this.replaceWord(index);
    }
    
    returnToHome() {
        this.showPage('homePage');
    }
    
    showPage(pageId) {
        // 隐藏所有页面
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // 显示目标页面
        document.getElementById(pageId).classList.add('active');
    }
    
    showRules() {
        document.getElementById('rulesModal').classList.add('show');
    }
    
    hideRules() {
        document.getElementById('rulesModal').classList.remove('show');
    }
    
    // 打乱数组顺序（Fisher-Yates算法）
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

// 初始化游戏
window.addEventListener('DOMContentLoaded', () => {
    new GameManager();
});

// 支持离线使用
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}