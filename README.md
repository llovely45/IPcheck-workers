🌐 IPcheck - Ultimate IP Toolbox
IPcheck 是一个基于 Cloudflare Workers 的轻量级、高性能 IP 工具箱。它集成了 IP 分析、风控检测、实时延迟测速和浏览器指纹识别功能，所有功能均封装在一个文件中，无需复杂的构建流程。


🎨 极致 UI 设计：采用玻璃拟态 (Glassmorphism) 风格，配合流畅的入场动画、动态网格背景和 SVG 呼吸光效。

🛡️ 全面风控报告：集成 ipapi.is 数据，精准识别 Proxy、VPN、Tor、数据中心及滥用 IP，并提供 0-100 的风险评分。

⚡ 实时延迟测速：内置 Bilibili, Google, GitHub, OpenAI 等 10+ 常用服务的延迟检测，配备 Sparkline 实时波形图展示网络波动。

Cloudflare 节点：直接读取 CF 边缘节点数据。

🔁 双栈检测：同时检测 IPv4 和 IPv6 连接能力，科技感 UI 展示。

🕵️ 深度指纹识别：检测 User Agent、Canvas Hash、GPU 渲染器、屏幕参数、内存估算等硬件指纹。


📸 预览

https://test.135345.xyz/

# 直接在 Cloudflare Dashboard 部署（推荐）
登录 Cloudflare Dashboard。

进入 Workers & Pages -> Create Application -> Create Worker。

命名您的 Worker（例如 ipcheck），点击 Deploy。

点击 Edit code。

将本项目中的 worker.js (即您提供的完整代码) 复制并粘贴覆盖原有的代码。

点击右上角的 Deploy 保存。

浏览器兼容性: 使用了较新的 CSS 特性（如 backdrop-filter）和 ES6+ 语法，建议使用现代浏览器访问。

📄 开源协议
MIT License. 欢迎 Fork 和 Star！
