# GitHub Pagesでの公開手順（完全版）

## 📋 作業の流れ

### STEP 1: GitHubリポジトリ作成
1. https://github.com/ にログイン
2. 右上の「+」→「New repository」
3. リポジトリ情報を入力:
   - Repository name: `exp-tachikawa-lp`
   - Description: `就労選択支援事業所EXP立川 公式ランディングページ`
   - Public（公開）を選択
   - ☑ Add a README file
4. 「Create repository」をクリック

---

### STEP 2: 画像のダウンロード

#### 画像1: EXPロゴ
1. ブラウザで以下のURLを開く:
   ```
   https://page.gensparksite.com/v1/base64_upload/9383fc3bb735acef02f1015e754071ff
   ```
2. 画像を右クリック→「名前を付けて画像を保存」
3. ファイル名: `exp-logo.png`

#### 画像2: 兵働支援員の写真
1. ブラウザで以下のURLを開く:
   ```
   https://page.gensparksite.com/v1/base64_upload/3fd1d91295eb20f9cbbad6a0b64e8919
   ```
2. 画像を右クリック→「名前を付けて画像を保存」
3. ファイル名: `hyodo-staff.jpg`

---

### STEP 3: ファイル構造の準備

ローカルに以下の構造でフォルダを作成:

```
exp-tachikawa-lp/
├── index.html          # このプロジェクトのファイル
├── css/
│   └── style.css       # このプロジェクトのファイル
├── js/
│   └── script.js       # このプロジェクトのファイル
├── images/             # 新規作成
│   ├── exp-logo.png    # ダウンロードした画像
│   └── hyodo-staff.jpg # ダウンロードした画像
└── README.md           # このプロジェクトのファイル
```

**重要**: index.htmlは既に画像パスを修正済みです（images/exp-logo.png等）

---

### STEP 4: GitHubにアップロード

#### 方法A: ブラウザから（簡単）

1. GitHubのリポジトリページで「Add file」→「Upload files」
2. 以下をドラッグ&ドロップ:
   - index.html
   - css フォルダ（style.cssを含む）
   - js フォルダ（script.jsを含む）
   - images フォルダ（2つの画像を含む）
   - README.md
3. Commit message: `初回コミット - LP制作完了`
4. 「Commit changes」をクリック

#### 方法B: Git CLI（推奨）

```bash
# 1. プロジェクトフォルダに移動
cd path/to/exp-tachikawa-lp

# 2. Gitリポジトリを初期化
git init

# 3. すべてのファイルを追加
git add .

# 4. コミット
git commit -m "初回コミット - LP制作完了"

# 5. GitHubリポジトリに接続（あなたのユーザー名に置き換え）
git remote add origin https://github.com/あなたのユーザー名/exp-tachikawa-lp.git

# 6. ブランチ名をmainに変更してプッシュ
git branch -M main
git push -u origin main
```

---

### STEP 5: GitHub Pages設定

1. リポジトリページで「Settings」タブをクリック
2. 左メニューから「Pages」を選択
3. Source設定:
   - Branch: `main`
   - Folder: `/ (root)`
4. 「Save」をクリック
5. 数分待つと緑色のメッセージが表示:
   ```
   ✅ Your site is published at https://ユーザー名.github.io/exp-tachikawa-lp/
   ```

---

### STEP 6: 表示確認

#### 確認項目
- [ ] EXPロゴが表示されている（ヘッダー、フッター）
- [ ] 兵働支援員の写真が表示されている
- [ ] 黄色基調のデザインになっている
- [ ] レスポンシブデザイン（スマホで確認）
- [ ] ナビゲーションメニューが動作する
- [ ] FAQアコーディオンが開閉する
- [ ] 電話番号リンク（tel:042-595-8550）が機能する
- [ ] Googleマップが表示される

#### キャッシュクリア
表示がおかしい場合:
- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

---

## 🔧 トラブルシューティング

### 画像が表示されない
**原因**: ファイルパスが正しくない

**確認**:
1. GitHubリポジトリで `images/exp-logo.png` が存在するか確認
2. ファイル名の大文字小文字が一致しているか確認
3. index.htmlの画像パスが `images/exp-logo.png` になっているか確認

### CSSが適用されない
**確認**:
1. `css/style.css` が存在するか
2. index.htmlの `<link rel="stylesheet" href="css/style.css">` が正しいか

### JavaScriptが動作しない
**確認**:
1. ブラウザのコンソール（F12）でエラーを確認
2. `js/script.js` が存在するか
3. index.htmlの `<script src="js/script.js"></script>` が正しいか

### GitHub Pagesが有効化されない
**確認**:
1. リポジトリがPublic（公開）になっているか
2. index.htmlがルートディレクトリにあるか
3. 数分待ってからリロード

---

## 🌐 既存サイトとの連携

### 既存のコーポレートサイト（exp.or.jp）からリンク

HTMLファイルに以下を追加:
```html
<a href="https://あなたのユーザー名.github.io/exp-tachikawa-lp/" target="_blank" rel="noopener noreferrer">
    就労選択支援についてはこちら
</a>
```

---

## 📊 独自ドメインの設定（オプション）

GitHub Pagesで独自ドメイン（例: syurosentaku.exp.or.jp）を使用する場合:

1. **DNS設定**:
   - CNAMEレコードを追加
   - ホスト: `syurosentaku`
   - 値: `あなたのユーザー名.github.io`

2. **GitHub Pages設定**:
   - Settings → Pages → Custom domain
   - `syurosentaku.exp.or.jp` を入力
   - ☑ Enforce HTTPS

3. **リポジトリに CNAMEファイルを追加**:
   ```
   syurosentaku.exp.or.jp
   ```

---

## 📝 更新方法

### ファイルを更新する場合

#### ブラウザから:
1. GitHubリポジトリでファイルをクリック
2. 右上の鉛筆アイコン（Edit）をクリック
3. 編集後「Commit changes」

#### Git CLIから:
```bash
# 1. ファイルを編集
# 2. 変更を追加
git add .

# 3. コミット
git commit -m "更新内容の説明"

# 4. プッシュ
git push origin main
```

**反映時間**: 数分〜10分程度

---

## ✅ チェックリスト

公開前の最終確認:

- [ ] GitHubリポジトリ作成済み
- [ ] 画像2枚（ロゴ、支援員写真）をダウンロード済み
- [ ] imagesフォルダを作成し、画像を配置
- [ ] index.html、css、jsをアップロード
- [ ] GitHub Pages設定完了
- [ ] 公開URLで正常に表示される
- [ ] スマホでの表示確認
- [ ] 電話番号リンクの動作確認
- [ ] 既存サイトからのリンク設置

---

## 🎯 完了！

これでGitHub Pagesでの公開が完了です。

公開URL: `https://あなたのユーザー名.github.io/exp-tachikawa-lp/`

この URLを既存のコーポレートサイト（https://exp.or.jp/）からリンクすれば、利用者がアクセスできるようになります。

ご質問があればお気軽にお聞きください！
