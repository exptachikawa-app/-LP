# GitHub Pagesでデザインが反映されない問題の解決方法

## 🔍 問題の原因

GitHub Pagesでは、リポジトリ名がURLのサブパスとして含まれます：

```
公開URL: https://exptachikawa-app.github.io/-LP/
                                              ^^^^
                                      サブパス（リポジトリ名）
```

HTMLファイル内で相対パス（`css/style.css`）を使用すると、以下のように間違ったパスで読み込もうとします：

```
❌ 間違い: https://exptachikawa-app.github.io/css/style.css
✅ 正しい: https://exptachikawa-app.github.io/-LP/css/style.css
```

---

## ✅ 解決済み：index.htmlを修正しました

以下の修正を行いました：

### 修正1: `<base>` タグを追加（19行目付近）

```html
<!-- 修正前 -->
<link rel="stylesheet" href="css/style.css">

<!-- 修正後 -->
<base href="https://exptachikawa-app.github.io/-LP/">
<link rel="stylesheet" href="css/style.css">
```

**効果**: すべての相対パスが自動的に `https://exptachikawa-app.github.io/-LP/` を基準に解決されます。

### 修正2: OGP URLの更新（14行目）

```html
<!-- 修正前 -->
<meta property="og:url" content="https://exp.or.jp/">

<!-- 修正後 -->
<meta property="og:url" content="https://exptachikawa-app.github.io/-LP/">
```

---

## 🚀 GitHubへの反映手順

### 方法A: ブラウザから（簡単）

1. **GitHubリポジトリのページを開く**
   - https://github.com/exptachikawa-app/-LP

2. **index.htmlを開く**
   - ファイル一覧から `index.html` をクリック

3. **編集モードに入る**
   - 右上の鉛筆アイコン（✏️）をクリック

4. **19行目を探して以下に変更**

   **修正前**:
   ```html
   <link rel="stylesheet" href="css/style.css">
   ```

   **修正後**:
   ```html
   <!-- Base URL for GitHub Pages subpath -->
   <base href="https://exptachikawa-app.github.io/-LP/">
   
   <link rel="stylesheet" href="css/style.css">
   ```

5. **14行目も変更**

   **修正前**:
   ```html
   <meta property="og:url" content="https://exp.or.jp/">
   ```

   **修正後**:
   ```html
   <meta property="og:url" content="https://exptachikawa-app.github.io/-LP/">
   ```

6. **変更をコミット**
   - 画面下の「Commit changes」ボタンをクリック
   - Commit message: `Fix: CSSとJSのパスを修正`
   - 「Commit changes」をクリック

7. **反映を待つ**
   - 1〜2分待ってから公開URLにアクセス
   - `Ctrl+Shift+R`（Windows）または `Cmd+Shift+R`（Mac）でキャッシュクリア

---

### 方法B: Git CLI

```bash
# 1. ローカルのindex.htmlを修正（上記の内容）

# 2. 変更を追加
git add index.html

# 3. コミット
git commit -m "Fix: CSSとJSのパスを修正"

# 4. プッシュ
git push origin main
```

---

## 📋 確認手順

修正後、以下を確認してください：

1. **公開URLにアクセス**
   - https://exptachikawa-app.github.io/-LP/

2. **ブラウザの開発者ツールで確認**（F12キー）
   - 「Network」タブを開く
   - `css/style.css` が **200（成功）** で読み込まれているか確認
   - `js/script.js` が **200（成功）** で読み込まれているか確認

3. **表示確認**
   - [ ] 黄色基調のデザインになっている
   - [ ] EXPロゴが表示されている
   - [ ] 兵働支援員の写真が表示されている
   - [ ] ナビゲーションメニューが動作する
   - [ ] スマホでも正しく表示される

---

## 🔧 代替解決方法

### 方法1: リポジトリ名を変更する

リポジトリ名から `-LP` を削除し、URLをシンプルにする方法です。

#### 手順:
1. Settings → General
2. Repository name を `-LP` から `lp` または `exp-tachikawa` に変更
3. 「Rename」をクリック
4. 新しいURL: `https://exptachikawa-app.github.io/lp/`
5. index.htmlの `<base href>` を新しいURLに更新

---

### 方法2: カスタムドメインを使用する

独自ドメイン（例: `lp.exp.or.jp`）を設定すれば、サブパスの問題が解消されます。

#### 手順:
1. DNSでCNAMEレコードを追加
   - ホスト: `lp`
   - 値: `exptachikawa-app.github.io`
2. Settings → Pages → Custom domain
   - `lp.exp.or.jp` を入力
   - Save
3. index.htmlから `<base href>` を削除（不要になる）

---

## ⚠️ 注意事項

### `<base>` タグの影響

`<base>` タグを追加すると、**すべてのアンカーリンク**も影響を受けます。

例:
```html
<a href="#contact">お問い合わせ</a>
```

これは以下のように解釈されます:
```
https://exptachikawa-app.github.io/-LP/#contact
```

**対策**: 現在のHTMLでは問題ありません（すべて `#` から始まる相対リンク）。

---

## ✅ チェックリスト

修正完了後の確認:

- [ ] index.htmlに `<base href>` を追加
- [ ] OGP URLを更新
- [ ] GitHubにプッシュ
- [ ] 1〜2分待機
- [ ] 公開URLにアクセス
- [ ] デザインが正しく表示される
- [ ] 画像が表示される
- [ ] JavaScriptが動作する
- [ ] スマホでの表示確認

---

## 🎯 まとめ

**修正内容**: index.htmlに `<base href="https://exptachikawa-app.github.io/-LP/">` を追加

**効果**: CSS、JavaScript、画像が正しく読み込まれる

**次のステップ**: 修正したindex.htmlをGitHubにプッシュ→反映を確認

---

修正版のindex.htmlは既にこのプロジェクトに保存されています。
GitHubにアップロードすれば、デザインが正しく表示されます。
