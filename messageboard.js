// 留言板功能实现

class MessageBoard {
    constructor() {
        this.messages = [];
        this.init();
    }
    
    init() {
        // 加载留言
        this.loadMessages();
        
        // 绑定事件
        this.bindEvents();
        
        // 显示留言
        this.displayMessages();
    }
    
    bindEvents() {
        // 返回游戏按钮
        document.getElementById('backToGame').addEventListener('click', () => {
            window.location.href = 'guangsanyuan.html';
        });
        
        // 表单提交
        document.getElementById('messageForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleMessageSubmit();
        });
        
        // 字符计数
        document.getElementById('messageContent').addEventListener('input', (e) => {
            this.updateCharCount(e.target.value.length);
        });
    }
    
    // 加载留言（从localStorage）
    loadMessages() {
        const savedMessages = localStorage.getItem('guangsanyuan_messages');
        if (savedMessages) {
            this.messages = JSON.parse(savedMessages);
        } else {
            this.messages = [];
        }
    }
    
    // 保存留言（到localStorage）
    saveMessages() {
        localStorage.setItem('guangsanyuan_messages', JSON.stringify(this.messages));
    }
    
    // 更新字符计数
    updateCharCount(count) {
        document.getElementById('charCount').textContent = `${count}/200`;
    }
    
    // 显示表单消息
    showFormMessage(message, type) {
        const formMessage = document.getElementById('formMessage');
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        
        // 3秒后自动隐藏
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 3000);
    }
    
    // 处理留言提交
    handleMessageSubmit() {
        const messageContent = document.getElementById('messageContent').value.trim();
        
        // 简单验证
        if (!messageContent) {
            this.showFormMessage('请输入留言内容！', 'error');
            return;
        }
        
        if (messageContent.length < 2) {
            this.showFormMessage('留言内容太短！', 'error');
            return;
        }
        
        if (messageContent.length > 200) {
            this.showFormMessage('留言内容不能超过200字符！', 'error');
            return;
        }
        
        // 创建留言对象
        const newMessage = {
            id: Date.now(),
            text: messageContent,
            time: new Date().toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })
        };
        
        // 添加到留言数组（最新的在最前面）
        this.messages.unshift(newMessage);
        
        // 保存留言
        this.saveMessages();
        
        // 显示留言
        this.displayMessages();
        
        // 清空表单
        document.getElementById('messageForm').reset();
        this.updateCharCount(0);
        
        // 显示成功消息
        this.showFormMessage('留言提交成功！', 'success');
    }
    
    // 显示留言
    displayMessages() {
        const messagesList = document.getElementById('messagesList');
        
        // 清空列表
        messagesList.innerHTML = '';
        
        // 如果没有留言，显示空状态
        if (this.messages.length === 0) {
            messagesList.innerHTML = '<div class="empty-messages">暂无留言，快来成为第一个留言的人吧！</div>';
            return;
        }
        
        // 创建留言项
        this.messages.forEach(message => {
            const messageItem = document.createElement('div');
            messageItem.className = 'message-item';
            messageItem.innerHTML = `
                <div class="message-text">${this.escapeHtml(message.text)}</div>
                <div class="message-time">${message.time}</div>
            `;
            messagesList.appendChild(messageItem);
        });
    }
    
    // HTML转义，防止XSS攻击
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// 初始化留言板
window.addEventListener('DOMContentLoaded', () => {
    new MessageBoard();
});