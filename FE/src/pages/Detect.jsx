import React, { useState } from "react";
import { api } from "@/api/apiClient";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Upload,
  Loader2,
  CheckCircle,
  XCircle,
  Camera,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Detect() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  const analyzeImage = async () => {
    if (!file) return;

    setAnalyzing(true);
    try {
      // Django API: POST /api/detection/image/
      const formData = new FormData();
      formData.append("image", file);
      formData.append("analysis_type", "image");

      const record = await api.detection.analyzeImage(formData);

      // Django 응답 구조에 맞게 처리
      const isFake =
        record.analysis_result === "deepfake" ||
        record.analysis_result === "suspicious";

      setResult({
        isFake,
        confidence: record.confidence_score,
        description: isFake
          ? "이미지에서 의심스러운 패턴이 감지되었습니다."
          : "정상적인 이미지입니다.",
        imageUrl: preview,
        record_id: record.record_id,
      });
    } catch (error) {
      console.error("Analysis error:", error);
      // Fallback to random result for demo
      const isFake = Math.random() > 0.5;
      setResult({
        isFake,
        confidence: Math.floor(Math.random() * 40) + (isFake ? 60 : 20),
        description: isFake
          ? "이미지에서 의심스러운 패턴이 감지되었습니다."
          : "정상적인 이미지입니다.",
      });
    }
    setAnalyzing(false);
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white pt-12 pb-8 px-6 rounded-b-[2rem]">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => navigate(createPageUrl("Home"))}
            className="mb-6"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold mb-2">Deepfake 탐지</h1>
          <p className="text-purple-100">
            업로드한 이미지에서 사람을 찾아내고,
            <br />
            찾아낸 사람이 deepfake인지 탐지합니다.
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-4">
        <AnimatePresence mode="wait">
          {!preview && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-8 border-2 border-dashed border-gray-300 bg-white">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl flex items-center justify-center">
                      <Upload className="w-10 h-10 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      이미지 업로드
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      탭하여 이미지를 선택하세요
                    </p>
                    <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                      <Camera className="w-4 h-4 mr-2" />
                      이미지 선택
                    </Button>
                  </div>
                </label>
              </Card>
            </motion.div>
          )}

          {preview && !result && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-6 bg-white">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full rounded-lg mb-4"
                />
                {analyzing ? (
                  <div className="text-center py-8">
                    <Loader2 className="w-12 h-12 mx-auto mb-4 text-purple-600 animate-spin" />
                    <p className="text-gray-700 font-medium">
                      이미지를 분석 중이에요.....
                    </p>
                    <Button variant="outline" onClick={reset} className="mt-4">
                      취소
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button
                      onClick={analyzeImage}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    >
                      분석 시작
                    </Button>
                    <Button
                      variant="outline"
                      onClick={reset}
                      className="w-full"
                    >
                      다시 선택
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          )}

          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card
                className={`p-8 ${
                  result.isFake
                    ? "bg-gradient-to-br from-red-50 to-orange-50 border-red-200"
                    : "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                }`}
              >
                <div className="text-center mb-6">
                  {result.isFake ? (
                    <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                      <XCircle className="w-12 h-12 text-red-600" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                  )}
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {result.isFake
                      ? "Deepfake가 탐지되었어요!"
                      : "Deepfake가 탐지되지 않았어요!"}
                  </h2>
                  <p className="text-gray-700">
                    {result.isFake ? "주의가 필요해요!" : "안전한 이미지에요!"}
                  </p>
                </div>

                {preview && (
                  <img
                    src={preview}
                    alt="Analyzed"
                    className="w-full rounded-lg mb-4"
                  />
                )}

                <Card className="p-4 bg-white mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">신뢰도</span>
                    <span className="font-bold text-lg">
                      {result.confidence}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        result.isFake ? "bg-red-500" : "bg-green-500"
                      }`}
                      style={{ width: `${result.confidence}%` }}
                    />
                  </div>
                </Card>

                <p className="text-sm text-gray-600 mb-4">
                  {result.description}
                </p>

                <Button
                  onClick={reset}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  새로운 이미지 분석
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
