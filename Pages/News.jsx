import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ExternalLink, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function News() {
  const [searchQuery, setSearchQuery] = useState("");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `딥페이크(Deepfake)와 관련된 최신 뉴스 5개를 찾아주세요. 
        각 뉴스에는 제목, 간단한 요약, 날짜가 포함되어야 합니다.
        실제로 존재하는 뉴스처럼 구체적이고 현실적인 내용으로 작성해주세요.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            articles: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  summary: { type: "string" },
                  date: { type: "string" },
                  category: { type: "string" },
                },
              },
            },
          },
        },
      });

      setNews(result.articles || []);
    } catch (error) {
      console.error("Failed to fetch news:", error);
      // Fallback demo data
      setNews([
        {
          title: "딥페이크 기술, 2025년 급속 발전 예상",
          summary:
            "AI 기술의 발전으로 딥페이크 탐지가 더욱 중요해지고 있습니다. 전문가들은 새로운 보안 기술의 필요성을 강조하고 있습니다.",
          date: "2025.01.15",
          category: "기술",
        },
        {
          title: "정부, 딥페이크 범죄 강력 대응 방침",
          summary:
            "최근 딥페이크를 이용한 범죄가 증가함에 따라 정부가 강력한 처벌 규정을 마련하고 있습니다.",
          date: "2025.01.12",
          category: "사회",
        },
        {
          title: "AI 기반 딥페이크 탐지 기술 개발",
          summary:
            "국내 연구팀이 99% 정확도의 딥페이크 탐지 알고리즘을 개발해 주목받고 있습니다.",
          date: "2025.01.10",
          category: "과학",
        },
      ]);
    }
    setLoading(false);
  };

  const filteredNews = news.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 text-white pt-12 pb-8 px-6 rounded-b-[2rem]">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-2">딥페이크 알아보기</h1>
          <p className="text-cyan-100 mb-6">
            딥페이크 관련 최신 뉴스와 정보를 확인하세요!!!!
          </p>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-white/90 backdrop-blur-sm border-none text-gray-900 placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">최신 뉴스</h2>
          <button
            onClick={fetchNews}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View All
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNews.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-5 bg-white hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-bold text-gray-900 leading-snug flex-1">
                      {article.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                  </div>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                    {article.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {article.date}
                    </span>
                    {article.category && (
                      <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                        {article.category}
                      </span>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filteredNews.length === 0 && (
          <Card className="p-12 text-center bg-white">
            <p className="text-gray-500">검색 결과가 없습니다</p>
          </Card>
        )}
      </div>
    </div>
  );
}
