#!/usr/bin/env node
import { createServer } from "http";
import { readFileSync, watch, statSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { marked } from "marked";

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputFile = process.argv[2] ?? "候補企業リスト.md";
const port = parseInt(process.argv[3] ?? "6420", 10);

if (!inputFile.endsWith(".md")) {
  console.error("入力は .md ファイルである必要があります");
  process.exit(1);
}

const isCompaniesList = inputFile.includes("候補企業");
const templateFile = isCompaniesList
  ? "companies-template.html"
  : "career-template.html";

function processMarkdown(md) {
  const parts = [];
  let remaining = md;
  while (true) {
    const startMatch = remaining.match(/^:::project\n/m);
    if (!startMatch) {
      parts.push(marked.parse(remaining));
      break;
    }
    const startIdx = startMatch.index;
    if (startIdx > 0) {
      parts.push(marked.parse(remaining.slice(0, startIdx)));
    }
    const afterStart = remaining.slice(startIdx + ":::project\n".length);
    const endMatch = afterStart.match(/^:::$/m);
    if (!endMatch) {
      parts.push(marked.parse(afterStart));
      break;
    }
    const projectContent = afterStart.slice(0, endMatch.index);
    parts.push(
      `<div class="project">\n${marked.parse(projectContent.trim())}\n</div>\n`,
    );
    remaining = afterStart.slice(endMatch.index + 3);
    if (remaining.startsWith("\n")) remaining = remaining.slice(1);
  }
  return parts.join("");
}

function buildHtml() {
  const mdPath = resolve(__dirname, inputFile);
  const md = readFileSync(mdPath, "utf-8");
  const tpl = readFileSync(resolve(__dirname, templateFile), "utf-8");
  const body = processMarkdown(md);
  const html = tpl.replace("{{content}}", body);

  // 保存時自動リロード（poll 方式 / 1秒間隔）
  const reloadScript = `
<script>
(() => {
  let last = ${getMtime()};
  setInterval(async () => {
    try {
      const r = await fetch('/__mtime');
      const { mtime } = await r.json();
      if (mtime > last) location.reload();
    } catch (e) {}
  }, 1000);
})();
</script>`;
  return html.replace("</body>", reloadScript + "\n</body>");
}

function getMtime() {
  try {
    return statSync(resolve(__dirname, inputFile)).mtimeMs;
  } catch {
    return Date.now();
  }
}

createServer((req, res) => {
  if (req.url === "/__mtime") {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ mtime: getMtime() }));
    return;
  }
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  try {
    res.end(buildHtml());
  } catch (e) {
    res.statusCode = 500;
    res.end(`<pre>${e.stack}</pre>`);
  }
}).listen(port, () => {
  console.log(`✓ ${inputFile} を http://localhost:${port}/ で配信中`);
  console.log(`  保存時に自動リロードされます。停止は Ctrl+C`);
});
