# 2023_electron_react_typescript
Electron(React+TypeScript)を用いたサンプルデスクトップアプリケーション開発

## サンプルアプリケーションの概要
入力フォームから入力したメンバー情報をバックエンド（FastAPI）に送り、Sqlite3で立てたデータベース上のテーブルに保存するだけのアプリケーション。

## アプリケーションの起動
・フロントエンドプロジェクトにディレクトリを移動
```
cd frontend\electron-my-app
```

・必要なライブラリをインストール
```
yarn
```

・フロントエンド起動
```
yarn start
```


・バックエンドプロジェクトにディレクトリを移動
```
cd backend\fastapi_server
```

・Sqlite3をインストールし、任意のフォルダに配置する。
データベース「test.db」を作成し、以下のテーブルを作成する
```
CREATE TABLE formdata(id int primary key, name text, gender text);
```

・fastapi_server直下に「secret.py」を作成し、
```
SQLITE_LOCAL_PATH = 'sqlite:///[sqliteディレクトリのパス]test.db'
```
を記載する。

・バックエンド起動
```
uvicorn main:app --reload
```