# 画像URLの修正手順

## 画像のダウンロード

### 1. EXPロゴ
- URL: https://page.gensparksite.com/v1/base64_upload/9383fc3bb735acef02f1015e754071ff
- 保存先: `images/exp-logo.png`

### 2. 兵働支援員の写真
- URL: https://page.gensparksite.com/v1/base64_upload/3fd1d91295eb20f9cbbad6a0b64e8919
- 保存先: `images/hyodo-staff.jpg`

## index.htmlの修正箇所

### 修正1: ヘッダーのロゴ（30行目付近）
```html
<!-- 修正前 -->
<img src="https://page.gensparksite.com/v1/base64_upload/9383fc3bb735acef02f1015e754071ff" alt="EXP立川ロゴ" class="logo-img">

<!-- 修正後 -->
<img src="images/exp-logo.png" alt="EXP立川ロゴ" class="logo-img">
```

### 修正2: 支援員紹介の写真（検索: staff-img）
```html
<!-- 修正前 -->
<img src="https://page.gensparksite.com/v1/base64_upload/3fd1d91295eb20f9cbbad6a0b64e8919" alt="兵働弘一 支援員" class="staff-img">

<!-- 修正後 -->
<img src="images/hyodo-staff.jpg" alt="兵働弘一 支援員" class="staff-img">
```

### 修正3: フッターのロゴ（検索: footer-logo-img）
```html
<!-- 修正前 -->
<img src="https://page.gensparksite.com/v1/base64_upload/9383fc3bb735acef02f1015e754071ff" alt="EXP立川ロゴ" class="footer-logo-img">

<!-- 修正後 -->
<img src="images/exp-logo.png" alt="EXP立川ロゴ" class="footer-logo-img">
```

## 修正後のファイル構造

```
exp-tachikawa-lp/
├── index.html          # 修正後のHTML
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/             # 新規作成
│   ├── exp-logo.png    # ダウンロードした画像
│   └── hyodo-staff.jpg # ダウンロードした画像
└── README.md
```

## Git操作（修正後）

```bash
# 1. imagesフォルダを追加
git add images/

# 2. index.htmlの変更を追加
git add index.html

# 3. コミット
git commit -m "画像をローカルに移行"

# 4. プッシュ
git push origin main
```

## 確認

- GitHub Pagesで再度URLにアクセスし、画像が表示されることを確認
- キャッシュのクリアが必要な場合: Ctrl+Shift+R（Windows）/ Cmd+Shift+R（Mac）
