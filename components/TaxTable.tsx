
import React, { useRef } from 'react';
import { Upload, Trash2, RefreshCw, FileDown, FileSpreadsheet, Wallet, PieChart, Users, ListFilter, Download } from 'lucide-react';
import { RawInput, CalculatedTaxRecord } from '../types';
import * as XLSX from 'xlsx';

interface TaxTableProps {
  inputs: RawInput[];
  setInputs: (inputs: RawInput[]) => void;
  calculatedData: CalculatedTaxRecord[];
  readOnly?: boolean;
}

const TaxTable: React.FC<TaxTableProps> = ({ inputs, setInputs, calculatedData, readOnly = false }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Directly use calculatedData for display and stats
  const displayData = calculatedData;


  // Calculate Stats
  const totalPayout = displayData.reduce((acc, curr) => acc + Number(curr.income), 0);
  const totalTax = displayData.reduce((acc, curr) => acc + curr.currentTax, 0);
  const totalPeople = new Set(displayData.map(d => d.idNumber)).size;

  const handleDeleteRecord = (id: string) => {
    setInputs(inputs.filter(i => i.id !== id));
  };

  const handleReset = () => {
    if (inputs.length === 0) return;
    if(window.confirm('确定要清空工作台所有数据吗？\n注意：这不会删除已保存的“历史记录”，但会清空当前计算视图。')) {
      setInputs([]);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  // Helper to clean amount strings (e.g. "1,200.00" -> 1200.00)
  const cleanAmount = (val: any): number => {
    if (typeof val === 'number') return val;
    if (!val) return 0;
    if (typeof val === 'string') {
      // Remove commas, spaces, currency symbols
      const cleanStr = val.replace(/[¥￥,$\s]/g, '');
      const parsed = parseFloat(cleanStr);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Generate Batch ID: YYYYMMDD-HHmmss
    const now = new Date();
    const batchId = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const arrayBuffer = evt.target?.result;
        const workbook = XLSX.read(arrayBuffer, { type: 'array' }); // Removed cellDates: true to handle raw serials manually
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const newRecords: RawInput[] = [];
        let skippedCount = 0;

        jsonData.forEach((row: any) => {
          const name = row['姓名'] || row['Name'] || row['name'];
          const idNumber = row['身份证号'] || row['身份证'] || row['证件号'] || row['ID'] || row['id'];
          const incomeRaw = row['收入金额'] || row['收入'] || row['金额'] || row['Income'] || row['income'];
          let dateVal = row['支付日期'] || row['日期'] || row['Date'] || row['date'];

          // Basic validation: Name and ID are mandatory
          if (!name || !idNumber) {
            skippedCount++;
            return;
          }

          // Parse Amount safely
          const cleanIncome = cleanAmount(incomeRaw);
          
          // Skip lines where income is technically missing or 0
          if (incomeRaw === undefined || incomeRaw === null) {
             skippedCount++;
             return;
          }

          let dateStr = '';
          
          // Robust Date Parsing
          if (typeof dateVal === 'number') {
            // Excel Serial Date -> Use XLSX.SSF to avoid Timezone issues completely
            const dateInfo = XLSX.SSF.parse_date_code(dateVal);
            if (dateInfo) {
              const { y, m, d } = dateInfo;
              dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            } else {
               // Fallback if SSF fails
               dateStr = new Date().toISOString().split('T')[0];
            }
          } else if (typeof dateVal === 'string') {
            // String: "2025-01-01", "2025/1/1", "2025.01.01"
            let s = dateVal.trim();
            // Normalize separators to -
            s = s.replace(/[\.\/]/g, '-');
            
            // Try extracting YYYY-MM-DD pattern
            const match = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
            if (match) {
               dateStr = `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
            } else {
               // Fallback Date Parse (Local Time)
               const d = new Date(s);
               if (!isNaN(d.getTime())) {
                 const year = d.getFullYear();
                 const month = String(d.getMonth() + 1).padStart(2, '0');
                 const day = String(d.getDate()).padStart(2, '0');
                 dateStr = `${year}-${month}-${day}`;
               } else {
                 dateStr = new Date().toISOString().split('T')[0];
               }
            }
          } else if (dateVal instanceof Date) {
             // Should not happen with cellDates: false, but just in case
             const year = dateVal.getFullYear();
             const month = String(dateVal.getMonth() + 1).padStart(2, '0');
             const day = String(dateVal.getDate()).padStart(2, '0');
             dateStr = `${year}-${month}-${day}`;
          } else {
             dateStr = new Date().toISOString().split('T')[0];
          }

          newRecords.push({
            id: Math.random().toString(36).substr(2, 9),
            companyId: '', // Will be set by service
            date: dateStr,
            name: String(name).trim(),
            idNumber: String(idNumber).trim(),
            income: cleanIncome,
            batchId: batchId // Assign Batch ID
          });
        });

        if (newRecords.length > 0) {
          setInputs([...inputs, ...newRecords]);
          alert(`成功导入批次 [${batchId}]，共 ${newRecords.length} 条数据！${skippedCount > 0 ? `(跳过 ${skippedCount} 条无效数据)` : ''}`);
        } else {
          alert('未识别到有效数据。请确保Excel包含：姓名、身份证号、收入金额、支付日期');
        }

      } catch (error) {
        console.error("Import Error:", error);
        alert('文件解析失败，请检查文件格式。支持 .xlsx 或 .xls 格式');
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDownloadTemplate = () => {
    const headers = [['支付日期', '姓名', '身份证号', '收入金额']];
    const example = [['2025-01-15', '张三', '110101199001011234', 5000]];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([...headers, ...example]);
    ws['!cols'] = [{ wch: 15 }, { wch: 10 }, { wch: 20 }, { wch: 12 }];
    XLSX.utils.book_append_sheet(wb, ws, "导入模板");
    XLSX.writeFile(wb, "个税导入模板.xlsx");
  };

  const handleExportData = () => {
    if (displayData.length === 0) {
      alert('暂无数据可导出');
      return;
    }

    const exportData = displayData.map(row => ({
      '批次号': row.batchId,
      '支付日期': row.date,
      '姓名': row.name,
      '身份证号': row.idNumber,
      '收入金额': row.income,
      '支付月份': row.paymentMonth,
      '连续月份': row.continuousMonthsCount,
      '连续阶段累计': row.segmentCumulativeIncome,
      '累计应纳税额': row.segmentCumulativeTaxableIncome,
      '预扣率': `${(row.taxRate * 100).toFixed(0)}%`,
      '已扣税额': row.segmentPriorTaxPaid,
      '本期个税': row.currentTax,
      '税后收入': row.afterTaxIncome
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);
    
    // Set column widths
    ws['!cols'] = [
      { wch: 18 }, // 批次号
      { wch: 12 }, // 支付日期
      { wch: 10 }, // 姓名
      { wch: 20 }, // 身份证号
      { wch: 12 }, // 收入金额
      { wch: 10 }, // 支付月份
      { wch: 10 }, // 连续月份
      { wch: 15 }, // 连续阶段累计
      { wch: 15 }, // 累计应纳税额
      { wch: 8 },  // 预扣率
      { wch: 12 }, // 已扣税额
      { wch: 12 }, // 本期个税
      { wch: 12 }  // 税后收入
    ];

    XLSX.utils.book_append_sheet(wb, ws, "计算结果");
    
    const now = new Date();
    const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    XLSX.writeFile(wb, `个税智算结果_${timestamp}.xlsx`);
  };

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-140px)]">
       <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".xlsx, .xls"
        className="hidden" 
      />

      {/* Header Info */}
      <div className="flex-none">
        <h2 className="text-2xl font-bold text-gray-900">个税智算中心</h2>
        <p className="text-gray-500 text-sm mt-1">数据批量导入与实时计算</p>
      </div>

       {/* Unified Dashboard Card */}
       <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
          
          {/* Top Section: Control Panel & Stats - Single Row Layout */}
          <div className="p-4 lg:p-6 border-b border-gray-100 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-6">
              
              {/* Stats Strip */}
              <div className="flex flex-wrap items-center gap-4 lg:gap-8 text-sm">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-brand-50 text-brand-600 rounded-lg">
                      <Wallet size={20} />
                   </div>
                   <div>
                      <p className="text-gray-500">发放总额</p>
                      <p className="text-xl font-bold text-gray-900">¥{totalPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                   </div>
                </div>
                
                <div className="hidden lg:block w-px h-8 bg-gray-200"></div>

                <div className="flex items-center gap-3">
                   <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                      <PieChart size={20} />
                   </div>
                   <div>
                      <p className="text-gray-500">个税汇总</p>
                      <p className="text-xl font-bold text-emerald-600">¥{totalTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                   </div>
                </div>

                <div className="hidden lg:block w-px h-8 bg-gray-200"></div>

                <div className="flex items-center gap-4 lg:gap-8">
                  <div className="flex items-center gap-2">
                     <Users size={16} className="text-gray-400" />
                     <div>
                        <span className="text-gray-500">涉及人员 </span>
                        <span className="font-bold text-gray-900">{totalPeople}</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <ListFilter size={16} className="text-gray-400" />
                     <div>
                        <span className="text-gray-500">笔数 </span>
                        <span className="font-bold text-gray-900">{displayData.length}</span>
                     </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Now on same row/wrap */}
              <div className="flex items-center gap-3 ml-auto lg:ml-0">
                  {!readOnly && (
                    <button 
                      onClick={handleReset} 
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-red-50 hover:text-red-600 border border-gray-200 hover:border-red-200 rounded-lg transition-all"
                    >
                      <RefreshCw size={14}/> 清空
                    </button>
                  )}
                  
                  {!readOnly && (
                    <button 
                      onClick={handleDownloadTemplate} 
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all"
                    >
                      <FileDown size={14}/> 模版
                    </button>
                  )}

                  <button 
                    onClick={handleExportData} 
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all"
                  >
                    <Download size={14}/> 导出结果
                  </button>
                  
                  {!readOnly && (
                    <button 
                      onClick={handleImportClick} 
                      className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-100 px-4 py-2 rounded-lg text-sm font-bold transition-all"
                    >
                      <Upload size={14}/> 导入 Excel
                    </button>
                  )}
              </div>

            </div>
          </div>

          {/* Table Section */}
          <div className="flex-1 overflow-auto custom-scrollbar relative">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-gray-50 text-gray-600 font-semibold sticky top-0 z-10 shadow-sm">
                <tr>
                  {!readOnly && <th className="px-4 py-3 border-b bg-gray-50">操作</th>}
                  <th className="px-4 py-3 border-b bg-gray-50 text-gray-400">批次号</th>
                  <th className="px-4 py-3 border-b bg-gray-50">支付日期</th>
                  <th className="px-4 py-3 border-b bg-gray-50">姓名</th>
                  <th className="px-4 py-3 border-b bg-gray-50">身份证号</th>
                  <th className="px-4 py-3 border-b bg-gray-50 text-right">收入金额</th>
                  <th className="px-4 py-3 border-b bg-blue-50/80 text-brand-900">支付月份</th>
                  <th className="px-4 py-3 border-b bg-blue-50/80 text-brand-900 text-center">连续月份</th>
                  <th className="px-4 py-3 border-b bg-blue-50/80 text-brand-900 text-right">连续阶段累计</th>
                  <th className="px-4 py-3 border-b bg-blue-50/80 text-brand-900 text-right">累计应纳税额</th>
                  <th className="px-4 py-3 border-b bg-gray-50 text-center">预扣率</th>
                  <th className="px-4 py-3 border-b bg-gray-50 text-right text-gray-500">已扣税额</th>
                  <th className="px-4 py-3 border-b bg-emerald-50 text-emerald-900 text-right font-bold">本期个税</th>
                  <th className="px-4 py-3 border-b bg-gray-50 text-right font-bold text-gray-900">税后收入</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {displayData.map((row) => (
                  <tr key={row.id} className={`hover:bg-gray-50 ${row.isNewSegment ? 'bg-slate-50/50 border-t border-slate-200' : ''}`}>
                     {!readOnly && (
                       <td className="px-4 py-2">
                        <button onClick={() => handleDeleteRecord(row.id)} className="text-gray-300 hover:text-red-500 p-1 rounded hover:bg-red-50"><Trash2 size={14} /></button>
                       </td>
                     )}
                     <td className="px-4 py-2 text-xs text-gray-400 font-mono">{row.batchId}</td>
                     <td className="px-4 py-2">{row.date}</td>
                     <td className="px-4 py-2 font-medium">{row.name}</td>
                     <td className="px-4 py-2 text-xs text-gray-500 font-mono">{row.idNumber}</td>
                     <td className="px-4 py-2 text-right">{row.income.toLocaleString()}</td>
                     <td className="px-4 py-2 bg-blue-50/20 text-gray-500 text-xs">{row.paymentMonth}</td>
                     <td className="px-4 py-2 bg-blue-50/20 text-center text-xs">
                        <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${row.continuousMonthsCount > 1 ? 'bg-brand-100 text-brand-700 font-bold' : 'text-gray-400'}`}>
                          {row.continuousMonthsCount}
                        </span>
                     </td>
                     <td className="px-4 py-2 bg-blue-50/20 text-right text-xs text-gray-500">{row.segmentCumulativeIncome.toLocaleString()}</td>
                     <td className="px-4 py-2 bg-blue-50/20 text-right text-xs text-gray-500">{row.segmentCumulativeTaxableIncome.toLocaleString()}</td>
                     <td className="px-4 py-2 text-center text-xs">{(row.taxRate * 100).toFixed(0)}%</td>
                     <td className="px-4 py-2 text-right text-xs text-gray-400">{row.segmentPriorTaxPaid.toLocaleString()}</td>
                     <td className="px-4 py-2 text-right font-bold text-emerald-600 bg-emerald-50/20">{row.currentTax.toLocaleString()}</td>
                     <td className="px-4 py-2 text-right font-medium">{row.afterTaxIncome.toLocaleString()}</td>
                  </tr>
                ))}
                {displayData.length === 0 && (
                  <tr>
                     <td colSpan={15} className="py-32 text-center text-gray-400">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                              <FileSpreadsheet size={32} className="opacity-30" />
                          </div>
                          <div>
                             <p className="text-lg font-medium text-gray-600">工作台暂无数据</p>
                             <p className="text-sm mt-1">请点击右上方按钮导入 Excel 文件开始计算</p>
                          </div>
                        </div>
                     </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
       </div>
    </div>
  );
};

export default TaxTable;
