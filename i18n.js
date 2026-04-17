// i18n.js - 全站国际化支持
// 所有页面共用此文件，语言设置保存在 localStorage

const i18n = {
    zh: {
        // 通用
        'loading': 'Loading',
        'back-to-home': '← 返回主页',
        'restart': '🔄 重新开始',
        'copy': '📋 复制',
        'clear': '🗑️ 清空',
        'submit': '提交',
        'cancel': '取消',
        'confirm': '确定',
        'zh-btn': '中文',
        'en-btn': 'English',
        
        // index.html - 主页
        'home-welcome': '欢迎来到雨落的世界！',
        'home-intro': '— 听，下雨了。—',
        'home-section1': '——有关雨落们的事',
        'home-section2': '——观测站的千奇百怪功能区',
        'home-section3': '——观测站的秘密工具箱',
        'home-card1-title': '雨落们的观测记录',
        'home-card1-desc': '这里存放着观测站，以及各个世界的精彩时刻！<br>快来快来！',
        'home-card1-btn': '点击进入',
        'home-card2-title': '雨落们的档案馆',
        'home-card2-desc': '这是千万滴雨落下的瞬间。<br>每一滴都反射着独特的光芒。',
        'home-card2-lock': '🔒 暂未对外开放',
        'home-card2-unlock': '✨ 开发者模式已解锁',
        'home-card2-btn': '暂未开放',
        'home-card2-btn-unlock': '进入档案馆',
        'home-card3-title': '测试·更深认识 ta',
        'home-card3-desc': 'MBTI / 九型人格 · 探索人格的奥秘<br>发现更层的自己～',
        'home-card3-btn': '开始测试',
        'home-card4-title': '绘境 · 标签配方库',
        'home-card4-desc': '这是一个神奇的 tag 生成器！指哪打哪，萌新福音！<br>来试试吗？',
        'home-card4-btn': '进入绘境',
        'home-card5-title': '角色 UUID 识别工具',
        'home-card5-desc': '输入角色链接，自动提取 UUID<br>快速、准确、一键复制',
        'home-card5-btn': '使用工具',
        'home-footer1': '雨落的世界 · 由 伊斯派菈 制作',
        'home-footer2': '每一个世界，都是一段独特的旅程',
        'home-secret-btn': '点击输入神秘暗号',
        'home-play-btn': '🎵 开始播放',
        'home-floating-title': '你想做什么？',
        'home-fullscreen': '🖼️ 背景纯享',
        'home-exit-fullscreen': '❌ 退出纯享',
        'home-switch-bg': '🖼️ 切换背景',
        'home-secret-modal-title': '🔐 输入神秘暗号',
        'home-secret-modal-placeholder': '请输入暗号…',
        'home-secret-modal-return': '返回',
        'home-secret-modal-confirm': '确定',
        'home-music-modal': '谨以此音乐献给小椰果<br>——一直在等你回家的雨落',
        'home-dev-mode': '🔓 开发者模式',
        'home-exit-dev': '❌ 退出开发者模式',
        
        // enneagram.html - 九型人格
        'ennea-title': '✨ 九型人格分析',
        'ennea-subtitle': '描述你自己，让我来读懂你的内心',
        'ennea-label': '请用一段话描述你自己：',
        'ennea-hint': '💡 描述越详细，分析越准确。建议 100 字以上。',
        'ennea-btn': '开始分析',
        'ennea-analyzing': '分析中…',
        'ennea-result-title': '你的九型人格分布',
        'ennea-main-label': '主导类型',
        'ennea-restart': '🔄 重新分析',
        'ennea-short': '请详细描述你自己，至少 50 字哦～',
        'ennea-error': '分析过程中出现错误，请重试',
        'ennea-ph-zh': `例如：
我是一个比较内向的人，喜欢独处思考。在工作中我追求完美，常常会因为细节不够好而焦虑。我很在意别人的看法，希望能被认可和喜爱。面对冲突时，我倾向于避免正面冲突，但内心会有自己的想法和坚持。我有很多兴趣爱好，但常常三分钟热度...

（可以从性格特点、行为模式、内心感受、人际关系等方面描述）`,
        
        // uuid-tool.html - UUID 工具
        'uuid-title': '角色 UUID 识别工具',
        'uuid-subtitle': '输入角色链接，自动提取 UUID',
        'uuid-step1': '步骤 1：',
        'uuid-step2': '步骤 2：',
        'uuid-step3': '步骤 3：',
        'uuid-step4': '步骤 4：',
        'uuid-step5': '步骤 5：',
        'uuid-tutorial1': '在捏 Ta 平台找到角色页面',
        'uuid-tutorial2': '复制浏览器地址栏的完整链接',
        'uuid-tutorial3': '将链接粘贴到下方输入框',
        'uuid-tutorial4': '点击"提取 UUID"按钮',
        'uuid-tutorial5': 'UUID 将显示在下方，点击即可复制',
        'uuid-tip': '提示：请使用完整链接（nieta.art/character/xxx），短链可能无法解析',
        'uuid-label': '角色链接：',
        'uuid-placeholder': '粘贴角色完整链接...',
        'uuid-example': '链接格式示例：',
        'uuid-btn': '提取 UUID',
        'uuid-clear': '清空',
        'uuid-shortlink-tip': '短链用户注意：如果使用的是短链（t.nieta.art/xxx），请先在浏览器打开短链，然后复制跳转后的完整链接再粘贴到此处。',
        'uuid-loading': '正在解析中，请稍候…',
        'uuid-link-type': '链接类型',
        'uuid-char-name': '角色名',
        'uuid-author': '作者名',
        'uuid-create-time': '创建时间',
        'uuid-char-uuid': '角色 UUID',
        'uuid-share-uuid': '分享者 UUID',
        'uuid-copy-hint': '点击 UUID 可复制',
        'uuid-copied': '已复制！',
        'uuid-error-empty': '请先输入角色链接',
        'uuid-error-format': '未找到有效的 UUID 格式，请检查链接是否正确。格式应为：nieta.art/character/xxxx-xxxx-xxxx-xxxx',
        'uuid-error-shortlink': '短链无法直接提取 UUID。请先在浏览器打开短链，复制跳转后的完整链接（nieta.art/character/xxx），再粘贴到此处。',
        'uuid-not-available': '（仅支持完整链接）',
        'uuid-standard': '标准链接',
        
        // huijing.html - 绘境
        'huijing-title': '绘境 · 标签配方库',
        'huijing-subtitle': '输入描述，生成 Danbooru 风格标签',
        'huijing-label': '描述（中文或英文）：',
        'huijing-placeholder': '例如：一个穿着白色连衣裙的少女，站在樱花树下，微笑着看向远方...',
        'huijing-hint': '💡 描述越详细，生成的标签越准确。',
        'huijing-btn': '生成标签',
        'huijing-generating': '生成中…',
        'huijing-result-title': '生成的标签',
        'huijing-result-placeholder': '这里将显示生成的标签...',
        'huijing-copy': '📋 复制标签',
        'huijing-clear': '🗑️ 清空',
        'huijing-copied': '已复制！',
        
        // mbti.html - MBTI
        'mbti-title': '✨ MBTI 人格检测',
        'mbti-subtitle': '基于荣格八维认知功能',
        'mbti-tab-text': '文本分析',
        'mbti-tab-link': '链接解析',
        'mbti-text-label': '请描述你自己（100 字以上）：',
        'mbti-text-placeholder': '例如：我是一个比较内向的人，喜欢独处思考。在工作中我注重细节，追求完美。做决定时我更倾向于理性分析，而不是感情用事。我喜欢有计划的生活，不喜欢太多变化...',
        'mbti-link-label': 'Neta 角色链接：',
        'mbti-link-placeholder': '粘贴角色链接...',
        'mbti-btn': '开始分析',
        'mbti-analyzing': '分析中…',
        'mbti-result-title': '你的人格类型',
        'mbti-copy-report': '📋 复制报告',
        'mbti-restart': '🗑️ 重新分析',
        'mbti-short': '请详细描述你自己，至少 50 字哦～',
        'mbti-error': '分析过程中出现错误，请重试',
        
        // archive.html - 档案馆
        'archive-title': '落下的雨千万滴',
        'archive-intro': '— 每一滴微小的雨珠，汇集成了滂沱大雨。—',
        'archive-search': '搜索标签或角色…',
        'archive-homu-notice': '"荷穆勒"之名，意味着重重苦难。',
        'archive-homu-sub': '（仅选中荷穆勒时显示）',
        'archive-loading': '档案馆正在建设中',
        'archive-locked': '🔒 暂未对外开放',
        
        // test-choice.html - 测试选择
        'test-title': '心理测试选择',
        'test-subtitle': '选择你想进行的测试',
        'test-01-title': '01 · MBTI 人格检测',
        'test-01-desc': '基于荣格八维认知功能的 16 型人格分析',
        'test-01-btn': '开始测试',
        'test-02-title': '02 · 九型人格分析',
        'test-02-desc': '探索你内心深处的核心动机和恐惧',
        'test-02-btn': '开始测试',
        'test-back': '← 返回主页'
    },
    
    en: {
        // Generic
        'loading': 'Loading',
        'back-to-home': '← Back to Home',
        'restart': '🔄 Restart',
        'copy': '📋 Copy',
        'clear': '🗑️ Clear',
        'submit': 'Submit',
        'cancel': 'Cancel',
        'confirm': 'Confirm',
        'zh-btn': '中文',
        'en-btn': 'English',
        
        // index.html - Home
        'home-welcome': 'Welcome to Rain\'s World!',
        'home-intro': '— Listen, it\'s raining. —',
        'home-section1': '— About Rain and Friends',
        'home-section2': '— Observatory\'s Wondrous Functions',
        'home-section3': '— Observatory\'s Secret Toolbox',
        'home-card1-title': 'Rain\'s Observation Records',
        'home-card1-desc': 'Here are the observatory and wonderful moments from various worlds!<br>Come and explore!',
        'home-card1-btn': 'Enter Here',
        'home-card2-title': 'Rain\'s Archive',
        'home-card2-desc': 'These are the moments when countless raindrops fall.<br>Each reflects unique light.',
        'home-card2-lock': '🔒 Not Yet Open',
        'home-card2-unlock': '✨ Developer Mode Unlocked',
        'home-card2-btn': 'Not Yet Open',
        'home-card2-btn-unlock': 'Enter Archive',
        'home-card3-title': 'Tests · Know Yourself Better',
        'home-card3-desc': 'MBTI / Enneagram · Explore the mysteries of personality<br>Discover your deeper self～',
        'home-card3-btn': 'Start Testing',
        'home-card4-title': 'Huijing · Tag Recipe Library',
        'home-card4-desc': 'This is a magical tag generator! Precise and beginner-friendly!<br>Want to try?',
        'home-card4-btn': 'Enter Huijing',
        'home-card5-title': 'Character UUID Tool',
        'home-card5-desc': 'Input character link, auto-extract UUID<br>Fast, accurate, one-click copy',
        'home-card5-btn': 'Use Tool',
        'home-footer1': 'Rain\'s World · Made by Espira',
        'home-footer2': 'Every world is a unique journey',
        'home-secret-btn': 'Click to enter secret code',
        'home-play-btn': '🎵 Start Playing',
        'home-floating-title': 'What would you like to do?',
        'home-fullscreen': '🖼️ Fullscreen Background',
        'home-exit-fullscreen': '❌ Exit Fullscreen',
        'home-switch-bg': '🖼️ Switch Background',
        'home-secret-modal-title': '🔐 Enter Secret Code',
        'home-secret-modal-placeholder': 'Please enter the code…',
        'home-secret-modal-return': 'Return',
        'home-secret-modal-confirm': 'Confirm',
        'home-music-modal': 'This music is dedicated to Little Coconut<br>— Rain, who has always been waiting for you to come home',
        'home-dev-mode': '🔓 Developer Mode',
        'home-exit-dev': '❌ Exit Developer Mode',
        
        // enneagram.html - Enneagram
        'ennea-title': '✨ Enneagram Analysis',
        'ennea-subtitle': 'Describe yourself, let me understand your heart',
        'ennea-label': 'Please describe yourself in a paragraph:',
        'ennea-hint': '💡 The more detailed your description, the more accurate the analysis. 100+ characters recommended.',
        'ennea-btn': 'Start Analysis',
        'ennea-analyzing': 'Analyzing…',
        'ennea-result-title': 'Your Enneagram Distribution',
        'ennea-main-label': 'Dominant Type',
        'ennea-restart': '🔄 Restart',
        'ennea-short': 'Please describe yourself in detail, at least 50 characters.',
        'ennea-error': 'An error occurred during analysis. Please try again.',
        'ennea-ph-en': `For example:
I'm a relatively introverted person who enjoys solitary thinking. At work, I pursue perfection and often feel anxious about details not being good enough. I care about others' opinions and hope to be recognized and liked. When facing conflicts, I tend to avoid direct confrontation, but I have my own thoughts and convictions. I have many interests, but often lose interest quickly...

(You can describe personality traits, behavioral patterns, inner feelings, interpersonal relationships, etc.)`,
        
        // uuid-tool.html - UUID Tool
        'uuid-title': 'Character UUID Tool',
        'uuid-subtitle': 'Input character link, auto-extract UUID',
        'uuid-step1': 'Step 1: ',
        'uuid-step2': 'Step 2: ',
        'uuid-step3': 'Step 3: ',
        'uuid-step4': 'Step 4: ',
        'uuid-step5': 'Step 5: ',
        'uuid-tutorial1': 'Find the character page on Nieta',
        'uuid-tutorial2': 'Copy the full URL from the address bar',
        'uuid-tutorial3': 'Paste the link into the input box below',
        'uuid-tutorial4': 'Click "Extract UUID" button',
        'uuid-tutorial5': 'UUID will appear below, click to copy',
        'uuid-tip': 'Tip: Please use the full link (nieta.art/character/xxx). Short links may not work.',
        'uuid-label': 'Character Link:',
        'uuid-placeholder': 'Paste character link...',
        'uuid-example': 'Link format example:',
        'uuid-btn': 'Extract UUID',
        'uuid-clear': 'Clear',
        'uuid-shortlink-tip': 'Short link users: If using a short link (t.nieta.art/xxx), please open it in browser first, then copy and paste the redirected full link here.',
        'uuid-loading': 'Parsing, please wait…',
        'uuid-link-type': 'Link Type',
        'uuid-char-name': 'Character Name',
        'uuid-author': 'Author',
        'uuid-create-time': 'Creation Time',
        'uuid-char-uuid': 'Character UUID',
        'uuid-share-uuid': 'Sharer UUID',
        'uuid-copy-hint': 'Click UUID to copy',
        'uuid-copied': 'Copied!',
        'uuid-error-empty': 'Please input a character link first',
        'uuid-error-format': 'No valid UUID format found. Please check the link. Format should be: nieta.art/character/xxxx-xxxx-xxxx-xxxx',
        'uuid-error-shortlink': 'Cannot extract UUID from short link directly. Please open the short link in browser, copy the redirected full link (nieta.art/character/xxx), and paste it here.',
        'uuid-not-available': '(Full link required)',
        'uuid-standard': 'Standard Link',
        
        // huijing.html - Huijing
        'huijing-title': 'Huijing · Tag Library',
        'huijing-subtitle': 'Input description, generate Danbooru-style tags',
        'huijing-label': 'Description (Chinese or English):',
        'huijing-placeholder': 'e.g.: A girl in a white dress, standing under a cherry blossom tree, smiling and looking into the distance...',
        'huijing-hint': '💡 The more detailed your description, the more accurate the tags.',
        'huijing-btn': 'Generate Tags',
        'huijing-generating': 'Generating…',
        'huijing-result-title': 'Generated Tags',
        'huijing-result-placeholder': 'Tags will appear here...',
        'huijing-copy': '📋 Copy Tags',
        'huijing-clear': '🗑️ Clear',
        'huijing-copied': 'Copied!',
        
        // mbti.html - MBTI
        'mbti-title': '✨ MBTI Personality Test',
        'mbti-subtitle': 'Based on Jungian Cognitive Functions',
        'mbti-tab-text': 'Text Analysis',
        'mbti-tab-link': 'Link Parser',
        'mbti-text-label': 'Please describe yourself (100+ characters):',
        'mbti-text-placeholder': 'e.g.: I\'m a relatively introverted person who enjoys solitary thinking. At work, I pay attention to details and pursue perfection. When making decisions, I tend to use rational analysis rather than emotions. I prefer a planned life and don\'t like too much change...',
        'mbti-link-label': 'Neta Character Link:',
        'mbti-link-placeholder': 'Paste character link...',
        'mbti-btn': 'Start Analysis',
        'mbti-analyzing': 'Analyzing…',
        'mbti-result-title': 'Your Personality Type',
        'mbti-copy-report': '📋 Copy Report',
        'mbti-restart': '🗑️ Restart',
        'mbti-short': 'Please describe yourself in detail, at least 50 characters.',
        'mbti-error': 'An error occurred during analysis. Please try again.',
        
        // archive.html - Archive
        'archive-title': 'Countless Raindrops Fall',
        'archive-intro': '— Every tiny droplet gathers into a pouring rain. —',
        'archive-search': 'Search tags or characters…',
        'archive-homu-notice': 'The name "Homulesha" means immense suffering.',
        'archive-homu-sub': '(Only shown when Homulesha is selected)',
        'archive-loading': 'Archive Under Construction',
        'archive-locked': '🔒 Not Yet Open',
        
        // test-choice.html - Test Choice
        'test-title': 'Personality Tests',
        'test-subtitle': 'Choose the test you want to take',
        'test-01-title': '01 · MBTI Personality Test',
        'test-01-desc': '16-type personality analysis based on Jungian cognitive functions',
        'test-01-btn': 'Start Test',
        'test-02-title': '02 · Enneagram Analysis',
        'test-02-desc': 'Explore your core motivations and fears',
        'test-02-btn': 'Start Test',
        'test-back': '← Back to Home'
    }
};

// 当前语言
let currentLang = 'zh';

// 初始化语言（从 localStorage 读取）
function initLang() {
    const saved = localStorage.getItem('siteLang');
    const lang = saved || 'zh';
    setLang(lang);
}

// 设置语言
function setLang(lang) {
    if (!i18n[lang]) lang = 'zh';
    currentLang = lang;
    localStorage.setItem('siteLang', lang);
    
    // 更新所有带 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = i18n[lang][key];
            } else {
                el.innerHTML = i18n[lang][key];
            }
        }
    });
    
    // 更新语言按钮状态
    const zhBtn = document.getElementById('langZh');
    const enBtn = document.getElementById('langEn');
    if (zhBtn) zhBtn.classList.toggle('active', lang === 'zh');
    if (enBtn) enBtn.classList.toggle('active', lang === 'en');
    
    // 特殊处理：placeholder 中有换行的（如九型人格）
    const enneaText = document.getElementById('selfDesc');
    if (enneaText && keyExists('ennea-ph-' + lang)) {
        enneaText.placeholder = i18n[lang]['ennea-ph-' + lang];
    }
}

// 检查 key 是否存在
function keyExists(key) {
    return i18n.zh.hasOwnProperty(key) || i18n.en.hasOwnProperty(key);
}

// 翻译函数（用于动态内容）
function t(key) {
    return i18n[currentLang][key] || i18n.zh[key] || key;
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    initLang();
});
