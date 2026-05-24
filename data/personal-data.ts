// ============================================================
// 吴家鑫 · 像素RPG 个人档案数据
// ============================================================

export const personalInfo = {
  name: "吴家鑫",
  nameEn: "Wu Jiaxin",
  title: "后端 / 全栈 工程师",
  classText: "全栈冒险者 · Lv.22",
  studentId: "22404031",
  level: 22,
  school: "马鞍山学院 · 计算机科学与技术",
  period: "2022.09 — 2026.07",
  avatar: "images/avatar_pixel.png",
  originalAvatar: "images/avatar.jpg",
  motto: "在终端的字符之间，敲下属于自己的副本进度。",
  bio: "工作认真负责、注重细节。善于沟通协作，乐于接受建议并持续改进；学习能力强，能够快速掌握新技术，熟练使用 Cursor / Claude Code / Trae 等 AI 编程工具辅助开发。时间观念强、执行力高，对自我要求严格，善于总结复盘，追求持续成长。",
};

// ============================================================
// 技能 (HP/MP 风格的属性条)
// ============================================================
export type Skill = {
  name: string;
  level: number; // 1-10
  icon: string;
  color: string;
  desc: string;
};

export const skills: Skill[] = [
  {
    name: "Java / Spring Boot",
    level: 8,
    icon: "☕",
    color: "#f97316",
    desc: "核心语法、面向对象、Spring Boot、MyBatis / MyBatis-Plus，了解多线程与常用设计模式。",
  },
  {
    name: "Python (Flask / FastAPI)",
    level: 8,
    icon: "🐍",
    color: "#4ade80",
    desc: "数据处理 Pandas / NumPy，Web 后端 Flask / FastAPI，独立完成接口与爬虫开发。",
  },
  {
    name: "Vue 3 / 前端工程化",
    level: 7,
    icon: "⚔️",
    color: "#42b883",
    desc: "Vue 3 Composition API + Vite + Pinia + Element Plus，熟悉响应式布局与移动端适配。",
  },
  {
    name: "MySQL / Redis / Neo4j",
    level: 7,
    icon: "🗄️",
    color: "#60a5fa",
    desc: "MySQL 数据库设计与 SQL 优化，了解 SQLite、Redis 缓存、Neo4j 知识图谱场景。",
  },
  {
    name: "AI 大模型集成",
    level: 7,
    icon: "🔮",
    color: "#c084fc",
    desc: "讯飞星火、Kimi、豆包、火山引擎等 LLM API 调用，知识图谱 + RAG + Live2D 数字人。",
  },
  {
    name: "机器学习 / 数据挖掘",
    level: 6,
    icon: "📊",
    color: "#f472b6",
    desc: "回归 / 分类 / 聚类常用模型，Scikit-learn / PyTorch，时间序列与推荐系统实践。",
  },
  {
    name: "计算机视觉",
    level: 6,
    icon: "👁️",
    color: "#fbbf24",
    desc: "OpenCV 图像处理，YOLOv8 / ResNet / ViT 等目标检测与分类模型应用。",
  },
  {
    name: "C / Qt / 嵌入式",
    level: 6,
    icon: "🛡️",
    color: "#9ca3af",
    desc: "C 语言指针与内存管理，Qt 跨平台桌面应用，STM32 串口通信。",
  },
];

// ============================================================
// 任务 / 项目经历
// ============================================================
export type Quest = {
  name: string;
  description: string;
  techStack: string[];
  period: string;
  rarity: "normal" | "elite" | "legendary";
  status: "completed" | "in-progress";
  icon: string;
};

export const quests: Quest[] = [
  {
    name: "基于 AI 的心理健康咨询平台",
    description:
      "Python Flask + Spring Boot + Vue 3 多端架构，集成 Kimi API、Live2D 虚拟咨询师、讯飞语音识别、火山引擎 TTS，实现 AI 智能咨询、在线预约、咨询记录管理等核心能力。",
    techStack: ["Vue 3", "Flask", "Spring Boot", "Kimi API", "Live2D", "Socket.IO"],
    period: "2025",
    rarity: "legendary",
    status: "completed",
    icon: "🧠",
  },
  {
    name: "在线学术信息服务系统 AcademicNet",
    description:
      "Spring Boot 3.2 + Vue 3 + uni-app 全平台架构，MySQL + Redis + Neo4j 多数据库，知识图谱六度路径分析 + 火山方舟 Ark LLM 学术问答助手。",
    techStack: ["Spring Boot 3", "Vue 3", "uni-app", "Neo4j", "Redis", "Ark SDK"],
    period: "2025",
    rarity: "legendary",
    status: "completed",
    icon: "🎓",
  },
  {
    name: "基于深度学习的 X 光片肺炎检测系统",
    description:
      "PyTorch + Streamlit，集成 ResNet-50 / VGG-16 / DenseNet-121 / EfficientNet / ViT / Swin 六种模型对比，配合 Grad-CAM 可解释性分析，识别 NORMAL / BACTERIA / VIRUS。",
    techStack: ["PyTorch", "Streamlit", "ResNet", "ViT", "Grad-CAM"],
    period: "2024",
    rarity: "legendary",
    status: "completed",
    icon: "🩻",
  },
  {
    name: "个人健康管理系统",
    description:
      "Spring Boot + MyBatis-Plus + Redis + JWT 后端 + Vue 前端流式调用讯飞星火 Spark Max，支持健康数据记录、运动管理与个性化健康咨询对话。",
    techStack: ["Spring Boot", "Vue", "Spark Max", "Redis", "JWT", "MySQL"],
    period: "2025",
    rarity: "elite",
    status: "completed",
    icon: "❤️‍🔥",
  },
  {
    name: "智能门锁控制系统",
    description:
      "Qt + OpenCV 人脸检测 + STM32 串口通信，GPIO 控制继电器与门锁状态读取，集成温湿度传感器与摄像头抓拍，构建嵌入式视觉门禁。",
    techStack: ["Qt", "OpenCV", "STM32", "C++", "串口"],
    period: "2024",
    rarity: "elite",
    status: "completed",
    icon: "🔐",
  },
  {
    name: "宠物医疗问诊平台",
    description:
      "Vue 3 + Vite + Element Plus 多角色前端 + Spring Boot 后端，覆盖用户 / 医生 / 管理三端，支持宠物档案、症状自评、在线问诊、处方记录与论坛交流。",
    techStack: ["Vue 3", "Spring Boot", "Element Plus", "MySQL"],
    period: "2024",
    rarity: "elite",
    status: "completed",
    icon: "🐾",
  },
  {
    name: "综合 Web 漏洞扫描系统",
    description:
      "Python Flask 集成 WHOIS、端口 / 目录 / 子域名扫描、SSL 信息、SQL 注入 / XSS 检测、WAF 识别等 12 个模块，多线程并发扫描与历史报告生成。",
    techStack: ["Flask", "多线程", "渗透测试", "SQLi/XSS"],
    period: "2024",
    rarity: "elite",
    status: "completed",
    icon: "🛡️",
  },
  {
    name: "信用卡异常交易检测系统",
    description:
      "Python FastAPI + 逻辑回归模型 + 短信 / 图形验证码 + AI 智能分析，多维特征构建风险评分模型，实时识别可疑交易并预警。",
    techStack: ["FastAPI", "Logistic", "风控", "AI 分析"],
    period: "2024",
    rarity: "elite",
    status: "completed",
    icon: "💳",
  },
  {
    name: "基于 YOLOv8 的花卉检测识别系统",
    description:
      "PyQt5 桌面端集成 YOLOv8，支持单图、批量、视频与摄像头实时检测，SQLite 存储识别历史，支持 Excel 报告导出与可视化分析。",
    techStack: ["YOLOv8", "PyQt5", "SQLite", "OpenCV"],
    period: "2024",
    rarity: "normal",
    status: "completed",
    icon: "🌸",
  },
];

// ============================================================
// 宝物 / 荣誉证书
// ============================================================
export type Certificate = {
  id: number;
  name: string;
  desc: string;
  rarity: "S" | "A" | "B";
  image: string;
  prize: string;
  scope: string;
  year: string;
  team: string;
  icon: string;
};

export const certificates: Certificate[] = [
  {
    id: 1,
    name: "传智杯 Web 网页开发挑战赛",
    desc: "2024-2025 年度全国大学生计算机应用能力与数字素养大赛，Web 网页开发挑战赛 B 组国赛三等奖。",
    rarity: "S",
    image: "images/certificates/1.jpg",
    prize: "国赛三等奖",
    scope: "全国赛",
    year: "2025",
    team: "花朵队",
    icon: "🖥️",
  },
  {
    id: 2,
    name: "安徽省网络与分布式系统创新设计大赛",
    desc: "技能赛本科组 · 大数据应用方向，荣获二等奖。",
    rarity: "A",
    image: "images/certificates/2.jpg",
    prize: "二等奖",
    scope: "省级赛",
    year: "2024",
    team: "李明月、吴家鑫",
    icon: "🌐",
  },
  {
    id: 3,
    name: "传智杯 AIGC 创新挑战赛",
    desc: "AIGC 创新挑战赛 B 组省赛优秀奖。",
    rarity: "A",
    image: "images/certificates/3.jpg",
    prize: "省赛优秀奖",
    scope: "省级赛",
    year: "2025",
    team: "个人赛",
    icon: "🤖",
  },
  {
    id: 4,
    name: "全国大学生电子商务三创赛",
    desc: "第十五届全国大学生电子商务“创新、创意及创业”挑战赛校级赛特等奖。",
    rarity: "A",
    image: "images/certificates/4.jpg",
    prize: "校级赛特等奖",
    scope: "校级赛",
    year: "2025",
    team: "光宗耀祖第一队",
    icon: "🛒",
  },
  {
    id: 5,
    name: "全国大学生数学竞赛",
    desc: "第十五届全国大学生数学竞赛校赛三等奖。",
    rarity: "B",
    image: "images/certificates/5.jpg",
    prize: "校赛三等奖",
    scope: "校级赛",
    year: "2024",
    team: "个人赛",
    icon: "📐",
  },
  {
    id: 6,
    name: "全国大学生信息安全竞赛",
    desc: "全国大学生信息安全竞赛安徽省赛校赛选拔赛三等奖。",
    rarity: "B",
    image: "images/certificates/6.jpg",
    prize: "校赛三等奖",
    scope: "校级选拔",
    year: "2024",
    team: "李明月、吴家鑫、左文静、徐皓亮",
    icon: "🔒",
  },
  {
    id: 7,
    name: "中国计算机应用技术大赛算法精英赛",
    desc: "第四届中国计算机应用技术大赛全国算法精英大赛校内选拔赛一等奖。",
    rarity: "A",
    image: "images/certificates/7.jpg",
    prize: "校内选拔一等奖",
    scope: "校级选拔",
    year: "2024",
    team: "个人赛",
    icon: "🧮",
  },
];

// ============================================================
// 实习经历
// ============================================================
export type Internship = {
  period: string;
  company: string;
  role: string;
  type: string;
  desc: string;
};

export const internships: Internship[] = [
  {
    period: "2026.01.05 — 2026.01.27",
    company: "北京华清远见科技发展有限公司南京分公司",
    role: "嵌入式系统开发实践",
    type: "毕业实习",
    desc: "完成嵌入式系统开发实践课程与项目训练。",
  },
  {
    period: "2026.03.06 — 2026.05.06",
    company: "郑州玥默科技有限公司",
    role: "实习生（软件开发）",
    type: "实习",
    desc: "参与软件开发相关工作。",
  },
  {
    period: "2025.10.01 — 2026.05.19",
    company: "广州市黄埔区智码创意网络部",
    role: "软件开发工程师",
    type: "实习实践",
    desc: "主要参与多个软件项目的需求整理、数据库设计、后端接口开发、前端页面实现、测试部署及文档整理工作。",
  },
];

// ============================================================
// 教育 / 时间线
// ============================================================
export const timeline = [
  {
    year: "2022.09",
    title: "新手村出发",
    desc: "踏入马鞍山学院计算机科学与技术专业，技能树重置。",
    icon: "🏰",
  },
  {
    year: "2023",
    title: "基础职业转职",
    desc: "完成 C / Python / Java 系列主线，开始尝试 Web 与桌面应用。",
    icon: "⚔️",
  },
  {
    year: "2024",
    title: "竞赛副本通关",
    desc: "信息安全 / 网络分布式 / 电子商务等多项国家级、省级奖项。",
    icon: "🏆",
  },
  {
    year: "2025",
    title: "AI 全栈进阶",
    desc: "完成多个 AI + 全栈项目：心理咨询平台、健康管理、学术服务系统等。",
    icon: "🔮",
  },
  {
    year: "2026.07",
    title: "毕业 Boss 战",
    desc: "向后端 / 全栈工程师岗位发起冲锋。",
    icon: "👑",
  },
];

// ============================================================
// 联系方式
// ============================================================
export const contact = {
  email: "3295517899@qq.com",
  phone: "188-3608-4050",
  location: "安徽 · 马鞍山",
  resumeFile: "resume.pdf",
};

// ============================================================
// 导航菜单
// ============================================================
export const navItems = [
  { id: "title", label: "起点", icon: "🏰" },
  { id: "character", label: "角色", icon: "🧙" },
  { id: "stats", label: "技能", icon: "⚔️" },
  { id: "quests", label: "任务", icon: "📜" },
  { id: "treasure", label: "宝物", icon: "🏆" },
  { id: "contact", label: "联络", icon: "📬" },
];
