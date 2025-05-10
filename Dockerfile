# 1. 使用官方 Node 映像檔
FROM node:20-alpine

# 2. 設定工作目錄
WORKDIR /app

# 3. 複製 package.json / yarn.lock
COPY package*.json ./

# 4. 安裝依賴
RUN npm install

# 5. 複製專案檔案
COPY . .

# 6. 建立 Next.js 專案（production build）
RUN npm run build

# 7. 使用環境變數啟動 production 模式
ENV NODE_ENV=production

# 8. 開啟 3000 port
EXPOSE 3000

# 9. 啟動應用程式
CMD ["npm", "start"]
