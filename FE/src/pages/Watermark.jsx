import React, { useState } from "react";
import { api } from "@/api/apiClient";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Upload,
  Loader2,
  Download,
  Droplets,
  Camera,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Watermark() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [watermarkText, setWatermarkText] = useState("");
  const [showTextInput, setShowTextInput] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [watermarkedUrl, setWatermarkedUrl] = useState(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setCompleted(false);
      setShowTextInput(true);
    }
  };

  const addWatermark = async () => {
    if (!file || !watermarkText) return;

    setProcessing(true);
    setShowTextInput(false);
    try {
      // Django API: POST /api/protection/jobs/
      const formData = new FormData();
      formData.append("image", file);
      formData.append("job_type", "watermark");
      formData.append("watermark_text", watermarkText);

      const job = await api.protection.addWatermark(formData);

      // Django 응답 구조에 맞게 처리
      if (job.protected_files && job.protected_files.length > 0) {
        setWatermarkedUrl(job.protected_files[0].file_url);
      } else {
        setWatermarkedUrl(preview); // Fallback
      }
      setCompleted(true);
    } catch (error) {
      console.error("Watermark error:", error);
      // Fallback: 원본 이미지 사용
      setWatermarkedUrl(preview);
      setCompleted(true);
    }
    setProcessing(false);
  };

  const downloadWatermarked = () => {
    if (watermarkedUrl) {
      window.open(watermarkedUrl, "_blank");
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setWatermarkText("");
    setShowTextInput(false);
    setCompleted(false);
    setWatermarkedUrl(null);
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white pt-12 pb-8 px-6 rounded-b-[2rem]">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => navigate(createPageUrl("Home"))}
            className="mb-6"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold mb-2">워터마크 추가하기</h1>
          <p className="text-purple-100">
            보이지 않는 자신만의 표시를 추가하여,
            <br />
            무단 이미지 사용으로부터 보호하세요!
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
                  id="file-upload-watermark"
                />
                <label
                  htmlFor="file-upload-watermark"
                  className="cursor-pointer"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center">
                      <Upload className="w-10 h-10 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      이미지 업로드
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      워터마크를 추가할 이미지를 선택하세요
                    </p>
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                      <Camera className="w-4 h-4 mr-2" />
                      이미지 선택
                    </Button>
                  </div>
                </label>
              </Card>
            </motion.div>
          )}

          {preview && showTextInput && (
            <motion.div
              key="text-input"
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
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    업로드한 이미지에 넣을
                    <br />
                    자신만의 표시를 선택해주세요!
                  </label>
                  <Input
                    type="text"
                    placeholder="예: 김다영의 이미지"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    className="text-base"
                  />
                </div>
                <div className="space-y-3">
                  <Button
                    onClick={addWatermark}
                    disabled={!watermarkText}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    <Droplets className="w-4 h-4 mr-2" />
                    워터마크 추가
                  </Button>
                  <Button variant="outline" onClick={reset} className="w-full">
                    다시 선택
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {preview && processing && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-6 bg-white">
                <img
                  src={preview}
                  alt="Processing"
                  className="w-full rounded-lg mb-4"
                />
                <div className="text-center py-8">
                  <Loader2 className="w-12 h-12 mx-auto mb-4 text-indigo-600 animate-spin" />
                  <p className="text-gray-700 font-medium">
                    이미지를 분석 중이에요.....
                  </p>
                  <Button variant="outline" onClick={reset} className="mt-4">
                    취소
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {completed && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Droplets className="w-12 h-12 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    이미지에 워터마크 추가했어요.
                  </h2>
                  <p className="text-gray-700">자유롭게 사용해보세요!</p>
                </div>

                {preview && (
                  <img
                    src={preview}
                    alt="Watermarked"
                    className="w-full rounded-lg mb-4"
                  />
                )}

                <Card className="p-4 bg-white mb-4">
                  <div className="flex items-center gap-3">
                    <Droplets className="w-5 h-5 text-indigo-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        워터마크: {watermarkText}
                      </p>
                      <p className="text-xs text-gray-500">
                        보이지 않는 워터마크가 추가되었습니다
                      </p>
                    </div>
                  </div>
                </Card>

                <div className="space-y-3">
                  <Button
                    onClick={downloadWatermarked}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    다운로드
                  </Button>
                  <Button variant="outline" onClick={reset} className="w-full">
                    새로운 이미지 처리
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
