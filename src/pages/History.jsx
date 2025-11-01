import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { motion } from "framer-motion";

export default function History() {
  const { data: history, isLoading } = useQuery({
    queryKey: ['detection-history'],
    queryFn: () => base44.entities.DetectionHistory.list("-created_date"),
    initialData: [],
  });

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white pt-12 pb-8 px-6 rounded-b-[2rem]">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-2">내 탐지 기록</h1>
          <p className="text-purple-100">
            지금까지 분석한 이미지 기록을 확인하세요
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-4">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4 animate-pulse">
                <div className="h-20 bg-gray-200 rounded" />
              </Card>
            ))}
          </div>
        ) : history.length === 0 ? (
          <Card className="p-12 text-center bg-white">
            <Clock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              아직 탐지 기록이 없어요
            </h3>
            <p className="text-gray-500">
              이미지를 분석하면 여기에 기록이 나타납니다
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`p-4 ${
                    item.result === 'fake' 
                      ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200' 
                      : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-gray-900 truncate">
                          {item.title || "이미지 분석"}
                        </h3>
                        {item.result === 'fake' ? (
                          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        )}
                      </div>
                      <p className={`text-sm font-medium mb-1 ${
                        item.result === 'fake' ? 'text-red-700' : 'text-green-700'
                      }`}>
                        {item.result === 'fake' ? '수상한 이미지' : '안전한 이미지'}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>
                          {format(new Date(item.created_date), 'yyyy.MM.dd HH:mm', { locale: ko })}
                        </span>
                        {item.confidence && (
                          <span className="font-medium">
                            신뢰도 {item.confidence}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}