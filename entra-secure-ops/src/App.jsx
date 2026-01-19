import React, { useState, useMemo, useEffect } from 'react';
import {
  AlertTriangle, ShieldAlert, Activity, Settings,
  CheckCircle2, Circle, Download, LayoutDashboard,
  Moon, Sun, Search, PieChart, ChevronRight, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { checklistCategories } from './data/checklistData';
import { cn } from './lib/utils';

// Icon mapping
const iconMap = {
  AlertTriangle,
  ShieldAlert,
  Activity,
  Settings
};

// Components

const ProgressBar = ({ progress }) => (
  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="bg-brand-blue h-2.5 rounded-full shadow-[0_0_10px_rgba(0,120,212,0.5)]"
    />
  </div>
);

const StatCard = ({ title, value, subtext, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-brand-blue/10 rounded-xl">
        <Icon className="w-6 h-6 text-brand-blue" />
      </div>
      {subtext && <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">{subtext}</span>}
    </div>
    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</h3>
    <div className="text-3xl font-bold text-slate-900 dark:text-white">{value}</div>
  </motion.div>
);

const ReportModal = ({ isOpen, onClose, data, score }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800"
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Download className="w-6 h-6 text-brand-blue" />
            Security Assessment Report
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="text-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <div className="text-4xl font-bold text-brand-blue mb-2">{Math.round(score)}%</div>
            <p className="text-slate-500 dark:text-slate-400">Overall Security Score</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              Action Required
            </h3>
            {data.incomplete.length === 0 ? (
              <p className="text-green-500 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> All checks passed!
              </p>
            ) : (
              <ul className="space-y-3">
                {data.incomplete.map(item => (
                  <li key={item.id} className="flex gap-3 text-slate-700 dark:text-slate-300 bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/20">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                    <div>
                      <div className="font-medium">{item.text}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{item.recommendation}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              Passed Checks
            </h3>
            <ul className="space-y-3">
              {data.complete.map(item => (
                <li key={item.id} className="flex gap-3 text-slate-700 dark:text-slate-300 bg-green-50 dark:bg-green-900/10 p-3 rounded-lg border border-green-100 dark:border-green-900/20">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  <div className="font-medium">{item.text}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-medium transition-colors">
            Close
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-brand-blue hover:bg-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-blue-500/25 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Print to PDF
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [completedItems, setCompletedItems] = useState(new Set());
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Derived State
  const allItems = useMemo(() =>
    checklistCategories.flatMap(cat => cat.items.map(item => ({ ...item, category: cat.title }))),
    []);

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return checklistCategories;
    return checklistCategories.map(cat => ({
      ...cat,
      items: cat.items.filter(item =>
        item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(cat => cat.items.length > 0);
  }, [searchQuery]);

  const stats = useMemo(() => {
    const total = allItems.length;
    const completed = completedItems.size;
    const score = total === 0 ? 0 : (completed / total) * 100;

    // Categorize for report
    const completeList = allItems.filter(i => completedItems.has(i.id));
    const incompleteList = allItems.filter(i => !completedItems.has(i.id));

    return { total, completed, score, completeList, incompleteList };
  }, [completedItems, allItems]);

  const toggleItem = (id) => {
    const newSet = new Set(completedItems);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setCompletedItems(newSet);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-slate-950' : 'bg-slate-50'}`}>

      {/* Header/Nav */}
      <nav className="sticky top-0 z-40 w-full backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                Entra<span className="text-brand-blue">Ops</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-blue transition-colors" />
                <input
                  type="text"
                  placeholder="Search checks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-900 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-brand-blue/50 outline-none transition-all placeholder:text-slate-500 dark:text-white"
                />
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Dashboard Grid */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Security Posture Dashboard</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Real-time assessment provided by Entra ID Consultant Tool.</p>
            </div>
            <button
              onClick={() => setIsReportOpen(true)}
              className="px-5 py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Generate Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Overall Score"
              value={`${Math.round(stats.score)}%`}
              subtext={stats.score === 100 ? "Excellent" : "Action Needed"}
              icon={PieChart}
              delay={0}
            />
            <StatCard
              title="Checks Passed"
              value={`${stats.completed}/${stats.total}`}
              icon={CheckCircle2}
              delay={0.1}
            />
            <StatCard
              title="Critical Actions"
              value={stats.incomplete.length}
              subtext="High Priority"
              icon={AlertTriangle}
              delay={0.2}
            />
            <div className="bg-gradient-to-br from-brand-blue to-blue-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20 flex flex-col justify-between">
              <div>
                <h3 className="font-medium opacity-90 mb-1">Status</h3>
                <div className="text-2xl font-bold">{stats.score === 100 ? "Secure" : "Improving"}</div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1 opacity-80">
                  <span>Progress</span>
                  <span>{Math.round(stats.score)}%</span>
                </div>
                <div className="bg-black/20 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.score}%` }}
                    className="bg-white h-full rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid (Bento Style) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredCategories.map((category, idx) => {
              const CatIcon = iconMap[category.icon] || Settings;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx, duration: 0.5 }}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="p-6 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-slate-200/50 dark:bg-slate-800 rounded-xl group-hover:scale-110 group-hover:bg-brand-blue/10 group-hover:text-brand-blue transition-all duration-300">
                        <CatIcon className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-brand-blue" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">{category.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{category.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                    {category.items.map((item) => {
                      const isCompleted = completedItems.has(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleItem(item.id)}
                          className={cn(
                            "p-5 flex gap-4 cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50",
                            isCompleted ? "bg-slate-50/50 dark:bg-slate-900/30" : ""
                          )}
                        >
                          <div className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300",
                            isCompleted
                              ? "bg-brand-blue border-brand-blue scale-110 shadow-lg shadow-blue-500/30"
                              : "border-slate-300 dark:border-slate-600 group-hover:border-brand-blue/50"
                          )}>
                            {isCompleted && <CheckCircle2 className="w-4 h-4 text-white" />}
                          </div>

                          <div className="flex-1">
                            <div className={cn(
                              "font-medium text-base transition-all",
                              isCompleted ? "text-slate-500 dark:text-slate-500 line-through decoration-slate-400" : "text-slate-900 dark:text-slate-200"
                            )}>
                              {item.text}
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                              {item.description}
                            </p>
                            <div className="mt-3 flex items-center gap-2">
                              <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-900/30">
                                Recommended
                              </span>
                              <span className="text-xs text-slate-400 dark:text-slate-500 italic">
                                "{item.recommendation}"
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </section>
      </main>

      <AnimatePresence>
        {isReportOpen && (
          <ReportModal
            isOpen={isReportOpen}
            onClose={() => setIsReportOpen(false)}
            data={{ complete: stats.completeList, incomplete: stats.incompleteList }}
            score={stats.score}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
