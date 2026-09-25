# simple-calculator

ブラウザだけで動作するシンプルな電卓です。

## GitHub Pages への公開

`.github/workflows/deploy-pages.yml` は、`main` ブランチへの push 時に、公開対象の
静的ファイルだけを GitHub Pages の artifact としてアップロードしてデプロイします。

初回デプロイの前に、リポジトリ管理者は GitHub の **Settings → Pages** で **Build and
deployment** の **Source** を **GitHub Actions** に設定してください。この設定が
「Deploy」ステップの HTTP エラーを防ぐために必要です。設定後は `main` に push する
か、Actions の **Deploy to GitHub Pages** ワークフローを手動実行してください。
