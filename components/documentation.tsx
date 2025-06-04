import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

const codeExamples = {
  quickStart: `import DocumentReader, { readDocument } from "doc-extract";

// Simple usage
const content = await readDocument("./path/to/document.pdf");
console.log(content.text);
console.log(content.metadata);

// Using the class for more control
const reader = new DocumentReader({ debug: true });
const content = await reader.readDocument("./path/to/document.docx");`,

  bufferUsage: `import { DocumentReader } from "doc-extract";
import fs from "fs";

const reader = new DocumentReader();
const buffer = fs.readFileSync("./document.pdf");
const content = await reader.readDocumentFromBuffer(
  buffer, 
  "document.pdf"
);

console.log(content.text);`,

  batchProcessing: `const reader = new DocumentReader();

// Process multiple documents
const contents = await reader.readMultipleDocuments([
  "./doc1.pdf",
  "./doc2.docx", 
  "./doc3.pptx"
]);

contents.forEach((content, index) => {
  console.log(\`Document \${index + 1}:\`);
  console.log(\`Words: \${content.metadata?.words}\`);
});`,

  errorHandling: `import { DocumentReaderError } from "doc-extract";

try {
  const content = await readDocument("./document.pdf");
  console.log(content.text);
} catch (error) {
  if (error instanceof DocumentReaderError) {
    console.log("Error code:", error.code);
    console.log("Error message:", error.message);
  }
}`,
};

export function Documentation() {
  return (
    <section className="py-24 bg-background/95" id="docs">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Documentation
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete API reference and usage examples to get you started
            quickly.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="installation" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-card">
              <TabsTrigger
                value="installation"
                className="data-[state=active]:bg-muted"
              >
                Installation
              </TabsTrigger>
              <TabsTrigger
                value="quickstart"
                className="data-[state=active]:bg-muted"
              >
                Quick Start
              </TabsTrigger>
              <TabsTrigger value="api" className="data-[state=active]:bg-muted">
                API Reference
              </TabsTrigger>
              <TabsTrigger
                value="examples"
                className="data-[state=active]:bg-muted"
              >
                Examples
              </TabsTrigger>
            </TabsList>

            <TabsContent value="installation" className="mt-8">
              <Card className="bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Installation & Setup
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">
                      Install the Package
                    </h3>
                    <div className="bg-background text-foreground rounded-lg p-4 relative">
                      <code>npm install doc-extract</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">
                      System Dependencies
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      For full functionality, install these system packages:
                    </p>

                    <div className="grid md:grid-cols-3 gap-4">
                      <Card className="border-l-4 border-l-blue-500 bg-card text-card-foreground">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base text-foreground">
                            Ubuntu/Debian
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <code className="text-sm bg-background text-foreground p-2 rounded block">
                            sudo apt-get install antiword unrtf poppler-utils
                            tesseract-ocr
                          </code>
                        </CardContent>
                      </Card>

                      <Card className="border-l-4 border-l-green-500 bg-card text-card-foreground">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base text-foreground">
                            macOS
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <code className="text-sm bg-background text-foreground p-2 rounded block">
                            brew install antiword unrtf poppler tesseract
                          </code>
                        </CardContent>
                      </Card>

                      <Card className="border-l-4 border-l-purple-500 bg-card text-card-foreground">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base text-foreground">
                            Windows
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <code className="text-sm bg-background text-foreground p-2 rounded block">
                            choco install poppler tesseract
                          </code>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quickstart" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle className="text-foreground">
                      Basic Usage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-background text-foreground rounded-lg p-4 text-sm overflow-x-auto">
                      <pre>{codeExamples.quickStart}</pre>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle className="text-foreground">
                      Buffer Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-background text-foreground rounded-lg p-4 text-sm overflow-x-auto">
                      <pre>{codeExamples.bufferUsage}</pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="api" className="mt-8">
              <div className="space-y-6">
                <Card className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle className="text-foreground">
                      DocumentReader Class
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-4 border-l-blue-500 pl-4">
                        <h4 className="font-semibold text-foreground">
                          Constructor
                        </h4>
                        <code className="text-sm bg-background text-foreground p-1 rounded">
                          new DocumentReader(options?: {"{ debug?: boolean }"})
                        </code>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-foreground">
                            Main Methods
                          </h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>
                              <code className="text-foreground">
                                readDocument(filePath: string)
                              </code>
                            </li>
                            <li>
                              <code className="text-foreground">
                                readDocumentFromBuffer(buffer, fileName)
                              </code>
                            </li>
                            <li>
                              <code className="text-foreground">
                                readMultipleDocuments(filePaths[])
                              </code>
                            </li>
                            <li>
                              <code className="text-foreground">
                                readMultipleFromBuffers(buffers[])
                              </code>
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-foreground">
                            Format-Specific
                          </h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>
                              <code className="text-foreground">
                                readPdf(filePath)
                              </code>
                            </li>
                            <li>
                              <code className="text-foreground">
                                readDocx(filePath)
                              </code>
                            </li>
                            <li>
                              <code className="text-foreground">
                                readPowerPoint(filePath)
                              </code>
                            </li>
                            <li>
                              <code className="text-foreground">
                                isFormatSupported(filePath)
                              </code>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle className="text-foreground">
                      Return Types
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-background text-foreground rounded-lg p-4 text-sm overflow-x-auto">
                      <pre>{`interface DocumentContent {
  text: string;
  metadata?: {
    pages?: number;
    words?: number;
    characters?: number;
    fileSize?: number;
    fileName?: string;
  };
}`}</pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="examples" className="mt-8">
              <div className="space-y-6">
                <Card className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle className="text-foreground">
                      Batch Processing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-background text-foreground rounded-lg p-4 text-sm overflow-x-auto">
                      <pre>{codeExamples.batchProcessing}</pre>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle className="text-foreground">
                      Error Handling
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-background text-foreground rounded-lg p-4 text-sm overflow-x-auto">
                      <pre>{codeExamples.errorHandling}</pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
