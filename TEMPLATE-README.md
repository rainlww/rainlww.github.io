# 角色页面模板使用说明

## 📄 模板文件

**位置**：`character-template.html`

**用途**：所有圣拉姆特角色页面的统一格式模板

---

## 🎨 模板结构

### 1. 占位符说明

| 占位符 | 说明 | 示例 |
|--------|------|------|
| `{{CHARACTER_NAME}}` | 角色名字（会自动替换到 title 和页面标题） | 塞缪尔 |
| `{{ARTWORK_IMAGE_SRC}}` | 立绘图片文件名 | samuel-cover.jpg |
| `{{ARTWORK_CAPTION}}` | 立绘图片说明文字 | 塞缪尔—白玫瑰与晚香玉 |

### 2. 内容区域

| 区域 | ID | 说明 |
|------|-----|------|
| 引言 | - | 角色经典台词或引言，斜体显示 |
| 立绘展示 | `#artwork` | 角色立绘图片 |
| 人物简介 | `#description` | 包含基础档案、档案资料等 |
| 相关人物 | `#related` | 角色关系网 |
| 外部链接 | `#external` | Neta 链接、参考资料等 |

---

## 📝 内容格式规范

### 引言区域
```html
<div style="font-size: 0.95em; color: #666; font-style: italic; line-height: 1.8;">
    <div>第一句引言</div>
    <div>第二句引言</div>
    <div>第三句引言</div>
</div>
```

### 基础档案 / 档案资料
```html
<div style="background: #f5f5f5; padding: 18px 22px; border: 2px solid #e0e0e0; color: #1a1a1a; font-size: 1em; line-height: 1.8; border-radius: 4px; font-weight: 500;">
    <p style="margin: 0 0 12px 0;">第一段内容</p>
    <p style="margin: 0 0 12px 0;">第二段内容</p>
    <p style="margin: 0;">最后一段（margin: 0）</p>
</div>
```

**注意**：
- 小标题（如「基础档案」）在灰色框**外面**
- 每段用 `<p>` 标签包裹
- 除最后一段外，其他段落用 `margin: 0 0 12px 0;`
- 最后一段用 `margin: 0;`

---

## 🛠️ 使用方法

### 方法 1：手动复制
```bash
cd /home/node/.openclaw/workspace/github-pages-deploy
cp character-template.html character-samuel.html
# 然后编辑 character-samuel.html 填写内容
```

### 方法 2：使用生成脚本
```bash
cd /home/node/.openclaw/scripts
python3 generate-character-page.py "塞缪尔" "samuel"
```

---

## 📋 完整制作流程

1. **生成页面**
   ```bash
   python3 generate-character-page.py "角色名" "pinyin"
   ```

2. **编辑内容**
   - 打开生成的 HTML 文件
   - 替换所有占位符和示例内容
   - 确保格式符合规范

3. **添加立绘**
   - 将图片文件放到 `github-pages-deploy/` 目录
   - 更新 `<img src="">` 的图片路径

4. **测试**
   - 在浏览器打开本地文件检查格式
   - 确认所有链接正确

5. **推送**
   ```bash
   cd /home/node/.openclaw/workspace/github-pages-deploy
   git add .
   git commit -m "✨ 新增角色页面：角色名"
   git push
   bash /home/node/.openclaw/scripts/daily-sync.sh
   ```

---

## 🎨 样式标准

### 灰色背景框
```css
background: #f5f5f5;
padding: 18px 22px;
border: 2px solid #e0e0e0;
border-radius: 4px;
```

### 引言框
```css
background: rgba(245,245,245,0.8);
border-left: 3px solid #9a7a8a;
border-radius: 4px;
```

### 引言文字
```css
font-style: italic;
color: #666;
line-height: 1.8;
```

### 小标题
```css
font-size: 1.05em;
color: #1a1a1a;
font-weight: 700;
letter-spacing: 2px;
```

---

## 📌 注意事项

1. **不要修改 CSS 样式** —— 保持所有页面格式统一
2. **小标题在框外** —— 「基础档案」等标题不在灰色框内
3. **使用 inline style** —— 所有样式直接写在 HTML 标签上
4. **段落间距** —— 使用 `margin: 0 0 12px 0;` 控制段间距
5. **图片路径** —— 使用相对路径，不要用绝对路径

---

## 🌐 查看效果

**TalesOfAI Pages**：https://claw-espira-pages.talesofai.com/character-{pinyin}.html

**GitHub Pages**：https://rainlww.github.io/character-{pinyin}.html

---

*模板版本：v1.0（2026-05-26）*
*基于荷穆勒夏页面格式制定*
