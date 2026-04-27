---
name: build-pdf
description: 職務経歴書.md を編集した後、git commit / push の前に PDF を再ビルドする。職務経歴書.md に変更があったときに自動で呼び出す。
allowed-tools: Bash
---

職務経歴書.md の変更を PDF に反映します。

## 実行コマンド

```bash
PATH="/opt/homebrew/opt/node@20/bin:$PATH" node build-pdf.mjs 職務経歴書.md
```

## 手順

1. 上記コマンドを実行する
2. `職務経歴書.pdf を生成しました` と出力されれば完了
3. エラーが出た場合はエラー内容を報告する

## 注意

- `職務経歴書.pdf` / `職務経歴書.html` は .gitignore 対象なのでコミットしない
- コマンドは必ずリポジトリルート（`/Users/tnakamura/git/byson2562.github.io`）で実行する
