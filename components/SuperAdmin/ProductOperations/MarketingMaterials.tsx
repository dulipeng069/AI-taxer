import React, { useState } from 'react';
import { Download, Share2, CheckCircle, XCircle, Zap, Shield, BarChart, Users, DollarSign, Layers } from 'lucide-react';
import html2canvas from 'html2canvas';

// Types for our data structure
interface ImageContent {
  title: string;
  subtitle?: string;
  highlight?: string;
  points?: string[];
  footer: string;
  theme: string; // Tailwind gradient classes
  icon: React.ElementType;
}

interface MarketingImage {
  id: string;
  label: string; // For UI display (e.g., "封面图", "痛点图", "解决方案")
  content: ImageContent;
}

interface MarketingSet {
  id: string;
  title: string;
  description: string;
  images: MarketingImage[];
}

const MarketingMaterials: React.FC = () => {
  const [activeSetId, setActiveSetId] = useState<string>('set1');
  const [downloading, setDownloading] = useState<string | null>(null);

  // Data Definitions
  const marketingSets: MarketingSet[] = [
    {
      id: 'set1',
      title: '核心痛点与解决',
      description: '针对传统个税计算繁琐、易出错的痛点，展示 TaxMaster 的一键算税功能。',
      images: [
        {
          id: 's1-i1',
          label: '封面图：吸睛标题',
          content: {
            title: '还在用Excel算个税？\n你真的OUT了！',
            subtitle: 'HR月底不再加班的秘密武器',
            highlight: '一键算税 · 自动申报',
            footer: 'TaxMaster 2025 灵工个税智算平台',
            theme: 'from-rose-500 to-orange-500',
            icon: XCircle
          }
        },
        {
          id: 's1-i2',
          label: '痛点图：传统困境',
          content: {
            title: '传统算税的三大噩梦',
            subtitle: '你是否也深陷其中？',
            points: [
              '公式复杂：Excel函数嵌套几十层，改错一个全盘重来',
              '政策善变：税率调整、专项附加扣除，跟不上政策变化',
              '风险高悬：算错一分钱，企业面临巨额罚款风险'
            ],
            footer: '拒绝低效，拥抱智能',
            theme: 'from-slate-700 to-slate-900',
            icon: Zap
          }
        },
        {
          id: 's1-i3',
          label: '方案图：产品优势',
          content: {
            title: 'TaxMaster 智能算税',
            subtitle: '企业级连带责任税SaaS系统',
            points: [
              '✅ 内置最新税法引擎，自动匹配税率',
              '✅ 支持万级员工数据一键导入，秒级计算',
              '✅ 自动生成申报表，合规无忧'
            ],
            highlight: '效率提升 500%',
            footer: '立即免费试用',
            theme: 'from-blue-600 to-cyan-500',
            icon: CheckCircle
          }
        }
      ]
    },
    {
      id: 'set2',
      title: '合规与风控',
      description: '强调税务合规的重要性，展示系统的自动更新和精准计算能力。',
      images: [
        {
          id: 's2-i1',
          label: '封面图：风险警示',
          content: {
            title: '税务稽查越来越严\n你的企业合规吗？',
            subtitle: '别让不合规成为企业的定时炸弹',
            highlight: '精准合规 · 规避风险',
            footer: 'TaxMaster 2025 风控专家',
            theme: 'from-red-600 to-red-800',
            icon: Shield
          }
        },
        {
          id: 's2-i2',
          label: '痛点图：合规难点',
          content: {
            title: '人工算税的隐形地雷',
            subtitle: '稍不注意就“踩雷”',
            points: [
              '税率档位搞混，导致扣缴不足或多扣',
              '专项附加扣除信息更新不及时',
              '连带责任不清，企业由于员工申报问题受牵连'
            ],
            footer: '合规是企业的生命线',
            theme: 'from-gray-700 to-gray-900',
            icon: XCircle
          }
        },
        {
          id: 's2-i3',
          label: '方案图：风控引擎',
          content: {
            title: 'AI 级风控引擎',
            subtitle: '为企业构建税务防火墙',
            points: [
              '🛡️ 实时同步国家最新税法政策',
              '🛡️ 智能校验身份证与申报信息',
              '🛡️ 自动计算连带责任税额，清晰透明'
            ],
            highlight: '0 差错 · 0 风险',
            footer: '安全合规首选 TaxMaster',
            theme: 'from-emerald-600 to-green-500',
            icon: CheckCircle
          }
        }
      ]
    },
    {
      id: 'set3',
      title: '效率与批量处理',
      description: '展示系统处理大批量数据的能力，适合灵活用工平台和大型企业。',
      images: [
        {
          id: 's3-i1',
          label: '封面图：效率提升',
          content: {
            title: '3天的工作量\n3分钟搞定？',
            subtitle: 'HR 和财务都惊呆了！',
            highlight: '批量导入 · 极速计算',
            footer: 'TaxMaster 2025 效率神器',
            theme: 'from-violet-600 to-purple-500',
            icon: Zap
          }
        },
        {
          id: 's3-i2',
          label: '痛点图：海量数据',
          content: {
            title: '灵活用工的痛',
            subtitle: '人多、单杂、结算难',
            points: [
              '数千名灵工人员，每月变动频繁',
              '每个人收入不一，税率档位各异',
              'Excel 打开都卡顿，更别说计算了'
            ],
            footer: '别让工具限制了你的效率',
            theme: 'from-slate-700 to-slate-800',
            icon: Layers
          }
        },
        {
          id: 's3-i3',
          label: '方案图：批量神器',
          content: {
            title: '万级数据秒级处理',
            subtitle: '专为高并发场景设计',
            points: [
              '⚡️ 支持 Excel 批量导入，自动解析',
              '⚡️ 智能纠错，自动标记异常数据',
              '⚡️ 一键生成所有人的完税证明与工资条'
            ],
            highlight: '吞吐量 100,000+ 笔/分钟',
            footer: '让算税像喝水一样简单',
            theme: 'from-indigo-600 to-blue-500',
            icon: BarChart
          }
        }
      ]
    },
    {
      id: 'set4',
      title: 'SaaS 成本优势',
      description: '对比传统软件的高昂成本，突出 SaaS 模式的性价比。',
      images: [
        {
          id: 's4-i1',
          label: '封面图：省钱攻略',
          content: {
            title: '好用的税务系统\n都要几十万？',
            subtitle: '中小企业也能用得起的专业系统',
            highlight: '超高性价比 · 按需付费',
            footer: 'TaxMaster 2025 降本增效',
            theme: 'from-amber-500 to-yellow-500',
            icon: DollarSign
          }
        },
        {
          id: 's4-i2',
          label: '痛点图：传统软件',
          content: {
            title: '传统软件“买不起”',
            subtitle: '隐形成本吓死人',
            points: [
              '部署费、服务器费、维护费...层层加码',
              '系统更新还要另外收“升级费”',
              '操作复杂，还得花钱请人培训'
            ],
            footer: '拒绝被“割韭菜”',
            theme: 'from-gray-600 to-gray-800',
            icon: XCircle
          }
        },
        {
          id: 's4-i3',
          label: '方案图：SaaS 优势',
          content: {
            title: 'SaaS 模式，开箱即用',
            subtitle: '省钱、省心、省力',
            points: [
              '💰 0 部署成本，注册账号即可使用',
              '💰 云端自动更新，永远使用最新版',
              '💰 灵活订阅，用多少付多少',
            ],
            highlight: '成本降低 80%',
            footer: '现在注册，免费试用',
            theme: 'from-teal-500 to-emerald-400',
            icon: CheckCircle
          }
        }
      ]
    },
    {
      id: 'set5',
      title: '多租户管理体验',
      description: '面向代理记账公司和集团企业，展示多租户管理功能。',
      images: [
        {
          id: 's5-i1',
          label: '封面图：代账神器',
          content: {
            title: '代理记账公司\n看过来！',
            subtitle: '如何轻松管理 100+ 家客户？',
            highlight: '一站式管理 · 数据隔离',
            footer: 'TaxMaster 2025 超管后台',
            theme: 'from-pink-600 to-rose-500',
            icon: Users
          }
        },
        {
          id: 's5-i2',
          label: '痛点图：管理混乱',
          content: {
            title: '多客户管理的烦恼',
            subtitle: '切号切到手抽筋',
            points: [
              '不同客户数据混在一起，容易搞错',
              '每次登录都要重新验证，浪费时间',
              '无法统一查看所有客户的申报状态'
            ],
            footer: '管理不善，客户流失',
            theme: 'from-slate-700 to-slate-900',
            icon: Layers
          }
        },
        {
          id: 's5-i3',
          label: '方案图：多租户架构',
          content: {
            title: '超管后台，全局掌控',
            subtitle: '为服务商量身定制',
            points: [
              '🌐 一个账号，管理无限个企业租户',
              '🌐 严格的数据隔离，安全无忧',
              '🌐 全局仪表盘，一眼看清所有任务',
            ],
            highlight: '管理效率 x 10倍',
            footer: '赋能服务商，创造更多价值',
            theme: 'from-cyan-600 to-blue-600',
            icon: CheckCircle
          }
        }
      ]
    }
  ];

  const handleDownload = async (imageId: string, imageName: string) => {
    const element = document.getElementById(`preview-${imageId}`);
    if (!element) return;
    
    setDownloading(imageId);
    try {
      // Wait a bit for fonts/styles to settle (optional but good practice)
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(element, {
        scale: 2, // Retina display quality
        useCORS: true,
        backgroundColor: null, // Transparent background if needed, but our div has bg
      });
      
      const link = document.createElement('a');
      link.download = `TaxMaster-宣传物料-${imageName}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
      alert('下载失败，请重试');
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 min-h-[600px]">
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-800">宣传物料生成器</h2>
        <p className="text-slate-500 text-sm mt-1">
          专为小红书/朋友圈营销设计，支持一键生成高清图片。
        </p>
      </div>

      <div className="flex flex-col md:flex-row h-full">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 bg-slate-50 border-r border-slate-100 p-4">
          <div className="space-y-2">
            {marketingSets.map((set) => (
              <button
                key={set.id}
                onClick={() => setActiveSetId(set.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${activeSetId === set.id 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
              >
                {set.title}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-slate-50/50">
          {marketingSets.map((set) => {
            if (set.id !== activeSetId) return null;
            
            return (
              <div key={set.id} className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{set.title}</h3>
                  <p className="text-slate-500 mt-1">{set.description}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {set.images.map((image) => (
                    <div key={image.id} className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">{image.label}</span>
                        <button
                          onClick={() => handleDownload(image.id, `${set.title}-${image.label}`)}
                          disabled={downloading === image.id}
                          className="flex items-center gap-1.5 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                          {downloading === image.id ? (
                            <span>生成中...</span>
                          ) : (
                            <>
                              <Download size={14} />
                              <span>下载图片</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* The Image Preview Container */}
                      {/* This div mimics a mobile phone screen ratio (3:4 or 9:16) */}
                      <div 
                        id={`preview-${image.id}`}
                        className={`
                          relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-xl flex flex-col
                          bg-gradient-to-br ${image.content.theme}
                          text-white p-6
                        `}
                        style={{ minHeight: '400px' }} // Ensure enough height
                      >
                        {/* Background decorative elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
                        
                        {/* Top Icon */}
                        <div className="relative z-10 mb-6">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                            <image.content.icon size={28} className="text-white" />
                          </div>
                        </div>

                        {/* Main Content */}
                        <div className="relative z-10 flex-1 flex flex-col justify-center">
                          <h2 className="text-3xl font-bold leading-tight mb-4 drop-shadow-md whitespace-pre-line">
                            {image.content.title}
                          </h2>
                          
                          {image.content.subtitle && (
                            <div className="bg-white/20 backdrop-blur-md self-start px-3 py-1 rounded-lg text-sm font-medium mb-6 border border-white/20">
                              {image.content.subtitle}
                            </div>
                          )}

                          {image.content.points && (
                            <div className="space-y-3 bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                              {image.content.points.map((point, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-sm leading-relaxed text-white/90">
                                  <span className="mt-1 w-1.5 h-1.5 bg-yellow-400 rounded-full flex-shrink-0"></span>
                                  <span>{point}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {image.content.highlight && (
                            <div className="mt-6 text-center">
                               <div className="inline-block bg-yellow-400 text-black font-bold px-6 py-2 rounded-full shadow-lg transform scale-105">
                                 {image.content.highlight}
                               </div>
                            </div>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="relative z-10 mt-auto pt-8 flex items-center justify-between border-t border-white/20">
                          <div className="flex items-center gap-2">
                             <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center text-[10px] font-bold text-slate-900">TM</div>
                             <span className="text-xs font-medium tracking-wider opacity-80">{image.content.footer}</span>
                          </div>
                          <div className="text-[10px] opacity-60">
                             TaxMaster App
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MarketingMaterials;
