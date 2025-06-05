import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, ExternalLink, Layers, Search, Server } from "lucide-react";
import { details } from "./const_data/config";
import posthog from "posthog-js";

const examples = [
  {
    id: "express",
    title: "Express.js Integration",
    description:
      "Handle file uploads and extract text in an Express.js application",
    icon: Server,
    tags: ["Express", "Multer", "File Upload"],
    code: `import express from "express";
import multer from "multer";
import { DocumentReader } from "doc-extract";

const app = express();
const upload = multer();
const reader = new DocumentReader();

app.post("/upload", upload.single("document"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const content = await reader.readDocumentFromBuffer(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    res.json({
      text: content.text,
      metadata: content.metadata,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});`,
  },
  {
    id: "batch",
    title: "Batch Processing",
    description: "Process multiple documents in a directory efficiently",
    icon: Layers,
    tags: ["Batch", "Directory", "Processing"],
    code: `import { DocumentReader } from "doc-extract";
import { promises as fs } from "fs";
import path from "path";

async function processDocumentsInDirectory(dirPath: string) {
  const reader = new DocumentReader({ debug: true });

  const files = await fs.readdir(dirPath);
  const documentPaths = files
    .filter((file) => reader.isFormatSupportedByName(file))
    .map((file) => path.join(dirPath, file));

  const results = await reader.readMultipleDocuments(documentPaths);

  results.forEach((content, index) => {
    console.log(\`Document \${documentPaths[index]}:\`);
    console.log(\`Words: \${content.metadata?.words}\`);
    console.log(\`Characters: \${content.metadata?.characters}\`);
    console.log("---");
  });
}

// Usage
processDocumentsInDirectory("./documents")
  .then(() => console.log("Processing complete"))
  .catch(console.error);`,
  },
  {
    id: "search",
    title: "Document Search",
    description: "Search for specific terms within documents",
    icon: Search,
    tags: ["Search", "Text Analysis", "Filtering"],
    code: `import { DocumentReader } from "doc-extract";

async function searchInDocument(filePath: string, searchTerm: string) {
  const reader = new DocumentReader();
  const content = await reader.readDocument(filePath);

  const lines = content.text.split("\\n");
  const matchingLines = lines
    .map((line, index) => ({ line, lineNumber: index + 1 }))
    .filter(({ line }) =>
      line.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return {
    totalMatches: matchingLines.length,
    matches: matchingLines,
    metadata: content.metadata,
  };
}

// Usage
searchInDocument("./document.pdf", "important")
  .then((results) => {
    console.log(\`Found \${results.totalMatches} matches\`);
    results.matches.forEach(({ line, lineNumber }) => {
      console.log(\`Line \${lineNumber}: \${line}\`);
    });
  })
  .catch(console.error);`,
  },
];

export function Examples() {
  return (
    <section className="py-24 bg-background/95" id="examples">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Real-World Examples
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how to integrate doc-extract into your applications with these
            practical examples.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="express" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-card">
              {examples.map((example) => (
                <TabsTrigger
                  key={example.id}
                  value={example.id}
                  className="flex items-center gap-2 data-[state=active]:bg-muted"
                >
                  <example.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {example.title.split(" ")[0]}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {examples.map((example) => (
              <TabsContent key={example.id} value={example.id} className="mt-8">
                <Card className="border-0 shadow-xl bg-card text-card-foreground">
                  <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <example.icon className="w-6 h-6" />
                        <div>
                          <CardTitle className="text-xl">
                            {example.title}
                          </CardTitle>
                          <p className="text-muted-foreground mt-1">
                            {example.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            posthog.capture("example-code-clicked", {
                              example: example.id,
                            });
                            navigator.clipboard.writeText(example.code);
                          }}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            posthog.capture("example-open-clicked", {
                              example: example.id,
                            });
                            window.open(details.repo, "_blank");
                          }}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Open
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {example.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-muted text-muted-foreground border border-border"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="bg-background text-foreground p-6 text-sm overflow-x-auto rounded-b-lg">
                      <pre className="whitespace-pre-wrap">{example.code}</pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto border-0 shadow-lg bg-card text-card-foreground">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Need More Examples?
              </h3>
              <p className="text-muted-foreground mb-6">
                Check out our comprehensive documentation and community examples
                on GitHub.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => {
                    posthog.capture("readme-clicked", {
                      readme: details.readme,
                    });
                    window.open(details.readme, "_blank");
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Documentation
                </Button>
                <Button
                  variant="outline"
                  className="border-border text-foreground hover:bg-muted"
                  onClick={() => {
                    posthog.capture("github-repo-clicked", {
                      github: details.repo,
                    });
                    window.open(details.repo, "_blank");
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  GitHub Repository
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
