🌐 IPcheck - Ultimate IP Toolbox
IPcheck 是一个基于 Cloudflare Workers 的轻量级、高性能 IP 工具箱。它集成了 IP 分析、风控检测、实时延迟测速和浏览器指纹识别功能，所有功能均封装在一个文件中，无需复杂的构建流程。

✨ 核心特性
🎨 极致 UI 设计：采用玻璃拟态 (Glassmorphism) 风格，配合流畅的入场动画、动态网格背景和 SVG 呼吸光效。

🛡️ 全面风控报告：集成 ipapi.is 数据，精准识别 Proxy、VPN、Tor、数据中心及滥用 IP，并提供 0-100 的风险评分。

⚡ 实时延迟测速：内置 Bilibili, Google, GitHub, OpenAI 等 10+ 常用服务的延迟检测，配备 Sparkline 实时波形图展示网络波动。

Cloudflare 节点：直接读取 CF 边缘节点数据。

🔁 双栈检测：同时检测 IPv4 和 IPv6 连接能力，科技感 UI 展示。

🕵️ 深度指纹识别：检测 User Agent、Canvas Hash、GPU 渲染器、屏幕参数、内存估算等硬件指纹。

🚀 开箱即用：单文件架构，无需 npm install，直接粘贴到 Cloudflare Worker 编辑器即可运行。

📸 预览
https://dry-haze-729e.gray-eee.workers.dev

🛠️ 部署指南
# 方法一：直接在 Cloudflare Dashboard 部署（推荐）
登录 Cloudflare Dashboard。

进入 Workers & Pages -> Create Application -> Create Worker。

命名您的 Worker（例如 ipcheck），点击 Deploy。

点击 Edit code。

将本项目中的 worker.js (即您提供的完整代码) 复制并粘贴覆盖原有的代码。

点击右上角的 Deploy 保存。

访问分配给您的 Worker 域名即可使用！

# 方法二：使用 Wrangler CLI
如果您习惯本地开发：

初始化项目：

code
Bash
npm create cloudflare@latest ipcheck
选择 "Hello World" Worker
将代码复制到 src/index.js (或 src/index.ts)。

发布：

code
Bash
npx wrangler deploy
🧩 技术栈
后端运行环境: Cloudflare Workers (Edge Runtime)

前端框架: React 18 (通过 CDN 引入，运行时编译)

样式库: Tailwind CSS (通过 CDN 引入)

编译器: Babel Standalone (用于在浏览器端编译 JSX)

📡 数据来源
本项目的数据分析依赖以下公共 API 服务，感谢它们的免费/公开接口：

风控与详情: ipapi.is (核心数据源)

IP 定位 (容错): ipip.net, ipapi.co, useragentinfo

双栈检测: ipify.org

⚠️ 注意事项
API 限制: 本项目依赖第三方公共 API，如果在高并发场景下使用，可能会触发上游服务的速率限制。

浏览器兼容性: 使用了较新的 CSS 特性（如 backdrop-filter）和 ES6+ 语法，建议使用现代浏览器访问。

📄 开源协议
MIT License. 欢迎 Fork 和 Star！
