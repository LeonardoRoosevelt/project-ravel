# project-ravel


## Features

-新增、刪除、變更、搜尋產品

-新增、刪除、變更、搜尋產品的定價

-------------------------------------



### Environment SetUp - 環境建置

```

body-parser: ^1.19.0,

express: ^4.17.1,

mysql2: ^2.2.5,

sequelize: ^6.5.0,

sequelize-cli: ^6.2.0

Node.js
nodemon

```

### Installing - 專案安裝流程

打開你的 terminal，Clone 此專案至本機電腦

```

git clone https://github.com/LeonardoRoosevelt/project-ravel

```

開啟終端機(Terminal)，進入存放此專案的資料夾

```

cd project-ravel

```

安裝 npm 套件

```

在 Terminal 輸入 npm install 指令

```

安裝 nodemon 套件

```

Setup your own MySQL database ( details in /config/config.json).



after preparing your database, migrate the database 

npx sequelize db:migrate



if you need to undo all the actions, please use the commands.

npx sequelize db:migrate:undo:all

```

在 Terminal 輸入 nodemon app.js 指令

啟動伺服器，執行 app.js 檔案

```

nodemon app.js

```

當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結

```

The Express server is running on https://localhost:3000

```



現在，你可開啟任一瀏覽器瀏覽器輸入 "https://localhost:3000" 開始使用





### Contributor - 專案開發人員

[Leonardo Roosevelt](https://github.com/LeonardoRoosevelt)