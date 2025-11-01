import React, { useState, useEffect } from "react";
import { api } from "@/api/apiClient";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card } from "@/components/ui/card";
import { Search, Shield, Droplets, FileImage, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    loadUser();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const loadUser = async () => {
    try {
      const userData = await api.auth.me();
      setUser(userData);
    } catch (error) {
      console.log("User not logged in");
    }
  };

  const features = [
    {
      title: "Deepfake 탐지",
      description: "이미지로부터\n탐지",
      icon: Search,
      gradient: "from-purple-500 to-indigo-500",
      url: createPageUrl("Detect"),
    },
    {
      title: "이미지 보호",
      description: "AI로부터\n정보 보호",
      icon: Shield,
      gradient: "from-blue-500 to-cyan-500",
      url: createPageUrl("Protect"),
    },
    {
      title: "워터마크 추가하기",
      description: "보이지 않는\n워터마크",
      icon: Droplets,
      gradient: "from-indigo-500 to-purple-500",
      url: createPageUrl("Watermark"),
    },
    {
      title: "딥페이크 알아보기",
      description: "딥페이크\n최신 뉴스",
      icon: FileImage,
      gradient: "from-cyan-500 to-blue-500",
      url: createPageUrl("News"),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white pt-12 pb-8 px-6 rounded-b-[2rem]">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-start mb-6"
          >
            <div>
              <p className="text-sm opacity-90">Welcome Home,</p>
              <h1 className="text-2xl font-bold mt-1">
                {user?.full_name || "Guest"} 님
              </h1>
            </div>
            <div className="text-right">
              <p className="text-3xl font-light">
                {currentTime.toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold leading-tight">
              딥페이크로부터
              <br />
              보호하세요
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 -mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link key={index} to={feature.url}>
                <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-none bg-white h-full">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-base">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 whitespace-pre-line leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </Link>
            );
          })}
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  딥페이크란?
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  인공지능을 이용해 사람의 얼굴이나 목소리를 조작한 가짜
                  콘텐츠입니다. IMReal로 여러분의 이미지를 보호하세요.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
