import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { BackLink, BackToTop } from "@/components/case/back-link";
import { CaseNav, type CaseNavItem } from "@/components/case/case-nav";
import {
  Achievements,
  FlowCompare,
  IssueBars,
  ProcessTable,
  type PageShot,
} from "@/components/case/compare";
import { BigSequence, Chip, Container, Eyebrow, P, Q, Section, Stack, WideSection } from "@/components/case/primitives";
import { ReadTime } from "@/components/case/read-time";
import { ThemeToggle } from "@/components/case/theme-toggle";
import { Reveal } from "@/components/case/reveal";
import { GlowCard } from "@/components/ui/spotlight-card";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { AnnotatedPage, type PageView } from "@/components/case/annotated-page";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { CreativeNav } from "@/components/portfolio/creative-nav";
import { person, selectedWork } from "@/lib/content";
import { L as Tr } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `Leucadia Magazine Website Redesign — ${person.name}`,
  description:
    "Redesigning a local magazine website around clearer navigation and a dedicated way for businesses to submit their stories.",
};

const NAV: CaseNavItem[] = [
  { id: "process", index: "01", label: "Design Process" },
  { id: "research", index: "02", label: "Research" },
  { id: "discovery", index: "03", label: "Discovery" },
  { id: "prototyping", index: "04", label: "Prototyping" },
  { id: "color", index: "05", label: "Inspiration & Color" },
  { id: "final", index: "06", label: "Final Design" },
  { id: "achievement", index: "07", label: "Achievement" },
];

const SCOPE = ["User Research", "Information Architecture", "User Flow", "Visual Design", "Website Redesign"];

const L = "/images/leucadia";
const OLD = {
  home: { src: `${L}/old-home.webp`, alt: "Original Leucadia Magazine homepage" },
  technology: { src: `${L}/old-technology.webp`, alt: "Original Technology page with a single video embed" },
  photos: { src: `${L}/old-photos.webp`, alt: "Original Photos page" },
  contact: { src: `${L}/old-contact.webp`, alt: "Original generic Contact form" },
} satisfies Record<string, PageShot>;
const NEW = {
  home: { src: `${L}/new-home.webp`, alt: "Redesigned homepage" },
  archive: { src: `${L}/new-archive.webp`, alt: "Redesigned Editorial Archive page" },
  submit: { src: `${L}/new-submit.webp`, alt: "Submit Your Business form" },
  preview: { src: `${L}/new-preview.webp`, alt: "Submission Preview screen" },
  confirm: { src: `${L}/new-confirm.webp`, alt: "Submission confirmation screen" },
  contact: { src: `${L}/new-contact.webp`, alt: "Redesigned Contact page" },
} satisfies Record<string, PageShot>;

// Full-page screenshots with annotations. `at` = [start, end] of the section, as a fraction of the image height.
const VIEWS: Record<string, PageView[]> = {
  home: [
    {
      tab: "Before · Homepage",
      tone: "before",
      ...OLD.home,
      w: 1800,
      h: 4783,
      width: 860,
      notes: [
        { at: [0, 0.03], title: "Five tabs, no submissions", text: "Nowhere for a business to get featured.", zh: ["五个导航标签，没有投稿入口", "本地商家找不到申请被报道的地方。"] },
        { at: [0.03, 0.245], title: "Hero with mixed type", text: "Outlined, filled, and rotated type compete in one banner.", zh: ["字体混杂的首屏横幅", "空心字、实心字和旋转文字在同一个横幅里互相抢眼。"] },
        { at: [0.25, 0.305], title: "A dense intro block", text: "Distribution, audience, and a pitch in one paragraph.", zh: ["拥挤的介绍段落", "发行渠道、读者群和招商信息全挤在一段文字里。"] },
        { at: [0.31, 0.56], title: "A video without context", text: "No title or caption explains what the video is.", zh: ["缺少说明的视频", "没有标题或说明，读者不知道这段视频讲的是什么。"] },
        { at: [0.56, 0.61], title: "Repeating category bubbles", text: "The same categories appear twice, leading nowhere.", zh: ["重复出现的分类标签", "同样的分类出现了两次，点进去却哪儿也去不了。"] },
        { at: [0.61, 0.74], title: "Technology pitch", text: "A merchant ad pitch mixed into reader content.", zh: ["技术推广内容", "面向商户的广告推广混在读者内容里。"] },
        { at: [0.74, 0.815], title: "Sponsor block", text: "An unrelated sponsor mid-page.", zh: ["赞助商模块", "页面中间突然插入一个不相关的赞助商。"] },
        { at: [0.82, 0.97], title: "Eight collapsed FAQs", text: "Styled unlike anything else on the page.", zh: ["八个折叠的常见问题", "样式和页面上其他内容都不一致。"] },
      ],
    },
    {
      tab: "After · Homepage",
      tone: "after",
      ...NEW.home,
      w: 1800,
      h: 7292,
      width: 860,
      notes: [
        { at: [0, 0.035], title: "Four-part navigation", text: "The new architecture, on every page.", zh: ["四个板块的导航", "新的信息架构出现在每一个页面上。"] },
        { at: [0.035, 0.145], title: "Editorial hero", text: "One strong photo and the masthead set the tone.", zh: ["杂志感的首屏", "一张有力的照片配上刊头，奠定整体基调。"] },
        { at: [0.145, 0.18], title: "Mission statement", text: "“We believe every local business has a story worth telling.”", zh: ["使命宣言", "“我们相信，每一家本地商家都有值得讲述的故事。”"] },
        { at: [0.18, 0.345], title: "Our Editorial Mission", text: "What the magazine is and how it works.", zh: ["Our Editorial Mission", "介绍杂志是什么、如何运作。"] },
        { at: [0.345, 0.5], title: "Featured video", text: "The issue video, now with context.", zh: ["精选视频", "同一段视频，现在有了上下文说明。"] },
        { at: [0.52, 0.66], title: "Join Us Now", text: "Where the submission flow starts.", zh: ["Join Us Now", "投稿流程从这里开始。"] },
        { at: [0.67, 0.85], title: "Ask Us Anything", text: "Four FAQs on who can be featured.", zh: ["Ask Us Anything", "四个常见问题，说明哪些商家可以被报道。"] },
        { at: [0.86, 1], title: "Email sign-up and social", text: "A consistent black footer closes every page.", zh: ["邮件订阅与社交媒体", "统一的黑色页脚为每个页面收尾。"] },
      ],
    },
  ],
  archive: [
    {
      tab: "Before · Technology",
      tone: "before",
      ...OLD.technology,
      w: 1800,
      h: 1177,
      width: 860,
      notes: [
        { at: [0.03, 0.11], title: "Old navigation", text: "A top-level page that says little.", zh: ["旧导航", "一个一级页面，却几乎没说什么。"] },
        { at: [0.14, 0.2], title: "Just a title", text: "“Our Technology,” with no explanation after it.", zh: ["只有一个标题", "只写了“Our Technology”，后面没有任何解释。"] },
        { at: [0.21, 0.8], title: "A single video embed", text: "The page's only content, with no caption or context.", zh: ["唯一的一段嵌入视频", "这是页面上唯一的内容，没有标题也没有说明。"] },
      ],
    },
    {
      tab: "Before · Photos",
      tone: "before",
      ...OLD.photos,
      w: 1800,
      h: 2276,
      width: 860,
      notes: [
        { at: [0.01, 0.06], title: "Old navigation", text: "Photos is separate from the magazine itself.", zh: ["旧导航", "Photos 和杂志本身是分开的。"] },
        { at: [0.11, 0.37], title: "Spreads as a photo list", text: "Spreads shown one by one, cut off from their issue.", zh: ["把版面当成照片列表", "杂志版面被逐张罗列，和所属的期刊脱节。"] },
        { at: [0.37, 0.53], title: "Camera specs as captions", text: "Captions list cameras, not stories.", zh: ["图注写的是相机参数", "图注列的是相机型号，而不是故事。"] },
        { at: [0.56, 1], title: "No way into an issue", text: "Nothing links to reading the magazine.", zh: ["没有进入期刊的入口", "页面上没有任何链接能让人读到杂志本身。"] },
      ],
    },
    {
      tab: "After · Archive",
      tone: "after",
      ...NEW.archive,
      w: 1800,
      h: 5052,
      width: 860,
      notes: [
        { at: [0.035, 0.235], title: "Editorial Archive hero", text: "Past issues get one clear home.", zh: ["Editorial Archive 首屏", "过往期刊有了一个清晰的归属。"] },
        { at: [0.255, 0.31], title: "About the Magazine", text: "What Leucadia Magazine celebrates.", zh: ["About the Magazine", "介绍 Leucadia Magazine 关注的内容。"] },
        { at: [0.32, 0.49], title: "Video, in context", text: "The same video, now introduced.", zh: ["有上下文的视频", "同一段视频，现在有了介绍。"] },
        { at: [0.515, 0.555], title: "Our Publications", text: "Print · Digital · Community-Driven.", zh: ["Our Publications", "纸质版 · 数字版 · 社区共创。"] },
        { at: [0.56, 0.77], title: "Issue 01 and Issue 02", text: "Each cover links straight to “Open Digital Magazine.”", zh: ["Issue 01 和 Issue 02", "每期封面都直接链接到“Open Digital Magazine”。"] },
        { at: [0.8, 1], title: "Consistent footer", text: "The same sign-up block as every page.", zh: ["统一的页脚", "和其他页面一样的订阅模块。"] },
      ],
    },
  ],
  submission: [
    {
      tab: "Before · Contact form",
      tone: "before",
      ...OLD.contact,
      w: 1800,
      h: 1174,
      width: 860,
      notes: [
        { at: [0.08, 0.12], title: "Submission isn't a destination", text: "Businesses had to guess that Contact was the way in.", zh: ["投稿不是一个独立页面", "商家只能自己猜，联系页面才是投稿的入口。"] },
        { at: [0.25, 0.45], title: "A generic form", text: "Nothing for business details or images.", zh: ["通用表单", "没有填写商家信息或上传图片的地方。"] },
        { at: [0.46, 0.52], title: "Send, then nothing", text: "No review and no confirmation.", zh: ["发送之后毫无反馈", "既不能预览，也没有确认提示。"] },
      ],
    },
    {
      tab: "01 · Enter information",
      tone: "after",
      ...NEW.submit,
      phone: true,
      w: 1720,
      h: 5359,
      width: 860,
      notes: [
        { at: [0.035, 0.22], title: "Submit Your Business", text: "A dedicated page, linked from the nav and homepage.", zh: ["Submit Your Business", "独立的投稿页面，从导航栏和首页都能进入。"] },
        { at: [0.235, 0.275], title: "What happens to a submission", text: "Every entry is reviewed by the editorial team.", zh: ["投稿之后会怎样", "每一份投稿都会由编辑团队审核。"] },
        { at: [0.29, 0.52], title: "Business details", text: "Name, category, location, and links.", zh: ["商家信息", "名称、类别、地址和链接。"] },
        { at: [0.535, 0.62], title: "About Your Business", text: "The story in the business's own words, 500 words max.", zh: ["About Your Business", "用商家自己的话讲述故事，最多 500 字。"] },
        { at: [0.63, 0.76], title: "Upload images", text: "Drag and drop, with file types and a 10MB limit.", zh: ["上传图片", "支持拖拽上传，并注明文件格式和 10MB 的大小限制。"] },
        { at: [0.775, 0.8], title: "Preview & Submit", text: "Goes to review instead of sending blind.", zh: ["Preview & Submit", "先进入预览，而不是直接盲目提交。"] },
      ],
    },
    {
      tab: "02 · Review",
      tone: "after",
      ...NEW.preview,
      phone: true,
      w: 1720,
      h: 5068,
      width: 860,
      notes: [
        { at: [0.26, 0.6], title: "Submission Preview", text: "Everything entered, to check before sending.", zh: ["投稿预览", "发送前可以检查填写的所有内容。"] },
        { at: [0.6, 0.73], title: "Uploaded media", text: "A gallery of the uploaded images.", zh: ["已上传的图片", "以图集形式展示已上传的图片。"] },
        { at: [0.74, 0.78], title: "Edit or submit", text: "Go back to edit, or submit when it's right.", zh: ["修改或提交", "可以返回修改，确认无误后再提交。"] },
      ],
    },
    {
      tab: "03 · Confirm",
      tone: "after",
      ...NEW.confirm,
      phone: true,
      w: 1720,
      h: 3134,
      width: 860,
      notes: [
        { at: [0.42, 0.56], title: "Confirmation", text: "“Your business has been submitted!” plus next steps.", zh: ["确认页面", "“Your business has been submitted!”，并告知后续步骤。"] },
        { at: [0.58, 0.63], title: "Finished", text: "A clear end to the flow.", zh: ["流程完成", "为整个流程画上清晰的句号。"] },
      ],
    },
  ],
  contact: [
    {
      tab: "Before · Contact",
      tone: "before",
      ...OLD.contact,
      w: 1800,
      h: 1174,
      width: 860,
      notes: [
        { at: [0.14, 0.22], title: "Default page title", text: "No imagery or introduction.", zh: ["默认的页面标题", "没有图片，也没有任何介绍。"] },
        { at: [0.26, 0.5], title: "Unstyled form", text: "Default fields, off-brand blue button.", zh: ["没有设计过的表单", "默认样式的输入框，配一个和品牌不符的蓝色按钮。"] },
        { at: [0.55, 0.95], title: "Empty space", text: "Half the page is left blank.", zh: ["大片空白", "半个页面都是空的。"] },
      ],
    },
    {
      tab: "After · Contact",
      tone: "after",
      ...NEW.contact,
      w: 1428,
      h: 2582,
      width: 860,
      notes: [
        { at: [0.06, 0.36], title: "Full-bleed photography", text: "The site's editorial look.", zh: ["满版摄影图", "延续网站的杂志感。"] },
        { at: [0.37, 0.4], title: "Explanatory copy", text: "“If you have any question, feel free to contact us!”", zh: ["说明文字", "“If you have any question, feel free to contact us!”"] },
        { at: [0.4, 0.63], title: "A clean form", text: "Name, email, phone, and comments, on-brand.", zh: ["简洁的表单", "姓名、邮箱、电话和留言，样式与品牌一致。"] },
        { at: [0.65, 0.69], title: "Branded Submit", text: "A black button matching every other action.", zh: ["品牌化的提交按钮", "黑色按钮，和网站上其他操作按钮保持一致。"] },
      ],
    },
  ],
};

const MORE = selectedWork.filter((w) => w.label !== "Posse.io");
const isExternal = (href: string) => /^https?:\/\//.test(href);

function Meta({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">{label}</span>
      <div className="font-gilroy text-[17px] leading-[1.6] text-neutral-300 md:text-[19px]">{children}</div>
    </div>
  );
}

function InfoRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-white/10 py-9">
      <Reveal className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(220px,0.78fr)_1.22fr] md:gap-16">
        <h3 className="font-gilroy text-[13px] uppercase tracking-[0.25em] text-neutral-500">{label}</h3>
        <div className="flex flex-col gap-5">{children}</div>
      </Reveal>
    </div>
  );
}

/** A heading + short text beside it, then a full-width visual. */
function Flow({ label, title, text, children }: { label: string; title: ReactNode; text: ReactNode; children: ReactNode }) {
  return (
    <div className="border-t border-white/[0.08] pt-12 md:pt-16">
      <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(220px,0.78fr)_1.22fr] md:gap-16">
        <div>
          <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">{label}</span>
          <h3 className="font-blinker mt-3 max-w-[22ch] text-[clamp(22px,2.2vw,32px)] font-medium leading-[1.15] tracking-[-0.01em] text-white">
            {title}
          </h3>
        </div>
        <div className="flex flex-col gap-5">{text}</div>
      </Reveal>
      <Reveal className="mt-10 md:mt-14">{children}</Reveal>
    </div>
  );
}

/** A framed statement with the cursor-following spotlight border (components/ui/spotlight-card). */
function GlowBox({ label, color = "blue", children }: { label: string; color?: "blue" | "green"; children: ReactNode }) {
  return (
    <GlowCard customSize glowColor={color} className="!block w-full !p-6 md:!p-8">
      <span
        className="font-gilroy relative z-10 text-[12px] uppercase tracking-[0.25em]"
        style={{ color: color === "green" ? "#22c55e" : "var(--accent-green)" }}
      >
        {label}
      </span>
      <p className="font-sulphur relative z-10 mt-3 text-[clamp(19px,1.8vw,25px)] leading-[1.35] tracking-[-0.01em] text-white">
        {children}
      </p>
    </GlowCard>
  );
}

export default function LeucadiaCaseStudy() {
  return (
    <div id="top" className="relative scroll-smooth bg-black">
      <CreativeNav play hrefBase="/" />
      <CaseNav items={NAV} endId="case-more" />
      <ReadTime targetId="case-body" />
      <ThemeToggle />

      {/* HERO — fixed full-screen visual the sheet scrolls over */}
      <div className="fixed inset-0 z-0 h-[100svh] w-full overflow-hidden bg-black">
        <Image
          src={`${L}/cover.jpg`}
          alt="The redesigned Leucadia Magazine homepage on a laptop"
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div
        className="case-sheet relative z-10 mt-[90svh] rounded-t-[26px] bg-[#0b0b0b] text-white shadow-[0_-24px_70px_rgba(0,0,0,0.45)] md:rounded-t-sheet"
        style={{ "--accent": "#161616", "--accent-green": "#3b82f6" } as React.CSSProperties}
      >
        <div id="case-body">
          {/* Title */}
          <section className="pt-14 md:pt-20">
            <Container>
              <div className="mb-10">
                <BackLink
                  href="/#work"
                  className="font-gilroy inline-flex items-center gap-2 text-[15px] text-neutral-500 transition-colors hover:text-white"
                >
                  <span>←</span>Back to work
                </BackLink>
              </div>
              <Reveal>
                <p className="font-gilroy text-[13px] uppercase tracking-[0.3em] text-neutral-500">Leucadia Magazine · Website Redesign</p>
                <h1 className="font-blinker mt-4 max-w-[22ch] text-[clamp(36px,6vw,88px)] font-medium leading-[0.98] tracking-[-0.01em] text-white">
                  From a cluttered site to a real digital magazine
                </h1>
                <p className="font-sulphur mt-6 max-w-[48ch] text-[clamp(18px,2.2vw,28px)] leading-[1.3] text-neutral-500">
                  <Tr
                    en="A redesign for readers browsing local stories, and for the businesses that want to be in them."
                    zh="一次网站改版，服务于浏览本地故事的读者，也服务于希望登上杂志的本地商家。"
                  />
                </p>
              </Reveal>
            </Container>
          </section>

          {/* Intro + metadata */}
          <section className="pb-16 pt-12 md:pt-16">
            <Container>
              <Reveal>
                <div className="font-gilroy max-w-[68ch] text-[clamp(20px,2.4vw,28px)] leading-[1.5] tracking-[-0.01em] text-neutral-100">
                  <p>
                    <Tr
                      en="Leucadia Magazine shares local stories, culture, and businesses from a coastal community. As the sole
                    UI/UX designer, I redesigned the site end to end: a clearer structure for readers, and a dedicated path
                    for local businesses to get featured."
                      zh="Leucadia Magazine 记录着一个海滨社区的本地故事、文化和商家。作为项目唯一的 UI/UX 设计师，我负责了网站从头到尾的改版：为读者梳理出更清晰的结构，也为想被报道的本地商家设计了一条专属的投稿路径。"
                    />
                  </p>
                </div>
              </Reveal>
              <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/10 pt-10 md:grid-cols-4">
                <Meta label="Client">Leucadia Magazine</Meta>
                <Meta label="Role">UI/UX Design Lead</Meta>
                <Meta label="Timeline">May 2026 – June 2026</Meta>
                <Meta label="Platform">Website</Meta>
              </div>
            </Container>
          </section>

          <section className="py-8">
            <Container>
              <InfoRow label="My Role">
                <P>
                  <Tr
                    en="Sole UI/UX designer, from research and information architecture to visual design and usability testing."
                    zh="项目唯一的 UI/UX 设计师，负责从用户研究、信息架构到视觉设计和可用性测试的全过程。"
                  />
                </P>
                <div className="flex flex-wrap gap-2">
                  {SCOPE.map((r) => (
                    <Chip key={r} variant="role">
                      {r}
                    </Chip>
                  ))}
                </div>
              </InfoRow>
              <InfoRow label="The Problem">
                <GlowBox label="The problem">
                  <Tr
                    en="Readers found the site hard to browse, and local businesses had no way to submit content beyond a generic
                  contact form, so the magazine struggled to grow its contributors."
                    zh="读者觉得网站很难浏览；本地商家除了一个通用的联系表单之外，没有任何投稿渠道，杂志也就很难扩大投稿来源。"
                  />
                </GlowBox>
              </InfoRow>
              <InfoRow label="The Solution">
                <P>
                  <Tr
                    en={<>A clear <Q>four-part architecture</Q> built on the user journey, and a black-and-white editorial design system.</>}
                    zh={<>基于用户旅程搭建的清晰<Q>四板块信息架构</Q>，配合一套黑白配色的杂志风格设计系统。</>}
                  />
                </P>
              </InfoRow>
            </Container>
          </section>

          {/* Solution at a glance */}
          <section className="pb-section md:pb-section-lg">
            <Container>
              <Stack>
                <div>
                  <Eyebrow>Architecture</Eyebrow>
                  <BigSequence steps={["Home", "Archive", "Submit", "Contact"]} />
                </div>
                <div>
                  <Eyebrow>User journey</Eyebrow>
                  <p className="font-sulphur text-[clamp(20px,2.2vw,30px)] leading-[1.3] text-neutral-300">
                    Awareness → Interest → Submission → Contact
                  </p>
                </div>
              </Stack>
            </Container>
          </section>

          {/* 01 — DESIGN PROCESS */}
          <WideSection id="process" index="01" label="Design Process" title={<Tr en="Two months, from interviews to tested pages." zh="两个月，从用户访谈到经过测试的页面。" />}>
            <Reveal>
              <ProcessTable
                rows={[
                  { phase: "Discovery & Research", focus: "Understand pain points", methods: "Interviews, site audit", deliverables: "Interview synthesis, problem framing", zh: ["理解用户痛点", "用户访谈、网站现状审查", "访谈结论整理、问题定义"] },
                  { phase: "Information Architecture", focus: "Define structure", methods: "Hand-sketched user flows", deliverables: "4-section IA, user flow diagram", zh: ["确定网站结构", "手绘用户流程", "四板块信息架构、用户流程图"] },
                  { phase: "Wireframing", focus: "Structure content per page", methods: "Low-fidelity wireframes", deliverables: "Wireframes for all four pages", zh: ["规划每个页面的内容结构", "低保真线框图", "四个页面的线框图"] },
                  { phase: "Visual Design", focus: "Establish brand system", methods: "High-fidelity mockups", deliverables: "Editorial visual system, full pages", zh: ["建立品牌视觉体系", "高保真设计稿", "杂志风格视觉系统、完整页面"] },
                  { phase: "Usability Testing", focus: "Validate the redesign", methods: "Task-based testing", deliverables: "Test findings, final refinements", zh: ["验证改版效果", "基于任务的可用性测试", "测试发现、最终优化"] },
                ]}
              />
            </Reveal>
          </WideSection>

          {/* 02 — RESEARCH */}
          <Section id="research" index="02" label="Research" title={<Tr en="Listening to the team and the businesses it wants to feature." zh="倾听杂志团队，也倾听他们希望报道的商家。" />}>
            <P>
              <Tr
                en="I interviewed the Leucadia team and local business owners, the people expected to submit content."
                zh="我访谈了 Leucadia 杂志团队，以及本应成为投稿者的本地商家店主。"
              />
            </P>
            <div>
              <Eyebrow>Existing-site audit</Eyebrow>
              <P>
                <Tr en="I audited the four existing pages, annotated in Final Design." zh="我逐一审查了原网站的四个页面，具体标注见 Final Design 部分。" />
              </P>
            </div>
            <div>
              <Eyebrow>What came up most</Eyebrow>
              <P>
                <Tr
                  en="The same few issues came up again and again. Each bar is its share of all the issues mentioned in the interviews:"
                  zh="同样几个问题被反复提及。每一条代表该问题在访谈中所有被提到的问题里所占的比例："
                />
              </P>
              <div className="mt-6">
                <IssueBars
                  items={[
                    { label: "Disorganized / cluttered information", zh: "信息杂乱、缺乏条理", value: 32 },
                    { label: "Confusing site structure", zh: "网站结构令人困惑", value: 24 },
                    { label: "No clear submission entry point", zh: "没有明确的投稿入口", value: 24 },
                    { label: "Outdated visual style", zh: "视觉风格过时", value: 20 },
                  ]}
                />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <Eyebrow className="mb-0">What I heard</Eyebrow>
              <StaggerTestimonials
                items={[
                  { quote: <Tr en="“I don't know where to start browsing when I open the website.”" zh="“打开网站的时候，我不知道该从哪里开始看。”" />, by: "Interview participant" },
                  { quote: <Tr en="“Everything is crammed together, there's no clear focus.”" zh="“所有东西都挤在一起，没有重点。”" />, by: "Interview participant" },
                  { quote: <Tr en="“If this is supposed to be a magazine, I want it to actually look like one.”" zh="“既然是一本杂志，我希望它看起来真的像一本杂志。”" />, by: "Interview participant" },
                  { quote: <Tr en="“I have no idea where local businesses are supposed to submit their content.”" zh="“我完全不知道本地商家应该在哪里投稿。”" />, by: "Interview participant" },
                ]}
              />
            </div>
            <GlowBox label="Key Insight">
              <Tr
                en={<>Readers found the site cluttered, and one participant had <Q>no idea where local businesses are supposed to submit</Q>. A new look alone
              wouldn&apos;t fix either problem, so I started with the structure.</>}
                zh={<>读者觉得网站杂乱，还有一位受访者<Q>完全不知道本地商家应该在哪里投稿</Q>。单靠换个新外观解决不了这两个问题，所以我先从结构入手。</>}
              />
            </GlowBox>
          </Section>

          {/* 03 — DISCOVERY */}
          <WideSection id="discovery" index="03" label="Discovery" title={<Tr en="Mapping the path a business would take, and where it ended." zh="梳理商家的投稿路径，以及它在哪里断掉。" />}>
            <Reveal>
              <FlowCompare
                before={{
                  title: <Tr en="No dedicated submission path" zh="没有专门的投稿路径" />,
                  steps: [
                    { page: "Homepage", label: "Five tabs, none for submissions", zh: "五个导航标签，没有一个用于投稿" },
                    { page: "Contact", label: "A generic form: name, email, phone, comment", zh: "一个通用表单：姓名、邮箱、电话、留言" },
                  ],
                  deadEnd: <Tr en="Nothing showed that submissions were possible" zh="页面上看不出可以投稿" />,
                }}
                after={{
                  title: <Tr en="Submit is its own entry point" zh="Submit 成为独立的入口" />,
                  steps: [
                    { page: "Homepage", label: "“Join Us Now” section and Submit in the nav", zh: "首页的“Join Us Now”板块，以及导航栏中的 Submit" },
                    { page: "Submit", label: "Enter business information and images", zh: "填写商家信息并上传图片" },
                    { page: "Preview", label: "Review everything before sending", zh: "提交前检查所有内容" },
                    { page: "Confirmation", label: "“Your business has been submitted!”", zh: "“Your business has been submitted!”" },
                  ],
                }}
              />
            </Reveal>
            <GlowBox label="Opportunity" color="green">
              <Tr
                en={<>Making <Q>Submit</Q> a top-level nav item gives businesses a visible way in, which the old site never had.</>}
                zh={<>把 <Q>Submit</Q> 设为一级导航，商家就有了一个看得见的入口，这是旧网站从来没有的。</>}
              />
            </GlowBox>
          </WideSection>

          {/* 04 — PROTOTYPING */}
          <Section id="prototyping" index="04" label="Prototyping" title={<Tr en="Sketching the structure before the style." zh="先画结构，再定风格。" />}>
            <P>
              <Tr
                en="Hand-drawn wireframes mapped the four sections and the Submission flow before any high-fidelity work."
                zh="在开始高保真设计之前，我先用手绘线框图梳理了四个板块和投稿流程。"
              />
            </P>
            <GlowBox label="Why sketch first">
              <Tr en="It let me walk the team through the flow before investing in polish." zh="这样我可以在投入精细设计之前，先带团队把流程走一遍。" />
            </GlowBox>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/leucadia/sketch.jpg"
                alt="Hand-drawn user flow and wireframes for the Homepage, Publications, Submission, and Contact pages"
                width={920}
                height={1086}
                loading="lazy"
                className="mx-auto block h-auto w-full max-w-[640px] rounded-[14px]"
              />
              <figcaption className="font-gilroy mt-4 text-[15px] leading-[1.6] text-neutral-400">
                <Tr
                  en="The user flow (top) and wireframes for the Homepage, Publications, Submission, and Contact pages."
                  zh="上方是用户流程，下方是 Homepage、Publications、Submission 和 Contact 四个页面的线框图。"
                />
              </figcaption>
            </figure>
          </Section>

          {/* 05 — FINAL DESIGN */}
          {/* 05 — INSPIRATION & COLOR */}
          <Section id="color" index="05" label="Inspiration & Color" title={<Tr en="Black and white, and a photo behind the menu." zh="黑与白，以及菜单背后的一张照片。" />}>
            <P>
              <Tr
                en={<>Looking at the local magazine sites that felt most polished, I kept seeing the same choice: a strict, minimal
              palette of black and white. That restraint lets the photography carry the color and gives the publication a
              premium, editorial feel, so I made <Q>black and white</Q> the core of the visual system.</>}
                zh={<>在研究那些看起来最精致的本地杂志网站时，我反复看到同一个选择：严格、极简的黑白配色。这种克制让色彩交给摄影作品来呈现，也让整本刊物显得更有质感、更有杂志味，所以我把<Q>黑与白</Q>定为视觉系统的核心。</>}
              />
            </P>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/leucadia/palette.webp"
                alt="The color palette: white #FFFFFF and black #000000, side by side"
                width={1200}
                height={1036}
                loading="lazy"
                className="mx-auto block h-auto w-full max-w-[560px] rounded-[14px] border border-white/10"
              />
              <figcaption className="font-gilroy mt-4 text-[15px] leading-[1.6] text-neutral-400">
                <Tr en="The palette: white #FFFFFF and black #000000." zh="配色：白色 #FFFFFF 与黑色 #000000。" />
              </figcaption>
            </figure>
            <GlowBox label="A small detail: the menu">
              <Tr
                en={<>The menu opens over the magazine&apos;s own coastline photo. It feels more polished than a typical local
              site, and shows businesses the photography they&apos;d be featured in.</>}
                zh="菜单展开时，背景是杂志自己拍摄的海岸线照片。这比一般的本地网站更显精致，也让商家提前看到自己将以怎样的摄影风格出现在杂志上。"
              />
            </GlowBox>
          </Section>

          <WideSection id="final" index="06" label="Final Design" title={<Tr en="Two flows: discovering the magazine, and getting featured in it." zh="两条流程：发现这本杂志，以及登上这本杂志。" />}>
            <Flow
              label="Flow 1: Content discovery"
              title={<Tr en="A homepage with a clear editorial mission." zh="一个清楚传达杂志使命的首页。" />}
              text={
                <P>
                  <Tr
                    en={<>Modular sections replace one dense block. The page explains what the magazine is first, then points
                  businesses to <Q>Join Us Now</Q>.</>}
                    zh={<>模块化的板块取代了原来挤成一团的内容。页面先说明这本杂志是什么，再引导商家前往 <Q>Join Us Now</Q>。</>}
                  />
                </P>
              }
            >
              <AnnotatedPage views={VIEWS.home} />
            </Flow>
            <Flow
              label="Flow 1: Content discovery"
              title={<Tr en="An archive readers can actually browse." zh="一个读者真正能浏览的期刊档案。" />}
              text={
                <P>
                  <Tr
                    en={<>Both published issues open directly from <Q>Our Publications</Q>, replacing a page that held one video.</>}
                    zh={<>已出版的两期杂志都可以从 <Q>Our Publications</Q> 直接打开，取代了原来只放着一段视频的页面。</>}
                  />
                </P>
              }
            >
              <AnnotatedPage views={VIEWS.archive} />
            </Flow>
            <Flow
              label="Flow 2: Business submission"
              title={<Tr en="A guided, three-step path to get featured." zh="三步引导，帮商家登上杂志。" />}
              text={
                <>
                  <P>
                    <Tr en="Before, the only way in was the generic contact form." zh="改版前，唯一的入口就是那个通用的联系表单。" />
                  </P>
                  <ol className="flex flex-col gap-4">
                    {[
                      ["Enter information", "Business details, an “About” story, and images.", "填写信息", "商家信息、一段“About”介绍，以及图片。"],
                      ["Review", "A preview of everything, editable.", "预览", "预览所有填写的内容，可随时修改。"],
                      ["Confirm", "A confirmation screen that closes the loop.", "确认", "用一个确认页面为流程收尾。"],
                    ].map(([t, b, tz, bz], i) => (
                      <li key={t} className="grid grid-cols-[36px_1fr] gap-3 border-t border-white/10 pt-4">
                        <span className="font-blinker text-[14px] font-medium tabular-nums" style={{ color: "var(--accent-green)" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>
                          <span className="font-blinker block text-[18px] font-medium text-white"><Tr en={t} zh={tz} /></span>
                          <span className="font-gilroy mt-1.5 block text-[15px] leading-[1.6] text-neutral-400"><Tr en={b} zh={bz} /></span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </>
              }
            >
              <AnnotatedPage views={VIEWS.submission} />
            </Flow>
            <Flow
              label="Contact"
              title={<Tr en="Even the utility page belongs to the brand." zh="即便是功能性页面，也属于品牌的一部分。" />}
              text={
                <P>
                  <Tr
                    en="Photography, clear copy, and a branded button turn a bare form into part of the site."
                    zh="摄影图、清楚的文案和品牌化的按钮，让一个空荡荡的表单真正融入了整个网站。"
                  />
                </P>
              }
            >
              <AnnotatedPage views={VIEWS.contact} />
            </Flow>
          </WideSection>

          {/* 06 — ACHIEVEMENT */}
          <WideSection id="achievement" index="07" label="Achievement" title={<Tr en="What the redesign delivered." zh="这次改版带来了什么。" />}>
            <Reveal>
              <Achievements
                items={[
                  {
                    stat: "Tested",
                    label: "Task-based usability testing",
                    body: "Participants gave positive feedback, describing tasks as quicker and the structure as clearer.",
                    zh: ["基于任务的可用性测试", "参与者给出了正面反馈，认为完成任务更快、网站结构更清晰。"],
                  },
                  {
                    stat: "3-step",
                    label: "Guided submission flow",
                    body: "A clear path to get featured, replacing one vague form.",
                    zh: ["三步引导式投稿流程", "一条清晰的投稿路径，取代了原来那个含糊的表单。"],
                  },
                  {
                    stat: "4",
                    label: "Section architecture",
                    body: "Four focused sections in place of five loosely related tabs.",
                    zh: ["四板块网站架构", "四个重点明确的板块，取代了原来五个关联松散的标签。"],
                  },
                ]}
              />
            </Reveal>
          </WideSection>

          {/* REFLECTION */}
          <section className="border-t border-white/[0.08] py-24 md:py-36">
            <Container>
              <Reveal className="flex flex-col items-center text-center">
                <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">Reflection</span>
                <p className="font-sulphur mt-8 max-w-[34ch] text-[clamp(26px,3.4vw,48px)] leading-[1.2] tracking-[-0.01em] text-white">
                  <Tr
                    en="The magazine needs contributors as much as readers, and the structure has to serve both."
                    zh="杂志既需要读者，也同样需要投稿者，网站结构必须同时服务好这两类人。"
                  />
                </p>
                <p className="font-gilroy mt-8 max-w-[56ch] text-[17px] leading-[1.7] text-neutral-400 md:text-[19px]">
                  <Tr
                    en={<>The new visuals are what people notice first, but the change I care most about is{" "}
                  <Q>a submission path that didn&apos;t exist before</Q>. Next, I&apos;d want to see how many businesses
                  actually use it.</>}
                    zh={<>大家最先注意到的是新的视觉，但我最在意的改变，是<Q>一条原本并不存在的投稿路径</Q>。接下来，我想看看到底有多少商家真的会用它。</>}
                  />
                </p>
              </Reveal>
            </Container>
          </section>
        </div>

        <div className="border-t border-white/[0.08] px-gutter py-16 md:px-gutter-lg md:py-20">
          <BackToTop />
        </div>

        {/* More work */}
        <section id="case-more" className="border-t border-white/[0.08] bg-[#0e0e0e] py-24 md:py-32">
          <Container>
            <Reveal>
              <h2 className="font-blinker text-center text-[clamp(32px,5vw,64px)] font-medium leading-[1.05] tracking-[-0.02em] text-white">
                Curious to see more?
              </h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-10">
              {MORE.map((w, i) => (
                <Reveal key={w.label} delay={i * 0.08}>
                  <a
                    href={w.href}
                    {...(isExternal(w.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    data-cursor="view"
                    className="group block"
                  >
                    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[18px] border border-white/10 bg-neutral-800">
                      <Image
                        src={w.image}
                        alt={w.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 620px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        style={{ objectPosition: w.imagePosition }}
                      />
                    </div>
                    <p className="font-gilroy mt-4 text-[14px] uppercase tracking-[0.2em] text-neutral-400">{w.label}</p>
                    <h3 className="font-blinker mt-1 text-[clamp(22px,2.6vw,32px)] font-medium leading-tight text-white transition-colors group-hover:text-neutral-400">
                      {w.title}
                    </h3>
                  </a>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      </div>

      <div className="relative z-10">
        <CreativeCTA hrefBase="/" />
      </div>
    </div>
  );
}
