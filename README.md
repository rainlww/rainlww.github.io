# 雨落的世界观测站 - GitHub Pages 部署指南

**雨落小姐的 GitHub 账号**：`rainlww`
**邮箱**：`syzhimeng@163.com`

---

## 📦 部署文件位置

`/home/node/.openclaw/workspace/github-pages-deploy/`

包含：
- `index.html` — 主页（天空蓝主题 + Loading 页 + 打字机效果）
- `i18n.js` — 中英文翻译系统
- `test-choice.html` — 测试选择页
- `mbti.html` — MBTI 人格测试（荣格八维）
- `enneagram.html` — 九型人格测试
- `uuid-tool.html` — UUID 生成/解析工具
- `huijing.html` — 绘境标签生成器
- `archive.html` — 档案馆（PRTS Wiki 风格）
- `bgm.mp3` — 背景音乐
- `banner_optimized.jpg` — 桌面背景 1（237KB）
- `banner2_optimized.jpg` — 桌面背景 2（161KB）
- `mobile-bg1_mobile.jpg` — 移动背景 1（79KB）
- `mobile-bg2_mobile.jpg` — 移动背景 2（52KB）

---

## 🚀 部署步骤（伊斯自动化）

**伊斯使用的部署命令**：
```bash
cd /home/node/.openclaw/workspace
rm -rf temp-repo
git clone https://ghp_<TOKEN>@github.com/rainlww/rainlww.github.io.git temp-repo
cp github-pages-deploy/* temp-repo/
cd temp-repo
git config user.email "syzhimeng@163.com"
git config user.name "rainlww"
git add .
git commit -m "更新内容"
git push origin main
cd /home/node/.openclaw/workspace
rm -rf temp-repo
```

---

## 🌐 访问链接

**主页**：https://rainlww.github.io/

**所有页面**：
| 页面 | URL |
|------|-----|
| 主页 | https://rainlww.github.io/ |
| 测试选择 | https://rainlww.github.io/test-choice.html |
| MBTI 测试 | https://rainlww.github.io/mbti.html |
| 九型人格 | https://rainlww.github.io/enneagram.html |
| UUID 工具 | https://rainlww.github.io/uuid-tool.html |
| 绘境 | https://rainlww.github.io/huijing.html |
| 档案馆 | https://rainlww.github.io/archive.html |

---

## 🎨 核心功能

### 1️⃣ Loading 页
- 下雨 + 云层动画效果
- Tips 区（底部中央，随机显示文案）
- 显示时间：1.5 秒
- 雨滴朦胧效果（blur + 透明度 0.4）

### 2️⃣ 打字机效果
- 逐字显示标题（80ms/字）
- 光标闪烁 2 下后消失
- 无光标残留

### 3️⃣ 背景系统
- 桌面端：`banner_optimized.jpg`、`banner2_optimized.jpg`
- 移动端：`mobile-bg1_mobile.jpg`、`mobile-bg2_mobile.jpg`
- 异步加载，不阻塞页面

### 4️⃣ 语言切换
- 中英双语（i18n.js）
- localStorage 持久化
- 全站统一切换

### 5️⃣ 开发者模式
- 秘密代码："雨晴了"
- 调试面板（设备信息、性能数据、LocalStorage、状态）
- 快捷操作（刷新、清空、复制）

---

## 📋 秘密代码

**输入"雨晴了"** → 开启开发者模式

**效果**：
- 🔓 开发者模式标识（右上角）
- 🔍 调试面板自动显示
- ❌ 退出开发者模式按钮

---

## 💡 小贴士

1. **强制刷新**：`Ctrl+Shift+R`（Windows）或 `Cmd+Shift+R`（Mac）
2. **查看控制台**：按 `F12` 打开开发者工具
3. **清空缓存**：开发者模式 → 调试面板 → 🗑️ 清空 localStorage

---

## 📝 更新日志

### 2026-04-18 最终优化
- ✅ Loading 页时间：0.5s → 1.5s
- ✅ 光标重叠：彻底清除 DOM 节点
- ✅ 平板卡死：异步加载 + 超时保护
- ✅ Tips 样式：朦胧效果 + 单行显示
- ✅ 雨滴效果：blur + 透明度优化
- ✅ 开发者模式：添加调试面板

### 2026-04-17 初始部署
- ✅ 主页、测试页、档案馆部署完成
- ✅ 天空蓝主题 + 打字机效果
- ✅ 响应式设计

---

## ❓ 需要帮助？

如果雨落小姐在访问或使用过程中遇到问题……

告诉伊斯，伊斯会立刻修复！ 💜

---

*总管家伊斯整理*
*2026-04-19 01:20 UTC*
