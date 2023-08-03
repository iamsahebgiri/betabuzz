const products = [
  {
    name: 'Poddy',
    tagline: 'Social podcasting app',
    description:
      'Poddy is transforming the podcast universe, making it more social and accessible. We present a platform where everyone can create, discover, and interact with audio content. Like, share, comment, and embark on a new media experience - all with Poddy.',
    image: 'https://ph-files.imgix.net/ac3756e8-d495-46f0-954c-c13ebb2f8db1.gif?auto=format',
    link: 'https://poddy.co',
    tags: ['Social Media', 'Tech', 'Audio'],
    category: 'Podcasting',
    maker: '64cbabeef8b08fb5ba94912d',
  },
  {
    name: 'Figr 2.0',
    tagline: 'Get editable UI of popular apps in a click',
    description:
      'Design like a pro with figr.design! More than just screenshots. Each design you see on Figr can be copied to Figma and edited any way you want. Browse through popular apps and get tailored recommendations to find the best inspiration.',
    image: 'https://ph-files.imgix.net/186df829-156e-4149-89c3-7e076c136fa2.png?auto=format',
    link: 'https://figr.design/',
    tags: ['Design Tools', 'User Experience', 'Design resources'],
    category: 'Graphic design tools',
    maker: '64cbabeef8b08fb5ba94912d',
  },
  {
    name: 'Holoframe',
    tagline: 'Frame your NFTs and collections in augmented reality',
    description:
      'Holoframe is a simple web3 app designed for NFT traders and creators. If offers an effortless way to frame individual NFTs or entire collections in augmented reality — and then view them without the need for an app download or a wallet collection.',
    image: 'https://ph-files.imgix.net/c21913f9-e4bb-4284-9e5f-a9894dbae4cc.gif?auto=format',
    link: 'https://www.holoframe.io/',
    tags: ['Augmented Reality', 'Web3', 'NFT'],
    category: 'Augmented Reality',
    maker: '64cbabeef8b08fb5ba94912d',
  },
  {
    name: 'HeyPhoto',
    tagline: 'Tune selfies, group photos, and Midjourney arts with AI',
    description:
      'Fix faces that ruin your perfect photos in a few clicks. No special skills needed! Just drag a slider and get stunning results with the original quality preserved. Tweak faces to change gaze direction, identity, age, smile, or gender. All for free!',
    image: 'https://ph-files.imgix.net/28199bc9-78a1-4b76-892c-3f5da50fe3e6.gif?auto=format',
    link: 'https://hey-photo.com/',
    tags: ['Productivity', 'Artificial Intelligence', 'Graphics & Design'],
    category: 'AI',
    maker: '64cbabeef8b08fb5ba94912d',
  },
  {
    name: 'Personal Assistant by HyperWrite',
    tagline: 'The first AI agent that can operate your browser',
    description:
      'Self-driving mode for your browser. Meet your new sidekick for web browsing, research, automation, and more. Personal Assistant by HyperWrite can do anything a human can do online — kick back and let the agent work its magic, hands-free.',
    image: 'https://ph-files.imgix.net/54685892-0696-4764-8aae-649c15fe0e8e.png?auto=format',
    link: 'https://www.hyperwriteai.com/personal-assistant',
    tags: ['Chrome Extensions', 'Productivity', 'Artificial Intelligence'],
    category: 'Chrome Extensions',
    maker: '64cbabeef8b08fb5ba94912d',
  },
  {
    name: 'AudioCraft',
    tagline: 'Generative AI for audio made simple',
    description:
      "AudioCraft is Meta's simple framework that generates high-quality, realistic audio and music from text-based user inputs after training on raw audio signals as opposed to MIDI or piano rolls.",
    image: 'https://ph-files.imgix.net/0d751117-4ff3-4139-b5c9-2175785cb1ed.png?auto=format',
    link: 'https://ai.meta.com/blog/audiocraft-musicgen-audiogen-encodec-generative-ai-audio/',
    tags: ['Music', 'Artificial Intelligence', 'GitHub', 'Audio'],
    category: 'AI',
    maker: '64cbabeef8b08fb5ba94912d',
  },
  {
    name: 'Peaks',
    tagline: 'Sync with your inner clock - sleep better, more energy',
    description:
      'Peaks provides a deep understanding of your circadian rhythm, a scientifically-backed daily cycle influencing your body functions. With personalised routines synced to this rhythm, Peaks empowers better sleep, increased energy, and enhanced productivity.',
    image: 'https://ph-files.imgix.net/90ced0ff-d8c5-4ed6-b335-6d157132d70f.png?auto=format',
    link: 'https://apps.apple.com/app/apple-store/id6446705377?pt=122775367&ct=Landing+Page&mt=8',
    tags: ['iOS', 'Health & Fitness', 'Productivity'],
    category: 'Health',
    maker: '64cbabeef8b08fb5ba94912d',
  },
  {
    name: 'Describely',
    tagline: 'The ultimate AI-powered eCommerce product content management',
    description:
      'Effortlessly create personialized, captivating product content at scale. Create, enhance and launch products instantly with our integrations with major eCommerce platforms. Get actionable SEO data to boost your sales and take your business to the next level 🚀',
    image: 'https://ph-files.imgix.net/44d46216-a553-435b-8739-c1f329e7f5a4.gif?auto=format',
    link: 'https://describely.ai',
    tags: ['Productivity', 'Artificial Intelligence', 'E-Commerce'],
    category: 'AI',
    maker: '64cbabeef8b08fb5ba94912d',
  },
  {
    name: 'SkillAI',
    tagline: 'Generating learning paths using AI for any skill',
    description:
      'Unleash your potential with skillAI! Create personalized learning paths for any skill. Progress tracking, free plan, and premium options. Join now!',
    image: 'https://ph-files.imgix.net/e0bd0705-ff2e-4e43-b85e-209946ea027c.png?auto=format',
    link: 'https://skillai.io',
    tags: ['Artificial Intelligence', 'Online Learning'],
    category: 'AI',
    maker: '64cbabeef8b08fb5ba94912d',
  },
  {
    name: 'DashAI',
    tagline: 'Instant access to ChatGPT on every webpage',
    description:
      'Skyrocket your productivity with instant access to ChatGPT on every webpage. Chat with AI, voice transcriptions, AI quick actions, prompt library, summarize webpages and more.',
    image: 'https://ph-files.imgix.net/77781086-3b67-42a4-8fd1-04724e657566.png?auto=format',
    link: 'https://www.dashai.xyz',
    tags: ['Chrome Extensions', 'Productivity', 'Artificial Intelligence'],
    category: 'AI',
    maker: '64cbabeef8b08fb5ba94912d',
  },
  {
    name: 'NeuralBox',
    tagline: 'Remember anything you see with photos and AI',
    description:
      'Remember anything you see using photos - anything that catches your eye or seems even remotely useful, from receipts and screenshots to documents, clothes, and product packaging. With efficient storage, AI search, NeuralBox is your AI Memory Extension.',
    image: 'https://ph-files.imgix.net/8e5a1d88-37cb-4e41-8ef1-f6e19929aceb.jpeg?auto=format',
    link: 'https://neural.cam/neuralbox/',
    tags: ['Productivity', 'Notes', 'Artificial Intelligence'],
    category: 'AI',
    maker: '64cbabeef8b08fb5ba94912d',
  },
  {
    name: 'Early Stage Growth',
    tagline: 'A weekly email focused on growth',
    description:
      'A weekly email focused on growth: psychology, engines, product market fit, analytics, and marketing. We share trend reports, in-depth case studies and free experiments to help founders and heads of growth create the world’s biggest brands.',
    image: 'https://ph-files.imgix.net/f0fb2fa9-26c8-46a8-9889-0b8374dd384c.jpeg?auto=format',
    link: 'https://www.earlystagegrowth.com',
    tags: ['Marketing', 'Advertising', 'Startup Lessons'],
    category: 'Marketing automation platforms',
    maker: '64cbabeef8b08fb5ba94912d',
  },
  {
    name: 'NRI GPT',
    tagline: 'Indian expats get their own ChatGPT search',
    description:
      'ChatGPT powered search for topics exclusive to Indian expats starting with investing, finance, taxation, compliance, and more',
    image: 'https://ph-files.imgix.net/95c573c2-8add-43ef-83c7-7dba90674e45.png?auto=format',
    link: 'https://www.nrigpt.ai',
    tags: ['Investing', 'Search', 'Finance'],
    category: 'Investing',
    maker: '64cbabeef8b08fb5ba94912d',
  },
  {
    name: 'Coleap',
    tagline: 'The all-in-one learning community platform powered by AI',
    description:
      "Whether you're running a bootcamp, learning community, cohort-based online course or mastermind group, Coleap helps you deliver a great experience to your users with little operational effort powered by amazing AI features",
    image: 'https://ph-files.imgix.net/3d542ae4-dff2-4ae1-9608-dedb66c64919.gif?auto=format',
    link: 'https://coleap.com',
    tags: ['Education', 'Artificial Intelligence', 'Tech', 'Online Learning'],
    category: 'AI',
    maker: '64cbabeef8b08fb5ba94912d',
  },
  {
    name: 'Startup Snippets',
    tagline: 'Accelerate your product by reusing commonly built code',
    description:
      'A platform that accelerates the development process by providing commonly used code snippets from across the entire stack. we enable founders to focus on their key value proposition and bring their ideas to life faster than ever before.',
    image: 'https://ph-files.imgix.net/d4f22300-bf9a-4437-9837-27308aff89d6.png?auto=format',
    link: 'https://www.snippets.melchortatlonghari.com',
    tags: ['Productivity', 'Tech', 'Startup Lessons'],
    category: 'Startup',
    maker: '64cbabeef8b08fb5ba94912d',
  },
  {
    name: 'DevRel CIty',
    tagline: 'Insider resources for building developer communities',
    description:
      'DevRel City has everything you need to begin building meaningful connections. Built by devrel experts with insider knowledge into developer communities, DevRel City keeps your team up to date with the constantly evolving community landscape.',
    image: 'https://ph-files.imgix.net/ea792ce8-b95e-490b-bb08-e1e638d5ab75.png?auto=format',
    link: 'https://www.devrel.city',
    tags: ['Productivity', 'Marketing', 'SaaS'],
    category: 'SaaS',
    maker: '64cbabeef8b08fb5ba94912d',
  },
  {
    name: 'WhatsHook',
    tagline: 'To send webhooks, emails & alerts directly to your WhatsApp',
    description:
      'With WhatsHook, you instantly get a unique, random URL that you can use to test and debug WebHooks, Emails and HTTP requests, directly in your WhatsApp.',
    image: 'https://ph-files.imgix.net/f506ab4c-9b9b-47df-b019-fe26a7d870d7.png?auto=format',
    link: 'https://whatshook.io',
    tags: ['Messaging', 'Development', 'Marketing automation'],
    category: 'Marketing automation platforms',
    maker: '64cbabeef8b08fb5ba94912d',
  },
  {
    name: 'CSS Selectors/Combinators Classifier',
    tagline: 'Organize and highlight CSS selectors and combinators by type',
    description:
      'From a typed code, the tool groups CSS selectors, combinators, and attributes by classification, enabling visual identification of each type.',
    image: 'https://ph-files.imgix.net/2bd7d831-78e9-4c94-8152-fab2b56d455b.png?auto=format',
    link: 'https://selectors.info',
    tags: ['Education', 'Developer Tools', 'Development'],
    category: 'Developer Tools',
    maker: '64cbabeef8b08fb5ba94912d',
  },
  {
    name: 'Blizzy',
    tagline: 'Your secure personal AI assistant',
    description:
      'Tired of using different AI tools for chat, document search and online browsing? Introducing Blizzy 2.0, the secure AI assistant. It offers real-time internet browsing, a customizable knowledge base, ready-made prompts, and prioritizes privacy and security.',
    image: 'https://ph-files.imgix.net/d9818519-54c6-4aca-8c7c-b2f3814c5606.png?auto=format',
    link: 'https://blizzy.app/',
    tags: ['Chrome Extensions', 'Productivity', 'Marketing', 'Artificial Intelligence'],
    category: 'AI',
    maker: '64cbabeef8b08fb5ba94912d',
  },
  {
    name: 'URLsLab',
    tagline: 'Automate your WordPress SEO',
    description:
      "Boost your SEO strategy with URLsLab's Keywords Manager. Manage internal links, track keyword usage, optimize content, and improve overall visitor engagement on yolink.",
    image: 'https://ph-files.imgix.net/b61ef3f3-2db3-4fd3-8304-992d7e920ec4.png?auto=format',
    link: 'https://www.urlslab.com/?ref=producthunt',
    tags: ['SEO', 'WordPress', 'Marketing automation'],
    category: 'Automation tools',
    maker: '64cbabeef8b08fb5ba94912d',
  },
];

module.exports = {
  products,
};
