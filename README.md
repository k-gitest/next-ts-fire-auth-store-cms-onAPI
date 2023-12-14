## 目的
next.jsのapiを使用してfirebase各種サービスを使用する技術選定における検証である。

## app概要
create-next-appで構築されたNext.jsとfirabaseのfirestoreとauthenticationを利用したCMSプロジェクトです。

* 複数会員での利用を想定している
* 会員向けと一般向けで表示画面を分ける前提
* クライアント側のフロントはSSG、APIはSSRを想定している

## 開発環境

* next 13.4.2
* typescript 5.0.4
* firebase 9.22.0
* firebase-admin 11.9.0
* tailwind 3.3.2
* swr 2.1.5
* axios 1.4.0

## ディレクトリ構成

<pre>
myapp...プロジェクトディレクトリ
  ├── components ...呼び出し用コンポーネントファイル
  │     ├── FormParts ...フォームコンポーネント
  │     ├── layout ...メインレイアウト
  │     └── provider ...ユーザー認証
  ├── lib ...firebaseなど外部設定ファイル
  ├── pages ...初期生成されるメインファイル
  │     ├── [uid] ...一般向け画面
  │     │     └── [pid] ... 投稿表示画面
  │     ├── api ...サーバー側処理
  │     │     └── admin ... adminSDK使用ファイル
  │     ├── login ...ログイン画面
  │     ├── signup ...登録画面
  │     └── user ...会員向け画面
  ├── public ...画像ファイル
  ├── styles ...css設定ファイル
  └── types ...型定義ファイル
</pre>

## 認証方法

Firebase AuthenticationはJWTを使用して認証情報をクライアントに渡すため、認証はapi側でadminを使用しtokenを検証する。

## 注意点

サーバー側からauthやstoreに認証する場合、サーバーには認証情報がないのでエラーになる。その場合はadminSDK経由でauthやstoreに接続する必要がある。

nextのapiディレクトリでfirebaseを使用する場合は認証に注意しなければならない。

const db = admin.firestore();
この様にしてstoreのdbに接続すれば認証情報が添付されて、セキュリティルールが許可される。
しかし、apiに書くstoreのコードはバージョン８でないとエラーになる。

collection(db, 'user', id)
こうではなく、以下の通りv8にする。
db.collection('users').doc(id);

一応ユーザー登録やユーザー情報や投稿もできフロント側の挙動は問題ないように見えるが、認証はできていないためセキュリティリスクが生じる。認証情報が空の状態でfirestore側に送られてしまう。

認証状態が空であるためauthProviderのonAuthStateChangedも基本的には動作していない。
そのままだと全て認証してしまうのでfirestore側でのセキュリティルールで対応しなければならない。

## 結論
結論としてfirebaseをapi側で処理する事は望ましくない。

api側で行う場合は全てfire-adminで処理しセキュリティルールを設定する事が望ましい。ユーザー認証チェックもapi側で行いたい場合はnext-authライブラリを検討した方が良い。
