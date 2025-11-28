import React from 'react';
import { ArrowLeft, FileText, CheckCircle2, AlertTriangle, HelpCircle, Calculator } from 'lucide-react';

interface PolicyInterpretationProps {
  onBack: () => void;
}

const PolicyInterpretation: React.FC<PolicyInterpretationProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-100 selection:text-brand-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-brand-600 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            <span>返回首页</span>
          </button>
          <span className="font-bold text-slate-900">TaxMaster 政策智库</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          
          {/* Title Section */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              2025年税务新规专题
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              关于互联网平台企业为从业人员<br/>办理扣缴申报的深度解读
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              基于国家税务总局 2025 年第 16 号公告，解析平台企业的合规义务与扣缴新模式。
            </p>
          </div>

          {/* 1. 适用对象 */}
          <section className="mb-16">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
              <span className="w-8 h-8 bg-brand-600 text-white rounded-lg flex items-center justify-center text-sm">01</span>
              新规适用对象：哪些平台受影响？
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600">
              <p className="mb-4">
                根据公告规定，本办法适用于<strong>中华人民共和国境内</strong>，为平台内从业人员提供网络经营场所、交易撮合、信息发布等服务的互联网平台企业。
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-brand-500"/> 网络货运与出行
                  </h3>
                  <p className="text-sm">网约车平台、网络货运平台、即时配送平台（外卖/快递）。</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                   <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-brand-500"/> 直播与内容电商
                  </h3>
                  <p className="text-sm">直播带货平台、短视频内容创作平台、知识付费平台。</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                   <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-brand-500"/> 家政与生活服务
                  </h3>
                  <p className="text-sm">上门家政、维修、美容美甲等O2O服务平台。</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                   <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-brand-500"/> 灵活用工众包
                  </h3>
                  <p className="text-sm">任务众包平台、兼职招聘与结算平台。</p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. 收入类型 */}
          <section className="mb-16">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
              <span className="w-8 h-8 bg-brand-600 text-white rounded-lg flex items-center justify-center text-sm">02</span>
              收入类型界定：劳务报酬 vs 经营所得
            </h2>
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 mb-6">
              <div className="flex gap-3">
                <AlertTriangle className="text-orange-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-orange-900 mb-1">重点关注：劳务报酬 (Labor Remuneration)</h4>
                  <p className="text-sm text-orange-800">
                    TaxMaster 2025 核心解决的是<strong>未办理市场主体登记</strong>的自然人从业人员，通过平台取得的劳务报酬所得。
                  </p>
                </div>
              </div>
            </div>
            <ul className="space-y-4 text-slate-600">
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2.5"></div>
                <span><strong>营销推广类：</strong>如带货佣金、坑位费、推广服务费。</span>
              </li>
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2.5"></div>
                <span><strong>技术服务类：</strong>如设计费、咨询费、程序开发费。</span>
              </li>
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2.5"></div>
                <span><strong>经纪代理类：</strong>如保险经纪费、房产中介费。</span>
              </li>
            </ul>
          </section>

          {/* 3. 核心算法变革 */}
          <section className="mb-16">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
              <span className="w-8 h-8 bg-brand-600 text-white rounded-lg flex items-center justify-center text-sm">03</span>
              16号文核心：累计预扣法详解
            </h2>
            <p className="text-slate-600 mb-6">
              新规废止了原有的“按次/按月”固定税率算法，全面引入类似工资薪金的“累计预扣法”。这是对灵活用工税务逻辑的根本性重塑。
            </p>
            
            <div className="bg-slate-900 text-white rounded-xl p-8 mb-8 overflow-x-auto">
              <h4 className="text-brand-400 font-mono text-sm uppercase tracking-wider mb-4">Calculation Formula</h4>
              <div className="font-mono text-lg space-y-4">
                <div>
                  <span className="text-slate-400">应纳税所得额 = </span>
                  <br/>
                  (累计收入 × 80%) - (连续纳税月份数 × 5000)
                </div>
                <div>
                  <span className="text-slate-400">本期应预扣税额 = </span>
                  <br/>
                  (应纳税所得额 × <span className="text-brand-400">预扣率</span> - 速算扣除数) - 累计已预扣税额
                </div>
              </div>
            </div>

            <div className="space-y-6">
               <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <HelpCircle size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">什么是“连续纳税月份”？</h4>
                    <p className="text-slate-600 mt-2 leading-relaxed">
                      这是新规最复杂的概念。指同一从业人员在同一平台，<strong>连续</strong>取得收入的月份。
                      <br/>
                      <span className="text-red-500 font-bold">• 判定规则：</span>如果某月未取得收入（中断），则“连续月份数”在次月重新从 1 开始计算，累计收入也清零重新计算。
                      <br/>
                      <span className="text-green-600 font-bold">• 平台义务：</span>平台必须准确记录并追踪每个人的连续状态，不能简单按自然年累计。
                    </p>
                  </div>
               </div>
            </div>
          </section>

          {/* 4. 税率表 */}
          <section>
             <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
              <span className="w-8 h-8 bg-brand-600 text-white rounded-lg flex items-center justify-center text-sm">04</span>
              2025年劳务报酬预扣率表
            </h2>
            <div className="overflow-hidden border border-slate-200 rounded-lg">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">级数</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">累计预扣预缴应纳税所得额</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">预扣率</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">速算扣除数</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200 text-sm">
                  {[
                    { l: 1, r: '不超过 36,000 元的部分', rate: '3%', d: 0 },
                    { l: 2, r: '超过 36,000 元 至 144,000 元的部分', rate: '10%', d: 2520 },
                    { l: 3, r: '超过 144,000 元 至 300,000 元的部分', rate: '20%', d: 16920 },
                    { l: 4, r: '超过 300,000 元 至 420,000 元的部分', rate: '25%', d: 31920 },
                    { l: 5, r: '超过 420,000 元 至 660,000 元的部分', rate: '30%', d: 52920 },
                    { l: 6, r: '超过 660,000 元 至 960,000 元的部分', rate: '35%', d: 85920 },
                    { l: 7, r: '超过 960,000 元的部分', rate: '45%', d: 181920 },
                  ].map((row) => (
                    <tr key={row.l} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900">{row.l}</td>
                      <td className="px-6 py-4 text-slate-600">{row.r}</td>
                      <td className="px-6 py-4 text-brand-600 font-bold">{row.rate}</td>
                      <td className="px-6 py-4 text-slate-600">{row.d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </article>
      </main>
    </div>
  );
};

export default PolicyInterpretation;
