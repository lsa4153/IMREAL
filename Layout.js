import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Shield, History, Newspaper } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  const navItems = [
    { name: "Home", icon: Home, url: createPageUrl("Home") },
    { name: "보호", icon: Shield, url: createPageUrl("Protect") },
    { name: "기록", icon: History, url: createPageUrl("History") },
    { name: "뉴스", icon: Newspaper, url: createPageUrl("News") },
  ];

  const isActive = (url) => location.pathname === url;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 pb-20">
      <style>{`
        :root {
          --primary: #8b5cf6;
          --secondary: #3b82f6;
        }
      `}</style>
      
      {/* Main Content */}
      <main className="min-h-screen">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="max-w-md mx-auto flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.url);
            return (
              <Link
                key={item.name}
                to={item.url}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  active ? 'text-purple-600' : 'text-gray-400'
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${active ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}