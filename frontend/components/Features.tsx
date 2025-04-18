import { Link, BarChart3, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Features(){
  const features = [
    {
      icon: Link,
      title: "Link Shortening",
      description: "Transform long URLs into concise, shareable links in seconds.",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Track clicks, location data, and engagement metrics in real-time.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security and 99.9% uptime guarantee.",
    },
  ];

  return (
    <div className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900">
            Why Choose LinkSnap?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to manage and optimize your links in one place.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="rounded-lg bg-purple-100 p-3">
                    <feature.icon className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};