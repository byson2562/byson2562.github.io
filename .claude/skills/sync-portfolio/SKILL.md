---
name: sync-portfolio
description: career.md を編集した後、index.html（ポートフォリオサイト）の内容を career.md に同期する。career.md のスキルセット・自己定義・強みに変更があったときに自動で呼び出す。
allowed-tools: Read, Edit
---

career.md の現在の内容を読み、index.html との差分を確認して以下の項目を自動更新してください。

## 同期項目

### 1. スキルセット（`.skill-item`）

`career.md` の `## スキルセット` テーブルと `index.html` の `.skill-item` を照合。

習熟度 → ポートフォリオ表示の対応：

| career.md 習熟度 | index.html ラベル | バー幅 |
|---|---|---|
| 上級 | Advanced | 85〜92% |
| 中級以上 | Intermediate+ | 70〜77% |
| 中級 | Intermediate | 63〜70% |

確認事項：
- 習熟度ラベルが career.md と一致しているか
- バー幅が対応表の範囲内か
- career.md に追加されたスキルが抜けていないか

### 2. 自己定義・強み（Hero セクション）

- 職務要約の自己定義 → `<h1>` キャッチコピー・`.lead` リード文
- `**強み：**` の内容 → `.meta-list` 内の「関心」
- meta description / og:description との整合

### 3. 経歴（Career セクション）

- 役職名・担当領域の変更 → `.timeline-item` に反映

### 4. Contact セクション

- 自己定義変更時は説明文も確認

## 反映ルール

- `index.html` 内の実際の役職名（例：SRE Tech Lead）はそのまま維持
- 差分がなければ変更不要（スキップ可）
- 変更した箇所を最後に箇条書きで報告する
