"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Github, Zap } from "lucide-react";
import { details } from "./const_data/config";

export function Hero() {
  return (
    <section className="relative bg-slate-900 dark:bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-24 text-center">
        <Badge
          variant="secondary"
          className="mb-4 bg-slate-800 text-slate-200 border-slate-700"
        >
          <Zap className="w-3 h-3 mr-1" />
          v1.0.4 - Latest Release
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
          Doc Extract
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-slate-300 max-w-3xl mx-auto">
          A powerful Node.js library for reading and extracting text from
          various document formats including PDF, DOCX, DOC, PPT, PPTX, and TXT
          files.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            size="lg"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            npm install doc-extract
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
            onClick={() => window.open(details.repo, "_blank")}
          >
            <Github className="w-4 h-4 mr-2" />
            View on GitHub
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-2xl mx-auto">
          {["PDF", "DOCX", "DOC", "PPT", "PPTX", "TXT"].map((format) => (
            <div
              key={format}
              className="bg-slate-800 rounded-lg p-3 border border-slate-700"
            >
              <FileText className="w-6 h-6 mx-auto mb-1" />
              <div className="text-sm font-medium">{format}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
