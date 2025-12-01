import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, BarChart3, Building2, Calculator, Layers, FileCheck, FileText } from 'lucide-react';
import ApplicationModal from './ApplicationModal';

interface LandingPageProps {
  onLogin: () => void;
  onNavigateToPolicy: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onNavigateToPolicy }) => {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <ApplicationModal 
        isOpen={isApplicationModalOpen} 
        onClose={() => setIsApplicationModalOpen(false)} 
      />
      
      {/* Navbar - Glassmorphism Light */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Calculator size={20} strokeWidth={3} />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
              TaxMaster <span className="text-blue-600">2025</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">核心能力</a>
            <a href="#scenarios" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">适用场景</a>
            <a href="#compliance" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">政策解读</a>
            <button 
              onClick={onLogin}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all transform hover:-translate-y-0.5 shadow-lg"
            >
              企业登录
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Aurora Tech Gradient */}
      <div className="relative pt-36 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        
        {/* Fluid Background Grids & Aurora Effects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Dynamic Glowing Spheres */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-purple-400/20 to-blue-400/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        <div className="absolute bottom-[-10%] left-[30%] w-[800px] h-[600px] bg-gradient-to-t from-blue-100/40 via-white to-transparent rounded-full blur-[80px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Badge - High Visibility Optimization */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-100 text-blue-600 text-sm font-bold mb-10 animate-fadeIn shadow-sm hover:shadow-md transition-all cursor-default">
            <FileText size={16} className="text-blue-500" />
            <span className="tracking-wide">已全量适配 2025年国税总局 15号/16号公告</span>
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse ml-1"></span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
              灵工个税，
            </span>
            <br className="md:hidden"/>
            {/* Gradient Brand Blue */}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 animate-gradient-x">
              连续劳务报酬智算专家
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            专为 <strong>国税总局 2025年第 16 号公告</strong> 打造的连续劳务报酬智算引擎
            <br className="hidden md:block"/>
            独创“跨月连续段”智能识别算法，精准落地 <strong>累计预扣法</strong> 与 <strong>3%-45% 七级累进税率</strong>
            <br className="hidden md:block"/>
            摒弃传统 20% 固定税率的粗放模式，构建新业态用工税务合规护城河
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-24">
            <button 
              onClick={() => setIsApplicationModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-200 hover:shadow-blue-300 transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              申请使用 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
            </button>
            <button 
              onClick={onNavigateToPolicy}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <FileCheck size={20} className="text-slate-400" /> 阅读政策解读
            </button>
          </div>

          {/* Abstract UI Preview - Light Skeuomorphic Window */}
          <div className="relative max-w-5xl mx-auto transform perspective-1000 group">
             <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 rounded-2xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
             <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden transform rotate-x-6 hover:rotate-x-0 transition-transform duration-700 ease-out p-1 ring-1 ring-slate-100">
                <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
                   {/* Fake Browser Header */}
                   <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                      <div className="flex gap-1.5">
                         <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                         <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                         <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                      </div>
                      <div className="ml-4 px-3 py-1 bg-slate-100 rounded text-xs text-slate-400 font-mono w-64 flex items-center gap-2">
                         <ShieldCheck size={10} className="text-green-500"/>
                         taxmaster.com/calc/policy-16
                      </div>
                   </div>
                   {/* Fake Content */}
                   <div className="p-8 bg-white">
                      <div className="flex justify-between items-end mb-8">
                         <div>
                            <div className="h-2.5 w-32 bg-slate-100 rounded mb-3"></div>
                            <div className="h-8 w-64 bg-slate-200 rounded"></div>
                         </div>
                         <div className="flex gap-3">
                            <div className="h-9 w-32 bg-blue-50 border border-blue-100 rounded flex items-center justify-center text-blue-600 text-xs font-bold tracking-wider">合规检测通过</div>
                         </div>
                      </div>
                      {/* Fake Table */}
                      <div className="w-full border border-slate-100 rounded-lg overflow-hidden bg-white">
                         <div className="bg-slate-50 px-6 py-4 grid grid-cols-5 gap-6 border-b border-slate-100">
                            {['姓名', '连续段标识', '累计收入 (新规)', '累计个税', '实发金额'].map(h => (
                               <div key={h} className="h-3 bg-slate-200 rounded w-full"></div>
                            ))}
                         </div>
                         {[1, 2, 3].map((i) => (
                            <div key={i} className="px-6 py-5 grid grid-cols-5 gap-6 border-b border-slate-50 items-center">
                               <div className="h-4 w-16 bg-slate-100 rounded"></div>
                               <div className="flex items-center gap-2">
                                  <div className="h-6 w-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">{i}</div>
                                  <div className={`h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-200 ${i===1?'w-8': i===2?'w-16':'w-24'}`}></div>
                               </div>
                               <div className="h-4 w-24 bg-slate-100 rounded"></div>
                               <div className="h-5 w-20 bg-green-50 text-green-600 text-[10px] font-bold flex items-center justify-center rounded border border-green-100 uppercase tracking-wide">Auto Deduct</div>
                               <div className="h-4 w-20 bg-slate-100 rounded"></div>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Trust / Stats Strip */}
      <div className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
           <div className="group hover:-translate-y-1 transition-transform duration-300">
              <p className="text-5xl font-extrabold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">100%</p>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">新规合规率</p>
           </div>
           <div className="group hover:-translate-y-1 transition-transform duration-300">
              <p className="text-5xl font-extrabold text-brand-600 mb-2">0</p>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">计算差错风险</p>
           </div>
           <div className="group hover:-translate-y-1 transition-transform duration-300">
              <p className="text-5xl font-extrabold text-slate-900 mb-2">500+</p>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">服务财务团队</p>
           </div>
           <div className="group hover:-translate-y-1 transition-transform duration-300">
              <p className="text-5xl font-extrabold text-emerald-500 mb-2">10倍</p>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">核算效率提升</p>
           </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-3 block">Core Features</span>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6">重新定义灵工个税核算</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">只需导入 Excel，系统依据 2025 年 16 号文件标准，自动完成清洗、识别、计算与报表生成</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Layers size={100} />
              </div>
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                <Layers size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">智能连续段识别</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                算法自动判定同人跨月连续性。同月多笔自动合并，断月自动重置。严格遵循政策文件中的“连续阶段”定义，无需人工筛选。
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <ShieldCheck size={100} />
              </div>
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-sm">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">自动抵减防重扣</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                系统实时追踪每个“连续段”内的已扣税额。计算本期税款时自动执行 `(累计应纳 - 已纳)` 逻辑，彻底根除重复预扣风险。
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <FileCheck size={100} />
              </div>
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-8 group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-sm">
                <FileCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">双口径核算对账</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                支持“逐笔明细”与“连续段汇总”双视角切换。一键导出符合税务局要求的月度申报明细表，申报工作一步到位。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Defined Scope */}
      <div className="py-24 bg-white border-b border-gray-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-3 block">Target Audience</span>
               <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">政策适用对象与范围</h2>
               <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  精准对标 15 号公告与 16 号公告界定的互联网平台企业类型与从业人员收入类别
               </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
               {/* Platform Types */}
               <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                        <Building2 size={20} />
                     </div>
                     适用平台类型
                  </h3>
                  <div className="space-y-4">
                     {[
                        { t: "网络经营场所平台", d: "提供网络经营场所供经营者从事经营活动" },
                        { t: "交易撮合平台", d: "为交易双方提供供需对接、信息撮合服务" },
                        { t: "信息发布平台", d: "提供信息发布服务，如内容创作、直播等" }
                     ].map((item, i) => (
                        <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                           <div className="w-1.5 rounded-full bg-blue-500 self-stretch"></div>
                           <div>
                              <h4 className="font-bold text-slate-900">{item.t}</h4>
                              <p className="text-sm text-slate-500 mt-1">{item.d}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Income Types */}
               <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <BarChart3 size={20} />
                     </div>
                     重点适用收入类型
                  </h3>
                  <div className="space-y-4">
                     <div className="p-4 bg-white rounded-xl border border-emerald-100 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                           <h4 className="font-bold text-emerald-900">劳务报酬 (Labor Remuneration)</h4>
                           <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded">Core Focus</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">
                           指从业人员通过平台提供劳务取得的收入，且未办理个体工商户登记。
                        </p>
                        <div className="flex flex-wrap gap-2">
                           {['营销推广', '技术服务', '经纪代理', '咨询服务'].map(tag => (
                              <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded border border-slate-200">{tag}</span>
                           ))}
                        </div>
                     </div>
                     
                     <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm opacity-60">
                         <div className="flex justify-between items-start mb-2">
                           <h4 className="font-bold text-slate-700">经营所得 (Business Income)</h4>
                        </div>
                        <p className="text-sm text-slate-500">
                           指已办理个体工商户登记的从业人员取得的收入。（注：本系统主要针对更复杂的劳务报酬预扣逻辑）
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Scenarios - Problem vs Solution */}
      <div id="scenarios" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Left: Text Content */}
            <div>
              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded text-xs font-bold mb-6 tracking-widest">SCENARIOS</div>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">解决高频次、跨周期的<br/>复杂结算痛点</h2>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                适用于 MCN、培训、直播电商等灵工密集型行业，完美应对“同月多笔”、“跨月连续”等复杂场景。
              </p>
              
              <div className="space-y-6">
                 {[
                    { title: "MCN / 品牌投放", desc: "博主、KOL 跨月连续合作，结算周期不固定" },
                    { title: "教育培训机构", desc: "兼职讲师课时费按周结算，需按月累计申报" },
                    { title: "直播电商", desc: "主播按场次日结佣金，税务需按月/按次合并" },
                    { title: "影视内容制作", desc: "摄影后期人员按项目阶段分批次付款" }
                 ].map((item, i) => (
                    <div key={i} className="flex gap-5 group">
                       <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-500 group-hover:text-white flex items-center justify-center text-slate-400 transition-colors">
                          <CheckCircle2 size={16} />
                       </div>
                       <div>
                          <h4 className="font-bold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">{item.title}</h4>
                          <p className="text-sm text-slate-500">{item.desc}</p>
                       </div>
                    </div>
                 ))}
              </div>
            </div>

            {/* Right: Visual Logic Map */}
            <div className="relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-50 rounded-3xl transform rotate-3"></div>
               <div className="relative bg-white border border-gray-200 rounded-2xl shadow-2xl p-10">
                  <div className="mb-8 flex justify-between items-center border-b border-gray-100 pb-4">
                     <span className="font-bold text-gray-900 text-lg">模式对比</span>
                     <div className="flex gap-2">
                        <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                        <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                     </div>
                  </div>
                  
                  {/* Before */}
                  <div className="mb-10 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
                     <div className="flex items-center gap-2 mb-3 text-red-500 font-bold text-sm uppercase tracking-wide">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span> 传统 Excel 模式
                     </div>
                     <div className="space-y-3 pl-4 border-l-2 border-red-200">
                        <div className="bg-red-50 p-4 rounded-lg text-sm text-gray-700 flex gap-3">
                           <span className="font-mono text-red-400 font-bold">01</span>
                           手动筛选数千条记录判断连续性，极易漏看
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg text-sm text-gray-700 flex gap-3">
                           <span className="font-mono text-red-400 font-bold">02</span>
                           <span className="">忘记减去上月已扣税额 <ArrowRight size={14} className="inline mx-1"/> <span className="text-red-600 font-bold underline decoration-red-300">重复扣税风险</span></span>
                        </div>
                     </div>
                  </div>

                  {/* After */}
                  <div>
                     <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold text-sm uppercase tracking-wide">
                        <span className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></span> TaxMaster 智算模式
                     </div>
                     <div className="space-y-4 pl-4 border-l-2 border-blue-300">
                        <div className="bg-blue-50 p-4 rounded-lg text-sm text-gray-800 shadow-sm border border-blue-100 flex justify-between items-center group cursor-default hover:bg-blue-100 transition-colors">
                           <div>
                              <span className="block font-mono text-[10px] text-blue-500 mb-1 uppercase tracking-wider">Auto Identify</span>
                              <span className="font-bold">自动判定连续段 ID</span>
                           </div>
                           <div className="bg-white px-2 py-1 rounded text-xs font-mono text-blue-600 border border-blue-200">Batch-A12</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg text-sm text-gray-800 shadow-sm border border-blue-100 flex justify-between items-center group cursor-default hover:bg-blue-100 transition-colors">
                           <div>
                              <span className="block font-mono text-[10px] text-blue-500 mb-1 uppercase tracking-wider">Auto Deduct</span>
                              <span className="font-bold">Tax = (累计收入 × 税率) - </span> <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold text-xs ml-1">已扣税额</span>
                           </div>
                           <ShieldCheck size={18} className="text-green-600"/>
                        </div>
                     </div>
                  </div>

               </div>
            </div>

          </div>
        </div>
      </div>

      {/* Policy Interpretation Section */}
      <div id="compliance" className="py-32 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-3 block">Policy Insights</span>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6">2025年税务新规深度解读</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              全面解析国家税务总局 <strong>2025年第15号、16号公告</strong>，精准把握政策风向，确保平台合规运营。
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Policy 15 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-slate-900 px-8 py-6 flex items-center justify-between">
                 <div>
                    <div className="text-cyan-400 font-bold text-xs tracking-wider uppercase mb-1">Notice No.15</div>
                    <h3 className="text-xl font-bold text-white">关于报送涉税信息的公告</h3>
                 </div>
                 <FileText className="text-cyan-400" size={32} />
              </div>
              <div className="p-8">
                 <ul className="space-y-4">
                    <li className="flex gap-4">
                       <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
                       <div>
                          <h4 className="font-bold text-slate-900">涉税信息全量报送</h4>
                          <p className="text-sm text-slate-600 mt-1">互联网平台企业必须报送平台内经营者及从业人员的身份信息、收入信息，实现数据透明化。</p>
                       </div>
                    </li>
                    <li className="flex gap-4">
                       <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">2</div>
                       <div>
                          <h4 className="font-bold text-slate-900">明确报送窗口期</h4>
                          <p className="text-sm text-slate-600 mt-1">规定 <strong>2025年10月1日至31日</strong> 为首次报送期，未按期报送将面临税务风险。</p>
                       </div>
                    </li>
                 </ul>
              </div>
            </div>

            {/* Policy 16 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-blue-600 px-8 py-6 flex items-center justify-between">
                 <div>
                    <div className="text-white/80 font-bold text-xs tracking-wider uppercase mb-1">Notice No.16</div>
                    <h3 className="text-xl font-bold text-white">关于办理扣缴申报的公告</h3>
                 </div>
                 <Calculator className="text-white" size={32} />
              </div>
              <div className="p-8">
                 <ul className="space-y-4">
                    <li className="flex gap-4">
                       <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
                       <div>
                          <h4 className="font-bold text-slate-900">计税方式重大变革</h4>
                          <p className="text-sm text-slate-600 mt-1">针对互联网平台从业人员新增 <strong>3%-45% 七级超额累进税率</strong>，传统劳务报酬仍沿用 20%-40% 三级税率。</p>
                       </div>
                    </li>
                    <li className="flex gap-4">
                       <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">2</div>
                       <div>
                          <h4 className="font-bold text-slate-900">引入“累计预扣法”</h4>
                          <p className="text-sm text-slate-600 mt-1">
                             允许减除 <strong>5000元/月</strong> 费用。计算公式：<br/>
                             <code className="bg-slate-100 px-2 py-1 rounded text-xs text-brand-700 mt-1 block w-fit">应纳税额 = (累计收入×80% - 连续月数×5000) × 税率 - 速算扣除数</code>
                          </p>
                       </div>
                    </li>
                 </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-blue-50 border border-blue-100 rounded-xl p-8 text-center max-w-3xl mx-auto">
             <h4 className="text-blue-900 font-bold text-lg mb-2">我们的专家解读</h4>
             <p className="text-blue-800 text-sm leading-relaxed">
                新规的核心在于<strong>“连续性”</strong>的认定。对于平台而言，最大的挑战不再是单笔计算，而是如何跨月追踪同一人员的累计收入，并准确判定其中断点。TaxMaster 2025 正是基于这一核心痛点研发，内置了符合 16 号文要求的智能连续段识别引擎，助您轻松应对新政挑战。
             </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-blue-600 relative overflow-hidden">
         {/* Background Glow */}
         <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-blue-700"></div>
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/10 rounded-full blur-[100px]"></div>
         
         <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">准备好提升财务效率了吗？</h2>
            <p className="text-blue-100 text-xl mb-12 font-light">
              无需部署，打开浏览器即可使用。
              <br/>即刻体验符合 2025 新规的智能个税引擎。
            </p>
            <button 
              onClick={() => setIsApplicationModalOpen(true)}
              className="px-12 py-5 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl shadow-blue-900/20 hover:scale-105"
            >
              申请使用
            </button>
            <p className="mt-8 text-sm text-blue-200/80">
               支持 .xlsx / .xls 格式导入 • 数据本地加密处理
            </p>
         </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-50 text-slate-500 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-slate-900 rounded flex items-center justify-center text-white text-xs font-bold">TM</div>
            <span className="text-slate-900 font-bold text-lg">TaxMaster 2025</span>
          </div>
          <div className="text-sm text-slate-400">
             © 2025 TaxMaster SaaS Platform. All rights reserved.
          </div>
          <div className="text-sm flex gap-8">
             <a href="#" className="hover:text-blue-600 transition-colors">隐私政策</a>
             <a href="#" className="hover:text-blue-600 transition-colors">服务条款</a>
             <a href="#" className="hover:text-blue-600 transition-colors">帮助中心</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;