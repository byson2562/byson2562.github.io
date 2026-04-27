# プロジェクト設定

## career.md → index.html 自動同期ルール

**career.md を編集した後は、必ず index.html との同期チェックを行い、差分があれば自動で更新してください。**

### 同期項目と対応表

#### 1. スキルセット
`career.md` の `## スキルセット` テーブルと `index.html` の `.skill-item` を照合。

習熟度 → ポートフォリオ表示の対応：

| career.md 習熟度 | index.html ラベル | バー幅 |
|---|---|---|
| 上級 | Advanced | 85〜92% |
| 中級以上 | Intermediate+ | 70〜77% |
| 中級 | Intermediate | 63〜70% |

#### 2. 自己定義・強み（Hero セクション）
- `career.md` の「職務要約」冒頭の自己定義が `index.html` の `<h1>` / `.lead` と整合しているか確認
- `**強み：**` の内容が `.meta-list` 内の「関心」と整合しているか確認
- meta description / og:description との整合チェック

#### 3. 経歴・役職（Career セクション）
- 役職名・担当領域の変更があれば `.timeline-item` に反映

#### 4. Contact セクション
- 自己定義変更時は contact の説明文も確認

### 反映ルール
- `index.html` の役職名（例：SRE Tech Lead）はそのまま維持（実際の役職名のため）
- 数値やバー幅は対応表の範囲内で調整
- 変更した箇所を最後に箇条書きで報告すること

## PDF ビルド
```bash
PATH="/opt/homebrew/opt/node@20/bin:$PATH" node build-pdf.mjs career.md
```
