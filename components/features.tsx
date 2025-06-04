import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Zap, Shield, Code, Database, Layers } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Multiple Format Support",
    description:
      "Extract text from PDF, DOCX, DOC, PPT, PPTX, and TXT files with a unified API.",
    badge: "6 Formats",
  },
  {
    icon: Database,
    title: "Rich Metadata",
    description:
      "Get comprehensive document statistics including word count, character count, and page numbers.",
    badge: "Detailed Stats",
  },
  {
    icon: Layers,
    title: "Buffer Support",
    description:
      "Read documents directly from memory buffers without writing to disk.",
    badge: "Memory Efficient",
  },
  {
    icon: Code,
    title: "TypeScript Ready",
    description:
      "Full TypeScript support with comprehensive type definitions and IntelliSense.",
    badge: "Type Safe",
  },
  {
    icon: Zap,
    title: "Promise-based API",
    description:
      "Modern async/await API design for seamless integration with your applications.",
    badge: "Async/Await",
  },
  {
    icon: Shield,
    title: "Error Handling",
    description:
      "Comprehensive error handling with custom error types and detailed error messages.",
    badge: "Robust",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-background" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to extract text and metadata from documents with
            ease and reliability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <Badge variant="secondary">{feature.badge}</Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-slate-50 dark:bg-slate-900 rounded-2xl p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                6+
              </div>
              <div className="text-sm text-muted-foreground">
                Supported Formats
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                100%
              </div>
              <div className="text-sm text-muted-foreground">
                TypeScript Coverage
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                0
              </div>
              <div className="text-sm text-muted-foreground">Dependencies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                MIT
              </div>
              <div className="text-sm text-muted-foreground">
                Open Source License
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
