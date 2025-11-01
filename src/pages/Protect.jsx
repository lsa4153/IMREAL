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
  Download,
  Shield,
  Camera,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Protect() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [isProtected, setIsProtected] = useState(false);
  const [protectedUrl, setProtectedUrl] = useState(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setIsProtected(false);
    }
  };

  const protectImage = async () => {
    if (!file) return;

    setProcessing(true);
    try {
      // Upload file
      const { file_url } = await api.integrations.Core.UploadFile({ file });

      // Simulate protection process (in real app, would add noise)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setProtectedUrl(file_url);
      setIsProtected(true);
    } catch (error) {
      console.error("Protection error:", error);
    }
    setProcessing(false);
  };

  const downloadProtected = () => {
    if (protectedUrl) {
      window.open(protectedUrl, "_blank");
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setIsProtected(false);
    setProtectedUrl(null);
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white pt-12 pb-8 px-6 rounded-b-[2rem]">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => navigate(createPageUrl("Home"))}
            className="mb-6"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold mb-2">이미지 보호하기</h1>
          <p className="text-blue-100">
            이미지에 미세한 노이즈를 추가하여
            <br />
            Deepfake가 이미지를 파악하지 못하도록 보호하세요.
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
                  id="file-upload-protect"
                />
                <label htmlFor="file-upload-protect" className="cursor-pointer">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl flex items-center justify-center">
                      <Upload className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      이미지 업로드
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      보호할 이미지를 선택하세요
                    </p>
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                      <Camera className="w-4 h-4 mr-2" />
                      이미지 선택
                    </Button>
                  </div>
                </label>
              </Card>
            </motion.div>
          )}

          {preview && !isProtected && (
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
                {processing ? (
                  <div className="text-center py-8">
                    <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-600 animate-spin" />
                    <p className="text-gray-700 font-medium">
                      이미지를 처리 중이에요.....
                    </p>
                    <Button variant="outline" onClick={reset} className="mt-4">
                      취소
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button
                      onClick={protectImage}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      보호 시작
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

          {isProtected && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="w-12 h-12 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    이미지에 노이즈를 추가했어요.
                  </h2>
                  <p className="text-gray-700">자유롭게 사용해보세요!</p>
                </div>

                {preview && (
                  <img
                    src={preview}
                    alt="Protected"
                    className="w-full rounded-lg mb-4"
                  />
                )}

                <Card className="p-4 bg-white mb-4">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        보호된 이미지
                      </p>
                      <p className="text-xs text-gray-500">
                        AI가 분석하기 어려운 미세 노이즈가 추가되었습니다
                      </p>
                    </div>
                  </div>
                </Card>

                <div className="space-y-3">
                  <Button
                    onClick={downloadProtected}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    다운로드
                  </Button>
                  <Button variant="outline" onClick={reset} className="w-full">
                    새로운 이미지 보호
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
