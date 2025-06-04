"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Loader2 } from "lucide-react";

export function LiveDemo() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);

    const formData = new FormData();
    formData.append("document", file);

    try {
      const response = await fetch("/api/parse", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data.data);
      setIsProcessing(false);
    } catch (error) {
      console.error("Error processing document:", error);
      setIsProcessing(false);
    }
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Try It Live</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload a document and see doc-extract in action. Extract text and
            metadata instantly.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border shadow-xl">
            <CardHeader className="bg-slate-900 dark:bg-slate-950 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Document Processor
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {!result ? (
                <div className="text-center">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 hover:border-blue-400 transition-colors">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2">
                      Upload a Document
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Supports PDF, DOCX, DOC, PPT, PPTX, and TXT files
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.docx,.doc,.ppt,.pptx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      disabled={isProcessing}
                    />
                    <Button asChild disabled={isProcessing}>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Choose File
                          </>
                        )}
                      </label>
                    </Button>
                  </div>
                </div>
              ) : (
                <Tabs defaultValue="text" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="text">Extracted Text</TabsTrigger>
                    <TabsTrigger value="metadata">Metadata</TabsTrigger>
                  </TabsList>

                  <TabsContent value="text" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>Document Content</span>
                          <Badge variant="secondary">
                            {result.metadata.words} words
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 max-h-64 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-sm">
                            {result.text}
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="metadata" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Document Stats
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Pages:
                            </span>
                            <span className="font-medium">
                              {result.metadata.pages}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Words:
                            </span>
                            <span className="font-medium">
                              {result.metadata.words}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Characters:
                            </span>
                            <span className="font-medium">
                              {result.metadata.characters}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              File Size:
                            </span>
                            <span className="font-medium">
                              {result.metadata.fileSize} bytes
                            </span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">File Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Filename:
                            </span>
                            <span className="font-medium text-sm">
                              {result.metadata.fileName}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Status:
                            </span>
                            <Badge
                              variant="default"
                              className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                            >
                              Processed
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              )}

              {result && (
                <div className="mt-6 flex justify-center">
                  <Button variant="outline" onClick={() => setResult(null)}>
                    Try Another Document
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
