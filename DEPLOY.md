# 部署指南(自有服务器)

单进程架构:Express 同时提供 `/api` 接口、`/design` 设计图静态目录、前端构建产物(`dist/`)。
数据库为 SQLite 文件 `server/data.db`(Node 22 内置 `node:sqlite`,零依赖、免编译)。

## 1. 环境要求

- Node.js **≥ 22**(`node -v` 确认;可用 `nvm install 22` 安装)
- PM2(`npm i -g pm2`)、nginx(可选,用于域名/80 端口)

## 2. 部署步骤

```bash
# 上传代码(或直接 git clone 你的仓库)后:
cd webui
npm install --omit=dev=false     # 前后端依赖都需要(前端要构建)
npm run build                    # 生成 dist/

# 首次启动会自动创建 data.db 并写入种子数据(5 版块/28 分类/69 资源/设计资产)
pm2 start ecosystem.config.cjs
pm2 save

# nginx 反代(可选)
cp deploy/nginx.conf.sample /etc/nginx/conf.d/webui-admin.conf
# 修改 server_name 后:
nginx -t && nginx -s reload
```

访问 `http://你的IP:3001`(或 nginx 域名),默认账号:

- 用户名:`admin`
- 密码:`admin123`  ← **登录后立即在「系统设置」修改**

> 环境变量 `ADMIN_PASSWORD` 仅在**首次**创建数据库时生效,用于设定初始密码。

## 3. 数据迁移(两种任选)

1. **文件级**:停服后拷贝 `server/data.db` 到新服务器同路径,重启。
2. **应用级**:旧后台「系统设置 → 导出 JSON」→ 新后台「导入恢复」。

## 4. 设计资产

- `design/` 目录以 `/design/*.png` 对外提供,后台「设计资产库」自动扫描入库;
- 新增设计图后,在资产库页面点「扫描 design/ 目录」即可。

## 5. 常用运维

```bash
pm2 logs webui-admin     # 看日志
pm2 restart webui-admin  # 重启
DB_PATH=/data/webui.db node server/index.js   # 自定义数据库位置
PORT=8080 node server/index.js                # 自定义端口
```
