'use client'
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";

export const Hero = () => {
    const router = useRouter();
    return (
        <div className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white py-20 sm:py-32">
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <div className="flex justify-center mb-8">
                        <div className="rounded-full bg-purple-100 p-3">
                            <Link className="w-8 h-8 text-purple-600" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                            Transform Your Links
                        </span>
                        <br />
                        Into Powerful Connections
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
                        Create short, branded links that help you share, track, and optimize your digital presence.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-4">
                      
                            <Button onClick={()=>{router.push('/createlink')}} size="lg" className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                                Get Started - Its Free
                            </Button>
                       
                        <Button variant="outline" size="lg">
                            Learn More
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};