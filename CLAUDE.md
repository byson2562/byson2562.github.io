# プロジェクト設定

## PDF ビルド

```bash
PATH="/opt/homebrew/opt/node@20/bin:$PATH" node build-pdf.mjs 職務経歴書.md
```

職務経歴書.md（Markdown）→ 職務経歴書.html（中間）→ 職務経歴書.pdf を生成する。

## 文章の自然さ

職務経歴書.md の文章を生成・修正した後は /humanizer-ja で自然な表現に整えてください。
